import BigNumber from 'bignumber.js';

const PROPOSAL_QUORUM_VOTES = new BigNumber(10).pow(27).multipliedBy(2);

export default PROPOSAL_QUORUM_VOTES;
