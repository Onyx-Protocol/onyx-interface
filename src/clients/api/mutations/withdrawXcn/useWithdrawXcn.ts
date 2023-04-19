import { MutationObserverOptions, useMutation } from 'react-query';

import { WithdrawXcnInput, WithdrawXcnOutput, queryClient, withdrawXcn } from 'clients/api';
import { useXcnStakingContract } from 'clients/contracts/hooks';
import FunctionKey from 'constants/functionKey';
import { TOKENS } from 'constants/tokens';

const useWithdrawXcn = (
  options?: MutationObserverOptions<
    WithdrawXcnOutput,
    // @TODO: use custom error type (see https://app.clickup.com/t/2rvwhnt)
    Error,
    Omit<WithdrawXcnInput, 'xcnStakingContract'>
  >,
) => {
  const xcnStakingContract = useXcnStakingContract();

  return useMutation(
    FunctionKey.WITHDRAW_XCN,
    (params: Omit<WithdrawXcnInput, 'xcnStakingContract'>) =>
      withdrawXcn({
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

export default useWithdrawXcn;
