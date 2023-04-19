import BigNumber from 'bignumber.js';

import { XcnStaking } from 'types/contracts';

export interface GetStakingInfosInput {
  xcnStakingContract: XcnStaking;
  accountAddress: string;
}

export type GetStakingInfosOutput = {
  totalStaked: BigNumber;
  rewardPerBlock: BigNumber;
  staked: BigNumber;
  earned: BigNumber;
};

const getStakingInfos = async ({
  xcnStakingContract,
  accountAddress,
}: GetStakingInfosInput): Promise<GetStakingInfosOutput> => {
  const poolInfo = await xcnStakingContract.methods.poolInfo(0).call();
  const respRewardPerBlock = await xcnStakingContract.methods.rewardPerBlock().call();

  if (!accountAddress) {
    return {
      totalStaked: new BigNumber(poolInfo.totalAmountStake),
      rewardPerBlock: new BigNumber(respRewardPerBlock),
      staked: new BigNumber(0),
      earned: new BigNumber(0),
    };
  }

  const respStaked = await xcnStakingContract.methods.getStakingAmount(0, accountAddress).call();
  const respEarned = await xcnStakingContract.methods.pendingReward(0, accountAddress).call();

  return {
    totalStaked: new BigNumber(poolInfo.totalAmountStake),
    rewardPerBlock: new BigNumber(respRewardPerBlock),
    staked: new BigNumber(respStaked),
    earned: new BigNumber(respEarned),
  };
};

export default getStakingInfos;
