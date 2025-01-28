/** @jsxImportSource @emotion/react */
import BigNumber from 'bignumber.js';
import React, { useContext } from 'react';

import {
  useGetBalanceOf,
  useGetStakingApy,
  useGetStakingInfos,
  useGetTreasuryTotals,
} from 'clients/api';
import { TOKENS } from 'constants/tokens';
import { AuthContext } from 'context/AuthContext';

import FarmItem from './FarmItem';
import { useStyles } from './styles';

const FarmPage: React.FC = () => {
  const styles = useStyles();

  const { account } = useContext(AuthContext);

  const { data: xcnBalance } = useGetBalanceOf({
    token: TOKENS.xcn,
    accountAddress: account?.address || '',
  });

  const { data: stakingInfo } = useGetStakingInfos({ accountAddress: account?.address || '' });
  const { data: stakingApy } = useGetStakingApy();

  const {
    data: { treasuryTotalBalanceCents },
  } = useGetTreasuryTotals();

  return (
    <div css={styles.container}>
      <FarmItem
        xcnBalance={xcnBalance?.balanceWei || new BigNumber(0)}
        apy={stakingApy?.apy.toNumber() || 0}
        totalStaked={stakingInfo?.totalStaked || new BigNumber(0)}
        rewardPerBlock={stakingInfo?.rewardPerBlock || new BigNumber(0)}
        staked={stakingInfo?.staked || new BigNumber(0)}
        earned={stakingInfo?.earned || new BigNumber(0)}
        tresury={treasuryTotalBalanceCents || new BigNumber(0)}
      />
    </div>
  );
};

export default FarmPage;
