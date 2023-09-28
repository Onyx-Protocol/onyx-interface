import { ProposalApiResponse } from 'clients/api';
import {
  GetProposalVotesInput,
  ProposalVotesApiResponse,
} from 'clients/api/queries/getProposalVotes';
import { SUBGRAPH_LINKS } from 'constants/endpoints';

const getProposalVotesSubGraph = (
  network: number,
  filter?: GetProposalVotesInput,
): Promise<{ proposalVotes: ProposalVotesApiResponse[] }> => {
  if (!SUBGRAPH_LINKS[network] && !SUBGRAPH_LINKS[network].latest) {
    return Promise.resolve({ proposalVotes: [] });
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
              ${filter ? `where: { address: "${filter.address}" }` : ''}
            ) {
              id
              proposal {
                id
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
      .then(({ data: { proposalVotes } }) =>
        resolve({
          proposalVotes: proposalVotes.map(
            (pv: ProposalVotesApiResponse & { proposal: ProposalApiResponse }) => ({
              ...pv,
              proposal: pv.id,
            }),
          ),
        }),
      ),
  );
};

export default getProposalVotesSubGraph;
