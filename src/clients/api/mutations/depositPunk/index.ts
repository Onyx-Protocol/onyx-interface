import { checkForTokenTransactionError } from 'errors';

import { Punk } from 'types/contracts';

const depositPunk = async ({
  punkContract,
  userProxyAddress,
  id,
  accountAddress,
}: {
  punkContract: Punk;
  userProxyAddress: string;
  id: string | number;
  accountAddress: string;
}) => {
  const resp = await punkContract.methods
    .transferPunk(userProxyAddress, id)
    .send({ from: accountAddress });

  return checkForTokenTransactionError(resp);
};

export default depositPunk;
