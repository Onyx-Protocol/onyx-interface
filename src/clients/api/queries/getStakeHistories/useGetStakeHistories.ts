import { QueryObserverOptions, useQuery } from 'react-query';

import getStakeHistories, {
  GetStakeHistoriesInput,
  GetStakeHistoriesOutput,
} from 'clients/api/queries/getStakeHistories';
import { BLOCK_TIME_MS } from 'constants/ethereum';
import FunctionKey from 'constants/functionKey';

type Options = QueryObserverOptions<
  GetStakeHistoriesOutput,
  Error,
  GetStakeHistoriesOutput,
  GetStakeHistoriesOutput,
  [FunctionKey.GET_STAKE_HISTORIES, GetStakeHistoriesInput]
>;

const useGetStakeHistories = (params: GetStakeHistoriesInput = {}, options?: Options) =>
  // This endpoint is paginated so we keep the previous responses by default to
  // create a more seamless paginating experience
  useQuery([FunctionKey.GET_STAKE_HISTORIES, params], () => getStakeHistories(params), {
    keepPreviousData: true,
    placeholderData: { limit: 0, total: 0, page: 0, stakeHistories: [] },
    refetchInterval: params.page === 1 ? BLOCK_TIME_MS * 5 : undefined,
    ...options,
  });

export default useGetStakeHistories;
