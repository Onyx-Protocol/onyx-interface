import { MutationObserverOptions, useMutation } from 'react-query';

import { StakeXcnInput, StakeXcnOutput, stakeXcn } from 'clients/api';
import { useXcnStakingContract } from 'clients/contracts/hooks';
import FunctionKey from 'constants/functionKey';

const useStakeXcn = (
  options?: MutationObserverOptions<
    StakeXcnOutput,
    // @TODO: use custom error type (see https://app.clickup.com/t/2rvwhnt)
    Error,
    Omit<StakeXcnInput, 'xcnStakingContract'>
  >,
) => {
  const xcnStakingContract = useXcnStakingContract();

  return useMutation(
    FunctionKey.STAKE_XCN,
    (params: Omit<StakeXcnInput, 'xcnStakingContract'>) =>
      stakeXcn({
        xcnStakingContract,
        ...params,
      }),
    {
      ...options,
      onSuccess: (...onSuccessParams) => {
        if (options?.onSuccess) {
          options.onSuccess(...onSuccessParams);
        }
      },
    },
  );
};

export default useStakeXcn;
