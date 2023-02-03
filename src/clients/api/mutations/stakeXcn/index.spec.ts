import BigNumber from 'bignumber.js';
import { VError } from 'errors';

import stakeXcn from '.';

describe('api/mutation/stakeXcn', () => {
  test('throws an error when request fails', async () => {
    const fakeContract = {
      methods: {
        stakeXcn: () => ({
          send: async () => {
            throw new Error('Fake error message');
          },
        }),
      },
    } as any;

    try {
      await stakeXcn({
        xcnStakingContract: fakeContract,
        accountAddress: '0x32asdf',
        amount: new BigNumber(1000),
      });

      throw new Error('stakeXcn should have thrown an error but did not');
    } catch (error) {
      expect(error).toMatchInlineSnapshot('[Error: Fake error message]');
    }
  });

  test('throws a transaction error when Failure event is present', async () => {
    const fakeContract = {
      methods: {
        stakeXcn: () => ({
          send: async () => ({
            events: {
              Failure: {
                returnValues: {
                  info: '1',
                  error: '1',
                },
              },
            },
          }),
        }),
      },
    } as any;

    try {
      await stakeXcn({
        xcnStakingContract: fakeContract,
        accountAddress: '0x32asdf',
        amount: new BigNumber(1000),
      });

      throw new Error('stakeXcn should have thrown an error but did not');
    } catch (error) {
      expect(error).toBeInstanceOf(VError);
      if (error instanceof VError) {
        expect(error.type).toBe('transaction');
      }
    }
  });

  test('returns Receipt when request succeeds', async () => {
    const account = { address: '0x3d7598124C212d2121234cd36aFe1c685FbEd848' };
    const amount = new BigNumber(1000);
    const fakeTransactionReceipt = { events: {} };
    const sendMock = jest.fn(async () => fakeTransactionReceipt);
    const stakeXcnMock = jest.fn(() => ({
      send: sendMock,
    }));

    const fakeContract = {
      methods: {
        stakeXcn: stakeXcnMock,
      },
    } as unknown as any;

    const response = await stakeXcn({
      xcnStakingContract: fakeContract,
      accountAddress: account.address,
      amount,
    });

    expect(response).toBe(fakeTransactionReceipt);
    expect(stakeXcnMock).toHaveBeenCalledTimes(1);
    expect(sendMock).toHaveBeenCalledTimes(1);
    expect(sendMock).toHaveBeenCalledWith({ from: account.address });
  });
});
