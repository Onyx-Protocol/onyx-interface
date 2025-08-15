import { EthChainId } from 'types';

import { GetUserInfoInput } from 'clients/api/queries/getUserInfo';
import { GetUserInfoResponse } from 'clients/api/queries/getUserInfo/types';
import { SUBSQUID_LINKS } from 'constants/endpoints';

const getUserPointsSubsquid = (
  network: EthChainId,
  input: GetUserInfoInput,
): Promise<GetUserInfoResponse> => {
  if (!SUBSQUID_LINKS[network]) {
    return Promise.resolve({ points: 0, address: input.address, id: input.address });
  }
  return new Promise(resolve =>
    fetch(SUBSQUID_LINKS[network], {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query userPointsQuery {
            user:userById(id: "${input.address}") {
              id
              address:id
              points
            }
          }
        `,
      }),
    })
      .then(response => response.json())
      .then(({ data: { user } }) => resolve(user)),
  );
};

export default getUserPointsSubsquid;
