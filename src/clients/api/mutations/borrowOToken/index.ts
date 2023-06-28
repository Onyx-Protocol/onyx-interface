import BigNumber from 'bignumber.js';
import { checkForTokenTransactionError } from 'errors';
import type { TransactionReceipt } from 'web3-core/types';
import { parseRPCErrorMessage, formatRPCErrorMessage } from 'utilities';

import { OTokenContract } from 'clients/contracts/types';

export interface BorrowOTokenInput {
  oTokenContract: OTokenContract<string>;
  fromAccountAddress: string;
  amountWei: BigNumber;
}

export type BorrowOTokenOutput = TransactionReceipt;

const borrowOToken = async ({
  oTokenContract,
  fromAccountAddress,
  amountWei,
}: BorrowOTokenInput): Promise<BorrowOTokenOutput> => {
  try {
    await oTokenContract.methods
    .borrow(amountWei.toFixed())
    .call({ from: fromAccountAddress });
  } catch (e: any) {
    throw new Error(formatRPCErrorMessage(parseRPCErrorMessage(e.message).originalError.message));
  }

  const resp = await oTokenContract.methods
    .borrow(amountWei.toFixed())
    .send({ from: fromAccountAddress });
  return checkForTokenTransactionError(resp);
};

export default borrowOToken;
