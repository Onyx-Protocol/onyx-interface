import config from 'config';
import { enableFetchMocks } from 'jest-fetch-mock';

import proposalResponse from '__mocks__/api/proposals.json';
import { SUBGRAPH_LINKS } from 'constants/endpoints';

import getProposal from './getProposal';

enableFetchMocks();

describe('api/queries/getProposal', () => {
  test('returns proposal', async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({
        status: 200,
        data: {
          proposals: [proposalResponse[0]],
          proposalCounts: [{ count: 1 }],
        },
      }),
    );

    const response = await getProposal({
      id: 1,
    });

    expect(fetchMock).toBeCalledWith(SUBGRAPH_LINKS[config.chainId].latest, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query proposalsQuery {
            proposals(
              first: 5,
              skip: 0,
              orderBy: createdBlockTimestamp,
              orderDirection: desc
              where: { id: "1" }
            ) {
              id
              proposer
              targets
              values
              signatures
              callDatas
              startBlock
              endBlock
              description
              state
              eta
              forVotes
              againstVotes
              createdBlockNumber
              createdBlockTimestamp
              createdTransactionHash
              queuedBlockNumber
              queuedBlockTimestamp
              queuedTransactionHash
              executedBlockNumber
              executedBlockTimestamp
              executedTransactionHash
              canceledBlockNumber
              canceledBlockTimestamp
              canceledTransactionHash
            }
            
            proposalCounts(where: { id: "0" }) { count }
          }
        `,
      }),
    });

    expect(response).toMatchSnapshot();
  });
});
