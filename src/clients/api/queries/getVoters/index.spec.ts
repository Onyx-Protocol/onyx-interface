import config from 'config';
import { enableFetchMocks } from 'jest-fetch-mock';

import votersResponse from '__mocks__/api/voters.json';
import { SUBGRAPH_LINKS } from 'constants/endpoints';

import getVoters from '.';

enableFetchMocks();

describe('api/queries/getVoters', () => {
  test('returns proposal', async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({
        status: 200,
        data: {
          proposalVotes: votersResponse,
        },
      }),
    );

    const response = await getVoters({
      id: '1',
    });

    expect(fetchMock).toBeCalledWith(SUBGRAPH_LINKS[config.chainId].latest, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query proposalVotesQuery {
            proposalVotes(
              ${''},
              where: { proposal: "1" ${''} }
            ) {
              id
              proposal
              address
              support
              votes
              blockNumber
              blockTimestamp
              transactionHash
            }
          }
        `,
      }),
    });

    expect(response).toMatchSnapshot();
  });
});
