import { checkForTokenTransactionError } from 'errors';

import { Wpunks } from 'types/contracts';

const burnWPunks = async ({
  WPunksContract,
  id,
  accountAddress,
}: {
  WPunksContract: Wpunks;
  id: string;
  accountAddress: string;
}) => {
  const resp = await WPunksContract.methods.burn(id).send({ from: accountAddress });

  return checkForTokenTransactionError(resp);
};

export default burnWPunks;
