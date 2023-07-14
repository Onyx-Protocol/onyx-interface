import { checkForTokenTransactionError } from 'errors';

const burnWPunks = async ({
  WPunksContract,
  id,
  accountAddress,
}: {
  WPunksContract: any;
  id: string;
  accountAddress: string;
}) => {
  const resp = await WPunksContract.methods.burn(id).send({ from: accountAddress });

  return checkForTokenTransactionError(resp);
};

export default burnWPunks;
