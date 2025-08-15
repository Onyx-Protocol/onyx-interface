import { EthChainId } from 'types';

import { SUBSQUID_LINKS } from 'constants/endpoints';

interface PointsInfoResponse {
  weight: number;
  pointsPerDay: number;
}

const getPointsInfoSubsquid = (network: EthChainId): Promise<PointsInfoResponse> => {
  if (!SUBSQUID_LINKS[network]) {
    return Promise.resolve({
      weight: 0,
      pointsPerDay: 0,
    });
  }

  return new Promise(resolve =>
    fetch(SUBSQUID_LINKS[network], {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query pointSettingsQuery {
            pointSettings(orderBy: ethStartBlock_DESC, limit: 1) {
              weight:ethWeight
              pointsPerDay
            }
          }
        `,
      }),
    })
      .then(response => response.json())
      .then(({ data: { pointSettings } }) => resolve(pointSettings?.[0] ?? {}))
      .catch(error => {
        console.error('Error fetching points info from subsquid:', error);
        resolve({
          weight: 0,
          pointsPerDay: 0,
        });
      }),
  );
};

export default getPointsInfoSubsquid;
