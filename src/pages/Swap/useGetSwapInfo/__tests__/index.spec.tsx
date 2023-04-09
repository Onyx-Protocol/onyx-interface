import { waitFor } from '@testing-library/react';
import { Pair as PSPair, TokenAmount as PSTokenAmount } from '@uniswap/sdk';
import BigNumber from 'bignumber.js';
import React from 'react';

import fakeTokenCombinations from '__mocks__/models/tokenCombinations';
import { getUniSwapPairs } from 'clients/api';
import { UNISWAP_TOKENS } from 'constants/tokens';
import renderComponent from 'testUtils/renderComponent';

import useGetSwapInfo from '..';
import { UseGetSwapInfoInput, UseGetSwapInfoOutput } from '../types';

jest.mock('clients/api');

const fakePairs: PSPair[] = fakeTokenCombinations.map(
  ([tokenA, tokenB]) =>
    new PSPair(
      new PSTokenAmount(tokenA, new BigNumber(10).pow(tokenA.decimals).toFixed()),
      new PSTokenAmount(tokenB, new BigNumber(10).pow(tokenB.decimals).toFixed()),
    ),
);

describe('pages/Swap/useGetSwapInfo', () => {
  it('returns an error when trade consists in a wrap', async () => {
    const input: UseGetSwapInfoInput = {
      fromToken: UNISWAP_TOKENS.eth,
      toToken: UNISWAP_TOKENS.weth,
      direction: 'exactAmountIn',
    };

    let result: UseGetSwapInfoOutput | undefined;

    const TestComponent: React.FC = () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      result = useGetSwapInfo(input);
      return <></>;
    };

    renderComponent(<TestComponent />);

    expect(result).toEqual({
      swap: undefined,
      error: 'WRAPPING_UNWRAPPING_UNSUPPORTED',
    });
  });

  it('returns an error when trade consists in an unwrap', async () => {
    const input: UseGetSwapInfoInput = {
      fromToken: UNISWAP_TOKENS.weth,
      toToken: UNISWAP_TOKENS.eth,
      direction: 'exactAmountIn',
    };

    let result: UseGetSwapInfoOutput | undefined;

    const TestComponent: React.FC = () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      result = useGetSwapInfo(input);
      return <></>;
    };

    renderComponent(<TestComponent />);

    expect(result).toEqual({
      swap: undefined,
      error: 'WRAPPING_UNWRAPPING_UNSUPPORTED',
    });
  });

  describe('exactAmountIn', () => {
    it('returns no swap and no error if fromTokenAmountTokens is not provided', async () => {
      const input: UseGetSwapInfoInput = {
        fromToken: UNISWAP_TOKENS.usdt,
        toToken: UNISWAP_TOKENS.uni,
        toTokenAmountTokens: '1',
        direction: 'exactAmountIn',
      };

      let result: UseGetSwapInfoOutput | undefined;

      const TestComponent: React.FC = () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        result = useGetSwapInfo(input);
        return <></>;
      };

      renderComponent(<TestComponent />);

      expect(result).toEqual({
        swap: undefined,
        error: undefined,
      });
    });

    it('returns an error if no trade is found for the input provided', async () => {
      // Remove pairs containing fromToken
      const customFakePairs = fakePairs.filter(
        fakePair =>
          fakePair.token0.address !== UNISWAP_TOKENS.usdt.address &&
          fakePair.token1.address !== UNISWAP_TOKENS.usdt.address,
      );

      (getUniSwapPairs as jest.Mock).mockImplementationOnce(async () => ({
        pairs: customFakePairs,
      }));

      const input: UseGetSwapInfoInput = {
        fromToken: UNISWAP_TOKENS.usdt,
        fromTokenAmountTokens: '1',
        toToken: UNISWAP_TOKENS.uni,
        direction: 'exactAmountIn',
      };

      let result: UseGetSwapInfoOutput | undefined;

      const TestComponent: React.FC = () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        result = useGetSwapInfo(input);
        return <></>;
      };

      renderComponent(<TestComponent />);

      await waitFor(() =>
        expect(result).toEqual({
          swap: undefined,
          error: 'INSUFFICIENT_LIQUIDITY',
        }),
      );
    });

    it('returns swap in correct format if a trade is found', async () => {
      (getUniSwapPairs as jest.Mock).mockImplementationOnce(async () => ({
        pairs: fakePairs,
      }));

      const input: UseGetSwapInfoInput = {
        fromToken: UNISWAP_TOKENS.usdt,
        fromTokenAmountTokens: '1',
        toToken: UNISWAP_TOKENS.uni,
        direction: 'exactAmountIn',
      };

      let result: UseGetSwapInfoOutput | undefined;

      const TestComponent: React.FC = () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        result = useGetSwapInfo(input);
        return <></>;
      };

      renderComponent(<TestComponent />);

      await waitFor(() => expect(result?.swap).toBeDefined());
      expect(result).toMatchSnapshot();
    });
  });

  describe('exactAmountOut', () => {
    it('returns no swap and no error if toTokenAmountTokens is not provided', async () => {
      const input: UseGetSwapInfoInput = {
        fromToken: UNISWAP_TOKENS.usdt,
        fromTokenAmountTokens: '1',
        toToken: UNISWAP_TOKENS.uni,
        direction: 'exactAmountOut',
      };

      let result: UseGetSwapInfoOutput | undefined;

      const TestComponent: React.FC = () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        result = useGetSwapInfo(input);
        return <></>;
      };

      renderComponent(<TestComponent />);

      expect(result).toEqual({
        swap: undefined,
        error: undefined,
      });
    });

    it('returns an error if no trade is found for the input provided', async () => {
      (getUniSwapPairs as jest.Mock).mockImplementationOnce(async () => ({ pairs: fakePairs }));

      const input: UseGetSwapInfoInput = {
        fromToken: UNISWAP_TOKENS.usdt,
        toTokenAmountTokens: '10', // Higher amount than available liquidities in pools
        toToken: UNISWAP_TOKENS.uni,
        direction: 'exactAmountOut',
      };

      let result: UseGetSwapInfoOutput | undefined;

      const TestComponent: React.FC = () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        result = useGetSwapInfo(input);
        return <></>;
      };

      renderComponent(<TestComponent />);

      await waitFor(() =>
        expect(result).toEqual({
          swap: undefined,
          error: 'INSUFFICIENT_LIQUIDITY',
        }),
      );
    });

    it('returns swap in correct format if a trade is found', async () => {
      (getUniSwapPairs as jest.Mock).mockImplementationOnce(async () => ({
        pairs: fakePairs,
      }));

      const input: UseGetSwapInfoInput = {
        fromToken: UNISWAP_TOKENS.usdt,
        toTokenAmountTokens: '0.5',
        toToken: UNISWAP_TOKENS.uni,
        direction: 'exactAmountOut',
      };

      let result: UseGetSwapInfoOutput | undefined;

      const TestComponent: React.FC = () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        result = useGetSwapInfo(input);
        return <></>;
      };

      renderComponent(<TestComponent />);

      await waitFor(() => expect(result?.swap).toBeDefined());
      expect(result).toMatchSnapshot();
    });
  });
});
