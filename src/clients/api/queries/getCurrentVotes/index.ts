import BigNumber from 'bignumber.js';

import { XcnStaking } from 'types/contracts';

export interface GetCurrentVotesInput {
  xcnStakingContract: XcnStaking;
  accountAddress: string;
}

export type GetCurrentVotesOutput = {
  votesWei: BigNumber;
};

const getCurrentVotes = async ({
  xcnStakingContract,
  accountAddress,
}: GetCurrentVotesInput): Promise<GetCurrentVotesOutput> => {
  const resp = await xcnStakingContract.methods.getStakingAmount(0, accountAddress).call();
  return {
    votesWei: new BigNumber(resp),
  };
};

export default getCurrentVotes;
