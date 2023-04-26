import { QueryObserverOptions, useQuery } from 'react-query';

import getUniswapOutAmount, {
  GetUniswapOutAmountInput,
  IGetUniswapOutAmountOutput,
} from 'clients/api/queries/getUniswapOutAmount';
import { useUniSwapRouterContract } from 'clients/contracts/hooks';
import FunctionKey from 'constants/functionKey';

type Options = QueryObserverOptions<
  IGetUniswapOutAmountOutput,
  Error,
  IGetUniswapOutAmountOutput,
  IGetUniswapOutAmountOutput,
  [FunctionKey.GET_UNISWAP_OUT_AMOUNT, Omit<GetUniswapOutAmountInput, 'uniswapContract'>]
>;

const useGetUniswapOutAmount = (
  params: Omit<GetUniswapOutAmountInput, 'uniswapContract'>,
  options?: Options,
) => {
  const uniswapContract = useUniSwapRouterContract();
  return useQuery(
    [FunctionKey.GET_UNISWAP_OUT_AMOUNT, params],
    () => getUniswapOutAmount({ uniswapContract, amountWei: params.amountWei, path: params.path }),
    options,
  );
};
export default useGetUniswapOutAmount;
