import BigNumber from 'bignumber.js';

import { Eth20, XcnToken } from 'types/contracts';

export interface GetAllowanceInput {
  tokenContract: XcnToken | Eth20;
  accountAddress: string;
  spenderAddress: string;
}

export type GetAllowanceOutput = {
  allowanceWei: BigNumber;
};

const getAllowance = async ({
  tokenContract,
  accountAddress,
  spenderAddress,
}: GetAllowanceInput): Promise<GetAllowanceOutput> => {
  const res = await tokenContract.methods.allowance(accountAddress, spenderAddress).call();

  return {
    allowanceWei: new BigNumber(res),
  };
};

export default getAllowance;
