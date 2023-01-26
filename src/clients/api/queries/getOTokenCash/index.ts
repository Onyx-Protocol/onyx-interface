import BigNumber from 'bignumber.js';

import { OEth20, OEthToken } from 'types/contracts';

export interface GetOTokenCashInput {
  oTokenContract: OEth20 | OEthToken;
}

export type GetOTokenCashOutput = {
  cashWei: BigNumber;
};

const getOTokenCash = async ({
  oTokenContract,
}: GetOTokenCashInput): Promise<GetOTokenCashOutput> => {
  const res = await oTokenContract.methods.getCash().call();

  return {
    cashWei: new BigNumber(res),
  };
};

export default getOTokenCash;
