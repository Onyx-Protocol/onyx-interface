import { ChainId, Token as PSToken } from '@uniswap/sdk';
import BigNumber from 'bignumber.js';

import { UNISWAP_TOKENS } from 'constants/tokens';

import formatToSwap from '../formatToSwap';
import { FormatToSwapInput } from '../types';

const fakeRoute = {
  path: [
    new PSToken(
      ChainId.GÖRLI,
      UNISWAP_TOKENS.usdt.address,
      UNISWAP_TOKENS.usdt.decimals,
      UNISWAP_TOKENS.usdt.symbol,
    ),
    new PSToken(
      ChainId.GÖRLI,
      UNISWAP_TOKENS.weth.address,
      UNISWAP_TOKENS.weth.decimals,
      UNISWAP_TOKENS.weth.symbol,
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
      toToken: UNISWAP_TOKENS.weth,
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
      toToken: UNISWAP_TOKENS.weth,
      direction: 'exactAmountOut',
    };

    const res = formatToSwap({ trade: fakeTrade, input: fakeInput });

    expect(res).toMatchSnapshot();
  });
});
