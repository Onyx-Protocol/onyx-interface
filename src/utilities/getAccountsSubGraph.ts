import { SUBGRAPH_LINKS } from 'constants/endpoints';

const getAccountsSubGraph = (network: any, skip: any): Promise<any[]> => {
  if (!SUBGRAPH_LINKS[network]) return Promise.resolve([]);
  return new Promise(resolve =>
    fetch(SUBGRAPH_LINKS[network][0], {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
            query accountsQuery {
              accounts(first: 100, skip: ${skip}) {
                id
                tokens(first: 20) {
                  id
                  symbol
                  enteredMarket
                  oTokenBalance
                  storedBorrowBalance
                  market {
                    id
                    exchangeRate
                    collateralFactor
                    underlyingAddress
                    underlyingDecimals
                  }
                }
                countLiquidated
                hasBorrowed
              }
            }
          `,
      }),
    })
      .then(response => response.json())
      .then(({ data: { accounts } }) => resolve(accounts)),
  );
};

export default getAccountsSubGraph;
