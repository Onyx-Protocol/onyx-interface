import BigNumber from 'bignumber.js';

export const SECONDS_PER_YEAR = new BigNumber(60 * 60 * 24 * 365);
/**
 * Get farm APY value in %
 * @param poolWeight allocationPoint / totalAllocationPoint
 * @param bowPriceUSD BOW price in USD
 * @param poolLiquidityUsd Total pool liquidity in USD
 * @returns
 */
const getFarmApy = (
  poolWeight: BigNumber,
  bowPriceUSD: BigNumber,
  poolLiquidityUsd: BigNumber,
  tokenPerSecond: BigNumber,
): number => {
  const yearlyCakeRewardAllocation = tokenPerSecond.times(SECONDS_PER_YEAR).times(poolWeight);
  const apy = yearlyCakeRewardAllocation.times(bowPriceUSD).div(poolLiquidityUsd).times(100);
  return apy.isNaN() || !apy.isFinite() ? 0 : apy.toNumber();
};

export default getFarmApy;
