import BigNumber from 'bignumber.js';

import { XcnStaking } from 'types/contracts';

import getStakingInfos from '.';

const fakeAccountAddress = '0x000000000000000000000000000000000AcCoUnt';

describe('api/queries/getStakingInfos', () => {
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
    const poolInfoFakeOutput = {
      totalAmountStake: '100',
    };
    const rewardPerBlockFakeOutput = '10';
    const getStakingAmountFakeOutput = '10000000000000000000';
    const pendingRewardFakeOutput = '10000000000000000000';

    const poolInfoCallMock = jest.fn(async () => poolInfoFakeOutput);
    const poolInfoMock = jest.fn(() => ({
      call: poolInfoCallMock,
    }));

    const rewardPerBlockCallMock = jest.fn(async () => rewardPerBlockFakeOutput);
    const rewardPerBlockMock = jest.fn(() => ({
      call: rewardPerBlockCallMock,
    }));

    const getStakingAmountCallMock = jest.fn(async () => getStakingAmountFakeOutput);
    const getStakingAmountMock = jest.fn(() => ({
      call: getStakingAmountCallMock,
    }));

    const pendingRewardCallMock = jest.fn(async () => pendingRewardFakeOutput);
    const pendingRewardMock = jest.fn(() => ({
      call: pendingRewardCallMock,
    }));

    const fakeContract = {
      methods: {
        poolInfo: poolInfoMock,
        rewardPerBlock: rewardPerBlockMock,
        getStakingAmount: getStakingAmountMock,
        pendingReward: pendingRewardMock,
      },
    } as unknown as XcnStaking;

    const response = await getStakingInfos({
      xcnStakingContract: fakeContract,
      accountAddress: fakeAccountAddress,
    });

    expect(poolInfoCallMock).toHaveBeenCalledTimes(1);
    expect(poolInfoCallMock).toHaveBeenCalledTimes(1);
    expect(getStakingAmountCallMock).toHaveBeenCalledWith();
    expect(response).toEqual({
      totalStaked: new BigNumber(poolInfoFakeOutput.totalAmountStake),
      rewardPerBlock: new BigNumber(rewardPerBlockFakeOutput),
      staked: new BigNumber(getStakingAmountFakeOutput),
      earned: new BigNumber(pendingRewardFakeOutput),
    });
  });
});
