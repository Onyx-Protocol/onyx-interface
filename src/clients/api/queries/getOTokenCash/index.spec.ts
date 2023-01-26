import BigNumber from 'bignumber.js';

import { OEth20 } from 'types/contracts';

import getOTokenCash from '.';

describe('api/queries/getOTokenCash', () => {
  test('throws an error when request fails', async () => {
    const fakeContract = {
      methods: {
        getCash: () => ({
          call: async () => {
            throw new Error('Fake error message');
          },
        }),
      },
    } as unknown as OEth20;

    try {
      await getOTokenCash({
        oTokenContract: fakeContract,
      });

      throw new Error('getOTokenCash should have thrown an error but did not');
    } catch (error) {
      expect(error).toMatchInlineSnapshot('[Error: Fake error message]');
    }
  });

  test('returns the cash value associated to the passed token, in the correct format', async () => {
    const fakeCashWei = '1000000000000000000000000000';
    const callMock = jest.fn(async () => fakeCashWei);
    const getCashMock = jest.fn(() => ({
      call: callMock,
    }));

    const fakeContract = {
      methods: {
        getCash: getCashMock,
      },
    } as unknown as OEth20;

    const response = await getOTokenCash({
      oTokenContract: fakeContract,
    });

    expect(callMock).toHaveBeenCalledTimes(1);
    expect(getCashMock).toHaveBeenCalledTimes(1);
    expect(response).toEqual({
      cashWei: new BigNumber(fakeCashWei),
    });
  });
});
