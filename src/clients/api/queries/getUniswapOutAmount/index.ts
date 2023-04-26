import BigNumber from 'bignumber.js';

import { UniSwapRouter } from 'types/contracts';

export interface GetUniswapOutAmountInput {
  uniswapContract: UniSwapRouter;
  amountWei: BigNumber;
  path: Array<string>;
}

export type IGetUniswapOutAmountOutput = {
  outAmount: BigNumber;
};

const getUniswapOutAmount = async ({
  uniswapContract,
  amountWei,
  path,
}: GetUniswapOutAmountInput): Promise<IGetUniswapOutAmountOutput> => {
  const response = await uniswapContract.methods.getAmountsOut(amountWei.toString(10), path).call();

  return {
    outAmount: new BigNumber(response[1]),
  };
};

export default getUniswapOutAmount;
