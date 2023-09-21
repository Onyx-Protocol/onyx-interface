import BigNumber from 'bignumber.js';

import { XcnStaking } from 'types/contracts';

export interface GetPriorVotesInput {
  xcnStakingContract: XcnStaking;
  accountAddress: string;
  blockNumber: number;
}

export type GetPriorVotesOutput = {
  priorVotes: BigNumber;
};

const getPriorVotes = async ({
  xcnStakingContract,
  accountAddress,
  blockNumber,
}: GetPriorVotesInput): Promise<GetPriorVotesOutput> => {
  const resp = await xcnStakingContract.methods
    .getPriorVotes(0, accountAddress, blockNumber)
    .call();
  return {
    priorVotes: new BigNumber(resp),
  };
};

export default getPriorVotes;
