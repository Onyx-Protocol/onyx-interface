import BigNumber from 'bignumber.js';

import { GetVoterAccountsMetadata, GetVoterAccountsResponse } from './types';

const formatVoterResponse = (
  data: GetVoterAccountsResponse[],
  metadata: GetVoterAccountsMetadata,
) => ({
  limit: metadata.limit,
  page: metadata.page,
  total: metadata.totalItem,
  voterAccounts: data.map(d => ({
    rank: d.rank,
    address: d.address,
    chnStake: new BigNumber(d.chnStake),
    proposalsVoted: d.proposalsVoted,
    voteWeightPercent: Number(d.voteWeight),
  })),
});

export default formatVoterResponse;
