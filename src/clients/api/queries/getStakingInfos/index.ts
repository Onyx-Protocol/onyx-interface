import BigNumber from 'bignumber.js';

import { XcnStaking } from 'types/contracts';

export interface GetStakingInfosInput {
  xcnStakingContract: XcnStaking;
  accountAddress: string;
}

export type GetStakingInfosOutput = {
  staked: BigNumber;
  earned: BigNumber;
};

const getStakingInfos = async ({
  xcnStakingContract,
  accountAddress,
}: GetStakingInfosInput): Promise<GetStakingInfosOutput> => {
  const respStaked = await xcnStakingContract.methods.getStakingAmount(0, accountAddress).call();
  const respEarned = await xcnStakingContract.methods.pendingReward(0, accountAddress).call();

  return {
    staked: new BigNumber(respStaked),
    earned: new BigNumber(respEarned),
  };
};

export default getStakingInfos;
