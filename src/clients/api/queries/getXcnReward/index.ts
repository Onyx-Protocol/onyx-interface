import BigNumber from 'bignumber.js';
import { getContractAddress } from 'utilities';

import { XcnLens } from 'types/contracts';

export interface GetXcnRewardInput {
  lensContract: XcnLens;
  accountAddress: string;
}

export type GetXcnRewardOutput = {
  xcnRewardWei: BigNumber;
};

const getXcnReward = async ({
  lensContract,
  accountAddress,
}: GetXcnRewardInput): Promise<GetXcnRewardOutput> => {
  const res = await lensContract.methods
    .pendingXcn(accountAddress, getContractAddress('comptroller'))
    .call();

  return {
    xcnRewardWei: new BigNumber(res),
  };
};

export default getXcnReward;
