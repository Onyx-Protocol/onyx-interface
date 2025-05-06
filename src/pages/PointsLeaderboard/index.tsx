/** @jsxImportSource @emotion/react */
// import { formatPoint } from '@/utils/format';
import { css } from '@emotion/react';
import { Box, Tooltip } from '@mui/material';
import { ColumnDef } from '@tanstack/react-table';
import React, { useEffect, useMemo, useState } from 'react';
import { Leaderboard } from 'types';

import useGetLeaderBoard from 'clients/api/queries/getPointLeaderBoard/useGetLeaderBoard';
import { formatPoint } from 'utilities/formatPoints';

// import { DataTable } from '../../components/commons/animated-streaming-table';
// import { UserInfo } from '../../components/commons/user-info';
import { DataTable } from './LeaderboardTable/LeaderboardTable';
import { UserInfo } from './UserInfo';
import { useStyles } from './styles';

interface Props {
  useRankIcon?: boolean;
  isPaginated?: boolean;
  limit?: number;
}

export const LeaderboardTable: React.FC<Props> = ({
  useRankIcon = false,
  isPaginated = true,
  limit = 10,
}: Props) => {
  const styles = useStyles();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const { data: leaderboardResponse = { data: [], totalPage: 0, page: 0 }, isLoading } =
    useGetLeaderBoard({ page: currentPage, limit });

  const { data, totalPage: responseTotalPage, page } = leaderboardResponse;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  useEffect(() => {
    if (responseTotalPage) {
      setTotalPage(responseTotalPage);
    }
  }, [responseTotalPage]);

  useEffect(() => {
    if (data && page) {
      const newLeaderboard = data.map((item, index) => ({
        ...item,
        index: (page - 1) * limit + index + 1,
        rank: index,
        prevRank: leaderboard.find(d => d.address === item.address)?.rank ?? 10,
      }));

      setLeaderboard(newLeaderboard);
    }
  }, [data, limit, page]);

  const columns = useMemo<ColumnDef<Leaderboard>[]>(
    () => [
      {
        accessorKey: 'index',
        header: '#',
      },
      {
        accessorKey: 'address',
        header: 'User Address',
        cell: ({ row }) => {
          const isGold = row.index === 0 && currentPage === 1;
          const isSilver = row.index === 1 && currentPage === 1;
          const isBronze = row.index === 2 && currentPage === 1;

          let icon = null;
          if (isBronze) {
            // eslint-disable-next-line react/react-in-jsx-scope
            icon = <img src="/bronze-medal.svg" width={20} height={20} alt="bronze" />;
          } else if (isSilver) {
            // eslint-disable-next-line react/react-in-jsx-scope
            icon = <img src="/silver-medal.svg" width={20} height={20} alt="silver" />;
          } else if (isGold) {
            // eslint-disable-next-line react/react-in-jsx-scope
            icon = <img src="/gold-medal.svg" width={20} height={20} alt="gold" />;
          }

          return <UserInfo userAddress={row.original.address} icon={useRankIcon ? icon : null} />;
        },
      },
      {
        accessorKey: 'totalPoints',
        header: 'Total Points',
        cell: ({ row }) => (
          <Tooltip
            title={formatPoint(+row.original.points)}
            placement="right"
            arrow
            css={styles.tooltip}
          >
            <span>{formatPoint(+row.original.points, 2)}</span>
          </Tooltip>
        ),
      },
    ],
    [useRankIcon, currentPage, styles.userContainer],
  );

  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <DataTable
      columns={columns}
      data={leaderboard}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      totalPage={totalPage}
      isPaginated={isPaginated}
      isLoading={isLoading}
      loadingNumber={limit}
      cellClasses={[
        css`
          width: 10%;
          padding: 8px;
        `,
        css`
          width: 50%;
          padding: 8px;
        `,
        css`
          width: auto;
          padding: 8px;
        `,
      ]}
    />
  );
};

const PointsLeaderboardPage: React.FC = () => (
  <Box>
    <LeaderboardTable useRankIcon />
  </Box>
);

export default PointsLeaderboardPage;
