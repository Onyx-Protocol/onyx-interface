import { checkForTokenTransactionError } from 'errors';

import { Wpunks } from 'types/contracts';

const registerProxy = async ({
  WPunksContract,
  accountAddress,
}: {
  WPunksContract: Wpunks;
  accountAddress: string;
}) => {
  const resp = await WPunksContract.methods.registerProxy().send({ from: accountAddress });

  return checkForTokenTransactionError(resp);
};

export default registerProxy;
