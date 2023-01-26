import { BigNumber } from 'bignumber.js';
import { useContext, useMemo } from 'react';
import { convertWeiToTokens } from 'utilities';

import { useGetDailyXcn, useGetMarkets } from 'clients/api';
import { TOKENS } from 'constants/tokens';
import { AuthContext } from 'context/AuthContext';

const useDailyXcnDistributionInterests = () => {
  const { account } = useContext(AuthContext);
  const { data: getDailyXcnData, isLoading: isGetDailyXcnLoading } = useGetDailyXcn(
    { accountAddress: account?.address || '' },
    { enabled: !!account?.address },
  );

  const { data: getMarketsData, isLoading: isGetMarketsLoading } = useGetMarkets();
  const xcnPriceDollars: BigNumber | undefined = useMemo(
    () => (getMarketsData?.markets || []).find(market => market.id === TOKENS.xcn.id)?.tokenPrice,
    [JSON.stringify(getMarketsData?.markets)],
  );

  const { dailyXcnDistributionInterestsCents } = useMemo(() => {
    const dailyXcnTokens =
      getDailyXcnData &&
      convertWeiToTokens({
        valueWei: getDailyXcnData.dailyXcnWei,
        token: TOKENS.xcn,
      });

    return {
      dailyXcnDistributionInterestsCents:
        account?.address && xcnPriceDollars
          ? dailyXcnTokens?.multipliedBy(xcnPriceDollars).times(100)
          : new BigNumber(0),
    };
  }, [
    JSON.stringify(getDailyXcnData?.dailyXcnWei),
    JSON.stringify(getMarketsData?.markets),
    account?.address,
  ]);

  return {
    isLoading: isGetDailyXcnLoading || isGetMarketsLoading,
    dailyXcnDistributionInterestsCents,
  };
};

export default useDailyXcnDistributionInterests;
