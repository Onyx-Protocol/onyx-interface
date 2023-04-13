import BigNumber from 'bignumber.js';
import { checkForVaiVaultTransactionError } from 'errors';
import type { TransactionReceipt } from 'web3-core/types';

import { MasterChef } from 'types/contracts';

export interface StakeInFarmInput {
  masterChefContract: MasterChef;
  fromAccountAddress: string;
  pid: number;
  amountWei: BigNumber;
}

export type StakeInFarmOutput = TransactionReceipt;

const stakeInFarm = async ({
  masterChefContract,
  fromAccountAddress,
  pid,
  amountWei,
}: StakeInFarmInput): Promise<StakeInFarmOutput> => {
  const resp = await masterChefContract.methods
    .deposit(pid, amountWei.toFixed())
    .send({ from: fromAccountAddress });
  return checkForVaiVaultTransactionError(resp);
};

export default stakeInFarm;
