import BigNumber from 'bignumber.js';
import { Multicall } from 'ethereum-multicall';

export interface GetOTokenInterestRatesInput {
  multicall: Multicall;
  reserveFactorMantissa: BigNumber;
  interestRateModelContractAddress: string;
}

export interface OTokenApySnapshot {
  utilizationRate: number;
  borrowApyPercentage: number;
  supplyApyPercentage: number;
}

export type GetOTokenApySimulationsOutput = {
  apySimulations: OTokenApySnapshot[];
};
