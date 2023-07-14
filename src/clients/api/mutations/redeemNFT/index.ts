import { checkForTokenTransactionError } from 'errors';

const redeemNFT = async ({
  tokenContract,
  accountAddress,
  tokenIds,
}: {
  tokenContract: any;
  accountAddress: string;
  tokenIds: string[];
}) => {
  const resp = await tokenContract.methods.redeems(tokenIds).send({ from: accountAddress });

  return checkForTokenTransactionError(resp);
};

export default redeemNFT;
