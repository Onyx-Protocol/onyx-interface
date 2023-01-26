import BigNumber from 'bignumber.js';
import { getContractAddress } from 'utilities';

import { XcnLens } from 'types/contracts';

import getDailyXcn from '.';

const fakeAccountAddress = '0x000000000000000000000000000000000AcCoUnt';

describe('api/queries/getDailyXcn', () => {
  test('throws an error when request fails', async () => {
    const fakeContract = {
      methods: {
        getDailyXCN: () => ({
          call: async () => {
            throw new Error('Fake error message');
          },
        }),
      },
    } as unknown as XcnLens;

    try {
      await getDailyXcn({
        xcnLensContract: fakeContract,
        accountAddress: fakeAccountAddress,
      });

      throw new Error('getDailyXcn should have thrown an error but did not');
    } catch (error) {
      expect(error).toMatchInlineSnapshot('[Error: Fake error message]');
    }
  });

  test('returns the daily XCN wei on success', async () => {
    const fakeDailyXcnWei = '1000';

    const callMock = jest.fn(async () => fakeDailyXcnWei);
    const getDailyXCNMock = jest.fn(() => ({
      call: callMock,
    }));

    const fakeContract = {
      methods: {
        getDailyXCN: getDailyXCNMock,
      },
    } as unknown as XcnLens;

    const response = await getDailyXcn({
      xcnLensContract: fakeContract,
      accountAddress: fakeAccountAddress,
    });

    expect(getDailyXCNMock).toHaveBeenCalledTimes(1);
    expect(callMock).toHaveBeenCalledTimes(1);
    expect(getDailyXCNMock).toHaveBeenCalledWith(
      fakeAccountAddress,
      getContractAddress('comptroller'),
    );
    expect(response).toEqual({
      dailyXcnWei: new BigNumber(fakeDailyXcnWei),
    });
  });
});
