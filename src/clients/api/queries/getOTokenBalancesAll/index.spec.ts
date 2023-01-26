import fakeAddress from '__mocks__/models/address';
import { XcnLens } from 'types/contracts';

import getOTokenBalancesAll from '.';

describe('api/queries/getOTokenBalancesAll', () => {
  test('throws an error when request fails', async () => {
    const fakeContract = {
      methods: {
        oTokenBalancesAll: () => ({
          call: async () => {
            throw new Error('Fake error message');
          },
        }),
      },
    } as unknown as XcnLens;

    try {
      await getOTokenBalancesAll({
        xcnLensContract: fakeContract,
        oTokenAddresses: [''],
        account: fakeAddress,
      });

      throw new Error('getOTokenBalancesAll should have thrown an error but did not');
    } catch (error) {
      expect(error).toMatchInlineSnapshot('[Error: Fake error message]');
    }
  });

  test('returns the APY simulations in the correct format on success', async () => {
    const oTokenBalancesAllCallMock = jest.fn(async () => [
      {
        balanceOf: '10000',
        balanceOfUnderlying: '20000',
        borrowBalanceCurrent: '300',
        tokenAllowance: '40000000000000000',
        tokenBalance: '5000',
        oToken: fakeAddress,
      },
    ]);

    const fakeContract = {
      methods: {
        oTokenBalancesAll: () => ({
          call: oTokenBalancesAllCallMock,
        }),
      },
    } as unknown as XcnLens;

    const response = await getOTokenBalancesAll({
      xcnLensContract: fakeContract,
      oTokenAddresses: [''],
      account: fakeAddress,
    });

    expect(oTokenBalancesAllCallMock).toHaveBeenCalledTimes(1);
    expect(response).toMatchSnapshot();
  });
});
