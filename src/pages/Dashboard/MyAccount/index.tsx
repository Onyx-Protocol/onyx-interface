/** @jsxImportSource @emotion/react */
import { BigNumber } from 'bignumber.js';
import React from 'react';
import { Asset } from 'types';
import {
  calculateDailyEarningsCents,
  calculateNetApy,
  calculateYearlyEarningsForAssets,
} from 'utilities';

import { SAFE_BORROW_LIMIT_PERCENTAGE } from 'constants/safeBorrowLimitPercentage';
import useDailyXcnDistributionInterests from 'hooks/useDailyXcnDistributionInterests';

import MyAccountUi, { MyAccountUiProps } from './MyAccountUi';

interface MyAccountProps {
  className?: string;
  isXcnEnabled: boolean;
  setIsXcnEnabled: (value: boolean) => void;
  assets: Asset[];
  userTotalBorrowLimitCents: BigNumber;
  userTotalBorrowBalanceCents: BigNumber;
  userTotalSupplyBalanceCents: BigNumber;
}

const MyAccount: React.FC<MyAccountProps> = ({
  className,
  assets,
  isXcnEnabled,
  setIsXcnEnabled,
  userTotalBorrowLimitCents,
  userTotalBorrowBalanceCents,
  userTotalSupplyBalanceCents,
}) => {
  // TODO: handle loading state
  const { dailyXcnDistributionInterestsCents } = useDailyXcnDistributionInterests();

  const calculations: Pick<
    MyAccountUiProps,
    'netApyPercentage' | 'dailyEarningsCents' | 'supplyBalanceCents' | 'borrowLimitCents'
  > = React.useMemo(() => {
    const yearlyEarningsCents =
      dailyXcnDistributionInterestsCents &&
      calculateYearlyEarningsForAssets({
        assets,
        isXcnEnabled,
        dailyXcnDistributionInterestsCents,
      });
    const netApyPercentage =
      userTotalSupplyBalanceCents &&
      yearlyEarningsCents &&
      calculateNetApy({
        supplyBalanceCents: userTotalSupplyBalanceCents,
        yearlyEarningsCents,
      });
    const dailyEarningsCents =
      yearlyEarningsCents && +calculateDailyEarningsCents(yearlyEarningsCents).toFixed(0);
    return {
      netApyPercentage,
      dailyEarningsCents,
      supplyBalanceCents: userTotalSupplyBalanceCents?.toNumber(),
      borrowLimitCents: userTotalBorrowLimitCents.toNumber(),
    };
  }, [JSON.stringify(assets), isXcnEnabled, dailyXcnDistributionInterestsCents]);

  return (
    <MyAccountUi
      className={className}
      safeBorrowLimitPercentage={SAFE_BORROW_LIMIT_PERCENTAGE}
      isXcnEnabled={isXcnEnabled}
      onXcnToggle={setIsXcnEnabled}
      borrowBalanceCents={+userTotalBorrowBalanceCents.toFixed()}
      {...calculations}
    />
  );
};

export default MyAccount;
