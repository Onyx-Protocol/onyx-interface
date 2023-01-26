import BigNumber from 'bignumber.js';
import { TransactionCategory, TransactionEvent } from 'types';

import { TransactionResponse } from './types';

const formatTransaction = ({
  amount,
  createdAt,
  updatedAt,
  category,
  action,
  oTokenAddress,
  ...rest
}: TransactionResponse) => ({
  ...rest,
  amountWei: new BigNumber(amount),
  createdAt: new Date(createdAt),
  updatedAt: new Date(updatedAt),
  category: category as TransactionCategory,
  event: action as TransactionEvent,
  oTokenAddress,
});
export default formatTransaction;
