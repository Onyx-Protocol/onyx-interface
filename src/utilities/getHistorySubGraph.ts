import { SUBGRAPH_LINKS } from 'constants/endpoints';

type Pagination = {
  limit: number;
  offset: number;
};

type Order = {
  direction: 'asc' | 'desc';
  field: keyof HistoryItem;
};

export type Filter = Partial<HistoryItem>;

export enum HistoryItemType {
  SUPPLY = 'supply',
  STAKE = 'stake',
  TRANSFER = 'transfer',
  WITHDRAW = 'withdraw',
  CLAIM = 'claim',
  PROPOSE = 'propose',
  VOTE = 'vote',
  APPROVAL = 'approval',
  REDEEM = 'redeem',
  BORROW = 'borrow',
  REPAY_BORROW = 'repayBorrow',
  LIQUIDATE_BORROW = 'liquidateBorrow',
  RESERVES_ADDED = 'reservesAdded',
  RESERVES_REDUCED = 'reservesReduced',
}

export type HistoryItem = {
  id: string;
  type: HistoryItemType;
  to: string;
  from: string;
  amount: string;
  blockNumber: string;
  blockTimestamp: string;
  transactionHash: string;
};

const getHistorySubGraph = (
  network: number,
  filter?: Filter,
  order: Order = {
    direction: 'desc',
    field: 'blockTimestamp',
  },
  pagination: Pagination = {
    limit: 25,
    offset: 0,
  },
): Promise<HistoryItem[]> => {
  if (!SUBGRAPH_LINKS[network] && !SUBGRAPH_LINKS[network].latest) return Promise.resolve([]);
  return new Promise(resolve =>
    fetch(SUBGRAPH_LINKS[network].latest, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query historyItemsQuery {
            historyItems(
              first: ${pagination.limit},
              skip: ${pagination.offset},
              orderBy: ${order.field},
              orderDirection: ${order.direction}
              ${
                filter && Object.keys(filter).length
                  ? `where: { ${Object.keys(filter)
                      .map(k => `${k}: ${filter[k as keyof typeof filter]}`)
                      .join(', ')} }`
                  : ''
              }
            ) {
              id
              type
              to
              from
              amount
              blockNumber
              blockTimestamp
              transactionHash
            }
          }
        `,
      }),
    })
      .then(response => response.json())
      .then(({ data: { historyItems } }) => resolve(historyItems)),
  );
};

export default getHistorySubGraph;
