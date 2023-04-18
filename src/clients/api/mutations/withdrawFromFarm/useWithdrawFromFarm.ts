import { MutationObserverOptions, useMutation } from 'react-query';

import {
  WithdrawFromFarmInput,
  WithdrawFromFarmOutput,
  queryClient,
  withdrawFromFarm,
} from 'clients/api';
import { useMasterChefContract } from 'clients/contracts/hooks';
import FunctionKey from 'constants/functionKey';

type Options = MutationObserverOptions<
  WithdrawFromFarmOutput,
  Error,
  Omit<WithdrawFromFarmInput, 'masterChefContract'>
>;

const useWithdrawFromFarm = (options?: Options) => {
  const masterChefContract = useMasterChefContract();

  return useMutation(
    FunctionKey.WITHDRAW_FROM_FARM,
    (params: Omit<WithdrawFromFarmInput, 'masterChefContract'>) =>
      withdrawFromFarm({
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

export default useWithdrawFromFarm;
