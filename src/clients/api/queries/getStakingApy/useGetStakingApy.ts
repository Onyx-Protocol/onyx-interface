import { QueryObserverOptions, useQuery } from 'react-query';

import getStakingApy, { GetStakingApyOutput } from 'clients/api/queries/getStakingApy';
import { useXcnStakingContract } from 'clients/contracts/hooks';
import FunctionKey from 'constants/functionKey';

type Options = QueryObserverOptions<
  GetStakingApyOutput,
  Error,
  GetStakingApyOutput,
  GetStakingApyOutput,
  [FunctionKey.GET_STAKING_APY, string]
>;

const useGetStakingApy = (options?: Options) => {
  const xcnStakingContract = useXcnStakingContract();
  return useQuery(
    [FunctionKey.GET_STAKING_APY, ''],
    () => getStakingApy({ xcnStakingContract }),
    options,
  );
};

export default useGetStakingApy;
