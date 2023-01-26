import { ProposalApiResponse } from '../getProposals';
import { VoterResult } from '../getVoters';

export interface GetVoterHistoryResponse {
  data: {
    voter: VoterResult;
    proposal: ProposalApiResponse;
  }[];
  metadata: {
    page: number;
    limit: number;
    totalItem: number;
    totalPage: number;
  };
}
