import { VError } from 'errors';
import { Transaction, TransactionEvent } from 'types';
import { restService } from 'utilities';

import formatTransaction from './formatTransaction';
import { TransactionResponse } from './types';

export interface GetTransactionsInput {
  page?: number;
  event?: TransactionEvent;
  asset?: string;
  address?: string;
  sort?: 'desc' | 'asc';
  order?:
    | 'id'
    | 'event'
    | 'transactionHash'
    | 'blockNumber'
    | 'from'
    | 'to'
    | 'amount'
    | 'createdAt';
}

export interface GetTransactionsResponse {
  count: number;
  result: TransactionResponse[];
}

export interface GetTransactionsOutput {
  limit: number;
  page: number;
  total: number;
  transactions: Transaction[];
}

const getTransactions = async ({
  page = 0,
  event,
  asset,
  address,
  order = 'blockNumber',
  sort = 'desc',
}: GetTransactionsInput): Promise<GetTransactionsOutput> => {
  const response = await restService<GetTransactionsResponse>({
    endpoint: '/user/history',
    method: 'GET',
    params: {
      offset: page * 25,
      limit: 25,
      action: event === 'Supply' ? 'Supplier' : event?.replace(' ', ''),
      user_address: address,
      asset,
      order,
      sort,
      version: 'v2',
    },
  });
  const payload = response.data?.data;
  // @todo Add specific api error handling
  if ('result' in response && response.result === 'error') {
    throw new VError({
      type: 'unexpected',
      code: 'somethingWentWrong',
      data: { message: response.message },
    });
  }

  if (!payload) {
    throw new VError({ type: 'unexpected', code: 'somethingWentWrongRetrievingTransactions' });
  }
  const { count: total } = payload;
  const transactions = payload.result.map(data => formatTransaction(data));
  return { limit: 25, page, total, transactions };
};

export default getTransactions;
