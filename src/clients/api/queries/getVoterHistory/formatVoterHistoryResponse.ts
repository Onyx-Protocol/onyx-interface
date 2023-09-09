import BigNumber from 'bignumber.js';
import { formatToProposal } from 'utilities';

import indexedVotingSupportNames from 'constants/indexedVotingSupportNames';

import { getGovernorBravoDelegateContract } from '../../../contracts';
import getWeb3NoAccount from '../../../web3/getWeb3NoAccount';
import { GetVoterHistoryResponse } from './types';

const formatVoterHistoryResponse = async (
  data: GetVoterHistoryResponse,
  { limit, page }: { limit: number; page: number },
) => {
  const web3NoAccount = getWeb3NoAccount();
  const latestBlock = await web3NoAccount.eth.getBlock('latest');
  const governorBravoDelegateContract = getGovernorBravoDelegateContract(web3NoAccount);
  const quorumVotes = await governorBravoDelegateContract.methods.quorumVotes().call();

  return {
    limit,
    page,
    total: data.length < limit ? page * limit + data.length : (page + 1) * limit + 1,
    voterHistory: await Promise.all(
      data.map(async d => ({
        address: d.address,
        blockNumber: +d.blockNumber,
        blockTimestamp: +d.blockTimestamp,
        createdAt: new Date(+d.blockTimestamp * 1000),
        id: d.id,
        proposal: await formatToProposal(d.proposal, new BigNumber(quorumVotes), {
          latestBlockTimestamp: Number(latestBlock.timestamp),
          latestBlockNumber: latestBlock.number,
        }),
        reason: undefined,
        support: indexedVotingSupportNames[Number(d.support)],
        updatedAt: new Date(+d.blockTimestamp * 1000),
        votesWei: new BigNumber(d.votes),
      })),
    ),
  };
};

export default formatVoterHistoryResponse;
