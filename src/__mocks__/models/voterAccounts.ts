import formatVoterAccountResponse from 'clients/api/queries/getVoterAccounts/formatVoterAccountResponse';

import voterAccountsResponse from '../api/voterAccounts.json';

const voterAccounts = formatVoterAccountResponse(voterAccountsResponse);

export default voterAccounts;
