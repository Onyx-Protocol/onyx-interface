import { MutationObserverOptions, useMutation } from 'react-query';

import { StakeInFarmInput, StakeInFarmOutput, queryClient, stakeInFarm } from 'clients/api';
import { useMasterChefContract } from 'clients/contracts/hooks';
import FunctionKey from 'constants/functionKey';

type Options = MutationObserverOptions<
  StakeInFarmOutput,
  Error,
  Omit<StakeInFarmInput, 'masterChefContract'>
>;

const useStakeInFarm = (options?: Options) => {
  const masterChefContract = useMasterChefContract();

  return useMutation(
    FunctionKey.STAKE_IN_FARM,
    (params: Omit<StakeInFarmInput, 'masterChefContract'>) =>
      stakeInFarm({
        masterChefContract,
        ...params,
      }),
    {
      ...options,
      onSuccess: async (...onSuccessParams) => {
        const { fromAccountAddress } = onSuccessParams[1];

        // Invalidate cached farm data
        queryClient.invalidateQueries([FunctionKey.GET_FARMS, fromAccountAddress]);

        if (options?.onSuccess) {
          options.onSuccess(...onSuccessParams);
        }
      },
    },
  );
};

export default useStakeInFarm;
