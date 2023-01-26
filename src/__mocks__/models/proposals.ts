import { formatToProposal } from 'utilities';

import { ProposalsApiResponse } from 'clients/api/queries/getProposals';

import proposalResponse from '../api/proposals.json';

const proposals = proposalResponse.data.map(p =>
  formatToProposal(p as ProposalsApiResponse['data'][number]),
);

export default proposals;
