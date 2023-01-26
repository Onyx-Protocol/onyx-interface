import BigNumber from 'bignumber.js';
import { checkForTokenTransactionError } from 'errors';
import type { TransactionReceipt } from 'web3-core';

import { OEth20, OEthToken } from 'types/contracts';

export interface RedeemUnderlyingInput {
  oTokenContract: OEth20 | OEthToken;
  accountAddress: string;
  amountWei: BigNumber;
}

export type RedeemUnderlyingOutput = TransactionReceipt;

const redeemUnderlying = async ({
  oTokenContract,
  accountAddress,
  amountWei,
}: RedeemUnderlyingInput): Promise<RedeemUnderlyingOutput> => {
  const resp = await oTokenContract.methods
    .redeemUnderlying(amountWei.toFixed())
    .send({ from: accountAddress });

  return checkForTokenTransactionError(resp);
};

export default redeemUnderlying;
