import { QueryObserverOptions, useQuery } from 'react-query';

import getProposals, {
  GetProposalsInput,
  GetProposalsOutput,
} from 'clients/api/queries/getProposals';
import { BLOCK_TIME_MS } from 'constants/ethereum';
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
    refetchInterval: params.page === 1 ? BLOCK_TIME_MS * 5 : undefined,
    ...options,
  });

export default useGetProposals;
