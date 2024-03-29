import { VError } from 'errors';
import { VoterDetails } from 'types';
import { restService } from 'utilities';

import formatVoterDetailsResponse from './formatVoterDetailsResponse';
import { GetVoterDetailsResponse } from './types';

export interface GetVoterDetailsInput {
  address: string;
}

export type GetVoterDetailsOutput = VoterDetails;

const getVoterDetails = async ({
  address,
}: GetVoterDetailsInput): Promise<GetVoterDetailsOutput> => {
  const response = await restService<GetVoterDetailsResponse>({
    endpoint: `/voters/accounts/${address}?page=1&limit=100`,
    method: 'GET',
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
    throw new VError({ type: 'unexpected', code: 'somethingWentWrongRetrievingVoterDetails' });
  }

  return formatVoterDetailsResponse(payload, address);
};

export default getVoterDetails;
