import { checkForComptrollerTransactionError } from 'errors';
import type { TransactionReceipt } from 'web3-core';

import { Comptroller } from 'types/contracts';

export interface EnterMarketsInput {
  comptrollerContract: Comptroller;
  accountAddress?: string;
  oTokenAddresses: string[];
}

export type EnterMarketsOutput = TransactionReceipt;

const enterMarkets = async ({
  comptrollerContract,
  accountAddress,
  oTokenAddresses,
}: EnterMarketsInput): Promise<EnterMarketsOutput> => {
  const resp = await comptrollerContract.methods
    .enterMarkets(oTokenAddresses)
    .send({ from: accountAddress });
  return checkForComptrollerTransactionError(resp);
};

export default enterMarkets;
