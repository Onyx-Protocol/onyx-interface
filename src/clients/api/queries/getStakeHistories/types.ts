import { StakeHistory } from 'types';

export interface GetStakeHistoriesInput {
  limit?: number;
  page?: number;
  address?: string;
}

export interface StakeHistoryApiResponse {
  id: number;
  address: string;
  tx_hash: string;
  block_hash: string;
  amount: string;
  price: string;
  reward: string;
  type: number;
  created_at: string;
  updated_at: string;
}

export interface StakeHistoriesApiResponse {
  data: StakeHistoryApiResponse[];
  metadata: {
    page: number;
    limit: number;
    totalItem: number;
    totalPage: number;
  };
}

export interface GetStakeHistoriesOutput {
  page: number;
  limit: number;
  total: number;
  stakeHistories: StakeHistory[];
}
