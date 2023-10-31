import { VError } from 'errors';
import { restService } from 'utilities';

import voterAccountsResponse from '__mocks__/api/voterAccounts.json';

import getVoterAccounts from '.';

jest.mock('utilities/restService');

describe('api/queries/getVoterAccounts', () => {
  test('throws an error when request fails', async () => {
    const fakeErrorMessage = 'Fake error message';

    (restService as jest.Mock).mockImplementationOnce(async () => ({
      result: 'error',
      status: false,
      message: fakeErrorMessage,
    }));

    try {
      await getVoterAccounts({});

      throw new Error('getVoterAccounts should have thrown an error but did not');
    } catch (error) {
      expect(error).toBeInstanceOf(VError);
      if (error instanceof VError) {
        expect(error.type).toBe('unexpected');
        expect(error.data.message).toBe('Fake error message');
      }
    }
  });

  test('returns formatted Voter Accounts', async () => {
    (restService as jest.Mock).mockImplementationOnce(async () => ({
      status: 200,
      data: voterAccountsResponse,
    }));

    const { voterAccounts } = await getVoterAccounts({
      page: 2,
    });

    expect(voterAccounts).toHaveLength(65);

    expect(restService).toBeCalledWith({
      endpoint: '/voter/account',
      gov: true,
      method: 'GET',
      params: {
        limit: 100,
        page: 1,
      },
    });

    expect(voterAccounts).toMatchSnapshot();
  });

  test('Gets called with correct default arguments', async () => {
    (restService as jest.Mock).mockImplementationOnce(async () => ({
      status: 200,
      data: voterAccountsResponse,
    }));

    const { voterAccounts } = await getVoterAccounts({});

    expect(voterAccounts).toHaveLength(65);
    expect(restService).toBeCalledWith({
      endpoint: '/voter/account',
      gov: true,
      method: 'GET',
      params: {
        limit: 100,
        page: 1,
      },
    });

    expect(voterAccounts).toMatchSnapshot();
  });
});
