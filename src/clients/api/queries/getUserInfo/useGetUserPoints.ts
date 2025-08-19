import { QueryObserverOptions, useQuery } from 'react-query';

import { DEFAULT_REFETCH_INTERVAL_MS } from 'constants/defaultRefetchInterval';
import FunctionKey from 'constants/functionKey';

import { GetUserInfoInput, GetUserInfoOutput, getUserPoints } from '.';

type Options = QueryObserverOptions<
  GetUserInfoOutput,
  Error,
  GetUserInfoOutput,
  GetUserInfoOutput,
  [FunctionKey.GET_USER_POINTS, GetUserInfoInput]
>;

const useGetUserPoints = (params: GetUserInfoInput, options?: Options) =>
  // This endpoint is paginated so we keep the previous responses by default to create a more seamless paginating experience
  useQuery([FunctionKey.GET_USER_POINTS, params], () => getUserPoints(params), {
    keepPreviousData: false,
    refetchInterval: DEFAULT_REFETCH_INTERVAL_MS,
    ...options,
  });

export default useGetUserPoints;
