/** @jsxImportSource @emotion/react */
import AppBar from '@mui/material/AppBar';
import React from 'react';

import { AuthContext } from 'context/AuthContext';

import ChainSwitchDropdown from '../../ChainSwitchDropdown';
import ClaimXcnRewardButton from '../ClaimXcnRewardButton';
import ConnectButton from '../ConnectButton';
import { Toolbar } from '../Toolbar';
import Title from './Title';
import { useStyles } from './styles';

const Header: React.FC = () => {
  const styles = useStyles();
  const { account } = React.useContext(AuthContext);

  return (
    <AppBar position="relative" css={styles.appBar}>
      <Toolbar css={styles.toolbar}>
        <Title />
        <div css={styles.ctaContainer}>
          <ClaimXcnRewardButton />
          {account && <ChainSwitchDropdown />}
          <ConnectButton />
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
