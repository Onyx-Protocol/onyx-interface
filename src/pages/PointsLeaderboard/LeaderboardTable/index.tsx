/** @jsxImportSource @emotion/react */
import { Box, Tooltip } from '@mui/material';
import { Pagination, Table, TableProps } from 'components';
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'translation';
import { Leaderboard } from 'types';

import useGetLeaderBoard from 'clients/api/queries/getPointLeaderBoard/useGetLeaderBoard';
import { formatPoint } from 'utilities/formatPoints';

import { UserInfo } from '../UserInfo';
import { useStyles } from './styles';

export type LeaderboardItem = Leaderboard & {
  index: number;
  prevRank: number;
  rank: number;
};

export interface LeaderboardTableProps {
  leaderboardItems: LeaderboardItem[];
  isFetching: boolean;
  useRankIcon: boolean;
}

export const LeaderboardTableUi: React.FC<LeaderboardTableProps> = ({
  leaderboardItems,
  isFetching,
  useRankIcon,
}) => {
  const { t, i18n } = useTranslation();
  const styles = useStyles();

  const columns = useMemo(
    () => [
      { key: 'index', label: '#', orderable: true, align: 'left' },
      { key: 'address', label: t('point.columns.userAddress'), orderable: true, align: 'left' },
      { key: 'totalPoints', label: t('point.columns.totalPoint'), orderable: true, align: 'left' },
    ],
    [i18n.language],
  );

  // Format transactions to rows
  const rows: TableProps['data'] = useMemo(
    () =>
      leaderboardItems.map(leaderboardItem => [
        {
          key: 'type',
          render: () => <>{leaderboardItem.index}</>,
          value: leaderboardItem.index,
          align: 'left',
        },
        {
          key: 'address',
          render: () => {
            const isGold = leaderboardItem.index === 1;
            const isSilver = leaderboardItem.index === 2;
            const isBronze = leaderboardItem.index === 3;

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

            return (
              <UserInfo userAddress={leaderboardItem.address} icon={useRankIcon ? icon : ''} />
            );
          },
          value: leaderboardItem.address,
          align: 'left',
        },
        {
          key: 'totalPoints',
          render: () => (
            <Tooltip
              title={formatPoint(+leaderboardItem.points)}
              placement="right"
              arrow
              // css={styles.tooltip}
            >
              <span>{formatPoint(+leaderboardItem.points, 2)}</span>
            </Tooltip>
          ),
          value: leaderboardItem.points,
          align: 'left',
        },
      ]),
    [JSON.stringify(leaderboardItems), i18n.language],
  );

  return (
    <Table
      columns={columns}
      cardColumns={columns}
      data={rows}
      // initialOrder={{
      //   orderBy: 'created',
      //   orderDirection: 'desc',
      // }}
      rowKeyIndex={0}
      tableCss={styles.table}
      cardsCss={styles.cards}
      css={styles.cardContentGrid}
      isFetching={isFetching}
    />
  );
};

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
  const [totalCount, setTotalCount] = useState(0);
  const { data: leaderboardResponse = { data: [], totalPage: 0, page: 0, total: 0 }, isLoading } =
    useGetLeaderBoard({ page: currentPage, limit });

  const { data, page, total } = leaderboardResponse;
  const [leaderboard, setLeaderboard] = useState<LeaderboardItem[]>([]);

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
    if (total && total > 0) {
      setTotalCount(total);
    }
  }, [data, limit, page, total]);

  return (
    <Box css={styles.root}>
      <LeaderboardTableUi
        leaderboardItems={leaderboard}
        isFetching={isLoading}
        useRankIcon={useRankIcon}
      />
      {totalCount && isPaginated ? (
        <Pagination
          itemsCount={totalCount}
          onChange={(nextIndex: number) => {
            setCurrentPage(nextIndex + 1);
            window.scrollTo(0, 0);
          }}
          itemsPerPageCount={limit || 20}
        />
      ) : null}
    </Box>
  );
};

export default LeaderboardTable;
