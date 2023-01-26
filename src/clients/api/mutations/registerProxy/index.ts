import { checkForTokenTransactionError } from 'errors';

const registerProxy = async ({ fiPunkContract, accountAddress }: any): Promise<any> => {
  const resp = await fiPunkContract.methods.registerProxy().send({ from: accountAddress });

  return checkForTokenTransactionError(resp);
};

export default registerProxy;
