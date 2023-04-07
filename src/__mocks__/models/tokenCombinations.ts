import { Token as PSToken } from '@pancakeswap/sdk/dist/index.js';
import { EthChainId, PSTokenCombination } from 'types';

import { UNISWAP_TOKENS } from 'constants/tokens';

const tokenCombinations: PSTokenCombination[] = [
  [UNISWAP_TOKENS.usdt, UNISWAP_TOKENS.uni],
  [UNISWAP_TOKENS.usdt, UNISWAP_TOKENS.weth],
  [UNISWAP_TOKENS.uni, UNISWAP_TOKENS.weth],
  [UNISWAP_TOKENS.uni, UNISWAP_TOKENS.usdt],
  [UNISWAP_TOKENS.weth, UNISWAP_TOKENS.usdt],
  [UNISWAP_TOKENS.weth, UNISWAP_TOKENS.uni],
].map(([tokenA, tokenB]) => [
  new PSToken(EthChainId.TESTNET, tokenA.address, tokenA.decimals, tokenA.symbol),
  new PSToken(EthChainId.TESTNET, tokenB.address, tokenB.decimals, tokenB.symbol),
]);

export default tokenCombinations;
