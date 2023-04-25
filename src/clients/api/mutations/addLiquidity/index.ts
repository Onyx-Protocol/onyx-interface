import BigNumber from 'bignumber.js';
import { checkForVaiVaultTransactionError } from 'errors';
import type { TransactionReceipt } from 'web3-core/types';

import { UniSwapRouter } from 'types/contracts';

export interface AddLiquidityInput {
  uniswapRouterContract: UniSwapRouter;
  fromAccountAddress: string;
  token1: string;
  token2: string;
  amountWei1: BigNumber;
  amountWei2: BigNumber;
}

export type AddLiquidityOutput = TransactionReceipt;

const addLiquidity = async ({
  uniswapRouterContract,
  fromAccountAddress,
  token1,
  token2,
  amountWei1,
  amountWei2,
}: AddLiquidityInput): Promise<AddLiquidityOutput> => {
  const resp = await uniswapRouterContract.methods
    .addLiquidity(
      token1,
      token2,
      amountWei1.toFixed(),
      amountWei2.toFixed(),
      0,
      0,
      fromAccountAddress,
      Math.floor(Date.now() / 1000) + 600,
    )
    .send({ from: fromAccountAddress });
  return checkForVaiVaultTransactionError(resp);
};

export default addLiquidity;
