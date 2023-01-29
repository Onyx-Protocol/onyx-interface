import { SUBGRAPH_LINKS } from 'constants/endpoints';

const getAccountSubGraph = (network: any, address: any): Promise<any> => {
  if (!SUBGRAPH_LINKS[network]) return Promise.resolve({});
  return new Promise(resolve =>
    fetch(SUBGRAPH_LINKS[network][0], {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query accountQuery {
            comptroller(id: "1") {
              closeFactor
              liquidationIncentive
            }
            account(id: "${address}") {
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
      .then(({ data: { comptroller, account } }) => resolve({ comptroller, account })),
  );
};

export default getAccountSubGraph;
