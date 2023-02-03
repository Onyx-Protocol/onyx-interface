import BigNumber from 'bignumber.js';

import { XcnStaking } from 'types/contracts';

import getStakingApy from '.';

describe('api/queries/getStakingApy', () => {
  test('throws an error when request fails', async () => {
    const fakeContract = {
      methods: {
        getStakingApy: () => ({
          call: async () => {
            throw new Error('Fake error message');
          },
        }),
      },
    } as unknown as XcnStaking;

    try {
      await getStakingApy({
        xcnStakingContract: fakeContract,
      });

      throw new Error('getVrtBalanceOf should have thrown an error but did not');
    } catch (error) {
      expect(error).toMatchInlineSnapshot('[Error: Fake error message]');
    }
  });

  test('returns staking apy on success', async () => {
    const fakeOutput = '10';

    const callMock = jest.fn(async () => fakeOutput);
    const getStakingApyMock = jest.fn(() => ({
      call: callMock,
    }));

    const fakeContract = {
      methods: {
        getStakingApy: getStakingApyMock,
      },
    } as unknown as XcnStaking;

    const response = await getStakingApy({
      xcnStakingContract: fakeContract,
    });

    expect(getStakingApyMock).toHaveBeenCalledTimes(1);
    expect(callMock).toHaveBeenCalledTimes(1);
    expect(getStakingApyMock).toHaveBeenCalledWith();
    expect(response).toEqual({
      apy: new BigNumber(fakeOutput),
    });
  });
});
