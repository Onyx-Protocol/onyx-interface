import { checkForTokenTransactionError } from 'errors';

const burnWPunks = async ({ WPunksContract, id, accountAddress }: any): Promise<any> => {
  const resp = await WPunksContract.methods.burn(id).send({ from: accountAddress });

  return checkForTokenTransactionError(resp);
};

export default burnWPunks;
