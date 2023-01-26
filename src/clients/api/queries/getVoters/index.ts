import { VError } from 'errors';
import { restService } from 'utilities';

import formatToVoters from './formatToVoters';
import { GetVotersApiResponse, GetVotersInput, GetVotersOutput } from './types';

export * from './types';

const getVoters = async ({ id, support, limit }: GetVotersInput): Promise<GetVotersOutput> => {
  const response = await restService<GetVotersApiResponse>({
    endpoint: `/voter/${id}`,
    method: 'GET',
    params: {
      support,
      limit,
    },
    gov: true,
  });

  const payload = response.data?.data;

  // @todo Add specific api error handling
  // if ('result' in response && response.result === 'error') {
  //   throw new VError({
  //     type: 'unexpected',
  //     code: 'somethingWentWrong',
  //     data: { message: response.message },
  //   });
  // }

  if (!payload) {
    throw new VError({ type: 'unexpected', code: 'somethingWentWrong' });
  }

  return formatToVoters(payload);
};

export default getVoters;
