import BigNumber from 'bignumber.js';

import { XcnStaking } from 'types/contracts';

import getStakingInfos from '.';

const fakeAccountAddress = '0x000000000000000000000000000000000AcCoUnt';

describe('api/queries/getStakingInfos', () => {
  test('throws an error when request fails', async () => {
    const fakeContract = {
      methods: {
        getStakingInfos: () => ({
          call: async () => {
            throw new Error('Fake error message');
          },
        }),
      },
    } as unknown as XcnStaking;

    try {
      await getStakingInfos({
        xcnStakingContract: fakeContract,
        accountAddress: fakeAccountAddress,
      });

      throw new Error('getVrtBalanceOf should have thrown an error but did not');
    } catch (error) {
      expect(error).toMatchInlineSnapshot('[Error: Fake error message]');
    }
  });

  test('returns staking infos on success', async () => {
    const fakeOutput = '1000';

    const callMock = jest.fn(async () => fakeOutput);
    const getStakingInfosMock = jest.fn(() => ({
      call: callMock,
    }));

    const fakeContract = {
      methods: {
        getStakingInfos: getStakingInfosMock,
      },
    } as unknown as XcnStaking;

    const response = await getStakingInfos({
      xcnStakingContract: fakeContract,
      accountAddress: fakeAccountAddress,
    });

    expect(getStakingInfosMock).toHaveBeenCalledTimes(1);
    expect(callMock).toHaveBeenCalledTimes(1);
    expect(getStakingInfosMock).toHaveBeenCalledWith(fakeAccountAddress);
    expect(response).toEqual({
      staked: new BigNumber(fakeOutput),
      earned: new BigNumber(fakeOutput),
    });
  });
});
