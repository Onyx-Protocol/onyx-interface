import BigNumber from 'bignumber.js';
import type { TransactionReceipt } from 'web3-core';

import { XcnStaking } from 'types/contracts';

export interface WithdrawXcnInput {
  xcnStakingContract: XcnStaking;
  accountAddress: string;
  amount: BigNumber;
}

export type WithdrawXcnOutput = TransactionReceipt;

const withdrawXcn = async ({
  xcnStakingContract,
  accountAddress,
  amount,
}: WithdrawXcnInput): Promise<WithdrawXcnOutput> =>
  xcnStakingContract.methods.withdraw(0, amount.toString(10)).send({ from: accountAddress });

export default withdrawXcn;
