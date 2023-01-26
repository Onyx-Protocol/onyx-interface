import { QueryObserverOptions, useQuery } from 'react-query';

import { useXcnLensContract } from 'clients/contracts/hooks';
import { DEFAULT_REFETCH_INTERVAL_MS } from 'constants/defaultRefetchInterval';
import FunctionKey from 'constants/functionKey';

import getXcnReward, { GetXcnRewardInput, GetXcnRewardOutput } from '.';

type Options = QueryObserverOptions<
  GetXcnRewardOutput,
  Error,
  GetXcnRewardOutput,
  GetXcnRewardOutput,
  [FunctionKey.GET_XCN_REWARD, string]
>;

const useGetXcnReward = (
  { accountAddress }: Omit<GetXcnRewardInput, 'lensContract'>,
  options?: Options,
) => {
  const lensContract = useXcnLensContract();

  return useQuery(
    [FunctionKey.GET_XCN_REWARD, accountAddress],
    () =>
      getXcnReward({
        lensContract,
        accountAddress,
      }),
    {
      refetchInterval: DEFAULT_REFETCH_INTERVAL_MS,
      ...options,
    },
  );
};

export default useGetXcnReward;
