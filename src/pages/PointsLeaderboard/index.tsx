/** @jsxImportSource @emotion/react */
import { Spinner } from 'components';
import React, { useContext } from 'react';

import { Farm, useGetFarms } from 'clients/api';
import { AuthContext } from 'context/AuthContext';

import { useStyles } from './styles';

export interface PointsLeaderboardUiProps {
  farms: Farm[];
  isInitialLoading: boolean;
}

// const generateFarmKey = (farm: Farm) => `farm-${farm.pid}`;

export const PointsLeaderboardUi: React.FC<PointsLeaderboardUiProps> = ({
  farms,
  isInitialLoading,
}) => {
  const styles = useStyles();

  if (isInitialLoading || farms.length === 0) {
    return <Spinner />;
  }

  return <div css={styles.container}>1</div>;
};

const PointsLeaderboardPage: React.FC = () => {
  const { account } = useContext(AuthContext);
  const { data: { farms } = { farms: [] }, isLoading: isGetFarmsLoading } = useGetFarms({
    accountAddress: account?.address || '',
  });

  return <PointsLeaderboardUi farms={farms} isInitialLoading={isGetFarmsLoading} />;
};

export default PointsLeaderboardPage;
