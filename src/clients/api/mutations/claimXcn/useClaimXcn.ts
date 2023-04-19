import { MutationObserverOptions, useMutation } from 'react-query';

import { ClaimXcnInput, ClaimXcnOutput, claimXcn } from 'clients/api';
import { useXcnClaimContract } from 'clients/contracts/hooks';
import FunctionKey from 'constants/functionKey';

const useClaimXcn = (
  options?: MutationObserverOptions<
    ClaimXcnOutput,
    // @TODO: use custom error type (see https://app.clickup.com/t/2rvwhnt)
    Error,
    Omit<ClaimXcnInput, 'xcnClaimContract'>
  >,
) => {
  const xcnClaimContract = useXcnClaimContract();

  return useMutation(
    FunctionKey.CLAIM_XCN,
    (params: Omit<ClaimXcnInput, 'xcnClaimContract'>) =>
    claimXcn({
        xcnClaimContract,
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

export default useClaimXcn;
