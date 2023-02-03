import BigNumber from 'bignumber.js';

import { XcnStaking } from 'types/contracts';

export interface GetStakingApyInput {
  xcnStakingContract: XcnStaking;
}

export type GetStakingApyOutput = {
  apy: BigNumber;
};

const getStakingApy = async ({
  xcnStakingContract,
}: GetStakingApyInput): Promise<GetStakingApyOutput> => {
  const poolInfo = await xcnStakingContract.methods.poolInfo(0).call();
  const rewardPerBlock = await xcnStakingContract.methods.rewardPerBlock().call();
  return {
    apy: new BigNumber(rewardPerBlock)
      .times(6400 * 365)
      .div(new BigNumber(poolInfo.totalAmountStake))
      .times(100),
  };
};

export default getStakingApy;
