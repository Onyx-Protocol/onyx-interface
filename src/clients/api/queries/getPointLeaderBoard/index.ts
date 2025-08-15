import config from 'config';
import { GetLeaderBoardPayload, Leaderboard } from 'types';

import getLeaderboardSubsquid from 'utilities/getLeaderboardSubsquid';

export const getLeaderBoard = async ({ page, limit }: GetLeaderBoardPayload) => {
  try {
    const response = await fetch(
      `${config.apiPointUrl}/passive-points/leaderboard?page=${page}&limit=${limit}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );
    const data = await response.json();

    return {
      data: data.data.results as Leaderboard[],
      totalPage: data.data.meta.totalPages,
      page: data.data.meta.page,
      limit: data.data.meta.limit,
      total: data.data.meta.total,
    };
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    return {
      data: [],
      totalPage: 0,
      page: 1,
      limit: 10,
      total: 0,
    };
  }
};

export const getSquidLeaderboard = async ({ page, limit }: GetLeaderBoardPayload) => {
  try {
    const data = await getLeaderboardSubsquid(config.chainId, { page, limit });
    console.log('data', data);
    return {
      data: data.results as Leaderboard[],
      totalPage: data.meta.totalPages,
      page: data.meta.page,
      limit: data.meta.limit,
      total: data.meta.total,
    };
  } catch (error) {
    console.error('Error fetching squid leaderboard:', error);
    return {
      data: [],
      totalPage: 0,
      page: 1,
      limit: 10,
      total: 0,
    };
  }
};
