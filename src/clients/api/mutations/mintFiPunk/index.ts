import { checkForTokenTransactionError } from 'errors';

const mintFiPunk = async ({ fiPunkContract, id, accountAddress }: any): Promise<any> => {
  const resp = await fiPunkContract.methods.mint(id).send({ from: accountAddress });

  return checkForTokenTransactionError(resp);
};

export default mintFiPunk;
