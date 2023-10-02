import { QueryObserverOptions, useQuery } from 'react-query';

import getProposalVotes, {
  GetProposalVotesInput,
  GetProposalVotesOutput,
} from 'clients/api/queries/getProposalVotes';
import FunctionKey from 'constants/functionKey';

type Options = QueryObserverOptions<
  GetProposalVotesOutput,
  Error,
  GetProposalVotesOutput,
  GetProposalVotesOutput,
  [FunctionKey.GET_PROPOSAL_VOTES, GetProposalVotesInput]
>;

const useGetProposalVotes = (params: GetProposalVotesInput = {}, options?: Options) =>
  useQuery([FunctionKey.GET_PROPOSAL_VOTES, params], () => getProposalVotes(params), {
    keepPreviousData: true,
    placeholderData: { proposalVotes: [], total: 0 },
    ...options,
  });

export default useGetProposalVotes;
