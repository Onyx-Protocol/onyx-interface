import BigNumber from 'bignumber.js';
import React from 'react';
import { Token } from 'types';
import {
  convertPercentageFromSmartContract,
  convertWeiToTokens,
  unsafelyGetToken,
  unsafelyGetOToken,
} from 'utilities';

import { useGetMarkets, useGetOTokenCash } from 'clients/api';
import { BLOCKS_PER_DAY } from 'constants/ethereum';
import { COMPOUND_MANTISSA } from 'constants/compoundMantissa';
import { TOKENS } from 'constants/tokens';

const useGetMarketData = ({ oTokenId }: { oTokenId: Token['id'] }) => {
  const { data: oTokenCashData } = useGetOTokenCash({
    oTokenId,
  });

  const { data: getMarketData } = useGetMarkets();
  const assetMarket = (getMarketData?.markets || []).find(market => market.id === oTokenId);

  return React.useMemo(() => {
    const token = unsafelyGetToken(oTokenId);
    const oToken = unsafelyGetOToken(oTokenId);
    const totalBorrowBalanceCents = assetMarket && +assetMarket.totalBorrowsUsd * 100;
    const totalSupplyBalanceCents = assetMarket && +assetMarket.totalSupplyUsd * 100;
    const borrowApyPercentage = assetMarket?.borrowApy;
    const supplyApyPercentage = assetMarket?.supplyApy;
    const borrowDistributionApyPercentage = assetMarket && +assetMarket.borrowXcnApy;
    const supplyDistributionApyPercentage = assetMarket && +assetMarket.supplyXcnApy;
    const tokenPriceDollars = assetMarket?.tokenPrice;
    const liquidityCents = assetMarket && new BigNumber(assetMarket.liquidity).multipliedBy(100);
    const supplierCount = assetMarket?.supplierCount;
    const borrowerCount = assetMarket?.borrowerCount;
    const borrowCapTokens = assetMarket && new BigNumber(assetMarket.borrowCap);
    const supplyCapTokens = assetMarket && new BigNumber(assetMarket.supplyCap);
    const mintedTokens = assetMarket && new BigNumber(assetMarket.totalSupply2);
    const reserveFactorMantissa = assetMarket && new BigNumber(assetMarket.reserveFactor);

    const dailyDistributionXcn =
      assetMarket &&
      convertWeiToTokens({
        valueWei: new BigNumber(assetMarket.supplierDailyXcn).plus(
          assetMarket.borrowerDailyXcn,
        ),
        token: TOKENS.xcn,
      });

    const formattedSupplyRatePerBlock =
      assetMarket &&
      new BigNumber(assetMarket.supplyRatePerBlock).dividedBy(COMPOUND_MANTISSA).toNumber();

    const formattedBorrowRatePerBlock =
      assetMarket &&
      new BigNumber(assetMarket.borrowRatePerBlock).dividedBy(COMPOUND_MANTISSA).toNumber();

    // Calculate daily interests for suppliers and borrowers. Note that we don't
    // use BigNumber to calculate these values, as this would slow down
    // calculation a lot while the end result doesn't need to be extremely
    // precise
    const dailySupplyingInterestsCents =
      assetMarket &&
      formattedSupplyRatePerBlock &&
      // prettier-ignore
      +assetMarket.totalSupplyUsd * (((1 + formattedSupplyRatePerBlock) ** BLOCKS_PER_DAY) - 1) *
      // Convert to cents
      100;

    const dailyBorrowingInterestsCents =
      assetMarket &&
      formattedBorrowRatePerBlock &&
      // prettier-ignore
      +assetMarket.totalBorrowsUsd * (((1 + formattedBorrowRatePerBlock) ** BLOCKS_PER_DAY) - 1)
        // Convert to cents
        * 100;

    const reserveFactor =
      assetMarket && convertPercentageFromSmartContract(assetMarket.reserveFactor);

    const collateralFactor =
      assetMarket && convertPercentageFromSmartContract(assetMarket.collateralFactor);

    const reserveTokens =
      assetMarket &&
      convertWeiToTokens({
        valueWei: new BigNumber(assetMarket.totalReserves),
        token,
      });

    const exchangeRateOTokens =
      assetMarket &&
      new BigNumber(1).div(
        new BigNumber(assetMarket.exchangeRate).div(
          new BigNumber(10).pow(18 + token.decimals - oToken.decimals),
        ),
      );

    let currentUtilizationRate: number | undefined;
    if (oTokenCashData?.cashWei && assetMarket && reserveTokens) {
      const oTokenCashTokens = convertWeiToTokens({
        valueWei: oTokenCashData.cashWei,
        token,
      });

      currentUtilizationRate = new BigNumber(assetMarket.totalBorrows2)
        .div(oTokenCashTokens.plus(assetMarket.totalBorrows2).minus(reserveTokens))
        .multipliedBy(100)
        .dp(0)
        .toNumber();
    }

    return {
      totalBorrowBalanceCents,
      totalSupplyBalanceCents,
      borrowApyPercentage,
      supplyApyPercentage,
      borrowDistributionApyPercentage,
      supplyDistributionApyPercentage,
      tokenPriceDollars,
      liquidityCents,
      supplierCount,
      borrowerCount,
      borrowCapTokens,
      supplyCapTokens,
      mintedTokens,
      dailyDistributionXcn,
      dailySupplyingInterestsCents,
      dailyBorrowingInterestsCents,
      reserveFactor,
      collateralFactor,
      reserveTokens,
      exchangeRateOTokens,
      currentUtilizationRate,
      reserveFactorMantissa,
    };
  }, [JSON.stringify(assetMarket), oTokenCashData?.cashWei.toFixed()]);
};

export default useGetMarketData;
