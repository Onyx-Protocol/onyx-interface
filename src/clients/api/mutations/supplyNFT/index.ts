import { checkForTokenTransactionError } from 'errors';

const supplyNFT = async ({
  tokenContract,
  accountAddress,
  tokenIds,
}: any): Promise<any> => {
  const resp = await tokenContract.methods.mints(tokenIds).send({ from: accountAddress });

  return checkForTokenTransactionError(resp);
};

export default supplyNFT;
