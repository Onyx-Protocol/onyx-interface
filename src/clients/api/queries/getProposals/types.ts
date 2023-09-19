import { Proposal } from 'types';

export interface GetProposalsInput {
  limit?: number;
  page?: number;
}

export interface GetProposalInput {
  id: number | string;
}

export enum ProposalState {
  PENDING = 'pending',
  CANCELED = 'canceled',
  QUEUED = 'queued',
  EXECUTED = 'executed',
}

export interface ProposalApiResponse {
  id: string;
  proposer: string;
  targets: string[];
  values: string[];
  signatures: string[];
  callDatas: string[];
  startBlock: string;
  endBlock: string;
  description: string;
  state: ProposalState;
  eta: string;
  forVotes: string;
  againstVotes: string;
  createdBlockNumber: string;
  createdBlockTimestamp: string;
  createdTransactionHash: string;
  queuedBlockNumber: string | null;
  queuedBlockTimestamp: string | null;
  queuedTransactionHash: string | null;
  executedBlockNumber: string | null;
  executedBlockTimestamp: string | null;
  executedTransactionHash: string | null;
  canceledBlockNumber: string | null;
  canceledBlockTimestamp: string | null;
  canceledTransactionHash: string | null;
}

export interface ProposalsApiResponse {
  proposals: ProposalApiResponse[];
}

export interface ProposalDetailApiResponse {
  proposals: ProposalApiResponse;
}

export interface GetProposalsOutput {
  total: number;
  proposals: Proposal[];
}

export type GetProposalOutput = Proposal;
