import BigNumber from 'bignumber.js';

import { Comptroller } from 'types/contracts';

export interface GetHypotheticalAccountLiquidityInput {
  comptrollerContract: Comptroller;
  accountAddress: string;
  oTokenAddress: string;
  oTokenBalanceOfWei: BigNumber;
  oTokenBorrowAmountWei?: BigNumber;
}

export type GetHypotheticalAccountLiquidityOutput = { 0: string; 1: string; 2: string };

const getHypotheticalAccountLiquidity = ({
  comptrollerContract,
  accountAddress,
  oTokenAddress,
  oTokenBalanceOfWei,
  oTokenBorrowAmountWei = new BigNumber(0),
}: GetHypotheticalAccountLiquidityInput): Promise<GetHypotheticalAccountLiquidityOutput> =>
  comptrollerContract.methods
    .getHypotheticalAccountLiquidity(
      accountAddress.toLowerCase(),
      oTokenAddress,
      oTokenBalanceOfWei.toFixed(),
      oTokenBorrowAmountWei.toFixed(),
    )
    .call();

export default getHypotheticalAccountLiquidity;
