import formatVoterHistoryResponse from 'clients/api/queries/getVoterHistory/formatVoterHistoryResponse';
import { GetVoterHistoryResponse } from 'clients/api/queries/getVoterHistory/types';

import voterHistoryResponse from '../api/voterHistory.json';

const voterHistory = formatVoterHistoryResponse(voterHistoryResponse as GetVoterHistoryResponse, {
  limit: 5,
  page: 1,
});

export default voterHistory;
