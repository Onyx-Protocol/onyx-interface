import { checkForTokenTransactionError } from 'errors';

const supplyNFT = async ({
  tokenContract,
  accountAddress,
  tokenIds,
}: {
  tokenContract: any;
  accountAddress: string;
  tokenIds: string[];
}): Promise<any> => {
  const resp = await tokenContract.methods.mints(tokenIds).send({ from: accountAddress });

  return checkForTokenTransactionError(resp);
};

export default supplyNFT;
