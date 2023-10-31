import { ChainId, Token as PSToken } from '@uniswap/sdk';
import BigNumber from 'bignumber.js';
import { toChecksumAddress } from 'web3-utils';

import { UNISWAP_TOKENS } from 'constants/tokens';

import formatToSwap from '../formatToSwap';
import { FormatToSwapInput } from '../types';

const fakeRoute = {
  path: [
    new PSToken(
      ChainId.GÖRLI,
      toChecksumAddress(UNISWAP_TOKENS.usdt.address),
      UNISWAP_TOKENS.usdt.decimals,
      UNISWAP_TOKENS.usdt.symbol,
    ),
    new PSToken(
      ChainId.GÖRLI,
      toChecksumAddress(UNISWAP_TOKENS.uni.address),
      UNISWAP_TOKENS.uni.decimals,
      UNISWAP_TOKENS.uni.symbol,
    ),
  ],
};

describe('pages/Swap/useGetSwapInfo/formatToSwap', () => {
  it('formats trade to swap correctly when direction is "exactAmountIn"', () => {
    const fakeTrade = {
      route: fakeRoute,
      inputAmount: new BigNumber(10),
      outputAmount: new BigNumber(10),
      executionPrice: new BigNumber(1),
      minimumAmountOut: jest.fn(() => new BigNumber(9)),
    } as unknown as FormatToSwapInput['trade'];

    const fakeInput: FormatToSwapInput['input'] = {
      fromToken: UNISWAP_TOKENS.usdt,
      toToken: UNISWAP_TOKENS.uni,
      direction: 'exactAmountIn',
    };

    const res = formatToSwap({ trade: fakeTrade, input: fakeInput });

    expect(res).toMatchSnapshot();
  });

  it('formats trade to swap correctly when direction is "exactAmountOut"', () => {
    const fakeTrade = {
      route: fakeRoute,
      inputAmount: new BigNumber(10),
      outputAmount: new BigNumber(10),
      executionPrice: new BigNumber(1),
      maximumAmountIn: jest.fn(() => new BigNumber(11)),
    } as unknown as FormatToSwapInput['trade'];

    const fakeInput: FormatToSwapInput['input'] = {
      fromToken: UNISWAP_TOKENS.usdt,
      toToken: UNISWAP_TOKENS.uni,
      direction: 'exactAmountOut',
    };

    const res = formatToSwap({ trade: fakeTrade, input: fakeInput });

    expect(res).toMatchSnapshot();
  });
});
