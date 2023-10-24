import { ChainId, Token as PSToken } from '@uniswap/sdk';
import { PSTokenCombination } from 'types';
import { toChecksumAddress } from 'web3-utils';

import { UNISWAP_TOKENS } from 'constants/tokens';

const tokenCombinations: PSTokenCombination[] = [
  [UNISWAP_TOKENS.usdt, UNISWAP_TOKENS.uni],
  [UNISWAP_TOKENS.usdt, UNISWAP_TOKENS.weth],
  [UNISWAP_TOKENS.uni, UNISWAP_TOKENS.weth],
  [UNISWAP_TOKENS.uni, UNISWAP_TOKENS.usdt],
  [UNISWAP_TOKENS.weth, UNISWAP_TOKENS.usdt],
  [UNISWAP_TOKENS.weth, UNISWAP_TOKENS.uni],
].map(([tokenA, tokenB]) => [
  new PSToken(ChainId.GÖRLI, toChecksumAddress(tokenA.address), tokenA.decimals, tokenA.symbol),
  new PSToken(ChainId.GÖRLI, toChecksumAddress(tokenB.address), tokenB.decimals, tokenB.symbol),
]);

export default tokenCombinations;
