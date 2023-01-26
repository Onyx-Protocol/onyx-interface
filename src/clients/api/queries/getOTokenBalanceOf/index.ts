import BigNumber from 'bignumber.js';

import { OEth20, OEthToken } from 'types/contracts';

export interface GetOTokenBalanceOfInput {
  oTokenContract: OEth20 | OEthToken;
  accountAddress: string;
}

export type GetOTokenBalanceOfOutput = {
  balanceWei: BigNumber;
};

const getOTokenBalanceOf = async ({
  oTokenContract,
  accountAddress,
}: GetOTokenBalanceOfInput): Promise<GetOTokenBalanceOfOutput> => {
  const res = await oTokenContract.methods.balanceOf(accountAddress).call();

  return {
    balanceWei: new BigNumber(res),
  };
};

export default getOTokenBalanceOf;
