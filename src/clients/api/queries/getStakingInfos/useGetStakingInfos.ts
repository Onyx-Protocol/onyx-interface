import { QueryObserverOptions, useQuery } from 'react-query';

import getStakingInfos, {
  GetStakingInfosInput,
  GetStakingInfosOutput,
} from 'clients/api/queries/getStakingInfos';
import { useXcnStakingContract } from 'clients/contracts/hooks';
import FunctionKey from 'constants/functionKey';

type Options = QueryObserverOptions<
  GetStakingInfosOutput,
  Error,
  GetStakingInfosOutput,
  GetStakingInfosOutput,
  [FunctionKey.GET_STAKING_INFOS, string]
>;

const useGetStakingInfos = (
  { accountAddress }: Omit<GetStakingInfosInput, 'xcnStakingContract'>,
  options?: Options,
) => {
  const xcnStakingContract = useXcnStakingContract();
  return useQuery(
    [FunctionKey.GET_STAKING_INFOS, accountAddress],
    () => getStakingInfos({ xcnStakingContract, accountAddress }),
    options,
  );
};

export default useGetStakingInfos;
