import BigNumber from 'bignumber.js';

import compTrollerResponses from '__mocks__/contracts/comptroller';
import { Comptroller } from 'types/contracts';

import getHypotheticalAccountLiquidity from '.';

describe('api/queries/getHypotheticalAccountLiquidity', () => {
  test('throws an error when request fails', async () => {
    const fakeContract = {
      methods: {
        getHypotheticalAccountLiquidity: () => ({
          call: async () => {
            throw new Error('Fake error message');
          },
        }),
      },
    } as unknown as Comptroller;

    try {
      await getHypotheticalAccountLiquidity({
        comptrollerContract: fakeContract,
        accountAddress: '0xq3k9',
        oTokenAddress: '0xq3k9',
        oTokenBalanceOfWei: new BigNumber(0),
        oTokenBorrowAmountWei: new BigNumber(0),
      });

      throw new Error('getHypotheticalAccountLiquidity should have thrown an error but did not');
    } catch (error) {
      expect(error).toMatchInlineSnapshot('[Error: Fake error message]');
    }
  });

  test('with account return asset with updated hypothetical Account Liquidity', async () => {
    const fakeContract = {
      methods: {
        getHypotheticalAccountLiquidity: () => ({
          call: async () => compTrollerResponses.getHypotheticalAccountLiquidity,
        }),
      },
    } as unknown as Comptroller;

    const response = await getHypotheticalAccountLiquidity({
      comptrollerContract: fakeContract,
      accountAddress: '0x34111',
      oTokenAddress: '0xq3k9',
      oTokenBalanceOfWei: new BigNumber(0),
      oTokenBorrowAmountWei: new BigNumber(0),
    });
    expect(response).toStrictEqual(compTrollerResponses.getHypotheticalAccountLiquidity);
  });
});
