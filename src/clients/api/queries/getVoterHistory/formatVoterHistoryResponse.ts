import BigNumber from 'bignumber.js';
import { formatToProposal } from 'utilities';

import indexedVotingSupportNames from 'constants/indexedVotingSupportNames';

import { getGovernorBravoDelegateContract } from '../../../contracts';
import getWeb3NoAccount from '../../../web3/getWeb3NoAccount';
import { GetVoterHistoryResponse } from './types';

const formatVoterHistoryResponse = async (data: GetVoterHistoryResponse) => {
  const web3NoAccount = getWeb3NoAccount();
  const latestBlock = await web3NoAccount.eth.getBlock('latest');
  const governorBravoDelegateContract = getGovernorBravoDelegateContract(web3NoAccount);
  const quorumVotes = await governorBravoDelegateContract.methods.quorumVotes().call();

  return {
    limit: data.metadata.limit,
    page: data.metadata.page,
    total: data.metadata.totalItem,
    voterHistory: await Promise.all(
      data.data.map(async d => ({
        address: d.voter.address,
        blockNumber: d.voter.block_number,
        blockTimestamp: d.voter.block_timestamp,
        createdAt: new Date(d.voter.created_at),
        id: d.voter.id,
        proposal: await formatToProposal(
          d.proposal,
          new BigNumber(quorumVotes),
          {
            latestBlockTimestamp: Number(latestBlock.timestamp),
            latestBlockNumber: latestBlock.number,
          },
          web3NoAccount,
        ),
        reason: d.voter.reason ? d.voter.reason : undefined,
        support: d.voter.has_voted ? indexedVotingSupportNames[d.voter.support] : 'NOT_VOTED',
        updatedAt: new Date(d.voter.updated_at),
        votesWei: new BigNumber(d.voter.votes),
      })),
    ),
  };
};

export default formatVoterHistoryResponse;
