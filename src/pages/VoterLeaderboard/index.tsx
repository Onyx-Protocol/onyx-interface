/** @jsxImportSource @emotion/react */
import { Pagination } from 'components';
import React, { useState } from 'react';
import { VoterAccount } from 'types';

import { useGetVoterAccounts } from 'clients/api';

import LeaderboardTable from './LeaderboardTable';
import { useStyles } from './styles';

interface VoterLeaderboardProps {
  voterAccounts: VoterAccount[];
  page: number;
  total: number | undefined;
  limit: number | undefined;
  totalStake: string;
  isFetching: boolean;
  setCurrentPage: (page: number) => void;
}

export const VoterLeaderboardUi: React.FC<VoterLeaderboardProps> = ({
  voterAccounts,
  page,
  total,
  limit,
  totalStake,
  isFetching,
  setCurrentPage,
}) => {
  const styles = useStyles();

  return (
    <div css={styles.root}>
      <LeaderboardTable
        voterAccounts={voterAccounts}
        offset={(page - 1) * (limit || 100)}
        totalStake={totalStake}
        isFetching={isFetching}
      />

      {total && (
        <Pagination
          itemsCount={total}
          onChange={(nextIndex: number) => {
            setCurrentPage(nextIndex);
            window.scrollTo(0, 0);
          }}
          itemsPerPageCount={limit}
        />
      )}
    </div>
  );
};

const VoterLeaderboard = () => {
  const [currentPage, setCurrentPage] = useState(0); // Start from 0 for Pagination component
  const {
    data: { voterAccounts, page, total, limit, totalStake } = {
      voterAccounts: [],
      page: 1,
      total: 0,
      limit: 100,
      totalStake: '',
    },
    isFetching,
  } = useGetVoterAccounts({ page: currentPage });

  return (
    <VoterLeaderboardUi
      voterAccounts={voterAccounts}
      page={page}
      total={total}
      limit={limit}
      totalStake={totalStake}
      isFetching={isFetching}
      setCurrentPage={setCurrentPage}
    />
  );
};

export default VoterLeaderboard;
