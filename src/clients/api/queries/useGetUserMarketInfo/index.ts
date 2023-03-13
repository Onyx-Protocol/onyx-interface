import BigNumber from 'bignumber.js';
import { useMemo } from 'react';
import { Asset } from 'types';
import {
  calculateCollateralValue,
  convertTokensToWei,
  indexBy,
  unsafelyGetOToken,
  unsafelyGetToken,
} from 'utilities';

import {
  IGetOTokenBalancesAllOutput,
  useGetAssetsInAccount,
  useGetMarkets,
  useGetOTokenBalancesAll,
} from 'clients/api';
import { OETH_TOKENS, TOKENS } from 'constants/tokens';

export interface Data {
  assets: Asset[];
  userTotalBorrowLimitCents: BigNumber;
  userTotalBorrowBalanceCents: BigNumber;
  userTotalSupplyBalanceCents: BigNumber;
  totalXcnDistributedWei: BigNumber;
  dailyXcnWei: BigNumber;
}

export interface UseGetUserMarketInfoOutput {
  isLoading: boolean;
  data: Data;
}

const oTokenAddresses = Object.values(OETH_TOKENS).reduce(
  (acc, item) => (item.address ? [...acc, item.address] : acc),
  [] as string[],
);

// TODO: decouple, this hook handles too many things (see https://app.clickup.com/t/2d4rfx6)
const useGetUserMarketInfo = ({
  accountAddress,
}: {
  accountAddress?: string;
}): UseGetUserMarketInfoOutput => {
  const {
    data: getMarketsData = {
      markets: [],
      dailyXcnWei: new BigNumber(0),
    },
    isLoading: isGetMarketsLoading,
  } = useGetMarkets({
    placeholderData: {
      markets: [],
      dailyXcnWei: new BigNumber(0),
    },
  });

  const {
    data: assetsInAccount = {
      tokenAddresses: [],
    },
    isLoading: isGetAssetsInAccountLoading,
  } = useGetAssetsInAccount(
    { accountAddress: accountAddress || '' },
    {
      enabled: !!accountAddress,
      placeholderData: {
        tokenAddresses: [],
      },
    },
  );

  const {
    data: oTokenBalancesAccount = { balances: [] },
    isLoading: isGetOTokenBalancesAccountLoading,
  } = useGetOTokenBalancesAll(
    { account: accountAddress || '', oTokenAddresses },
    { enabled: !!accountAddress, placeholderData: { balances: [] } },
  );

  const oTokenBalances = useMemo(
    () =>
      indexBy(
        (item: IGetOTokenBalancesAllOutput['balances'][number]) => item.oToken.toLowerCase(), // index by oToken address
        oTokenBalancesAccount.balances,
      ),
    [JSON.stringify(oTokenBalancesAccount)],
  );

  const isLoading =
    isGetMarketsLoading || isGetAssetsInAccountLoading || isGetOTokenBalancesAccountLoading;

  const data = useMemo(() => {
    const {
      assets,
      userTotalBorrowBalanceCents,
      userTotalBorrowLimitCents,
      userTotalSupplyBalanceCents,
      totalXcnDistributedWei,
    } = (getMarketsData?.markets || []).reduce(
      (acc, market) => {
        const token = unsafelyGetToken(market.id);
        const oEthToken = unsafelyGetOToken(token.id);

        // Skip token if it isn't listed
        if (!token || !oEthToken) {
          return acc;
        }

        const otokenAddress = oEthToken.address.toLowerCase();
        const collateral = (assetsInAccount.tokenAddresses || [])
          .map((address: string) => address.toLowerCase())
          .includes(otokenAddress);

        let walletBalance = new BigNumber(0);
        let supplyBalance = new BigNumber(0);
        let borrowBalance = new BigNumber(0);
        const percentOfLimit = '0';

        const wallet = oTokenBalances && oTokenBalances[otokenAddress];
        if (accountAddress && wallet) {
          const toDecimalAmount = (mantissa: string) =>
            new BigNumber(mantissa).shiftedBy(-token.decimals);

          walletBalance = toDecimalAmount(wallet.tokenBalance);
          supplyBalance = toDecimalAmount(wallet.balanceOfUnderlying);
          borrowBalance = toDecimalAmount(wallet.borrowBalanceCurrent);
        }

        const asset: Asset = {
          token,
          supplyApy: new BigNumber(market?.supplyApy || 0),
          borrowApy: new BigNumber(market?.borrowApy || 0),
          xcnSupplyApy: new BigNumber(market?.supplyXcnApy || 0),
          xcnBorrowApy: new BigNumber(market?.borrowXcnApy || 0),
          collateralFactor: new BigNumber(market?.collateralFactor || 0).div(1e18),
          tokenPrice: new BigNumber(market?.tokenPrice || 0),
          liquidity: new BigNumber(market?.liquidity || 0),
          borrowCaps: new BigNumber(market?.borrowCaps || 0),
          supplyCaps: new BigNumber(market?.supplyCap || 0),
          treasuryTotalBorrowsCents: new BigNumber(market?.totalBorrowsUsd || 0).times(100),
          treasuryTotalSupplyCents: new BigNumber(market?.totalSupplyUsd || 0).times(100),
          treasuryTotalSupply: new BigNumber(market?.totalSupply || 0),
          treasuryTotalBorrows: new BigNumber(market?.totalBorrows2 || 0),
          cash: new BigNumber(market?.cash || 0),
          totalReserves: new BigNumber(market?.totalReserves || 0),
          walletBalance,
          supplyBalance,
          borrowBalance,
          collateral,
          percentOfLimit,
          xcnPerDay: new BigNumber(market?.supplierDailyXcn || 0)
            .plus(new BigNumber(market?.borrowerDailyXcn || 0))
            .div(new BigNumber(10).pow(TOKENS.xcn.decimals)),
        };

        // user totals
        const borrowBalanceCents = asset.borrowBalance.times(asset.tokenPrice).times(100);
        const supplyBalanceCents = asset.supplyBalance.times(asset.tokenPrice).times(100);
        acc.userTotalBorrowBalanceCents = acc.userTotalBorrowBalanceCents.plus(borrowBalanceCents);
        acc.userTotalSupplyBalanceCents = acc.userTotalSupplyBalanceCents.plus(supplyBalanceCents);

        acc.totalXcnDistributedWei = acc.totalXcnDistributedWei.plus(
          new BigNumber(market?.totalDistributed || 0).times(
            new BigNumber(10).pow(TOKENS.xcn.decimals),
          ),
        );

        // Create borrow limit based on assets supplied as collateral
        if (asset.collateral) {
          acc.userTotalBorrowLimitCents = acc.userTotalBorrowLimitCents.plus(
            calculateCollateralValue({
              amountWei: convertTokensToWei({ value: asset.supplyBalance, token }),
              token: asset.token,
              tokenPriceTokens: asset.tokenPrice,
              collateralFactor: asset.collateralFactor,
            }).times(100),
          );
        }

        return { ...acc, assets: [...acc.assets, asset] };
      },
      {
        assets: [] as Asset[],
        userTotalBorrowBalanceCents: new BigNumber(0),
        userTotalBorrowLimitCents: new BigNumber(0),
        userTotalSupplyBalanceCents: new BigNumber(0),
        totalXcnDistributedWei: new BigNumber(0),
      },
    );

    let assetList = assets;

    const userTotalBorrowBalance = userTotalBorrowBalanceCents;

    // percent of limit
    assetList = assetList.map((item: Asset) => ({
      ...item,
      percentOfLimit: new BigNumber(userTotalBorrowLimitCents).isZero()
        ? '0'
        : item.borrowBalance
            .times(item.tokenPrice)
            .div(userTotalBorrowLimitCents)
            .times(100)
            .dp(0, 1)
            .toFixed(),
    }));

    return {
      assets: assetList,
      userTotalBorrowBalanceCents: userTotalBorrowBalance,
      userTotalBorrowLimitCents,
      userTotalSupplyBalanceCents,
      dailyXcnWei: getMarketsData.dailyXcnWei || new BigNumber(0),
      totalXcnDistributedWei,
    };
  }, [
    '0',
    JSON.stringify(getMarketsData?.markets),
    JSON.stringify(assetsInAccount),
    JSON.stringify(oTokenBalances),
    JSON.stringify(getMarketsData),
  ]);

  return {
    isLoading,
    data,
    // TODO: handle errors and retry scenarios
  };
};

export default useGetUserMarketInfo;
