import BigNumber from 'bignumber.js';
import { VotersDetails } from 'types';

import indexedVotingSupportNames from 'constants/indexedVotingSupportNames';

import { GetVotersApiResponse } from './types';

const formatToVoter = (payload: GetVotersApiResponse): VotersDetails => ({
  result: payload.data.map(({ address, reason, votes, support, has_voted }) => ({
    address,
    voteWeightWei: new BigNumber(votes),
    reason: reason ?? undefined,
    support: has_voted ? indexedVotingSupportNames[support] : 'NOT_VOTED',
  })),
  sumVotes: new BigNumber(payload.metadata.sumVotes),
});

export default formatToVoter;
