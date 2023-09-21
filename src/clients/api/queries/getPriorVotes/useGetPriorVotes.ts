import { QueryObserverOptions, useQuery } from 'react-query';

import getPriorVotes, {
  GetPriorVotesInput,
  GetPriorVotesOutput,
} from 'clients/api/queries/getPriorVotes';
import { useXcnStakingContract } from 'clients/contracts/hooks';
import FunctionKey from 'constants/functionKey';

type Options = QueryObserverOptions<
  GetPriorVotesOutput,
  Error,
  GetPriorVotesOutput,
  GetPriorVotesOutput,
  [FunctionKey.GET_PRIOR_VOTES, string]
>;

const useGetPriorVotes = (
  { accountAddress, blockNumber }: Omit<GetPriorVotesInput, 'xcnStakingContract'>,
  options?: Options,
) => {
  const xcnStakingContract = useXcnStakingContract();
  return useQuery(
    [FunctionKey.GET_PRIOR_VOTES, accountAddress],
    () => getPriorVotes({ xcnStakingContract, accountAddress, blockNumber }),
    options,
  );
};

export default useGetPriorVotes;
