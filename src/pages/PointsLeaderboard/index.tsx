/** @jsxImportSource @emotion/react */
// import { formatPoint } from '@/utils/format';
import { Box } from '@mui/material';
import React from 'react';

import LeaderboardTable from './LeaderboardTable';
import { useStyles } from './styles';

const PointsLeaderboardPage: React.FC = () => {
  const style = useStyles();
  return (
    <Box css={style.root}>
      <LeaderboardTable useRankIcon />
    </Box>
  );
};

export default PointsLeaderboardPage;
