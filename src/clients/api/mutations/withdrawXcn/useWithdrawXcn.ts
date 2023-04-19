import { MutationObserverOptions, useMutation } from 'react-query';

import { WithdrawXcnInput, WithdrawXcnOutput, withdrawXcn } from 'clients/api';
import { useXcnStakingContract } from 'clients/contracts/hooks';
import FunctionKey from 'constants/functionKey';

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
        if (options?.onSuccess) {
          options.onSuccess(...onSuccessParams);
        }
      },
    },
  );
};

export default useWithdrawXcn;
