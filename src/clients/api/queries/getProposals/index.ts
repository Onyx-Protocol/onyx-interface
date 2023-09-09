import BigNumber from 'bignumber.js';
import config from 'config';
import { formatToProposal, getProposalsSubGraph } from 'utilities';

import { getGovernorBravoDelegateContract } from 'clients/contracts';
import getWeb3NoAccount from 'clients/web3/getWeb3NoAccount';

import { GetProposalsInput, GetProposalsOutput } from './types';

export * from './types';

const getProposals = async ({
  page = 0,
  limit = 5,
}: GetProposalsInput): Promise<GetProposalsOutput> => {
  const { proposals, count } = await getProposalsSubGraph(config.chainId, undefined, {
    offset: page * limit,
    limit,
  });

  const web3NoAccount = getWeb3NoAccount();
  const latestBlock = await web3NoAccount.eth.getBlock('latest');
  const governorBravoDelegateContract = getGovernorBravoDelegateContract(web3NoAccount);
  const quorumVotes = await governorBravoDelegateContract.methods.quorumVotes().call();

  const proposalsFormatted = await Promise.all(
    proposals.map(p =>
      formatToProposal(p, new BigNumber(quorumVotes), {
        latestBlockTimestamp: Number(latestBlock.timestamp),
        latestBlockNumber: latestBlock.number,
      }),
    ),
  );

  return { proposals: proposalsFormatted, total: count };
};

export default getProposals;
