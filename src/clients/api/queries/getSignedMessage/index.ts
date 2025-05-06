import { VError } from 'errors';
import { restService } from 'utilities';

import formatSignedMessageResponse from './formatSignedMessageResponse';
import { GetSignedMessageResponse } from './types';

export interface GetSignedMessageInput {
  address: string;
}

export interface GetSignedMessageOutput {
  signedMessage: string;
}

const getSignedMessage = async ({
  address,
}: GetSignedMessageInput): Promise<GetSignedMessageOutput> => {
  const response = await restService<GetSignedMessageResponse>({
    endpoint: `/users/generate-nonce/${address}`,
    method: 'GET',
    params: {},
    apiPoint: true,
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
    throw new VError({ type: 'unexpected', code: 'somethingWentWrongRetrievingSignedMessage' });
  }

  return formatSignedMessageResponse(payload);
};

export default getSignedMessage;
