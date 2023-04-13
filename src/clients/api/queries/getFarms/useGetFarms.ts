import { QueryObserverOptions, useQuery } from 'react-query';

import { useMulticall } from 'clients/web3';
import { BLOCK_TIME_MS } from 'constants/ethereum';
import FunctionKey from 'constants/functionKey';

import getFarms, { GetFarmsInput, GetFarmsOutput } from '.';

type Options = QueryObserverOptions<
  GetFarmsOutput,
  Error,
  GetFarmsOutput,
  GetFarmsOutput,
  [FunctionKey.GET_FARMS, string]
>;

const useGetFarms = ({ accountAddress }: Omit<GetFarmsInput, 'multicall'>, options?: Options) => {
  const multicall = useMulticall();

  return useQuery(
    [FunctionKey.GET_FARMS, accountAddress],
    () => getFarms({ multicall, accountAddress }),
    {
      // Refresh request on every new block
      refetchInterval: BLOCK_TIME_MS,
      staleTime: 0,
      cacheTime: 0,
      ...options,
    },
  );
};

export default useGetFarms;
