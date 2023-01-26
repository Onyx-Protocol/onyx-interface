import BigNumber from 'bignumber.js';
import { checkForTokenTransactionError } from 'errors';
import type { TransactionReceipt } from 'web3-core/types';

import { OTokenContract } from 'clients/contracts/types';
import MAX_UINT256 from 'constants/maxUint256';

export interface RepayNonEthOTokenInput {
  oTokenContract: OTokenContract<Exclude<string, 'eth'>>;
  fromAccountAddress: string;
  amountWei: BigNumber;
  isRepayingFullLoan?: boolean;
}

export type RepayNonEthOTokenOutput = TransactionReceipt;

const repayNonEthOToken = async ({
  oTokenContract,
  fromAccountAddress,
  amountWei,
  isRepayingFullLoan = false,
}: RepayNonEthOTokenInput): Promise<RepayNonEthOTokenOutput> => {
  const resp = await oTokenContract.methods
    .repayBorrow(isRepayingFullLoan ? MAX_UINT256.toFixed() : amountWei.toFixed())
    .send({ from: fromAccountAddress });
  return checkForTokenTransactionError(resp);
};

export default repayNonEthOToken;
