import { QueryObserverOptions, useQuery } from 'react-query';

import { GetUniSwapPairsInput, GetUniSwapPairsOutput, getUniSwapPairs } from 'clients/api';
import { useMulticall } from 'clients/web3';
import { BLOCK_TIME_MS } from 'constants/ethereum';
import FunctionKey from 'constants/functionKey';

import generateTokenCombinationIds from './generateTokenCombinationIds';

type Options = QueryObserverOptions<
  GetUniSwapPairsOutput,
  Error,
  GetUniSwapPairsOutput,
  GetUniSwapPairsOutput,
  [FunctionKey.GET_UNISWAP_PAIRS, ...string[]]
>;

const useGetUniSwapPairs = (input: Omit<GetUniSwapPairsInput, 'multicall'>, options?: Options) => {
  const multicall = useMulticall();

  // Generate function key based on token combinations
  const tokenCombinationIds = generateTokenCombinationIds(input.tokenCombinations);

  return useQuery(
    [FunctionKey.GET_UNISWAP_PAIRS, ...tokenCombinationIds],
    () => getUniSwapPairs({ multicall, ...input }),
    {
      // Refresh request on every new block
      refetchInterval: BLOCK_TIME_MS,
      staleTime: 0,
      cacheTime: 0,
      ...options,
    },
  );
};

export default useGetUniSwapPairs;
