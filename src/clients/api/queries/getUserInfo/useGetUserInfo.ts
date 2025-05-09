import { QueryObserverOptions, useQuery } from 'react-query';

import { DEFAULT_REFETCH_INTERVAL_MS } from 'constants/defaultRefetchInterval';
import FunctionKey from 'constants/functionKey';

import getUserInfo, { GetUserInfoInput, GetUserInfoOutput } from '.';

type Options = QueryObserverOptions<
  GetUserInfoOutput,
  Error,
  GetUserInfoOutput,
  GetUserInfoOutput,
  [FunctionKey.GET_USER_INFO, GetUserInfoInput]
>;

const useGetUserInfo = (params: GetUserInfoInput, options?: Options) =>
  // This endpoint is paginated so we keep the previous responses by default to create a more seamless paginating experience
  useQuery([FunctionKey.GET_USER_INFO, params], () => getUserInfo(params), {
    keepPreviousData: false,
    refetchInterval: DEFAULT_REFETCH_INTERVAL_MS,
    ...options,
  });

export default useGetUserInfo;
