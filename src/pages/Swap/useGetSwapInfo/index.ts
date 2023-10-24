import {
  ChainId,
  Token as PSToken,
  TokenAmount as PSTokenAmount,
  Trade as PSTrade,
} from '@uniswap/sdk';
import BigNumber from 'bignumber.js';
import config from 'config';
import { useMemo } from 'react';
import { EthChainId } from 'types';
import { convertTokensToWei } from 'utilities';
import { toChecksumAddress } from 'web3-utils';

import { useGetUniSwapPairs } from 'clients/api';

import formatToSwap from './formatToSwap';
import { SwapError, UseGetSwapInfoInput, UseGetSwapInfoOutput } from './types';
import useGetTokenCombinations from './useGetTokenCombinations';
import wrapToken from './wrapToken';

export * from './types';

const useGetSwapInfo = (input: UseGetSwapInfoInput): UseGetSwapInfoOutput => {
  // Determine all possible token combinations based on input and base trade
  // tokens
  const tokenCombinations = useGetTokenCombinations({
    fromToken: input.fromToken,
    toToken: input.toToken,
  });

  // Fetch pair data
  const { data: getUniSwapPairsData } = useGetUniSwapPairs({ tokenCombinations });

  // Find the best trade based on pairs
  return useMemo(() => {
    let trade: PSTrade | undefined;
    let error: SwapError | undefined;

    const wrappedFromToken = wrapToken(input.fromToken);
    const wrappedToToken = wrapToken(input.toToken);

    // Return no trade if user is trying to wrap or unwrap ETH/wETH
    if (wrappedFromToken.address === wrappedToToken.address) {
      return {
        swap: undefined,
        error: 'WRAPPING_UNWRAPPING_UNSUPPORTED',
      };
    }

    // Handle "exactAmountIn" direction (sell an exact amount of fromTokens for
    // as many toTokens as possible)
    if (
      getUniSwapPairsData?.pairs &&
      getUniSwapPairsData?.pairs.length > 0 &&
      input.direction === 'exactAmountIn' &&
      !!input.fromTokenAmountTokens
    ) {
      const fromTokenAmountWei = convertTokensToWei({
        value: new BigNumber(input.fromTokenAmountTokens).dp(wrappedFromToken.decimals),
        token: wrappedFromToken,
      });

      const currencyAmountIn = new PSTokenAmount(
        new PSToken(
          config.chainId === EthChainId.MAINNET ? ChainId.MAINNET : ChainId.GÖRLI,
          toChecksumAddress(wrappedFromToken.address),
          wrappedFromToken.decimals,
          wrappedFromToken.symbol,
        ),
        fromTokenAmountWei.dp(wrappedFromToken.decimals).toFixed(),
      );

      const currencyOut = new PSToken(
        config.chainId === EthChainId.MAINNET ? ChainId.MAINNET : ChainId.GÖRLI,
        toChecksumAddress(wrappedToToken.address),
        wrappedToToken.decimals,
        wrappedToToken.symbol,
      );

      // Find best trade
      [trade] = PSTrade.bestTradeExactIn(
        getUniSwapPairsData?.pairs,
        currencyAmountIn,
        currencyOut,
        {
          maxHops: 3,
          maxNumResults: 1,
        },
      );

      error = trade ? undefined : 'INSUFFICIENT_LIQUIDITY';
    }

    // Handle "exactAmountOut" direction (sell as few fromTokens as possible for
    // a fixed amount of toTokens)
    if (
      getUniSwapPairsData?.pairs &&
      getUniSwapPairsData?.pairs.length > 0 &&
      input.direction === 'exactAmountOut' &&
      !!input.toTokenAmountTokens
    ) {
      const currencyIn = new PSToken(
        config.chainId === EthChainId.MAINNET ? ChainId.MAINNET : ChainId.GÖRLI,
        toChecksumAddress(wrappedFromToken.address),
        wrappedFromToken.decimals,
        wrappedFromToken.symbol,
      );

      const toTokenAmountWei = convertTokensToWei({
        value: new BigNumber(input.toTokenAmountTokens).dp(wrappedToToken.decimals),
        token: wrappedToToken,
      });

      const currencyAmountOut = new PSTokenAmount(
        new PSToken(
          config.chainId === EthChainId.MAINNET ? ChainId.MAINNET : ChainId.GÖRLI,
          toChecksumAddress(wrappedToToken.address),
          wrappedToToken.decimals,
          wrappedToToken.symbol,
        ),
        toTokenAmountWei.toFixed(),
      );

      // Find best trade
      [trade] = PSTrade.bestTradeExactOut(
        getUniSwapPairsData?.pairs,
        currencyIn,
        currencyAmountOut,
        {
          maxHops: 3,
          maxNumResults: 1,
        },
      );

      error = trade ? undefined : 'INSUFFICIENT_LIQUIDITY';
    }

    const swap =
      trade &&
      formatToSwap({
        input,
        trade,
      });

    return {
      swap,
      error,
    };
  }, [
    getUniSwapPairsData?.pairs,
    input.fromToken,
    input.toToken,
    input.fromTokenAmountTokens,
    input.toTokenAmountTokens,
  ]);
};

export default useGetSwapInfo;
