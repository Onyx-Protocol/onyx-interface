export interface GetVoterAccountsResponse {
  rank: number;
  chnStake: number;
  address: string;
  proposalsVoted: number;
  voteWeight: string;
}

export interface GetVoterAccountsMetadata {
  page: number;
  limit: number;
  totalItem: number;
  totalPage: number;
}
