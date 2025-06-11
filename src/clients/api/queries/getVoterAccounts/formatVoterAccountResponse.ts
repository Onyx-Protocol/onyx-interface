import BigNumber from 'bignumber.js';

import { GetVoterAccountsResponse } from './types';

const formatVoterResponse = (data: GetVoterAccountsResponse) => ({
  limit: data.metadata.limit,
  page: data.metadata.page,
  total: data.metadata.totalItem,
  totalStake: data.metadata.totalStake,
  voterAccounts: data.data.map(d => ({
    rank: d.rank,
    address: d.address,
    chnStake: new BigNumber(d.chnStake),
    proposalsVoted: d.proposalsVoted,
    voteWeightPercent: Number(d.voteWeight),
  })),
});

export default formatVoterResponse;
