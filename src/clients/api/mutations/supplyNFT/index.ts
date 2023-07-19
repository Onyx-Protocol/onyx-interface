import { checkForTokenTransactionError } from 'errors';

import { OTokenEx } from 'types/contracts';

const supplyNFT = async ({
  tokenContract,
  accountAddress,
  tokenIds,
}: {
  tokenContract: OTokenEx;
  accountAddress: string;
  tokenIds: string[];
}) => {
  const resp = await tokenContract.methods.mints(tokenIds).send({ from: accountAddress });

  return checkForTokenTransactionError(resp);
};

export default supplyNFT;
