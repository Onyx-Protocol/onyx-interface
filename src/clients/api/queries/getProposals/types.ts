import { Proposal } from 'types';

export interface GetProposalsInput {
  limit?: number;
  page?: number;
}

export interface GetProposalInput {
  id: number | string;
}

export interface ProposalApiResponse {
  call_datas?: string | null;
  callDatas?: string | null;
  signatures: string;
  targets: string;
  values: string;
  against_votes?: string | null;
  againstVotes?: string | null;
  cancel_block?: number | null;
  cancel_timestamp?: number | null;
  cancel_tx_hash?: string | null;
  cancelBlock?: number | null;
  cancelTimestamp?: number | null;
  cancelTxHash?: string | null;
  canceled: number | boolean;
  created_at?: string | null;
  createdAt?: string | null;
  created_block: number | null;
  created_timestamp: number | null;
  created_tx_hash?: string | null;
  description: string;
  end_block?: number;
  end_timestamp?: number | null;
  end_tx_hash?: string | null;
  endBlock?: number;
  endTimestamp?: number | null;
  endTxHash?: string | null;
  eta: number;
  executed: number | boolean;
  executed_block: number | null;
  executed_timestamp: number | null;
  executed_tx_hash: string | null;
  for_votes?: string | null;
  forVotes?: string | null;
  id: number;
  proposer: string;
  queued_block: number | null;
  queued_timestamp: number | null;
  queued_tx_hash: string | null;
  start_block?: number | null;
  start_timestamp?: number;
  start_tx_hash?: string | null;
  startBlock?: number | null;
  startTimestamp?: number;
  startTxHash?: string | null;
  state:
    | 'Pending'
    | 'Active'
    | 'Canceled'
    | 'Defeated'
    | 'Successded'
    | 'Queued'
    | 'Expired'
    | 'Executed';
  // JSON
  updated_at?: string | null;
  updatedAt?: string | null;
  voter_count?: number | null;
  voterCount?: number | null;
}

export interface ProposalsApiResponse {
  data: ProposalApiResponse[];
  metadata: {
    page: number;
    limit: number;
    totalItem: number;
    totalPage: number;
  };
}

export interface ProposalDetailApiResponse {
  data: ProposalApiResponse;
  metadata: {
    page: number;
  };
}

export interface GetProposalsOutput {
  page: number;
  limit: number;
  total: number;
  proposals: Proposal[];
}

export type GetProposalOutput = Proposal;
