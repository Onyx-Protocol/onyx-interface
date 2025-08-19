import config from 'config';
import { VError } from 'errors';
import { restService } from 'utilities';

import getUserPointsSubsquid from 'utilities/getUserPointsSubsquid';

import formatUserInfoResponse from './formatUserInfoResponse';
import { GetUserInfoResponse } from './types';

export interface GetUserInfoInput {
  address: string;
}

export interface GetUserInfoOutput {
  points: number;
}

export const getUserInfo = async ({ address }: GetUserInfoInput): Promise<GetUserInfoOutput> => {
  const response = await restService<GetUserInfoResponse>({
    endpoint: `/users/${address}`,
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
    throw new VError({ type: 'unexpected', code: 'somethingWentWrongRetrievingUserInfo' });
  }

  return formatUserInfoResponse(payload);
};

export const getUserPoints = async (input: GetUserInfoInput): Promise<GetUserInfoOutput> => {
  const data = await getUserPointsSubsquid(config.chainId, input);
  return formatUserInfoResponse(data);
};
