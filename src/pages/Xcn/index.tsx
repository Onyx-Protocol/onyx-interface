/** @jsxImportSource @emotion/react */
import React from 'react';

import Header from './Header';
import Table from './Table';
import { useStyles } from './styles';

const Xcn: React.FC = () => {
  const styles = useStyles();

  return (
    <div style={{ marginBottom: '20px' }}>
      <Header css={styles.header} />
      <Table />
    </div>
  );
};

export default Xcn;
