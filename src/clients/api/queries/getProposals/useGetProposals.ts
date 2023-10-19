import { QueryObserverOptions, useQuery } from 'react-query';

import { GetProposalsInput, GetProposalsOutput, getProposals } from 'clients/api';
import FunctionKey from 'constants/functionKey';

type Options = QueryObserverOptions<
  GetProposalsOutput,
  Error,
  GetProposalsOutput,
  GetProposalsOutput,
  [FunctionKey.GET_PROPOSALS, GetProposalsInput]
>;

const useGetProposals = (params: GetProposalsInput = {}, options?: Options) =>
  // This endpoint is paginated so we keep the previous responses by default to
  // create a more seamless paginating experience
  useQuery([FunctionKey.GET_PROPOSALS, params], () => getProposals(params), {
    keepPreviousData: true,
    placeholderData: { proposals: [], total: 0 },
    refetchInterval: undefined,
    ...options,
  });

export default useGetProposals;
