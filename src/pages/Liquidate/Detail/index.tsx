/* eslint-disable no-underscore-dangle */

/** @jsxImportSource @emotion/react */
import Typography from '@mui/material/Typography';
import BigNumber from 'bignumber.js';
import { Button } from 'components';
import config from 'config';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'translation';
import { MarketWithBorrowBalance, SubgraphMarket, SubgraphToken, Token, UserInfo } from 'types';
import {
  getAccountSubGraph,
  getContractAddress,
  getTokenByAddress,
  truncateAddress,
} from 'utilities';

import {
  useApproveToken,
  useGetMarkets,
  useLiquidateBorrow,
  useLiquidateWithSingleRepay,
} from 'clients/api';
import {
  getComptrollerContract,
  getLiquidationProxyContract,
  getOTokenContract,
  getTokenContractByAddress,
} from 'clients/contracts/getters';
import { useWeb3 } from 'clients/web3';
import { EthLink } from 'components/EthLink';
import { NULL_ADDRESS, UINT_MAX } from 'constants/address';
import { AuthContext, AuthContextValue } from 'context/AuthContext';

import LiquidationForm from '../LiquidationForm';
import UserTokenTable from '../UserTokenTable';
import { useStyles } from './styles';

const LiquidateDetail = ({
  match: {
    params: { userId },
  },
}: {
  match: {
    params: { userId: string };
  };
}) => {
  const styles = useStyles();
  const { t } = useTranslation();

  const { account }: AuthContextValue = useContext(AuthContext);
  const web3 = useWeb3();

  const { data: { markets } = { markets: [], dailyXcnWei: undefined } } = useGetMarkets({
    placeholderData: { markets: [], dailyXcnWei: undefined },
  });

  const [isOpen, setIsOpen] = useState(false);
  const [userInfo, setUserInfo] = useState<Partial<UserInfo>>({});
  const [borrowPercent, setBorrowPercent] = useState(0);
  const [supplyInfo, setSupplyInfo] = useState<SubgraphToken>();
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const [liquidationToken, setLiquidationToken] = useState<MarketWithBorrowBalance>();
  const [liquidationTokens, setLiquidationTokens] = useState<Record<string, string[]>>({});
  const { mutateAsync: approveTokenMutation, isLoading: isApproveTokenLoading } = useApproveToken({
    token: getTokenByAddress(
      !liquidationToken || liquidationToken.underlyingAddress === NULL_ADDRESS
        ? ''
        : liquidationToken.underlyingAddress,
    ) as Token,
  });
  const {
    mutateAsync: liquidateWithSingleRepayV2Mutation,
    isLoading: isLiquidateWithSingleRepayLoading,
  } = useLiquidateWithSingleRepay();

  const { mutateAsync: liquidateBorrowMutation, isLoading: isLiquidateBorrowLoading } =
    useLiquidateBorrow({
      oTokenId:
        getTokenByAddress(
          !liquidationToken || liquidationToken.underlyingAddress === NULL_ADDRESS
            ? ''
            : liquidationToken.underlyingAddress,
        )?.id || '',
    });

  const liquidationMarkets = (userInfo?.tokens || [])
    .filter(token => token.market.underlyingDecimals > 0)
    .map(item => item.market);

  const proxy = getContractAddress('liquidationProxy');

  const getTokenPrice = (token: SubgraphToken) =>
    (markets || []).find(market => market.address === token.market.id)?.tokenPrice ||
    new BigNumber(0);

  const getLiquidationTokenAllowances = async (_markets: SubgraphMarket[]) => {
    const accountAddress = account?.address || '';
    const allowances = await Promise.all(
      _markets.map(market =>
        market.underlyingAddress === NULL_ADDRESS
          ? Promise.resolve([UINT_MAX, UINT_MAX])
          : Promise.all([
              getTokenContractByAddress(market.underlyingAddress, web3)
                .methods.allowance(accountAddress, market.id)
                .call(),
              getTokenContractByAddress(market.underlyingAddress, web3)
                .methods.allowance(accountAddress, proxy)
                .call(),
            ]),
      ),
    );

    return allowances.reduce(
      (a: Record<string, string[]>, c: string[], index: number) => ({
        ...a,
        [_markets[index].underlyingAddress]: c,
      }),
      {},
    );
  };

  const fetchUserInfo = async () => {
    const result = await getAccountSubGraph(config.chainId, userId);
    let totalCash = new BigNumber(0);
    let totalBorrow = new BigNumber(0);
    const tokens = result?.account?.tokens || [];
    tokens.map(token => {
      if (token.enteredMarket) {
        totalCash = totalCash.plus(
          new BigNumber(token.oTokenBalance)
            .times(token.market.collateralFactor)
            .times(token.market.exchangeRate)
            .times(getTokenPrice(token)),
        );
      }
      setUserInfo({
        ...(result?.account || {}),
        totalBorrow: totalBorrow.toNumber(),
      });
      totalBorrow = totalBorrow.plus(
        new BigNumber(token.storedBorrowBalance).times(getTokenPrice(token)),
      );
      return true;
    });
    const borrowPercentTemp = totalCash.gt(0)
      ? totalBorrow.div(totalCash).times(100).dp(2, 1).toNumber()
      : 0;
    setBorrowPercent(borrowPercentTemp);
  };

  useEffect(() => {
    if (liquidationToken) {
      getLiquidationTokenAllowances(liquidationMarkets)
        .then(data => setLiquidationTokens(data))
        .catch(console.log);
    }
  }, [isApproveTokenLoading, liquidationToken, userInfo?.tokens]);

  useEffect(() => {
    if (userId && markets.length !== 0) {
      fetchUserInfo();
    }
  }, [userId, markets]);

  const calcRepayAmount = (
    amount: number,
    selectedIdsTemp: number[],
  ): Promise<{ 0: string; 1: string; 2: string }> => {
    setSelectedIds(selectedIdsTemp);
    const comptrollerContract = getComptrollerContract(web3);
    if (!supplyInfo || !liquidationToken || !comptrollerContract || amount === 0) {
      return Promise.resolve(['0', '0', '0']);
    }
    return comptrollerContract.methods
      .liquidateCalculateSeizeTokensEx(
        liquidationToken.id,
        supplyInfo.market.id,
        new BigNumber(getTokenPrice(supplyInfo))
          .times(new BigNumber(10).pow(liquidationToken.underlyingDecimals))
          .times(amount)
          .div(
            (markets || []).find(
              market =>
                (market.underlyingAddress || NULL_ADDRESS) === liquidationToken.underlyingAddress,
            )?.tokenPrice || 1,
          )
          .times(1.02)
          .dp(0, 1)
          .toString(10),
      )
      .call();
  };

  const handleLiquidation = (form: { amount: number; repay: string }) => {
    const accountAddress = account?.address || '';

    if (!accountAddress) {
      return;
    }
    const { repay } = form;
    const repayToken = liquidationToken;
    const symbol =
      (markets || []).find(market => market.address === repayToken?.id)?.underlyingSymbol || '';

    const oTokenContract: any = getOTokenContract(symbol.toLowerCase(), web3);

    const lqProxy: any = getLiquidationProxyContract(web3);
    const repayTokenInfo = userInfo.tokens?.find(
      item => item.market.underlyingAddress === repayToken?.underlyingAddress,
    );

    const isProxy =
      lqProxy &&
      new BigNumber(repay).gt(
        new BigNumber(repayTokenInfo?.storedBorrowBalance ?? '0').times(
          new BigNumber(10).pow(repayTokenInfo?.market?.underlyingDecimals ?? 18),
        ),
      );

    if (
      liquidationToken &&
      !new BigNumber(liquidationTokens[liquidationToken.underlyingAddress][isProxy ? 1 : 0]).gt(
        0,
      ) &&
      liquidationToken?.underlyingAddress !== NULL_ADDRESS
    ) {
      // Approve
      approveTokenMutation({
        accountAddress,
        spenderAddress: isProxy ? lqProxy._address : liquidationToken.id,
      });
    } else if (isProxy) {
      liquidateWithSingleRepayV2Mutation({
        isNativeToken: liquidationToken?.underlyingAddress === NULL_ADDRESS,
        borrower: userInfo?.id,
        oTokenCollateralAddress: supplyInfo?.market?.id,
        oTokenRepayAddress: oTokenContract._address,
        repayAmount:
          liquidationToken?.underlyingAddress !== NULL_ADDRESS
            ? new BigNumber(repay).times(1.02).dp(0, 0).toString(10)
            : repay,
        seizeIndexes: selectedIds.sort((a, b) => b - a),
        isClaimOToken: true,
        accountAddress,
      });
    } else if (liquidateBorrowMutation) {
      liquidateBorrowMutation({
        isNativeToken: liquidationToken?.underlyingAddress === NULL_ADDRESS,
        borrower: userInfo?.id,
        oTokenCollateralAddress: supplyInfo?.market?.id,
        repayAmount: repay,
        accountAddress,
      });
    }
  };

  const handleSelectSupplyToken = (token: SubgraphToken) => {
    setSupplyInfo(token);
  };

  return (
    <div>
      <div css={styles.container}>
        <div css={styles.contentWrapper}>
          <div className="assetInfo">
            <Typography variant="h4">{t('liquidate.userAddress')}</Typography>
            <div className="address">
              {truncateAddress(userInfo?.id || '')}{' '}
              {userInfo?.id && <EthLink css={styles.ethScanLinkContainer} hash={userInfo.id} />}
            </div>
            <div className="infoDetail">
              <Typography variant="h6">{t('liquidate.tokenList')}</Typography>
              {(userInfo?.tokens || []).length > 0 && (
                <table cellPadding={0} cellSpacing={0}>
                  <thead>
                    <tr>
                      <th>Market</th>
                      <th>Supply</th>
                      <th>Borrow</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(userInfo?.tokens || []).map(token => (
                      <UserTokenTable
                        key={token.id}
                        token={token}
                        markets={markets || []}
                        selectedToken={supplyInfo}
                        onSelectSupplyToken={handleSelectSupplyToken}
                      />
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
          {borrowPercent >= 100 && (
            <div
              css={[styles.liquidityForm, isOpen ? styles.liquidityModal : '']}
              onMouseDown={() => setIsOpen(false)}
            >
              <LiquidationForm
                isLoading={
                  isApproveTokenLoading ||
                  isLiquidateWithSingleRepayLoading ||
                  isLiquidateBorrowLoading
                }
                current={liquidationToken}
                availables={liquidationMarkets
                  .filter(item => {
                    const tokenInfo = (userInfo?.tokens || []).find(
                      token => token.market.id === item.id,
                    );
                    if (!new BigNumber(tokenInfo?.storedBorrowBalance || 0).isZero()) {
                      return true;
                    }
                    return false;
                  })
                  .map(item => ({
                    ...item,
                    storedBorrowBalance: (userInfo?.tokens || []).find(
                      token => item.id === token.market.id,
                    )?.storedBorrowBalance,
                  }))}
                onChange={setLiquidationToken}
                token={supplyInfo || {}}
                markets={markets}
                allowed={liquidationTokens[liquidationToken?.underlyingAddress ?? ''] || [0, 0]}
                onSubmit={handleLiquidation}
                onClose={() => setIsOpen(false)}
                onAmount={calcRepayAmount}
                userId={userInfo?.id}
              />
            </div>
          )}
        </div>
        {borrowPercent >= 100 && (
          <section css={styles.liquidityManage}>
            <div>Liquidate</div>
            <Button onClick={() => setIsOpen(true)}>Manage</Button>
          </section>
        )}
      </div>
    </div>
  );
};

export default LiquidateDetail;
