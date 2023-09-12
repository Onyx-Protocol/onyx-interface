import { VError } from 'errors';

import { XcnClaim } from 'types/contracts';

import claimXcn from '.';

describe('api/mutation/claimXcn', () => {
  test('throws an error when request fails', async () => {
    const fakeContract = {
      methods: {
        claimXcn: () => ({
          send: async () => {
            throw new Error('Fake error message');
          },
        }),
      },
    } as unknown as XcnClaim;

    try {
      await claimXcn({
        xcnClaimContract: fakeContract as XcnClaim,
        accountAddress: '0x32asdf',
      });

      throw new Error('claimXcn should have thrown an error but did not');
    } catch (error) {
      expect(error).toMatchInlineSnapshot('[Error: Fake error message]');
    }
  });

  test('throws a transaction error when Failure event is present', async () => {
    const fakeContract = {
      methods: {
        claimXcn: () => ({
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
    } as unknown as XcnClaim;

    try {
      await claimXcn({
        xcnClaimContract: fakeContract,
        accountAddress: '0x32asdf',
      });

      throw new Error('claimXcn should have thrown an error but did not');
    } catch (error) {
      expect(error).toBeInstanceOf(VError);
      if (error instanceof VError) {
        expect(error.type).toBe('transaction');
      }
    }
  });

  test('returns Receipt when request succeeds', async () => {
    const account = { address: '0x3d7598124C212d2121234cd36aFe1c685FbEd848' };
    const fakeTransactionReceipt = { events: {} };
    const sendMock = jest.fn(async () => fakeTransactionReceipt);
    const claimXcnMock = jest.fn(() => ({
      send: sendMock,
    }));

    const fakeContract = {
      methods: {
        claimXcn: claimXcnMock,
      },
    } as unknown as XcnClaim;

    const response = await claimXcn({
      xcnClaimContract: fakeContract,
      accountAddress: account.address,
    });

    expect(response).toBe(fakeTransactionReceipt);
    expect(claimXcnMock).toHaveBeenCalledTimes(1);
    expect(sendMock).toHaveBeenCalledTimes(1);
    expect(sendMock).toHaveBeenCalledWith({ from: account.address });
  });
});
