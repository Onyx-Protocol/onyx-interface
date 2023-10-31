import { VError } from 'errors';
import { VoterAccount } from 'types';
import { restService } from 'utilities';

import formatVoterAccountResponse from './formatVoterAccountResponse';
import { GetVoterAccountsMetadata, GetVoterAccountsResponse } from './types';

export interface GetVoterAccountsInput {
  page?: number;
}

export interface GetVoterAccountsOutput {
  voterAccounts: VoterAccount[];
  limit: number;
  page: number;
  total: number;
}

const getVoterAccounts = async ({
  page = 0,
}: GetVoterAccountsInput): Promise<GetVoterAccountsOutput> => {
  const response = await restService<GetVoterAccountsResponse[]>({
    endpoint: '/voter/account',
    method: 'GET',
    params: {
      limit: 100,
      page: page ? 1 : 1,
    },
    gov: true,
  });
  const payload = response.data?.data;

  // @todo Add specific api error handling
  if ('result' in response && response.result === 'error') {
    throw new VError({
      type: 'unexpected',
      code: 'somethingWentWrong',
      data: { message: response.message },
    });
  }

  if (!payload) {
    throw new VError({ type: 'unexpected', code: 'somethingWentWrongRetrievingVoterAccounts' });
  }

  const metadata: GetVoterAccountsMetadata = {
    page: page ? 1 : 1,
    limit: 100,
    totalItem: 100,
    totalPage: 1,
  };
  return formatVoterAccountResponse(payload, metadata);
};

export default getVoterAccounts;
