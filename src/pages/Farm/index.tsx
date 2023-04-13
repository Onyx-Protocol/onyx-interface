/** @jsxImportSource @emotion/react */
import { Spinner } from 'components';
import React, { useContext } from 'react';

import { Farm, useGetFarms } from 'clients/api';
import { AuthContext } from 'context/AuthContext';

import FarmItem from './FarmItem';
import { useStyles } from './styles';

export interface FarmUiProps {
  farms: Farm[];
  isInitialLoading: boolean;
}

const generateFarmKey = (farm: Farm) => `farm-${farm.pid}`;

export const FarmUi: React.FC<FarmUiProps> = ({ farms, isInitialLoading }) => {
  const styles = useStyles();

  if (isInitialLoading || farms.length === 0) {
    return <Spinner />;
  }

  return (
    <div css={styles.container}>
      {farms.map(farm => (
        <FarmItem farm={farm} key={generateFarmKey(farm)} />
      ))}
    </div>
  );
};

const FarmPage: React.FC = () => {
  const { account } = useContext(AuthContext);
  const { data: { farms } = { farms: [] }, isLoading: isGetFarmsLoading } = useGetFarms({
    accountAddress: account?.address || '',
  });

  return <FarmUi farms={farms} isInitialLoading={isGetFarmsLoading} />;
};

export default FarmPage;
