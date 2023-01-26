import { VotersDetails } from 'types';

export interface GetVotersInput {
  id: string | number;
  // 0 - "for" votes, 1 – "against" votes, 2 – "abstain" votes
  // filter?: 0 | 1 | 2;
  support?: boolean;
  limit?: number;
  // offset?: number;
}

export interface VoterResult {
  id: string;
  address: string;
  has_voted: number;
  support: number;
  votes: string;
  proposal_id: number;
  block_number: number;
  block_timestamp: number;
  created_at: string;
  updated_at: string;
  reason?: string | null;
}

export interface GetVotersApiResponse {
  data: VoterResult[];
  metadata: {
    sumVotes: string;
    limit: number;
    totalItem: number;
  };
}

export type GetVotersOutput = VotersDetails;
