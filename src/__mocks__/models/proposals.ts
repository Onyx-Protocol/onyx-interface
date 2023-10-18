import BigNumber from 'bignumber.js';
import { formatToProposal } from 'utilities';

import { ProposalApiResponse } from '../../clients/api';

import proposalResponse from '../api/proposals.json';

const proposals = Promise.all(
  proposalResponse.data.map(p =>
    formatToProposal(p as unknown as ProposalApiResponse, new BigNumber(20000), {
      latestBlockNumber: 14636679,
      latestBlockTimestamp: 1,
    }),
  ),
);

export default proposals;
