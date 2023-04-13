import type { TransactionReceipt } from 'web3-core/types';

import { MasterChef } from 'types/contracts';

export interface ClaimFarmRewardInput {
  masterChefContract: MasterChef;
  fromAccountAddress: string;
  pid: number;
}

export type ClaimFarmRewardOutput = TransactionReceipt;

const claimVaiVaultReward = async ({
  masterChefContract,
  fromAccountAddress,
  pid,
}: ClaimFarmRewardInput): Promise<ClaimFarmRewardOutput> => {
  const resp = await masterChefContract.methods.deposit(pid, 0).send({ from: fromAccountAddress });
  return resp;
};

export default claimVaiVaultReward;
