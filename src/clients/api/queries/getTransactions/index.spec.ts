import { VError } from 'errors';
import { restService } from 'utilities';

import fakeAddress from '__mocks__/models/address';
import { transactionResponse } from '__mocks__/models/transactions';

import getTransactions from '.';

jest.mock('utilities/restService');

describe('api/queries/getTransactions', () => {
  test('throws an error when request fails', async () => {
    const fakeErrorMessage = 'Fake error message';

    (restService as jest.Mock).mockImplementationOnce(async () => ({
      result: 'error',
      status: false,
      message: fakeErrorMessage,
    }));

    try {
      await getTransactions({});

      throw new Error('getTransactions should have thrown an error but did not');
    } catch (error) {
      expect(error).toBeInstanceOf(VError);
      if (error instanceof VError) {
        expect(error.type).toBe('unexpected');
        expect(error.data.message).toBe('Fake error message');
      }
    }
  });

  test('returns transaction models', async () => {
    (restService as jest.Mock).mockImplementationOnce(async () => ({
      status: 200,
      data: { data: { result: transactionResponse }, limit: 20, page: 1, total: 40 },
    }));

    const { transactions } = await getTransactions({
      page: 2,
      event: 'Withdraw',
      order: 'event',
      address: fakeAddress,
      sort: 'asc',
    });

    expect(transactions).toHaveLength(20);

    expect(restService).toBeCalledWith({
      endpoint: '/user/history',
      method: 'GET',
      params: {
        action: 'Withdraw',
        asset: undefined,
        limit: 25,
        offset: 50,
        order: 'event',
        sort: 'asc',
        user_address: '0x3d759121234cd36F8124C21aFe1c6852d2bEd848',
        version: 'v2',
      },
    });

    expect(transactions).toMatchSnapshot();
  });

  test('Gets called with correct default arguments', async () => {
    (restService as jest.Mock).mockImplementationOnce(async () => ({
      status: 200,
      data: { data: { result: transactionResponse }, limit: 20, page: 1, total: 40 },
    }));

    const { transactions } = await getTransactions({});

    expect(transactions).toHaveLength(20);

    expect(restService).toBeCalledWith({
      endpoint: '/user/history',
      method: 'GET',
      params: {
        limit: 25,
        offset: 0,
        asset: undefined,
        order: 'blockNumber',
        action: undefined,
        user_address: undefined,
        sort: 'desc',
        version: 'v2',
      },
    });

    expect(transactions).toMatchSnapshot();
  });
});
