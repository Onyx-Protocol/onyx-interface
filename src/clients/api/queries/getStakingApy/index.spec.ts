import BigNumber from 'bignumber.js';

import { XcnStaking } from 'types/contracts';

import getStakingApy from '.';

describe('api/queries/getStakingApy', () => {
  test('throws an error when request fails', async () => {
    const fakeContract = {
      methods: {
        poolInfo: () => ({
          call: async () => {
            throw new Error('Fake error message');
          },
        }),
      },
    } as unknown as XcnStaking;

    try {
      await getStakingApy({
        xcnStakingContract: fakeContract,
      });

      throw new Error('getVrtBalanceOf should have thrown an error but did not');
    } catch (error) {
      expect(error).toMatchInlineSnapshot('[Error: Fake error message]');
    }
  });

  test('returns staking apy on success', async () => {
    const poolInfoFakeOutput = {
      totalAmountStake: '100',
    };
    const rewardPerBlockFakeOutput = '10';

    const poolInfoCallMock = jest.fn(async () => poolInfoFakeOutput);
    const poolInfoMock = jest.fn(() => ({
      call: poolInfoCallMock,
    }));

    const rewardPerBlockCallMock = jest.fn(async () => rewardPerBlockFakeOutput);
    const rewardPerBlockMock = jest.fn(() => ({
      call: rewardPerBlockCallMock,
    }));

    const fakeContract = {
      methods: {
        poolInfo: poolInfoMock,
        rewardPerBlock: rewardPerBlockMock,
      },
    } as unknown as XcnStaking;

    const response = await getStakingApy({
      xcnStakingContract: fakeContract,
    });

    expect(poolInfoCallMock).toHaveBeenCalledTimes(1);
    expect(poolInfoCallMock).toHaveBeenCalledTimes(1);
    expect(poolInfoCallMock).toHaveBeenCalledWith();
    expect(response).toEqual({
      apy: new BigNumber(rewardPerBlockFakeOutput)
        .times(6400 * 365)
        .div(new BigNumber(poolInfoFakeOutput.totalAmountStake))
        .times(100),
    });
  });
});
