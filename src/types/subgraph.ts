export interface SubgraphMarket {
  id: string;
  collateralFactor: string;
  exchangeRate: string;
  underlyingAddress: string;
  underlyingDecimals: number;
}

export interface SubgraphToken {
  id: string;
  market: SubgraphMarket;
  enteredMarket: boolean;
  oTokenBalance: string;
  storedBorrowBalance: string;
  symbol: string;
}

export interface SubgraphAccount {
  id: string;
  hasBorrowed: boolean;
  countLiquidated: number;
  tokens: SubgraphToken[];
}

export interface SubgraphComptroller {
  closeFactor: string;
  liquidationIncentive: string;
}
