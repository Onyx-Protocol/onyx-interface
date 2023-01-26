import { useMutation } from 'react-query';

import burnFiPunk from 'clients/api/mutations/burnFiPunk';
import queryClient from 'clients/api/queryClient';
import { useFiPunkContract } from 'clients/contracts/hooks';
import FunctionKey from 'constants/functionKey';

const useBurnFiPunk = ({ accountAddress }: { accountAddress: string }, options?: any) => {
  const fiPunkContract = useFiPunkContract();

  return useMutation(
    FunctionKey.BURN_FIPUNK,
    (params: any) =>
    burnFiPunk({
        fiPunkContract,
        accountAddress,
        ...params,
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

export default useBurnFiPunk;
