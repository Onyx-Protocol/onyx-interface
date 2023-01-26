export interface GetVoterAccountsResponse {
  data: {
    rank: number;
    chnStake: number;
    address: string;
    proposalsVoted: number;
    voteWeight: string;
  }[];
  metadata: {
    page: number;
    limit: number;
    totalItem: number;
    totalPage: number;
  };
}
