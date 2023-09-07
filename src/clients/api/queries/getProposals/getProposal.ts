import BigNumber from 'bignumber.js';
import config from 'config';
import { formatToProposal, getProposalsSubGraph } from 'utilities';

import { getGovernorBravoDelegateContract } from 'clients/contracts';
import getWeb3NoAccount from 'clients/web3/getWeb3NoAccount';

import { GetProposalInput, GetProposalOutput } from './types';

const getProposal = async (input: GetProposalInput): Promise<GetProposalOutput> => {
  const response = await getProposalsSubGraph(config.chainId, input);

  const web3NoAccount = getWeb3NoAccount();
  const latestBlock = await web3NoAccount.eth.getBlock('latest');
  const governorBravoDelegateContract = getGovernorBravoDelegateContract(web3NoAccount);
  const quorumVotes = await governorBravoDelegateContract.methods.quorumVotes().call();

  return formatToProposal(
    response.proposals[0],
    new BigNumber(quorumVotes),
    {
      latestBlockTimestamp: Number(latestBlock.timestamp),
      latestBlockNumber: latestBlock.number,
    },
    web3NoAccount,
  );
};

export default getProposal;
