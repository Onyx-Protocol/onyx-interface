import { useQuery } from 'react-query';
import { GetLeaderBoardPayload } from 'types';

import FunctionKey from 'constants/functionKey';

import { getLeaderBoard } from '.';

const useGetLeaderBoard = ({ page, limit }: GetLeaderBoardPayload) =>
  useQuery([FunctionKey.GET_LEADER_BOARD, page, limit], () => getLeaderBoard({ page, limit }), {
    refetchOnWindowFocus: false,
    refetchInterval: 10000,
  });
export default useGetLeaderBoard;
