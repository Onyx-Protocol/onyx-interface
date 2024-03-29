import BigNumber from 'bignumber.js';
import { VError } from 'errors';

import fakeTransactionReceipt from '__mocks__/models/transactionReceipt';
import {
  VaiVaultErrorReporterError,
  VaiVaultErrorReporterInfo,
} from 'constants/contracts/errorReporter';
import { MasterChef } from 'types/contracts';

import stakeInFarm from '.';

const fakePid = 0;
const fakeAmountWei = new BigNumber('1000000000000');
const fakeFromAccountsAddress = '0x3d759121234cd36F8124C21aFe1c6852d2bEd848';

describe('api/mutation/stakeInFarm', () => {
  test('throws an error when request fails', async () => {
    const fakeContract = {
      methods: {
        deposit: () => ({
          send: async () => {
            throw new Error('Fake error message');
          },
        }),
      },
    } as unknown as MasterChef;

    try {
      await stakeInFarm({
        masterChefContract: fakeContract,
        fromAccountAddress: fakeFromAccountsAddress,
        pid: fakePid,
        amountWei: fakeAmountWei,
      });

      throw new Error('stakeInFarm should have thrown an error but did not');
    } catch (error) {
      expect(error).toMatchInlineSnapshot('[Error: Fake error message]');
    }
  });

  test('throws a transaction error when failure event is present', async () => {
    const fakeContract = {
      methods: {
        deposit: () => ({
          send: async () => ({
            events: {
              Failure: {
                returnValues: {
                  info: '1',
                  error: '1',
                },
              },
            },
          }),
        }),
      },
    } as unknown as MasterChef;

    try {
      await stakeInFarm({
        masterChefContract: fakeContract,
        fromAccountAddress: fakeFromAccountsAddress,
        pid: fakePid,
        amountWei: fakeAmountWei,
      });

      throw new Error('stakeInFarm should have thrown an error but did not');
    } catch (error) {
      expect(error).toMatchInlineSnapshot(`[Error: ${VaiVaultErrorReporterError[1]}]`);
      expect(error).toBeInstanceOf(VError);
      if (error instanceof VError) {
        expect(error.type).toBe('transaction');
        expect(error.data.error).toBe(VaiVaultErrorReporterError[1]);
        expect(error.data.info).toBe(VaiVaultErrorReporterInfo[1]);
      }
    }
  });

  test('returns receipt when request succeeds', async () => {
    const sendMock = jest.fn(async () => fakeTransactionReceipt);
    const depositMock = jest.fn(() => ({
      send: sendMock,
    }));

    const fakeContract = {
      methods: {
        deposit: depositMock,
      },
    } as unknown as MasterChef;

    const response = await stakeInFarm({
      masterChefContract: fakeContract,
      fromAccountAddress: fakeFromAccountsAddress,
      pid: fakePid,
      amountWei: fakeAmountWei,
    });

    expect(response).toBe(fakeTransactionReceipt);
    expect(depositMock).toHaveBeenCalledTimes(1);
    expect(depositMock).toHaveBeenCalledWith(fakeAmountWei.toFixed());
    expect(sendMock).toHaveBeenCalledTimes(1);
    expect(sendMock).toHaveBeenCalledWith({ from: fakeFromAccountsAddress });
  });
});
