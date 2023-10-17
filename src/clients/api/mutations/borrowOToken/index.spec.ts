import BigNumber from 'bignumber.js';

import address from '__mocks__/models/address';
import { OTokenContract } from 'clients/contracts/types';

import borrowOToken from '.';

describe('api/mutation/borrowOToken', () => {
  test('throws an error when request fails', async () => {
    const fakeContract = {
      methods: {
        borrow: () => ({
          send: async () => {
            throw new Error('Fake error message');
          },
          call: async () => {},
        }),
      },
    } as unknown as OTokenContract<'xcn'>;

    try {
      await borrowOToken({
        oTokenContract: fakeContract,
        amountWei: new BigNumber('10000000000000000'),
        fromAccountAddress: address,
      });

      throw new Error('borrowOToken should have thrown an error but did not');
    } catch (error) {
      expect(error).toMatchInlineSnapshot('[Error: Fake error message]');
    }
  });

  test('returns transaction receipt when request succeeds', async () => {
    const fakeAmountWei = new BigNumber('10000000000000000');
    const fakeTransaction = { events: {} };
    const sendMock = jest.fn(async () => fakeTransaction);
    const borrowMock = jest.fn(() => ({
      send: sendMock,
      call: async () => {},
    }));

    const fakeContract = {
      methods: {
        borrow: borrowMock,
      },
    } as unknown as OTokenContract<'xcn'>;

    const response = await borrowOToken({
      oTokenContract: fakeContract,
      amountWei: fakeAmountWei,
      fromAccountAddress: address,
    });

    expect(response).toBe(fakeTransaction);
    expect(borrowMock).toHaveBeenCalledTimes(2);
    expect(borrowMock).toHaveBeenCalledWith(fakeAmountWei.toFixed());
    expect(sendMock).toHaveBeenCalledTimes(1);
    expect(sendMock).toHaveBeenCalledWith({ from: address });
  });
});
