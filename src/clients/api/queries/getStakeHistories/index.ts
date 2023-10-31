import { VError } from 'errors';
import { formatToStakeHistory, restService } from 'utilities';

import {
  GetStakeHistoriesInput,
  GetStakeHistoriesOutput,
  StakeHistoriesApiResponse,
} from './types';

export * from './types';

const getStakeHistories = async ({
  page = 1,
  limit = 6,
  address,
}: GetStakeHistoriesInput): Promise<GetStakeHistoriesOutput> => {
  if (!address) {
    return { stakeHistories: [], limit, total: 0, page };
  }
  const response = await restService<StakeHistoriesApiResponse>({
    endpoint: '/staking/history',
    method: 'GET',
    params: { page: page + 1, limit, address },
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
    throw new VError({ type: 'unexpected', code: 'somethingWentWrong' });
  }

  const { limit: payloadLimit, totalItem: total, page: payloadPage } = payload.metadata;
  const stakeHistories = payload.data.map(p => formatToStakeHistory(p));

  return { stakeHistories, limit: payloadLimit, total, page: payloadPage };
};

export default getStakeHistories;
