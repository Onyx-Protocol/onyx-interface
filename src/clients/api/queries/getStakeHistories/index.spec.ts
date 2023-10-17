import { VError } from 'errors';
import { restService } from 'utilities';

import proposalResponse from '__mocks__/api/stakeHistories.json';

import getStakeHistories from '.';

jest.mock('utilities/restService');

describe('api/queries/getProposals', () => {
  test('throws an error when request fails', async () => {
    const fakeErrorMessage = 'Fake error message';

    (restService as jest.Mock).mockImplementationOnce(async () => ({
      result: 'error',
      status: false,
      message: fakeErrorMessage,
    }));

    try {
      await getStakeHistories({ address: '0x0000000000000000000000000000000000000000' });

      throw new Error('getProposals should have thrown an error but did not');
    } catch (error) {
      expect(error).toBeInstanceOf(VError);
      if (error instanceof VError) {
        expect(error.type).toBe('unexpected');
        expect(error.code).toBe('somethingWentWrong');
        expect(error.message).toBe('somethingWentWrong');
        expect(error.data.message).toBe(fakeErrorMessage);
      }
    }
  });

  test('returns formatted proposals', async () => {
    (restService as jest.Mock).mockImplementationOnce(async () => ({
      status: 200,
      data: { data: proposalResponse, limit: 20, offset: 20 },
    }));

    const response = await getStakeHistories({
      limit: 10,
      page: 2,
      address: '0x0000000000000000000000000000000000000000',
    });

    expect(restService).toBeCalledWith({
      endpoint: '/staking/history',
      gov: true,
      method: 'GET',
      params: {
        address: '0x0000000000000000000000000000000000000000',
        limit: 10,
        page: 3,
      },
    });

    expect(response).toMatchSnapshot();
  });

  test('Gets called with correct default arguments', async () => {
    (restService as jest.Mock).mockImplementationOnce(async () => ({
      status: 200,
      data: { data: proposalResponse },
    }));

    const response = await getStakeHistories({
      address: '0x0000000000000000000000000000000000000000',
    });

    expect(restService).toBeCalledWith({
      endpoint: '/staking/history',
      gov: true,
      method: 'GET',
      params: {
        address: '0x0000000000000000000000000000000000000000',
        limit: 6,
        page: 2,
      },
    });

    expect(response).toMatchSnapshot();
  });
});
