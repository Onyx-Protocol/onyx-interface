import config from 'config';
import { getProposalVotesSubGraph } from 'utilities';

import { GetProposalVotesInput, GetProposalVotesOutput } from './types';

export * from './types';

const getProposalVotes = async (filter: GetProposalVotesInput): Promise<GetProposalVotesOutput> => {
  const { proposalVotes } = await getProposalVotesSubGraph(config.chainId, filter);

  return { proposalVotes, total: proposalVotes.length };
};

export default getProposalVotes;
