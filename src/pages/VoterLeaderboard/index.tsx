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

      {total && total > (limit || 100) && (
        <Pagination
          itemsCount={total}
          onChange={(nextIndex: number) => {
            setCurrentPage(nextIndex + 1); // Convert 0-based index to 1-based page
            window.scrollTo(0, 0);
          }}
          itemsPerPageCount={limit}
          initialPageIndex={page - 1} // Convert 1-based page to 0-based index
        />
      )}
    </div>
  );
};

const VoterLeaderboard = () => {
  const [currentPage, setCurrentPage] = useState(1); // Start from 1 for proper pagination
  const {
    data: { voterAccounts, page, total, limit, totalStake } = {
      voterAccounts: [],
      page: 1,
      total: 0,
      limit: 100,
      totalStake: '',
    },
    isFetching,
  } = useGetVoterAccounts({ page: currentPage - 1 }); // Convert to 0-based for API

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
