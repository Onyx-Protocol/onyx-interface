import { checkForTokenTransactionError } from 'errors';

const mintWPunks = async ({ WPunksContract, id, accountAddress }: any): Promise<any> => {
  const resp = await WPunksContract.methods.mint(id).send({ from: accountAddress });

  return checkForTokenTransactionError(resp);
};

export default mintWPunks;
