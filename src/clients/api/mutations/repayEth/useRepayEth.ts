import { MutationObserverOptions, useMutation } from 'react-query';

import { RepayEthInput, RepayEthOutput, queryClient, repayEth } from 'clients/api';
import { useWeb3 } from 'clients/web3';
import FunctionKey from 'constants/functionKey';
import { TOKENS } from 'constants/tokens';

type Options = MutationObserverOptions<RepayEthOutput, Error, Omit<RepayEthInput, 'web3'>>;

const useRepayNonEthOToken = (options?: Options) => {
  const web3 = useWeb3();

  return useMutation(
    FunctionKey.REPAY_ETH,
    params =>
      repayEth({
        web3,
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
          {
            accountAddress: fromAccountAddress,
            oTokenId: TOKENS.eth.id,
          },
        ]);

        if (options?.onSuccess) {
          options.onSuccess(...onSuccessParams);
        }
      },
    },
  );
};

export default useRepayNonEthOToken;
