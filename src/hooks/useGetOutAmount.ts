import BigNumber from 'bignumber.js';
import { useEffect, useState } from 'react';

import { Farm } from 'clients/api';

const useGetOutAmount = (
  farm: Farm,
  amount: BigNumber,
  which: string,
  lastInput: string,
): BigNumber | null => {
  const [outAmount, setOutAmount] = useState<BigNumber | null>(null);

  useEffect(() => {
    if (lastInput !== which) {
      setOutAmount(null);
    } else if (farm.tokenAmount?.gt(0) && farm.quoteTokenAmount?.gt(0) && amount.gt(0)) {
      if (which === 'token1') {
        setOutAmount(amount.div(farm.tokenAmount).times(farm.quoteTokenAmount));
      } else setOutAmount(amount.div(farm.quoteTokenAmount).times(farm.tokenAmount));
    } else setOutAmount(new BigNumber(0));
  }, [amount, farm.tokenAmount, farm.quoteTokenAmount, which, lastInput]);

  return outAmount;
};

export default useGetOutAmount;
