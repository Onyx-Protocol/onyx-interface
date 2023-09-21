import config from 'config';
import { VoterHistory } from 'types';

import getVoterHistorySubGraph from 'utilities/getVoterHistorySubGraph';

import formatVoterHistoryResponse from './formatVoterHistoryResponse';

export interface GetVoterHistoryInput {
  page?: number;
  address: string;
}

export interface GetVoterHistoryOutput {
  voterHistory: VoterHistory[];
  limit: number;
  page: number;
  total: number;
}

const getVoterHistory = async ({
  page = 0,
  address,
}: GetVoterHistoryInput): Promise<GetVoterHistoryOutput> => {
  const proposalVotes = await getVoterHistorySubGraph(config.chainId, address, {
    limit: 5,
    offset: page * 5,
  });

  return formatVoterHistoryResponse(proposalVotes, { page, limit: 5 });
};

export default getVoterHistory;
