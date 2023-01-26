import { checkForComptrollerTransactionError } from 'errors';
import type { TransactionReceipt } from 'web3-core';

import { Comptroller } from 'types/contracts';

export interface ExitMarketInput {
  comptrollerContract: Comptroller;
  accountAddress?: string;
  otokenAddress: string;
}

export type ExitMarketOutput = TransactionReceipt;

const exitMarket = async ({
  comptrollerContract,
  accountAddress,
  otokenAddress,
}: ExitMarketInput): Promise<ExitMarketOutput> => {
  const resp = await comptrollerContract.methods
    .exitMarket(otokenAddress)
    .send({ from: accountAddress });
  return checkForComptrollerTransactionError(resp);
};

export default exitMarket;
