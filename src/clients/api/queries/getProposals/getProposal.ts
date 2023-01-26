import { VError } from 'errors';
import { formatToProposal, restService } from 'utilities';

import { GetProposalInput, GetProposalOutput, ProposalDetailApiResponse } from './types';

const getProposal = async ({ id }: GetProposalInput): Promise<GetProposalOutput> => {
  const response = await restService<ProposalDetailApiResponse>({
    endpoint: `/proposal/${id}`,
    method: 'GET',
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

  const convertedPayload = {
    ...payload.data,
    for_votes: payload.data.forVotes,
    against_votes: payload.data.againstVotes,
    start_block: payload.data.startBlock,
    start_tx_hash: payload.data.startTxHash,
    start_timestamp: payload.data.startTimestamp,
    cancel_block: payload.data.cancelBlock,
    cancel_tx_hash: payload.data.cancelTxHash,
    cancel_timestamp: payload.data.cancelTimestamp,
    end_block: payload.data.endBlock,
    end_tx_hash: payload.data.endTxHash,
    end_timestamp: payload.data.endTimestamp,
    voter_count: payload.data.voterCount,
    created_at: payload.data.createdAt,
    updated_at: payload.data.updatedAt,
  };

  return formatToProposal(convertedPayload);
};

export default getProposal;
