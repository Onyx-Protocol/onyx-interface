import BigNumber from 'bignumber.js';
import { ContractCallResults } from 'ethereum-multicall';

import { BLOCKS_PER_DAY } from 'constants/ethereum';
import { COMPOUND_MANTISSA } from 'constants/compoundMantissa';
import { DAYS_PER_YEAR } from 'constants/daysPerYear';

import { OTokenApySnapshot } from './types';

const formatToApySnapshots = ({
  oTokenBalanceCallResults,
}: {
  oTokenBalanceCallResults: ContractCallResults;
}): OTokenApySnapshot[] => {
  const apySimulations: OTokenApySnapshot[] = [];
  const results = Object.values(oTokenBalanceCallResults.results)[0].callsReturnContext;

  let utilizationRate = 1;

  for (let i = 0; i < results.length; i += 2) {
    const borrowBase = new BigNumber(results[i].returnValues[0].hex)
      .div(COMPOUND_MANTISSA)
      .times(BLOCKS_PER_DAY)
      .plus(1);

    const borrowApyPercentage = borrowBase
      .pow(DAYS_PER_YEAR - 1)
      .minus(1)
      .times(100)
      .toNumber();

    const supplyBase = new BigNumber(results[i + 1].returnValues[0].hex)
      .div(COMPOUND_MANTISSA)
      .times(BLOCKS_PER_DAY)
      .plus(1);

    const supplyApyPercentage = supplyBase
      .pow(DAYS_PER_YEAR - 1)
      .minus(1)
      .times(100)
      .toNumber();

    apySimulations.push({
      utilizationRate,
      borrowApyPercentage,
      supplyApyPercentage,
    });

    utilizationRate += 1;
  }

  return apySimulations;
};

export default formatToApySnapshots;
