import { checkForTokenTransactionError } from 'errors';

const burnFiPunk = async ({ fiPunkContract, id, accountAddress }: any): Promise<any> => {
  const resp = await fiPunkContract.methods.burn(id).send({ from: accountAddress });

  return checkForTokenTransactionError(resp);
};

export default burnFiPunk;
