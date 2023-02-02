import type { TransactionReceipt } from 'web3-core';

import { XcnClaim } from 'types/contracts';

export interface ClaimXcnInput {
  xcnClaimContract: XcnClaim;
  accountAddress: string;
}

export type ClaimXcnOutput = TransactionReceipt;

const claimXcn = async ({
  xcnClaimContract,
  accountAddress,
}: ClaimXcnInput): Promise<ClaimXcnOutput> =>
  xcnClaimContract.methods.claimReward(0).send({ from: accountAddress });

export default claimXcn;
