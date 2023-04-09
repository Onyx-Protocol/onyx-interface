import { Pair as PSPair, Token as PSToken } from '@uniswap/sdk';
import BigNumber from 'bignumber.js';
import { Multicall } from 'ethereum-multicall';
import { PSTokenCombination } from 'types';

export interface GetUniSwapPairsInput {
  multicall: Multicall;
  tokenCombinations: PSTokenCombination[];
}

export interface PairAddress {
  tokenCombination: PSTokenCombination;
  address: string;
}

export interface TokenReserve {
  token: PSToken;
  reserveWei: BigNumber;
}

export type GetUniSwapPairsOutput = {
  pairs: PSPair[];
};
