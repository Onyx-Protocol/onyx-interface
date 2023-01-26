import BigNumber from 'bignumber.js';
import { formatToProposal } from 'utilities';

import indexedVotingSupportNames from 'constants/indexedVotingSupportNames';

import { GetVoterHistoryResponse } from './types';

const formatVoterHistoryResponse = (data: GetVoterHistoryResponse) => ({
  limit: data.metadata.limit,
  page: data.metadata.page,
  total: data.metadata.totalItem,
  voterHistory: data.data.map(d => ({
    address: d.voter.address,
    blockNumber: d.voter.block_number,
    blockTimestamp: d.voter.block_timestamp,
    createdAt: new Date(d.voter.created_at),
    id: d.voter.id,
    proposal: formatToProposal(d.proposal),
    reason: d.voter.reason ? d.voter.reason : undefined,
    support: d.voter.has_voted ? indexedVotingSupportNames[d.voter.support] : 'NOT_VOTED',
    updatedAt: new Date(d.voter.updated_at),
    votesWei: new BigNumber(d.voter.votes),
  })),
});

export default formatVoterHistoryResponse;
