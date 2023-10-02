import { ProposalApiResponse } from '../getProposals';

export interface GetProposalVotesInput {
  address?: string;
}

export type ProposalVotesApiResponse = {
  id: string;
  proposal: ProposalApiResponse;
  address: string;
  support: boolean;
  votes: string;
  blockNumber: string;
  blockTimestamp: string;
  transactionHash: string;
};

export interface ProposalVotesDetailApiResponse {
  proposalsVotes: ProposalVotesApiResponse;
}

export interface GetProposalVotesOutput {
  total: number;
  proposalVotes: ProposalVotesApiResponse[];
}
