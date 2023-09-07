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
  values: number[];
  signatures: string[];
  callDatas: string[];
  startBlock: number;
  endBlock: number;
  description: string;
  state: ProposalState;
  eta: number;
  forVotes: number;
  againstVotes: number;
  createdBlockNumber: number;
  createdBlockTimestamp: number;
  createdTransactionHash: string;
  queuedBlockNumber: number | null;
  queuedBlockTimestamp: number | null;
  queuedTransactionHash: string | null;
  executedBlockNumber: number | null;
  executedBlockTimestamp: number | null;
  executedTransactionHash: string | null;
  canceledBlockNumber: number | null;
  canceledBlockTimestamp: number | null;
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
