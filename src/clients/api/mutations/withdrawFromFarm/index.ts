import BigNumber from 'bignumber.js';
import { checkForVaiVaultTransactionError } from 'errors';
import type { TransactionReceipt } from 'web3-core/types';

import { MasterChef } from 'types/contracts';

export interface WithdrawFromFarmInput {
  masterChefContract: MasterChef;
  fromAccountAddress: string;
  pid: number;
  amountWei: BigNumber;
}

export type WithdrawFromFarmOutput = TransactionReceipt;

const withdrawFromFarm = async ({
  masterChefContract,
  fromAccountAddress,
  pid,
  amountWei,
}: WithdrawFromFarmInput): Promise<WithdrawFromFarmOutput> => {
  const res = await masterChefContract.methods
    .withdraw(pid, amountWei.toFixed())
    .send({ from: fromAccountAddress });

  return checkForVaiVaultTransactionError(res);
};

export default withdrawFromFarm;
