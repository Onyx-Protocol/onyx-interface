import config from 'config';
import { enableFetchMocks } from 'jest-fetch-mock';

import proposalResponse from '__mocks__/api/proposals.json';
import { SUBGRAPH_LINKS } from 'constants/endpoints';

import getProposals from '.';

enableFetchMocks();

describe('api/queries/getProposals', () => {
  test('returns formatted proposals', async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({
        status: 200,
        data: {
          proposals: proposalResponse,
          proposalCounts: [{ count: proposalResponse.length }],
        },
      }),
    );

    const response = await getProposals({
      limit: 10,
      page: 2,
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
              first: 10,
              skip: 20,
              orderBy: createdBlockTimestamp,
              orderDirection: desc
              ${''}
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

  test('Gets called with correct default arguments', async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({
        status: 200,
        data: {
          proposals: proposalResponse,
          proposalCounts: [{ count: proposalResponse.length }],
        },
      }),
    );

    const response = await getProposals({});

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
              ${''}
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
