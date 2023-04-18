import { MutationObserverOptions, useMutation } from 'react-query';

import {
  ClaimFarmRewardInput,
  ClaimFarmRewardOutput,
  claimFarmReward,
  queryClient,
} from 'clients/api';
import { useMasterChefContract } from 'clients/contracts/hooks';
import FunctionKey from 'constants/functionKey';

type Options = MutationObserverOptions<
  ClaimFarmRewardOutput,
  Error,
  Omit<ClaimFarmRewardInput, 'masterChefContract'>
>;

const useClaimFarmReward = (options?: Options) => {
  const masterChefContract = useMasterChefContract();

  return useMutation(
    FunctionKey.CLAIM_FARM_REWARD,
    (params: Omit<ClaimFarmRewardInput, 'masterChefContract'>) =>
      claimFarmReward({
        masterChefContract,
        ...params,
      }),
    {
      ...options,
      onSuccess: async (...onSuccessParams) => {
        queryClient.invalidateQueries(FunctionKey.GET_FARMS);

        if (options?.onSuccess) {
          options.onSuccess(...onSuccessParams);
        }
      },
    },
  );
};

export default useClaimFarmReward;
