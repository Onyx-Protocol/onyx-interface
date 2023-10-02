import { GetProposalInput, ProposalApiResponse } from 'clients/api/queries/getProposals';
import { SUBGRAPH_LINKS } from 'constants/endpoints';

type Pagination = {
  limit: number;
  offset: number;
};

type Order = {
  direction: 'asc' | 'desc';
  field: keyof ProposalApiResponse;
};

const getProposalsSubGraph = (
  network: number,
  filter?: GetProposalInput,
  pagination: Pagination = {
    limit: 5,
    offset: 0,
  },
  order: Order = {
    direction: 'desc',
    field: 'createdBlockTimestamp',
  },
): Promise<{ proposals: ProposalApiResponse[]; count: number }> => {
  if (!SUBGRAPH_LINKS[network] && !SUBGRAPH_LINKS[network].latest) {
    return Promise.resolve({ proposals: [], count: 0 });
  }
  return new Promise(resolve =>
    fetch(SUBGRAPH_LINKS[network].latest, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query proposalsQuery {
            proposals(
              first: ${pagination.limit},
              skip: ${pagination.offset},
              orderBy: ${order.field},
              orderDirection: ${order.direction}
              ${filter ? `where: { id: "${Number(filter.id)}" }` : ''}
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
    })
      .then(response => response.json())
      .then(
        ({
          data: {
            proposals,
            proposalCounts: [{ count }],
          },
        }) => resolve({ proposals, count }),
      ),
  );
};

export default getProposalsSubGraph;
