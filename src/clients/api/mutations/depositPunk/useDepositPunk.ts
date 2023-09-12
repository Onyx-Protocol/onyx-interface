import { UseMutationOptions, useMutation } from 'react-query';
import type { TransactionReceipt } from 'web3-core';

import depositPunk from 'clients/api/mutations/depositPunk';
import queryClient from 'clients/api/queryClient';
import { usePunkContract } from 'clients/contracts/hooks';
import FunctionKey from 'constants/functionKey';

type UseDepositPunkParams = { id: string | number; userProxyAddress: string };

const useDepositPunk = (
  { accountAddress }: { accountAddress: string },
  options?: UseMutationOptions<TransactionReceipt, unknown, UseDepositPunkParams>,
) => {
  const punkContract = usePunkContract();

  return useMutation(
    FunctionKey.DEPOSIT_PUNK,
    (params: UseDepositPunkParams) =>
      depositPunk({
        punkContract,
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

export default useDepositPunk;
