import config from 'config';
import { VError } from 'errors';
import { enableFetchMocks } from 'jest-fetch-mock';

import voterHistoryResponse from '__mocks__/api/voterHistory.json';
import fakeAddress from '__mocks__/models/address';
import { SUBGRAPH_LINKS } from 'constants/endpoints';

import getVoterHistory from '.';

enableFetchMocks();

describe('api/queries/getVoterHistory', () => {
  test('returns formatted voter history', async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({
        status: 200,
        data: {
          proposalVotes: voterHistoryResponse,
        },
      }),
    );

    const payload = await getVoterHistory({
      page: 2,
      address: fakeAddress,
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
              first: 5,
              skip: 10,
              where: { address: "${fakeAddress}" }
              orderBy: proposal__createdBlockTimestamp,
              orderDirection: desc
            ) {
              id
              proposal {
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

    expect(payload).toMatchSnapshot();
  });

  test('Gets called with correct default arguments', async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({
        status: 200,
        data: {
          proposalVotes: voterHistoryResponse,
        },
      }),
    );

    const payload = await getVoterHistory({ address: fakeAddress });

    expect(fetchMock).toBeCalledWith(SUBGRAPH_LINKS[config.chainId].latest, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query proposalVotesQuery {
            proposalVotes(
              first: 5,
              skip: 0,
              where: { address: "${fakeAddress}" }
              orderBy: proposal__createdBlockTimestamp,
              orderDirection: desc
            ) {
              id
              proposal {
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

    expect(payload.voterHistory).toHaveLength(3);

    expect(payload).toMatchSnapshot();
  });
});
