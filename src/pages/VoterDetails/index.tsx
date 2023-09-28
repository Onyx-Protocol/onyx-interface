/** @jsxImportSource @emotion/react */
import BigNumber from 'bignumber.js';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { VoterHistory } from 'types';

import {
  useGetCurrentVotes,
  useGetProposalVotes,
  useGetTokenBalances,
  useGetVoterHistory,
} from 'clients/api';
import { MAINNET_TOKENS } from 'constants/tokens';

import History from './History';
import Holding from './Holding';
// import Transactions from './Transactions';
import { useStyles } from './styles';

interface VoterDetailsUiProps {
  balanceWei: BigNumber | undefined;
  delegateCount: number | undefined;
  votesWei: BigNumber | undefined;
  address: string;
  voterHistory: VoterHistory[] | undefined;
  setCurrentHistoryPage: (page: number) => void;
  total: number;
  limit: number;
  isHistoryFetching: boolean;
}

export const VoterDetailsUi: React.FC<VoterDetailsUiProps> = ({
  balanceWei,
  delegateCount,
  votesWei,
  voterHistory,
  setCurrentHistoryPage,
  total,
  limit,
  isHistoryFetching,
}) => {
  const styles = useStyles();
  return (
    <div css={styles.root}>
      <div css={styles.top}>
        <Holding
          css={styles.topRowLeft}
          balanceWei={balanceWei}
          delegateCount={delegateCount}
          votesWei={votesWei}
          // delegating={delegating}
        />
        {/* <Transactions
          css={styles.topRowRight}
          address={address}
          voterTransactions={voterTransactions}
        /> */}
      </div>
      <History
        total={total}
        voterHistory={voterHistory}
        setCurrentPage={setCurrentHistoryPage}
        limit={limit}
        isFetching={isHistoryFetching}
      />
    </div>
  );
};

const VoterDetails = () => {
  const [currentHistoryPage, setCurrentHistoryPage] = useState(0);
  const { address } = useParams<{ address: string }>();
  const {
    data: { voterHistory, total, limit } = { voterHistory: [], total: 0, limit: 16 },
    isFetching,
  } = useGetVoterHistory({ address, page: currentHistoryPage });
  const { data } = useGetTokenBalances({
    accountAddress: address,
    tokens: [MAINNET_TOKENS.xcn],
  });
  const { data: currentVotesData } = useGetCurrentVotes({ accountAddress: address || '' });
  const { data: votesData } = useGetProposalVotes({ address });

  return (
    <VoterDetailsUi
      balanceWei={data?.tokenBalances[0].balanceWei ?? new BigNumber(0)}
      delegateCount={votesData?.total}
      voterHistory={voterHistory}
      votesWei={currentVotesData?.votesWei ?? new BigNumber(0)}
      address={address}
      setCurrentHistoryPage={setCurrentHistoryPage}
      total={total}
      limit={limit}
      isHistoryFetching={isFetching}
    />
  );
};

export default VoterDetails;
