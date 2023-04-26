import BigNumber from 'bignumber.js';
import { VError } from 'errors';

import fakeTransactionReceipt from '__mocks__/models/transactionReceipt';
import {
  VaiVaultErrorReporterError,
  VaiVaultErrorReporterInfo,
} from 'constants/contracts/errorReporter';
import { UniSwapRouter } from 'types/contracts';

import addLiquidity from '.';

const fakeToken1 = '0xc03Fa5e041BE9C8deD030D6dec7936cE67D78ae8';
const fakeToken2 = '0xcE546eE9E8Bc0732A1e0083ef578a19F79c73D74';
const fakeAmountWei1 = new BigNumber('1000000000000000000');
const fakeAmountWei2 = new BigNumber('1000000');
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
    } as unknown as UniSwapRouter;

    try {
      await addLiquidity({
        uniswapRouterContract: fakeContract,
        fromAccountAddress: fakeFromAccountsAddress,
        token1: fakeToken1,
        token2: fakeToken2,
        amountWei1: fakeAmountWei1,
        amountWei2: fakeAmountWei2,
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
    } as unknown as UniSwapRouter;

    try {
      await addLiquidity({
        uniswapRouterContract: fakeContract,
        fromAccountAddress: fakeFromAccountsAddress,
        token1: fakeToken1,
        token2: fakeToken2,
        amountWei1: fakeAmountWei1,
        amountWei2: fakeAmountWei2,
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
    } as unknown as UniSwapRouter;

    const response = await await addLiquidity({
      uniswapRouterContract: fakeContract,
      fromAccountAddress: fakeFromAccountsAddress,
      token1: fakeToken1,
      token2: fakeToken2,
      amountWei1: fakeAmountWei1,
      amountWei2: fakeAmountWei2,
    });

    expect(response).toBe(fakeTransactionReceipt);
    expect(depositMock).toHaveBeenCalledTimes(1);
    expect(sendMock).toHaveBeenCalledTimes(1);
    expect(sendMock).toHaveBeenCalledWith({ from: fakeFromAccountsAddress });
  });
});
