export interface GetVoterAccountsResponse {
  data: {
    rank: number;
    chnStake: number;
    address: string;
    proposalsVoted: number;
    voteWeight: string;
  }[];
  metadata: {
    page: string;
    limit: string;
    totalItem: number;
    totalPage: number;
    totalStake: string;
  };
}
