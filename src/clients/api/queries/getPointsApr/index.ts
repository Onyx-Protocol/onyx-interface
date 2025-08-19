import BigNumber from 'bignumber.js';
import config from 'config';

import { TOKENS } from 'constants/tokens';
import getPointsInfoSubsquid from 'utilities/getPointsInfoSubsquid';

export interface GetPointsAprInput {
  totalStaked: BigNumber;
}

const fromWei = (value: BigNumber, decimals: number) =>
  value.dividedBy(new BigNumber(10).pow(decimals)).decimalPlaces(decimals);

const getPointsApr = async ({ totalStaked }: GetPointsAprInput): Promise<BigNumber> => {
  try {
    if (totalStaked.isZero()) {
      return new BigNumber(0);
    }

    const data = await getPointsInfoSubsquid(config.chainId);
    const { weight, pointsPerDay } = data;
    const totalStakedFromWei = fromWei(totalStaked, TOKENS.xcn.decimals);

    return new BigNumber(pointsPerDay ?? 0)
      .times(weight ?? 0)
      .times(365)
      .times(100)
      .div(totalStakedFromWei);
  } catch (error) {
    console.error('Error fetching points apr:', error);
    return new BigNumber(0);
  }
};

export default getPointsApr;
