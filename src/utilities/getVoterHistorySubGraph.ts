import { GetVoterHistoryResponse } from 'clients/api/queries/getVoterHistory/types';
import { SUBGRAPH_LINKS } from 'constants/endpoints';

const getVoterHistorySubGraph = (
  network: number,
  address: string,
  { limit = 5, offset = 0 },
  order = {
    direction: 'desc',
    field: 'proposal__createdBlockTimestamp',
  },
): Promise<GetVoterHistoryResponse> => {
  if (!SUBGRAPH_LINKS[network] && !SUBGRAPH_LINKS[network].latest) {
    return Promise.resolve([]);
  }
  if (!address) {
    return Promise.resolve([]);
  }
  return new Promise(resolve =>
    fetch(SUBGRAPH_LINKS[network].latest, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query proposalVotesQuery {
            proposalVotes(
              first: ${limit},
              skip: ${offset},
              where: { address: "${address}" }
              orderBy: ${order.field},
              orderDirection: ${order.direction}
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
    })
      .then(response => response.json())
      .then(({ data: { proposalVotes } }) => resolve(proposalVotes)),
  );
};

export default getVoterHistorySubGraph;
