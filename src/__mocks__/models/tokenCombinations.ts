import { ChainId, Token as PSToken } from '@uniswap/sdk';
import { PSTokenCombination } from 'types';

import { UNISWAP_TOKENS } from 'constants/tokens';

const tokenCombinations: PSTokenCombination[] = [
  // [UNISWAP_TOKENS.usdt, UNISWAP_TOKENS.uni],
  [UNISWAP_TOKENS.usdt, UNISWAP_TOKENS.weth],
  // [UNISWAP_TOKENS.uni, UNISWAP_TOKENS.weth],
  // [UNISWAP_TOKENS.uni, UNISWAP_TOKENS.usdt],
  [UNISWAP_TOKENS.weth, UNISWAP_TOKENS.usdt],
  // [UNISWAP_TOKENS.weth, UNISWAP_TOKENS.uni],
].map(([tokenA, tokenB]) => [
  new PSToken(ChainId.GÖRLI, tokenA.address, tokenA.decimals, tokenA.symbol),
  new PSToken(ChainId.GÖRLI, tokenB.address, tokenB.decimals, tokenB.symbol),
]);

export default tokenCombinations;
