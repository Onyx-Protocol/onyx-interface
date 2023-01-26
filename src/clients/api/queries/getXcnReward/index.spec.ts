import BigNumber from 'bignumber.js';

import fakeAddress from '__mocks__/models/address';
import { XcnLens } from 'types/contracts';

import getXcnReward from '.';

describe('api/queries/getXcnReward', () => {
  test('throws an error when one of XcnLens contract call fails', async () => {
    const lensContract = {
      methods: {
        pendingXcn() {
          return {
            call() {
              throw new Error('Fake error message');
            },
          };
        },
      },
    };

    try {
      await getXcnReward({
        lensContract: lensContract as unknown as XcnLens,
        accountAddress: fakeAddress,
      });

      throw new Error('getXcnReward should have thrown an error but did not');
    } catch (error) {
      expect(error).toMatchInlineSnapshot('[Error: Fake error message]');
    }
  });

  test('returns correct XCN reward amount in wei', async () => {
    const fakeOutput = '73680428998277363810000000000';

    const lensContract = {
      methods: {
        pendingXcn() {
          return {
            call() {
              return fakeOutput;
            },
          };
        },
      },
    };

    const res = await getXcnReward({
      lensContract: lensContract as unknown as XcnLens,
      accountAddress: fakeAddress,
    });

    expect(res).toEqual({
      xcnRewardWei: new BigNumber(fakeOutput),
    });
  });
});
