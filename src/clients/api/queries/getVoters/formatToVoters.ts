import BigNumber from 'bignumber.js';
import { VotersDetails } from 'types';

import indexedVotingSupportNames from 'constants/indexedVotingSupportNames';

import { VoterResult } from './types';

const formatToVoter = (payload: VoterResult[]): VotersDetails => ({
  result: payload.map(({ address, votes, support }) => ({
    address,
    voteWeightWei: new BigNumber(votes),
    reason: undefined,
    support: indexedVotingSupportNames[Number(support)],
  })),
  sumVotes: payload.reduce((a, b) => a.plus(new BigNumber(b.votes)), new BigNumber(0)),
});

export default formatToVoter;
