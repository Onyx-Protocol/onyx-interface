import { checkForTokenTransactionError } from 'errors';

const registerProxy = async ({ WPunksContract, accountAddress }: any): Promise<any> => {
  const resp = await WPunksContract.methods.registerProxy().send({ from: accountAddress });

  return checkForTokenTransactionError(resp);
};

export default registerProxy;
