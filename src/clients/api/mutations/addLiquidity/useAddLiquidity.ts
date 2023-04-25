import { MutationObserverOptions, useMutation } from 'react-query';

import { AddLiquidityInput, AddLiquidityOutput, addLiquidity, queryClient } from 'clients/api';
import { useUniSwapRouterContract } from 'clients/contracts/hooks';
import FunctionKey from 'constants/functionKey';

type Options = MutationObserverOptions<
  AddLiquidityOutput,
  Error,
  Omit<AddLiquidityInput, 'uniswapRouterContract'>
>;

const useAddLiquidity = (options?: Options) => {
  const uniswapRouterContract = useUniSwapRouterContract();

  return useMutation(
    FunctionKey.ADD_LIQUIDITY,
    (params: Omit<AddLiquidityInput, 'uniswapRouterContract'>) =>
      addLiquidity({
        uniswapRouterContract,
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

export default useAddLiquidity;
