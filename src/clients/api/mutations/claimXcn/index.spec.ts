import { XcnClaim } from 'types/contracts';

import claimXcn from '.';

describe('api/mutation/claimXcn', () => {
  test('throws an error when request fails', async () => {
    const fakeContract = {
      methods: {
        claimReward: () => ({
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

  test('returns Receipt when request succeeds', async () => {
    const account = { address: '0x3d7598124C212d2121234cd36aFe1c685FbEd848' };
    const fakeTransactionReceipt = { events: {} };
    const sendMock = jest.fn(async () => fakeTransactionReceipt);
    const claimXcnMock = jest.fn(() => ({
      send: sendMock,
    }));

    const fakeContract = {
      methods: {
        claimReward: claimXcnMock,
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
