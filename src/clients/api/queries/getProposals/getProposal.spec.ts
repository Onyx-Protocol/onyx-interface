import { restService } from 'utilities';

import proposalResponse from '__mocks__/api/proposals.json';

import getProposal from './getProposal';

jest.mock('utilities/restService');

describe('api/queries/getProposal', () => {
  test('returns proposal', async () => {
    (restService as jest.Mock).mockImplementationOnce(async () => ({
      status: 200,
      data: { data: proposalResponse.data[0] },
    }));

    const response = await getProposal({
      id: 1,
    });

    expect(response).toMatchSnapshot();
  });
});
