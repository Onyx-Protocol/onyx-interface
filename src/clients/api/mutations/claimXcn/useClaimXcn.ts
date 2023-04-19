import { MutationObserverOptions, useMutation } from 'react-query';

import { ClaimXcnInput, ClaimXcnOutput, claimXcn, queryClient } from 'clients/api';
import { useXcnClaimContract } from 'clients/contracts/hooks';
import FunctionKey from 'constants/functionKey';
import { TOKENS } from 'constants/tokens';

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

export default useClaimXcn;
