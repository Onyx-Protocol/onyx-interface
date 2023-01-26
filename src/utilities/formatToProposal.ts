import BigNumber from 'bignumber.js';
import { Proposal } from 'types';

interface FormatToProposalInput {
  call_datas?: string | null;
  callDatas?: string | null;
  signatures: string;
  targets: string;
  values: string;
  against_votes?: string | null;
  againstVotes?: string | null;
  cancel_block?: number | null;
  cancel_timestamp?: number | null;
  cancel_tx_hash?: string | null;
  cancelBlock?: number | null;
  cancelTimestamp?: number | null;
  cancelTxHash?: string | null;
  canceled: number | boolean;
  created_at?: string | null;
  createdAt?: string | null;
  created_block: number | null;
  created_timestamp: number | null;
  created_tx_hash?: string | null;
  description: string;
  end_block?: number;
  end_timestamp?: number | null;
  end_tx_hash?: string | null;
  endBlock?: number;
  endTimestamp?: number | null;
  endTxHash?: string | null;
  eta: number;
  executed: number | boolean;
  executed_block: number | null;
  executed_timestamp: number | null;
  executed_tx_hash: string | null;
  for_votes?: string | null;
  forVotes?: string | null;
  id: number;
  proposer: string;
  queued_block: number | null;
  queued_timestamp: number | null;
  queued_tx_hash: string | null;
  start_block?: number | null;
  start_timestamp?: number;
  start_tx_hash?: string | null;
  startBlock?: number | null;
  startTimestamp?: number;
  startTxHash?: string | null;
  state:
    | 'Pending'
    | 'Active'
    | 'Canceled'
    | 'Defeated'
    | 'Succeeded'
    | 'Queued'
    | 'Expired'
    | 'Executed';
  // JSON
  updated_at?: string | null;
  updatedAt?: string | null;
  voter_count?: number | null;
  voterCount?: number | null;
}

const createDateFromSecondsTimestamp = (timestampInSeconds: number): Date => {
  const inMilliseconds = timestampInSeconds * 1000;
  return new Date(inMilliseconds);
};

const formatToProposal = ({
  against_votes,
  againstVotes,
  cancel_timestamp,
  created_timestamp,
  description,
  end_block,
  end_timestamp,
  executed_timestamp,
  for_votes,
  forVotes,
  id,
  proposer,
  queued_timestamp,
  start_timestamp,
  state,
  created_tx_hash,
  cancel_tx_hash,
  end_tx_hash,
  executed_tx_hash,
  queued_tx_hash,
  start_tx_hash,
  call_datas,
  callDatas,
  signatures,
  targets,
  values,
}: FormatToProposalInput): Proposal => {
  const endDate = end_timestamp ? createDateFromSecondsTimestamp(end_timestamp) : undefined;

  let descriptionObj: Proposal['description'] = {
    version: 'v2',
    title: '',
    description: '',
    forDescription: '',
    againstDescription: '',
    abstainDescription: '',
  };

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

  const abstainedVotesWei = new BigNumber(0);
  const againstVotesWei = new BigNumber(against_votes || againstVotes || 0);
  const forVotesWei = new BigNumber(for_votes || forVotes || 0);

  let CallDatas: string[] = [];
  if (call_datas) CallDatas = JSON.parse(JSON.parse(call_datas));
  else if (callDatas) CallDatas = JSON.parse(callDatas);

  let Signatures: string[] = [];
  if (call_datas) Signatures = JSON.parse(JSON.parse(signatures));
  else Signatures = JSON.parse(signatures);

  let Targets: string[] = [];
  if (call_datas) Targets = JSON.parse(JSON.parse(targets));
  else Targets = JSON.parse(targets);

  let Values: string[] = [];
  if (call_datas) Values = JSON.parse(JSON.parse(values));
  else Values = JSON.parse(values);

  const actions = CallDatas.map((item, index) => ({
    callData: item,
    signature: Signatures[index],
    target: Targets[index],
    value: Values[index],
  }));

  const proposal: Proposal = {
    abstainedVotesWei,
    againstVotesWei,
    cancelDate: cancel_timestamp ? createDateFromSecondsTimestamp(cancel_timestamp) : undefined,
    createdDate: created_timestamp ? createDateFromSecondsTimestamp(created_timestamp) : undefined,
    description: descriptionObj,
    endBlock: !end_block ? 0 : end_block,
    endDate,
    executedDate: executed_timestamp
      ? createDateFromSecondsTimestamp(executed_timestamp)
      : undefined,
    forVotesWei,
    id,
    proposer,
    queuedDate: queued_timestamp ? createDateFromSecondsTimestamp(queued_timestamp) : undefined,
    startDate: createDateFromSecondsTimestamp(!start_timestamp ? 0 : start_timestamp),
    state,
    createdTxHash: created_tx_hash ?? undefined,
    cancelTxHash: cancel_tx_hash ?? undefined,
    endTxHash: end_tx_hash ?? undefined,
    executedTxHash: executed_tx_hash ?? undefined,
    queuedTxHash: queued_tx_hash ?? undefined,
    startTxHash: start_tx_hash ?? undefined,
    totalVotesWei: abstainedVotesWei.plus(againstVotesWei).plus(forVotesWei),
    actions: actions || [],
  };

  return proposal;
};

export default formatToProposal;
