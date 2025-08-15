import { EthChainId, GetLeaderBoardPayload } from 'types';

import { SUBSQUID_LINKS } from 'constants/endpoints';

interface LeaderboardResponse {
  meta: {
    limit: number;
    total: number;
    totalPages: number;
    page: number;
  };
  results: {
    id: string;
    address: string;
    points: number;
  }[];
}

const getLeaderboardSubsquid = (
  network: EthChainId,
  input: GetLeaderBoardPayload,
): Promise<LeaderboardResponse> => {
  if (!SUBSQUID_LINKS[network]) {
    return Promise.resolve({
      meta: { limit: 0, total: 0, totalPages: 1, page: 1 },
      results: [],
    });
  }

  const { page = 1, limit = 10 } = input;
  const offset = (page - 1) * limit;

  return new Promise(resolve =>
    fetch(SUBSQUID_LINKS[network], {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query LeaderboardQuery {
            leaderboard(orderBy: points_DESC, limit: ${limit}, offset: ${offset}) {
              meta {
                limit
                total
                totalPages
                page
              }
              results {
                id
                address: id
                points
              }
            }
          }
        `,
      }),
    })
      .then(response => response.json())
      .then(({ data: { leaderboard } }) => resolve(leaderboard)),
  );
};

export default getLeaderboardSubsquid;
