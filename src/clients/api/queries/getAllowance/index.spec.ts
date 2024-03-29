import BigNumber from 'bignumber.js';

import { Eth20 } from 'types/contracts';

import getAllowance from '.';

const fakeAccountAddress = '0x000000000000000000000000000000000AcCoUnt';
const fakeSpenderAddress = '0x000000000000000000000000000000000sPeNdEr';

describe('api/queries/getAllowance', () => {
  test('throws an error when request fails', async () => {
    const fakeContract = {
      methods: {
        allowance: () => ({
          call: async () => {
            throw new Error('Fake error message');
          },
        }),
      },
    } as unknown as Eth20;

    try {
      await getAllowance({
        tokenContract: fakeContract,
        accountAddress: fakeAccountAddress,
        spenderAddress: fakeSpenderAddress,
      });

      throw new Error('getAllowance should have thrown an error but did not');
    } catch (error) {
      expect(error).toMatchInlineSnapshot('[Error: Fake error message]');
    }
  });

  test('returns the allowance on success', async () => {
    const fakeAllowanceWei = '10000';

    const callMock = jest.fn(async () => fakeAllowanceWei);
    const ethAllowanceMock = jest.fn(() => ({
      call: callMock,
    }));

    const fakeContract = {
      methods: {
        allowance: ethAllowanceMock,
      },
    } as unknown as Eth20;

    const response = await getAllowance({
      tokenContract: fakeContract,
      accountAddress: fakeAccountAddress,
      spenderAddress: fakeSpenderAddress,
    });

    expect(ethAllowanceMock).toHaveBeenCalledTimes(1);
    expect(callMock).toHaveBeenCalledTimes(1);
    expect(ethAllowanceMock).toHaveBeenCalledWith(fakeAccountAddress, fakeSpenderAddress);
    expect(response.allowanceWei instanceof BigNumber).toBe(true);
    expect(response).toEqual({
      allowanceWei: new BigNumber(fakeAllowanceWei),
    });
  });
});
