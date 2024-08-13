import BigNumber from 'bignumber.js';
import { useMemo } from 'react';
import { Market } from 'types';

import { useGetMarkets } from 'clients/api';

export interface Data {
  treasuryTotalSupplyBalanceCents: BigNumber;
  treasuryTotalBorrowBalanceCents: BigNumber;
  treasuryTotalBalanceCents: BigNumber;
  treasuryTotalAvailableLiquidityBalanceCents: BigNumber;
}

export interface UseGetTreasuryTotalsOutput {
  isLoading: boolean;
  data: Data;
}

const useGetTreasuryTotals = (): UseGetTreasuryTotalsOutput => {
  const {
    data: getMarketsData = {
      markets: [] as Market[],
      reserves: BigNumber,
    },
    isLoading: isGetMarketsLoading,
  } = useGetMarkets({
    placeholderData: {
      markets: [],
      dailyXcnWei: new BigNumber(0),
      reserves: new BigNumber(0),
    },
  });

  const { markets, reserves } = getMarketsData;
  const treasuryTotalBalanceCents = BigNumber.isBigNumber(reserves) ? reserves : new BigNumber(0);
  const {
    treasuryTotalSupplyBalanceCents,
    treasuryTotalBorrowBalanceCents,
    // treasuryTotalBalanceCents,
    treasuryTotalAvailableLiquidityBalanceCents,
  } = useMemo(() => {
    const data = markets.reduce(
      (acc, curr) => {
        // acc.treasuryTotalBalanceCents = acc.treasuryTotalBalanceCents.plus(
        //   new BigNumber(0)
        // );

        acc.treasuryTotalSupplyBalanceCents = acc.treasuryTotalSupplyBalanceCents.plus(
          curr.treasuryTotalSupplyCents,
        );

        acc.treasuryTotalBorrowBalanceCents = acc.treasuryTotalBorrowBalanceCents.plus(
          curr.treasuryTotalBorrowsCents,
        );

        acc.treasuryTotalAvailableLiquidityBalanceCents =
          acc.treasuryTotalAvailableLiquidityBalanceCents.plus(curr.liquidity.times(100));

        return acc;
      },
      {
        treasuryTotalSupplyBalanceCents: new BigNumber(0),
        treasuryTotalBorrowBalanceCents: new BigNumber(0),
        // treasuryTotalBalanceCents: new BigNumber(0),
        treasuryTotalAvailableLiquidityBalanceCents: new BigNumber(0),
      },
    );
    return data;
  }, [markets]);

  return {
    data: {
      treasuryTotalSupplyBalanceCents,
      treasuryTotalBorrowBalanceCents,
      treasuryTotalBalanceCents,
      treasuryTotalAvailableLiquidityBalanceCents,
    },
    isLoading: isGetMarketsLoading,
  };
};

export default useGetTreasuryTotals;
