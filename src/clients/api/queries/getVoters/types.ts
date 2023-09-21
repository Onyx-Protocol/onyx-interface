import { VotersDetails } from 'types';

export interface GetVotersInput {
  id: string;
  support?: boolean;
  limit?: number;
}

export interface VoterResult {
  id: string;
  proposal: string;
  address: string;
  support: boolean;
  votes: string;
  blockNumber: string;
  blockTimestamp: string;
  transactionHash: string;
}

export type GetVotersOutput = VotersDetails;
