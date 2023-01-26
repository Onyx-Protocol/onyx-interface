import { checkForTokenTransactionError } from 'errors';

const depositPunk = async ({ punkContract, userProxyAddress, id, accountAddress }: any): Promise<any> => {
  const resp = await punkContract.methods.transferPunk(userProxyAddress, id).send({ from: accountAddress });

  return checkForTokenTransactionError(resp);
};

export default depositPunk;
