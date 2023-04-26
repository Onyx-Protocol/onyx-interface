import BigNumber from 'bignumber.js';

import { UniSwapRouter } from 'types/contracts';

import getUniswapOutAmount from '.';

const fakeAmountWei = new BigNumber('1000000000000000000');
const fakePath = [
  '0xc03Fa5e041BE9C8deD030D6dec7936cE67D78ae8',
  '0xcE546eE9E8Bc0732A1e0083ef578a19F79c73D74',
];

describe('api/queries/getDailyXcn', () => {
  test('throws an error when request fails', async () => {
    const fakeContract = {
      methods: {
        getAmountsOut: () => ({
          call: async () => {
            throw new Error('Fake error message');
          },
        }),
      },
    } as unknown as UniSwapRouter;

    try {
      await getUniswapOutAmount({
        uniswapContract: fakeContract,
        amountWei: fakeAmountWei,
        path: fakePath,
      });

      throw new Error('getDailyXcn should have thrown an error but did not');
    } catch (error) {
      expect(error).toMatchInlineSnapshot('[Error: Fake error message]');
    }
  });

  test('returns the daily XCN wei on success', async () => {
    const fakeOutAmountWei = '1000';

    const callMock = jest.fn(async () => fakeOutAmountWei);
    const getAmountsOutMock = jest.fn(() => ({
      call: callMock,
    }));

    const fakeContract = {
      methods: {
        getAmountsOut: getAmountsOutMock,
      },
    } as unknown as UniSwapRouter;

    const response = await getUniswapOutAmount({
      uniswapContract: fakeContract,
      amountWei: fakeAmountWei,
      path: fakePath,
    });

    expect(getAmountsOutMock).toHaveBeenCalledTimes(1);
    expect(callMock).toHaveBeenCalledTimes(1);
    expect(response).toEqual({
      dailyXcnWei: new BigNumber(fakeOutAmountWei),
    });
  });
});
