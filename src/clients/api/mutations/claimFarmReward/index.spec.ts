import fakeTransactionReceipt from '__mocks__/models/transactionReceipt';
import { MasterChef } from 'types/contracts';

import claimFarmReward from '.';

const fakePid = 0;
const fakeFromAccountsAddress = '0x3d759121234cd36F8124C21aFe1c6852d2bEd848';

describe('api/mutation/claimFarmReward', () => {
  test('throws an error when request fails', async () => {
    const fakeContract = {
      methods: {
        claim: () => ({
          send: async () => {
            throw new Error('Fake error message');
          },
        }),
      },
    } as unknown as MasterChef;

    try {
      await claimFarmReward({
        masterChefContract: fakeContract,
        fromAccountAddress: fakeFromAccountsAddress,
        pid: fakePid,
      });

      throw new Error('claimFarmReward should have thrown an error but did not');
    } catch (error) {
      expect(error).toMatchInlineSnapshot('[Error: Fake error message]');
    }
  });

  test('returns Receipt when request succeeds', async () => {
    const sendMock = jest.fn(async () => fakeTransactionReceipt);
    const claimMock = jest.fn(() => ({
      send: sendMock,
    }));

    const fakeContract = {
      methods: {
        claim: claimMock,
      },
    } as unknown as MasterChef;

    const response = await claimFarmReward({
      masterChefContract: fakeContract,
      fromAccountAddress: fakeFromAccountsAddress,
      pid: fakePid,
    });

    expect(response).toBe(fakeTransactionReceipt);
    expect(claimMock).toHaveBeenCalledTimes(1);
    expect(sendMock).toHaveBeenCalledTimes(1);
    expect(sendMock).toHaveBeenCalledWith({ from: fakeFromAccountsAddress });
  });
});
