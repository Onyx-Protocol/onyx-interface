import { UseMutationOptions, useMutation } from 'react-query';
import type { TransactionReceipt } from 'web3-core/types';

import burnWPunks from 'clients/api/mutations/burnWPunks';
import queryClient from 'clients/api/queryClient';
import { useWPunksContract } from 'clients/contracts/hooks';
import FunctionKey from 'constants/functionKey';

const useBurnWPunks = (
  { accountAddress }: { accountAddress: string },
  options?: UseMutationOptions<TransactionReceipt, unknown, { id: string }>,
) => {
  const WPunksContract = useWPunksContract();

  return useMutation(
    FunctionKey.BURN_WPUNKS,
    (params: { id: string }) =>
      burnWPunks({
        WPunksContract,
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

export default useBurnWPunks;
