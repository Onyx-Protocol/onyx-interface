import { ProposalApiResponse } from '../getProposals';
import { VoterResult } from '../getVoters';

export type GetVoterHistoryResponse = Array<
  Omit<VoterResult, 'proposal'> & {
    proposal: ProposalApiResponse;
  }
>;
