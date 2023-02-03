import BigNumber from 'bignumber.js';
import type { TransactionReceipt } from 'web3-core';

import { XcnStaking } from 'types/contracts';

export interface StakeXcnInput {
  xcnStakingContract: XcnStaking;
  accountAddress: string;
  amount: BigNumber;
}

export type StakeXcnOutput = TransactionReceipt;

const stakeXcn = async ({
  xcnStakingContract,
  accountAddress,
  amount,
}: StakeXcnInput): Promise<StakeXcnOutput> =>
  xcnStakingContract.methods.stake(0, amount.toString(10)).send({ from: accountAddress });

export default stakeXcn;
