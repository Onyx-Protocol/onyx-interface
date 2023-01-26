import BigNumber from 'bignumber.js';

import fakeAddress from '__mocks__/models/address';
import { OEth20 } from 'types/contracts';

import getOTokenBalance from '.';

describe('api/queries/getOTokenBalance', () => {
  test('throws an error when request fails', async () => {
    const fakeContract = {
      methods: {
        balanceOf: () => ({
          call: async () => {
            throw new Error('Fake error message');
          },
        }),
      },
    } as unknown as OEth20;

    try {
      await getOTokenBalance({
        oTokenContract: fakeContract,
        accountAddress: fakeAddress,
      });

      throw new Error('getOTokenBalance should have thrown an error but did not');
    } catch (error) {
      expect(error).toMatchInlineSnapshot('[Error: Fake error message]');
    }
  });

  test('returns the balance on success', async () => {
    const fakeBalanceWei = '1000';

    const callMock = jest.fn(async () => fakeBalanceWei);
    const getBalanceOfMock = jest.fn(() => ({
      call: callMock,
    }));

    const fakeContract = {
      methods: {
        balanceOf: getBalanceOfMock,
      },
    } as unknown as OEth20;

    const response = await getOTokenBalance({
      oTokenContract: fakeContract,
      accountAddress: fakeAddress,
    });

    expect(getBalanceOfMock).toHaveBeenCalledTimes(1);
    expect(callMock).toHaveBeenCalledTimes(1);
    expect(getBalanceOfMock).toHaveBeenCalledWith(fakeAddress);
    expect(response).toEqual({
      balanceWei: new BigNumber(fakeBalanceWei),
    });
  });
});
