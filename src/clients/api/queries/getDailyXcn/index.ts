import BigNumber from 'bignumber.js';
import { getContractAddress } from 'utilities';

import { XcnLens } from 'types/contracts';

export interface GetDailyXcnInput {
  xcnLensContract: XcnLens;
  accountAddress: string;
}

export type IGetDailyXcnOutput = {
  dailyXcnWei: BigNumber;
};

const comptrollerAddress = getContractAddress('comptroller');

const getDailyXcn = async ({
  xcnLensContract,
  accountAddress,
}: GetDailyXcnInput): Promise<IGetDailyXcnOutput> => {
  const response = await xcnLensContract.methods
    .getDailyXCN(accountAddress, comptrollerAddress)
    .call();

  return {
    dailyXcnWei: new BigNumber(response),
  };
};

export default getDailyXcn;
