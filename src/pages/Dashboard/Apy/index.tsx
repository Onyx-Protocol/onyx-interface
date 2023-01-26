/** @jsxImportSource @emotion/react */
import { BigNumber } from 'bignumber.js';
import React from 'react';
import { Asset } from 'types';

import { SAFE_BORROW_LIMIT_PERCENTAGE } from 'constants/safeBorrowLimitPercentage';
import useDailyXcnDistributionInterests from 'hooks/useDailyXcnDistributionInterests';

import ApyUi, { ApyUiProps } from './ApyUi';

interface ApyProps {
  className?: string;
  assets: Asset[];
  userTotalBorrowLimitCents: BigNumber;
  userTotalBorrowBalanceCents: BigNumber;
}

const Apy: React.FC<ApyProps> = ({
  className,
  assets,
  userTotalBorrowLimitCents,
  userTotalBorrowBalanceCents,
}) => {
  // TODO: handle loading state
  const { dailyXcnDistributionInterestsCents } = useDailyXcnDistributionInterests();

  const calculations: Pick<ApyUiProps, 'borrowLimitCents'> = React.useMemo(
    () => ({ borrowLimitCents: userTotalBorrowLimitCents.toNumber() }),
    [JSON.stringify(assets), dailyXcnDistributionInterestsCents],
  );

  return (
    <ApyUi
      className={className}
      safeBorrowLimitPercentage={SAFE_BORROW_LIMIT_PERCENTAGE}
      borrowBalanceCents={+userTotalBorrowBalanceCents.toFixed()}
      {...calculations}
    />
  );
};

export default Apy;
