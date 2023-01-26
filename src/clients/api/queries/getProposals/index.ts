import { VError } from 'errors';
import { formatToProposal, restService } from 'utilities';

import { GetProposalsInput, GetProposalsOutput, ProposalsApiResponse } from './types';

export * from './types';

const getProposals = async ({
  page = 1,
  limit = 5,
}: GetProposalsInput): Promise<GetProposalsOutput> => {
  const response = await restService<ProposalsApiResponse>({
    endpoint: '/proposal',
    method: 'GET',
    params: { page: page + 1, limit },
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

  const { limit: payloadLimit, totalItem: total, page: payloadPage } = payload.metadata;
  const proposals = payload.data.map(p => formatToProposal(p));

  return { proposals, limit: payloadLimit, total, page: payloadPage };
};

export default getProposals;
