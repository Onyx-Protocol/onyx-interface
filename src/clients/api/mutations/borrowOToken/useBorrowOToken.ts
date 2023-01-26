import { MutationObserverOptions, useMutation } from 'react-query';

import { BorrowOTokenInput, BorrowOTokenOutput, borrowOToken, queryClient } from 'clients/api';
import { useOTokenContract } from 'clients/contracts/hooks';
import FunctionKey from 'constants/functionKey';

type Options = MutationObserverOptions<
  BorrowOTokenOutput,
  Error,
  Omit<BorrowOTokenInput, 'oTokenContract'>
>;

const useBorrowOToken = ({ oTokenId }: { oTokenId: string }, options?: Options) => {
  const oTokenContract = useOTokenContract(oTokenId);

  return useMutation(
    FunctionKey.BORROW_O_TOKEN,
    params =>
      borrowOToken({
        oTokenContract,
        ...params,
      }),
    {
      ...options,
      onSuccess: (...onSuccessParams) => {
        const { fromAccountAddress } = onSuccessParams[1];

        queryClient.invalidateQueries(FunctionKey.GET_O_TOKEN_BALANCES_ALL);
        queryClient.invalidateQueries([
          FunctionKey.GET_O_TOKEN_BALANCE,
          {
            accountAddress: fromAccountAddress,
            oTokenId,
          },
        ]);
        queryClient.invalidateQueries(FunctionKey.GET_ASSETS_IN_ACCOUNT);
        queryClient.invalidateQueries(FunctionKey.GET_MARKETS);
        queryClient.invalidateQueries([
          FunctionKey.GET_O_TOKEN_BORROW_BALANCE,
          {
            accountAddress: fromAccountAddress,
            oTokenId,
          },
        ]);

        if (options?.onSuccess) {
          options.onSuccess(...onSuccessParams);
        }
      },
    },
  );
};

export default useBorrowOToken;
