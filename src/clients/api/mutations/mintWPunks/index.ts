import { checkForTokenTransactionError } from 'errors';

import { Wpunks } from 'types/contracts';

const mintWPunks = async ({
  WPunksContract,
  id,
  accountAddress,
}: {
  WPunksContract: Wpunks;
  accountAddress: string;
  id: number | string;
}) => {
  const resp = await WPunksContract.methods.mint(id).send({ from: accountAddress });

  return checkForTokenTransactionError(resp);
};

export default mintWPunks;
