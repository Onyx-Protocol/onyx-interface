import BigNumber from 'bignumber.js';
import { useQuery } from 'react-query';

import FunctionKey from 'constants/functionKey';

import getPointsApr from '.';

const useGetPointsApr = (totalStaked: BigNumber) =>
  useQuery([FunctionKey.GET_POINTS_APR, totalStaked.toString()], () =>
    getPointsApr({ totalStaked }),
  );

export default useGetPointsApr;
