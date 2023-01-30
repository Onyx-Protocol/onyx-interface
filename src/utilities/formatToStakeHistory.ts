import BigNumber from 'bignumber.js';
import { StakeHistory } from 'types';

interface FormatToStakeHistoryInput {
  id: number;
  address: string;
  tx_hash: string;
  block_hash: string;
  amount: string;
  price: string;
  reward: string;
  type: number;
  created_at: string;
  updated_at: string;
}

const formatToStakeHistory = ({
  id,
  address,
  tx_hash,
  block_hash,
  amount,
  price,
  reward,
  type,
  created_at,
  updated_at,
}: FormatToStakeHistoryInput): StakeHistory => {
  const stakeHistory: StakeHistory = {
    id,
    address,
    tx_hash,
    block_hash,
    amount: new BigNumber(amount),
    price,
    reward: new BigNumber(reward),
    type,
    created_at: new Date(created_at),
    updated_at: new Date(updated_at),
  };

  return stakeHistory;
};

export default formatToStakeHistory;
