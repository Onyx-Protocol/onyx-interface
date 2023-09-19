import BigNumber from 'bignumber.js';
import { Proposal, ProposalState } from 'types';

import { ProposalApiResponse } from 'clients/api';

export const createDateFromSecondsTimestamp = (timestampInSeconds: number): Date => {
  const inMilliseconds = timestampInSeconds * 1000;
  return new Date(inMilliseconds);
};

const formatToProposal = async (
  {
    description,
    againstVotes,
    forVotes,
    callDatas,
    signatures,
    targets,
    values,
    canceledBlockTimestamp,
    queuedBlockTimestamp,
    executedBlockTimestamp,
    createdBlockTimestamp,
    createdTransactionHash,
    canceledTransactionHash,
    queuedTransactionHash,
    executedTransactionHash,
    id,
    proposer,
    eta,
    state: baseState,
    endBlock: endBlockNumber,
    startBlock: startBlockNumber,
  }: ProposalApiResponse,
  quorumVotes: BigNumber,
  {
    latestBlockNumber,
    latestBlockTimestamp,
  }: { latestBlockNumber: number; latestBlockTimestamp: number },
): Promise<Proposal> => {
  // const endDate = endTimestamp ? createDateFromSecondsTimestamp(endTimestamp) : undefined;
  // const startDate = createDateFromSecondsTimestamp(startTimestamp ?? 0);

  let isStarted = false;
  let isEnded = false;

  if (new BigNumber(startBlockNumber).lte(new BigNumber(latestBlockNumber))) {
    isStarted = true;
  }

  if (new BigNumber(endBlockNumber).lte(new BigNumber(latestBlockNumber))) {
    isEnded = true;
  }

  let descriptionObj: Proposal['description'];

  try {
    descriptionObj = JSON.parse(description);
  } catch (err) {
    // Split description in half, delimited by the first instance of a break
    // line symbol (\n). The first half corresponds to the title of the
    // proposal, the second to the description
    const [title, descriptionText] = description.split(/\n(.*)/s);

    // Remove markdown characters from title since it's rendered as plain text
    // on the front end
    const plainTitle = title.replaceAll('*', '').replaceAll('#', '');

    descriptionObj = { version: 'v1', title: plainTitle, description: descriptionText };
  }

  const againstVotesWei = new BigNumber(againstVotes ?? 0);
  const forVotesWei = new BigNumber(forVotes ?? 0);

  const actions = callDatas.map((item, index) => ({
    callData: item,
    signature: signatures[index],
    target: targets[index],
    value: String(values[index]),
  }));

  let state: ProposalState = (baseState.charAt(0).toUpperCase() +
    baseState.slice(1)) as ProposalState;

  if (state === 'Canceled') {
    state = 'Canceled';
  } else if (new BigNumber(latestBlockNumber).lte(new BigNumber(startBlockNumber))) {
    state = 'Pending';
  } else if (new BigNumber(latestBlockNumber).lte(new BigNumber(endBlockNumber))) {
    state = 'Active';
  } else if (
    new BigNumber(forVotes).lte(new BigNumber(againstVotes)) ||
    new BigNumber(forVotes).lt(quorumVotes)
  ) {
    state = 'Defeated';
  } else if (+eta === 0) {
    state = 'Successded';
  } else if (state === 'Executed') {
    state = 'Executed';
  } else if (latestBlockTimestamp >= +eta + 3600 * 24 * 14) {
    state = 'Expired';
  } else {
    state = 'Queued';
  }

  return {
    againstVotesWei,
    cancelDate: canceledBlockTimestamp
      ? createDateFromSecondsTimestamp(+canceledBlockTimestamp)
      : undefined,
    createdDate: createdBlockTimestamp
      ? createDateFromSecondsTimestamp(+createdBlockTimestamp)
      : undefined,
    description: descriptionObj,
    endBlock: !endBlockNumber ? 0 : +endBlockNumber,
    isStarted,
    isEnded,
    executedDate: executedBlockTimestamp
      ? createDateFromSecondsTimestamp(+executedBlockTimestamp)
      : undefined,
    forVotesWei,
    id: Number(id),
    proposer,
    queuedDate: queuedBlockTimestamp
      ? createDateFromSecondsTimestamp(+queuedBlockTimestamp)
      : undefined,
    state,
    createdTxHash: createdTransactionHash,
    cancelTxHash: canceledTransactionHash ?? undefined,
    executedTxHash: executedTransactionHash ?? undefined,
    queuedTxHash: queuedTransactionHash ?? undefined,
    totalVotesWei: againstVotesWei.plus(forVotesWei),
    actions: actions || [],
    startBlock: +startBlockNumber,
  };
};

export default formatToProposal;
