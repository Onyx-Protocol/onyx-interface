import BigNumber from 'bignumber.js';
import { Asset } from 'types';

import { assetData as assets } from '__mocks__/models/asset';

import {
  calculateYearlyEarningsForAsset,
  calculateYearlyEarningsForAssets,
} from './calculateYearlyEarnings';

describe('utilities/calculateYearlyEarnings', () => {
  test('calculates yearly Earnings for single asset', () => {
    const earnings = calculateYearlyEarningsForAsset({
      asset: assets[0] as Asset,
    });

    expect(earnings.toFixed()).toMatchInlineSnapshot('"6.01347989955426636283938"');
  });

  test('calculates yearly Earnings for array of assets', () => {
    const earnings = calculateYearlyEarningsForAssets({
      assets: assets as Asset[],
      isXcnEnabled: false,
      dailyXcnDistributionInterestsCents: new BigNumber('1'),
    });
    expect(earnings?.toFixed()).toMatchInlineSnapshot('"-6.8460208090305522483859"');
  });

  test('calculates yearly Earnings for array of assets, including XCN distribution', () => {
    const earnings = calculateYearlyEarningsForAssets({
      assets: assets as Asset[],
      isXcnEnabled: true,
      dailyXcnDistributionInterestsCents: new BigNumber('1'),
    });

    expect(earnings?.toFixed()).toMatchInlineSnapshot('"358.1539791909694477516141"');
  });
});
