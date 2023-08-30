import { checkForTokenTransactionError } from 'errors';

import { OTokenEx } from 'types/contracts';

const redeemNFT = async ({
  tokenContract,
  accountAddress,
  tokenIds,
}: {
  tokenContract: OTokenEx;
  accountAddress: string;
  tokenIds: string[];
}) => {
  const resp = await tokenContract.methods.redeems(tokenIds).send({ from: accountAddress });

  return checkForTokenTransactionError(resp);
};

export default redeemNFT;
