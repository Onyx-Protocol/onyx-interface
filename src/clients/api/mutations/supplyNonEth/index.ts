import BigNumber from 'bignumber.js';
import { checkForTokenTransactionError } from 'errors';
import type { TransactionReceipt } from 'web3-core';

import { OEth20 } from 'types/contracts';

export interface SupplyNonEthInput {
  tokenContract: OEth20;
  account: string;
  amountWei: BigNumber;
}

export type SupplyNonEthOutput = TransactionReceipt;

const supplyNonEth = async ({
  tokenContract,
  account,
  amountWei,
}: SupplyNonEthInput): Promise<SupplyNonEthOutput> => {
  const resp = await tokenContract.methods.mint(amountWei.toFixed()).send({ from: account });
  return checkForTokenTransactionError(resp);
};

export default supplyNonEth;
