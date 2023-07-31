import { UseMutationOptions, useMutation } from 'react-query';
import type { TransactionReceipt } from 'web3-core';

import mintWPunks from 'clients/api/mutations/mintWPunks';
import queryClient from 'clients/api/queryClient';
import { useWPunksContract } from 'clients/contracts/hooks';
import FunctionKey from 'constants/functionKey';

type UseMintWPunksParams = { id: number | string };

const useMintWPunks = (
  { accountAddress }: { accountAddress: string },
  options?: UseMutationOptions<TransactionReceipt | null, unknown, UseMintWPunksParams>,
) => {
  const WPunksContract = useWPunksContract();

  return useMutation(
    FunctionKey.MINT_WPUNKS,
    (params: UseMintWPunksParams) =>
      mintWPunks({
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

export default useMintWPunks;
