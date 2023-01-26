import { VError } from 'errors';

import address from '__mocks__/models/address';
import fakeTransactionReceipt from '__mocks__/models/transactionReceipt';
import {
  ComptrollerErrorReporterError,
  ComptrollerErrorReporterFailureInfo,
} from 'constants/contracts/errorReporter';
import { OETH_TOKENS } from 'constants/tokens';
import { Comptroller } from 'types/contracts';

import claimXcnReward from '.';
import getOTokenBalancesAll from '../../queries/getOTokenBalancesAll';

jest.mock('../../queries/getOTokenBalancesAll');

describe('api/mutation/claimXcnReward', () => {
  test('throws an error when request fails', async () => {
    (getOTokenBalancesAll as jest.Mock).mockImplementationOnce(async () => ({ balances: [] }));

    const fakeContract = {
      methods: {
        'claimXcn(address,address[])': () => ({
          send: async () => {
            throw new Error('Fake error message');
          },
        }),
      },
    } as unknown as Comptroller;

    try {
      await claimXcnReward({
        comptrollerContract: fakeContract,
        fromAccountAddress: address,
      });

      throw new Error('claimXcnReward should have thrown an error but did not');
    } catch (error) {
      expect(error).toMatchInlineSnapshot('[Error: Fake error message]');
    }
  });

  test('throws a transaction error when Failure event is present', async () => {
    (getOTokenBalancesAll as jest.Mock).mockImplementationOnce(async () => ({
      balances: [
        {
          balanceOf: '0',
          balanceOfUnderlying: '0',
          borrowBalanceCurrent: '0',
          tokenAllowance: '0',
          tokenBalance: '0',
          oToken: OETH_TOKENS.usdt.address,
        },
        {
          balanceOf: '0',
          balanceOfUnderlying: '0',
          borrowBalanceCurrent: '20000000',
          tokenAllowance: '0',
          tokenBalance: '0',
          oToken: OETH_TOKENS.wbtc.address,
        },
        {
          balanceOf: '0',
          balanceOfUnderlying: '100000000',
          borrowBalanceCurrent: '0',
          tokenAllowance: '0',
          tokenBalance: '0',
          oToken: OETH_TOKENS.eth.address,
        },
      ],
    }));

    const fakeContract = {
      methods: {
        'claimXcn(address,address[])': () => ({
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
    } as unknown as Comptroller;

    try {
      await claimXcnReward({
        comptrollerContract: fakeContract,
        fromAccountAddress: address,
      });

      throw new Error('claimXcnReward should have thrown an error but did not');
    } catch (error) {
      expect(error).toMatchInlineSnapshot(`[Error: ${ComptrollerErrorReporterError[1]}]`);
      expect(error).toBeInstanceOf(VError);
      if (error instanceof VError) {
        expect(error.type).toBe('transaction');
        expect(error.data.error).toBe(ComptrollerErrorReporterError[1]);
        expect(error.data.info).toBe(ComptrollerErrorReporterFailureInfo[1]);
      }
    }
  });

  test('send claim request with correct arguments and returns transaction receipt when request succeeds', async () => {
    (getOTokenBalancesAll as jest.Mock).mockImplementationOnce(async () => ({
      balances: [
        {
          balanceOf: '0',
          balanceOfUnderlying: '0',
          borrowBalanceCurrent: '0',
          tokenAllowance: '0',
          tokenBalance: '0',
          oToken: OETH_TOKENS.usdt.address,
        },
        {
          balanceOf: '0',
          balanceOfUnderlying: '0',
          borrowBalanceCurrent: '20000000',
          tokenAllowance: '0',
          tokenBalance: '0',
          oToken: OETH_TOKENS.wbtc.address,
        },
        {
          balanceOf: '0',
          balanceOfUnderlying: '100000000',
          borrowBalanceCurrent: '0',
          tokenAllowance: '0',
          tokenBalance: '0',
          oToken: OETH_TOKENS.eth.address,
        },
      ],
    }));

    const sendMock = jest.fn(async () => fakeTransactionReceipt);
    const claimXcnMock = jest.fn(() => ({
      send: sendMock,
    }));

    const fakeContract = {
      methods: {
        'claimXcn(address,address[])': claimXcnMock,
      },
    } as unknown as Comptroller;

    const response = await claimXcnReward({
      comptrollerContract: fakeContract,
      fromAccountAddress: address,
    });

    expect(response).toBe(fakeTransactionReceipt);
    expect(claimXcnMock).toHaveBeenCalledTimes(1);

    // @TODO [ONYX-198] Currently claiming all address until the pendingXcn function is updated with pending rewards
    const expectedOTokenAddresses = Object.values(OETH_TOKENS).map(oToken => oToken.address);
    expect(claimXcnMock).toHaveBeenCalledWith(address, expectedOTokenAddresses);
    expect(sendMock).toHaveBeenCalledTimes(1);
    expect(sendMock).toHaveBeenCalledWith({ from: address });
  });
});
