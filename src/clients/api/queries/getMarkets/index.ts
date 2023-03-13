import BigNumber from 'bignumber.js';
import { Market } from 'types';
import { restService } from 'utilities';

import { OETH_TOKENS } from 'constants/tokens';

export interface GetMarketsResponse {
  dailyXcn: number;
  markets: Market[];
  request: { addresses: string[] };
  xcnRate: string;
}

export interface GetMarketsOutput {
  markets: Market[];
  dailyXcnWei: BigNumber | undefined;
}

const getMarkets = async (): Promise<GetMarketsOutput> => {
  const response = await restService<GetMarketsResponse>({
    endpoint: '/xcn',
    method: 'GET',
  });
  if ('result' in response && response.result === 'error') {
    throw new Error(response.message);
  }
  let markets: Market[] = [];
  let dailyXcnWei;
  if (response && response.data && response.data.data) {
    dailyXcnWei = new BigNumber(response.data.data.dailyXcn);
    markets = Object.keys(OETH_TOKENS).reduce<Market[]>((acc: Market[], curr: string) => {
      const activeMarket = response.data?.data.markets.find(
        (market: Market) => market.underlyingSymbol.toLowerCase() === curr.toLowerCase(),
      );
      if (activeMarket) {
        const formattedActiveMarket = {
          ...activeMarket,
          id: activeMarket.underlyingSymbol.toLowerCase(),
          tokenPrice: new BigNumber(activeMarket.tokenPrice),
          liquidity: new BigNumber(activeMarket.liquidity),
          borrowXcnApy: new BigNumber(activeMarket.borrowXcnApy),
          borrowApy: new BigNumber(activeMarket.borrowApy),
          supplyXcnApy: new BigNumber(activeMarket.supplyXcnApy),
          supplyApy: new BigNumber(activeMarket.supplyApy),
          treasuryTotalBorrowsCents: new BigNumber(activeMarket.totalBorrowsUsd).times(100),
          treasuryTotalSupplyCents: new BigNumber(activeMarket.totalSupplyUsd).times(100),
        };
        return [...acc, formattedActiveMarket];
      }
      return acc;
    }, []);
  }

  const nftMarkets = markets.filter((item: Market) => item.underlyingDecimal === 0);
  nftMarkets.sort((a: Market, b: Market) =>
    b.treasuryTotalSupplyCents.minus(a.treasuryTotalSupplyCents).toNumber(),
  );
  const tokenMarkets = markets.filter((item: Market) => item.underlyingDecimal !== 0);
  tokenMarkets.sort((a: Market, b: Market) =>
    b.treasuryTotalSupplyCents.minus(a.treasuryTotalSupplyCents).toNumber(),
  );
  markets = [...nftMarkets, ...tokenMarkets];

  return { markets, dailyXcnWei };
};

export default getMarkets;
