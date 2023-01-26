import { MutationObserverOptions, useMutation } from 'react-query';

import {
  RepayEthOutput,
  RepayNonEthOTokenInput,
  queryClient,
  repayNonEthOToken,
} from 'clients/api';
import { useOTokenContract } from 'clients/contracts/hooks';
import FunctionKey from 'constants/functionKey';

type Options = MutationObserverOptions<
  RepayEthOutput,
  Error,
  Omit<RepayNonEthOTokenInput, 'oTokenContract'>
>;

const useRepayNonEthOToken = (
  { oTokenId }: { oTokenId: Exclude<string, 'eth'> },
  options?: Options,
) => {
  const oTokenContract = useOTokenContract(oTokenId);

  return useMutation(
    FunctionKey.REPAY_NON_ETH_O_TOKEN,
    params =>
      repayNonEthOToken({
        oTokenContract,
        ...params,
      }),
    {
      ...options,
      onSuccess: (...onSuccessParams) => {
        const { fromAccountAddress } = onSuccessParams[1];

        queryClient.invalidateQueries(FunctionKey.GET_O_TOKEN_BALANCES_ALL);
        queryClient.invalidateQueries(FunctionKey.GET_MARKETS);
        queryClient.invalidateQueries([
          FunctionKey.GET_O_TOKEN_BORROW_BALANCE,
          { accountAddress: fromAccountAddress, oTokenId },
        ]);

        if (options?.onSuccess) {
          options.onSuccess(...onSuccessParams);
        }
      },
    },
  );
};

export default useRepayNonEthOToken;
