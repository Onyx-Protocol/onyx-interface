import { QueryObserverOptions, useQuery } from 'react-query';
import { Proposal } from 'types';

import { queryClient } from 'clients/api';
import getProposal from 'clients/api/queries/getProposals/getProposal';
import { GetProposalInput, GetProposalOutput } from 'clients/api/queries/getProposals/types';
import FunctionKey from 'constants/functionKey';

type Options = QueryObserverOptions<
  GetProposalOutput,
  Error,
  GetProposalOutput,
  GetProposalOutput,
  [FunctionKey.GET_PROPOSAL, GetProposalInput]
>;

const refetchStates = ['Pending', 'Active', 'Successded', 'Queued'];

// refetchInterval is set automatically with onSucess so it is excluded from being set manually
const useGetProposal = (params: GetProposalInput, options?: Omit<Options, 'refetchInterval'>) =>
  useQuery([FunctionKey.GET_PROPOSAL, params], () => getProposal(params), {
    onSuccess: (data: Proposal) => {
      const refetchInterval = refetchStates.includes(data.state) ? 5 * 60 * 1000 : 0;
      queryClient.setQueryDefaults([FunctionKey.GET_PROPOSAL, params], {
        refetchInterval,
      });
      if (options?.onSuccess) {
        options.onSuccess(data);
      }
    },
    ...options,
  });

export default useGetProposal;
