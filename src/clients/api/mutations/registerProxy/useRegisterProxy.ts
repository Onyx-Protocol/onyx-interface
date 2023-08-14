import { UseMutationOptions, useMutation } from 'react-query';

import registerProxy from 'clients/api/mutations/registerProxy';
import queryClient from 'clients/api/queryClient';
import { useWPunksContract } from 'clients/contracts/hooks';
import FunctionKey from 'constants/functionKey';

const useRegisterProxy = (
  { accountAddress }: { accountAddress: string },
  options?: UseMutationOptions,
) => {
  const WPunksContract = useWPunksContract();

  return useMutation(
    FunctionKey.REGISTER_PROXY,
    () =>
      registerProxy({
        WPunksContract,
        accountAddress,
      }),
    {
      ...options,
      onSuccess: (...onSuccessParams) => {
        queryClient.invalidateQueries([
          FunctionKey.GET_PROXIES,
          {
            accountAddress,
          },
        ]);
        queryClient.invalidateQueries([
          FunctionKey.GET_OWNED_WPUNKS_IDS,
          {
            accountAddress,
          },
        ]);
        queryClient.invalidateQueries([
          FunctionKey.GET_OWNED_PUNK_IDS,
          {
            accountAddress,
          },
        ]);
        if (options?.onSuccess) {
          options.onSuccess(...onSuccessParams);
        }
      },
    },
  );
};

export default useRegisterProxy;
