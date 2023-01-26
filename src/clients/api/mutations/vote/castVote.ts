import type { TransactionReceipt } from 'web3-core/types';

import { GovernorBravoDelegate } from 'types/contracts';

export interface CastVoteInput {
  governorBravoContract: GovernorBravoDelegate;
  fromAccountAddress: string;
  proposalId: number;
  voteType: boolean;
}

export type CastVoteOutput = TransactionReceipt;

const castVote = async ({
  governorBravoContract,
  fromAccountAddress,
  proposalId,
  voteType,
}: CastVoteInput): Promise<CastVoteOutput> =>
  governorBravoContract.methods.castVote(proposalId, voteType).send({ from: fromAccountAddress });

export default castVote;
