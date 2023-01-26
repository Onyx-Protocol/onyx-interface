import { checkForComptrollerTransactionError } from 'errors';
import type { TransactionReceipt } from 'web3-core/types';

import { OETH_TOKENS } from 'constants/tokens';
import { Comptroller } from 'types/contracts';

export interface ClaimXcnRewardInput {
  comptrollerContract: Comptroller;
  fromAccountAddress: string;
}

export type ClaimXcnRewardOutput = TransactionReceipt;

const claimXcnReward = async ({
  comptrollerContract,
  fromAccountAddress,
}: ClaimXcnRewardInput): Promise<ClaimXcnRewardOutput> => {
  // Fetch list of tokens for which user have a positive balance, since these
  // are the tokens susceptible to have generated XCN rewards
  const oTokenAddresses = Object.values(OETH_TOKENS).map(oToken => oToken.address);
  // @TODO [ONYX-198] - use xcn lens to fetch rewards by addresses once it is upgraded with this functionality
  // Send query to claim XCN reward
  const resp = await comptrollerContract.methods['claimXcn(address,address[])'](
    fromAccountAddress,
    oTokenAddresses,
  ).send({
    from: fromAccountAddress,
  });
  return checkForComptrollerTransactionError(resp);
};

export default claimXcnReward;
