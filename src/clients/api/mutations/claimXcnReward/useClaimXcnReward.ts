import { MutationObserverOptions, useMutation } from 'react-query';

import {
  ClaimXcnRewardInput,
  ClaimXcnRewardOutput,
  claimXcnReward,
  queryClient,
} from 'clients/api';
import { useComptrollerContract } from 'clients/contracts/hooks';
import FunctionKey from 'constants/functionKey';

type Options = MutationObserverOptions<
  ClaimXcnRewardOutput,
  Error,
  Omit<ClaimXcnRewardInput, 'comptrollerContract' | 'xcnLensContract'>
>;

const useClaimXcnReward = (options?: Options) => {
  const comptrollerContract = useComptrollerContract();

  return useMutation(
    FunctionKey.CLAIM_XCN_REWARD,
    (params: Omit<ClaimXcnRewardInput, 'comptrollerContract' | 'xcnLensContract'>) =>
      claimXcnReward({
        comptrollerContract,
        ...params,
      }),
    {
      ...options,
      onSuccess: async (...onSuccessParams) => {
        queryClient.resetQueries(FunctionKey.GET_XCN_REWARD);

        if (options?.onSuccess) {
          options.onSuccess(...onSuccessParams);
        }
      },
    },
  );
};

export default useClaimXcnReward;
