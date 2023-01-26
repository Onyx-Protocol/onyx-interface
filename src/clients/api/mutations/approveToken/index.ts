import type { TransactionReceipt } from 'web3-core';

import ALLOWANCE_AMOUNT_WEI from 'constants/allowanceAmountWei';
import { Eth20, XcnToken } from 'types/contracts';

export interface ApproveTokenInput {
  tokenContract: Eth20 | XcnToken;
  accountAddress: string;
  spenderAddress: string;
  allowance?: string;
}

export type ApproveTokenOutput = TransactionReceipt;

const approveToken = ({
  tokenContract,
  accountAddress,
  spenderAddress,
  allowance = ALLOWANCE_AMOUNT_WEI,
}: ApproveTokenInput): Promise<ApproveTokenOutput> =>
  tokenContract.methods.approve(spenderAddress, allowance).send({ from: accountAddress });

export default approveToken;
