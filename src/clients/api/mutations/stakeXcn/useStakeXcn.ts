import { MutationObserverOptions, useMutation } from 'react-query';

import { StakeXcnInput, StakeXcnOutput, queryClient, stakeXcn } from 'clients/api';
import { useXcnStakingContract } from 'clients/contracts/hooks';
import FunctionKey from 'constants/functionKey';
import { TOKENS } from 'constants/tokens';

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
        const { accountAddress } = onSuccessParams[1];

        // Invalidate cached farm data
        queryClient.invalidateQueries([FunctionKey.GET_STAKING_INFOS, accountAddress]);
        queryClient.invalidateQueries([FunctionKey.GET_STAKING_APY, accountAddress]);
        queryClient.invalidateQueries([
          FunctionKey.GET_BALANCE_OF,
          { accountAddress, tokenAddress: TOKENS.xcn.address },
        ]);

        if (options?.onSuccess) {
          options.onSuccess(...onSuccessParams);
        }
      },
    },
  );
};

export default useStakeXcn;
