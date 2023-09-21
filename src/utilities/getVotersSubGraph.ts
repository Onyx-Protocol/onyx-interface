import { GetVotersInput, VoterResult } from 'clients/api/queries/getVoters';
import { SUBGRAPH_LINKS } from 'constants/endpoints';

const getVotersSubGraph = (network: number, input: GetVotersInput): Promise<VoterResult[]> => {
  if (!SUBGRAPH_LINKS[network] && !SUBGRAPH_LINKS[network].latest) {
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
              ${input.limit ? `first: ${input.limit}` : ''},
              where: { proposal: "${input.id}" ${
          input.support !== undefined ? `, support: ${input.support}` : ''
        } }
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
    })
      .then(response => response.json())
      .then(({ data: { proposalVotes } }) => resolve(proposalVotes)),
  );
};

export default getVotersSubGraph;
