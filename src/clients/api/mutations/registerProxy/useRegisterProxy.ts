import { useMutation } from 'react-query';

import registerProxy from 'clients/api/mutations/registerProxy';
import queryClient from 'clients/api/queryClient';
import { useFiPunkContract } from 'clients/contracts/hooks';
import FunctionKey from 'constants/functionKey';

const useRegisterProxy = ({ accountAddress }: { accountAddress: string }, options?: any) => {
  const fiPunkContract = useFiPunkContract();

  return useMutation(
    FunctionKey.REGISTER_PROXY,
    () =>
      registerProxy({
        fiPunkContract,
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
          FunctionKey.GET_OWNED_FIPUNK_IDS,
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
