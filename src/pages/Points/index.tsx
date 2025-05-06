/** @jsxImportSource @emotion/react */
import { Box, Grid, Paper, Typography } from '@mui/material';
import { Button, Spinner } from 'components';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { Farm, useGetFarms } from 'clients/api';
import ConnectButton from 'components/Layout/ConnectButton';
import { AuthContext } from 'context/AuthContext';

import { useStyles } from './styles';

export interface PointsUiProps {
  farms: Farm[];
  isInitialLoading: boolean;
}

// const generateFarmKey = (farm: Farm) => `farm-${farm.pid}`;

export const PointsUi: React.FC<PointsUiProps> = ({ farms, isInitialLoading }) => {
  const { account } = React.useContext(AuthContext);
  const styles = useStyles();

  if (isInitialLoading || farms.length === 0) {
    return <Spinner />;
  }

  return (
    <Paper elevation={3} css={styles.container}>
      <Box css={styles.titleContainer}>
        <Typography variant="h3" fontWeight="bold" css={styles.titleText}>
          Onyx Points
        </Typography>
        <Typography color="text.secondary">
          Track your points and see how you rank against other users
        </Typography>
        <Link to="https://bridge.onyx.org" target="_blank">
          <Button css={styles.buttonStyle} variant="secondaryConnectWallet">
            Bridge
          </Button>
        </Link>
      </Box>

      {!account ? (
        <Box css={styles.pointBeforeUserContainer}>
          <Box css={styles.pointUserContainer}>
            <Typography color="text.secondary">Connect your wallet to view your points</Typography>
            <ConnectButton small fullWidth css={styles.menuMobileButton} />
          </Box>
        </Box>
      ) : (
        <Box css={styles.pointBeforeUserContainer}>
          <Box css={styles.pointUserContainer}>
            <Typography color="text.secondary">Connect your wallet to view your points</Typography>
            <ConnectButton small fullWidth css={styles.menuMobileButton} />
          </Box>
        </Box>
      )}

      <Box css={styles.howToEarnBefore}>
        <Box css={styles.howToEarnContainer}>
          <Typography variant="h6" fontWeight="bold" mb={2}>
            How to Earn Points
          </Typography>
          <Grid container spacing={3}>
            {[
              {
                title: 'Passive Points',
                description: 'Earn points by simply holding whitelisted assets.',
                badge: 'PP',
                color: '#BD6EAC',
                buttonText: 'Explore assets',
              },
              {
                title: 'Activity Points',
                description: 'Earn points by deploying your whitelisted assets.',
                badge: 'AP',
                color: '#6EBD70',
                buttonText: 'Explore apps',
              },
              {
                title: 'App Points',
                description: 'Earn points by using Onyx apps.',
                badge: 'APP',
                color: '#7095BD',
                buttonText: 'Explore apps',
              },
            ].map(item => (
              <Grid item xs={12} md={6} xl={4} key={item.title}>
                <Paper
                  variant="outlined"
                  sx={{
                    p: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    height: '100%',
                    justifyContent: 'space-between',
                  }}
                >
                  <Box display="flex" alignItems="center" gap={1}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {item.title}
                    </Typography>
                    <Box
                      sx={{
                        px: 1,
                        py: 0.5,
                        fontSize: '0.75rem',
                        borderRadius: '999px',
                        backgroundColor: `${item.color}29`,
                        border: `1px solid ${item.color}`,
                        color: item.color,
                      }}
                    >
                      {item.badge}
                    </Box>
                  </Box>
                  <Typography color="text.secondary">{item.description}</Typography>
                  <Button variant="primary">{item.buttonText}</Button>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>

      <Box css={styles.topUserContainer}>
        <Box css={styles.topUserHeader}>
          <Typography>How to Earn Points</Typography>
          <Link to="/points-leaderboard">
            <Typography>Show all</Typography>
          </Link>
        </Box>
        <Box css={styles.howToEarnContainer}>
          <Typography variant="h6" fontWeight="bold" mb={2}>
            How to Earn Points
          </Typography>
          <Grid container spacing={3}>
            {[
              {
                title: 'Passive Points',
                description: 'Earn points by simply holding whitelisted assets.',
                badge: 'PP',
                color: '#BD6EAC',
                buttonText: 'Explore assets',
              },
              {
                title: 'Activity Points',
                description: 'Earn points by deploying your whitelisted assets.',
                badge: 'AP',
                color: '#6EBD70',
                buttonText: 'Explore apps',
              },
              {
                title: 'App Points',
                description: 'Earn points by using Onyx apps.',
                badge: 'APP',
                color: '#7095BD',
                buttonText: 'Explore apps',
              },
            ].map(item => (
              <Grid item xs={12} md={6} xl={4} key={item.title}>
                <Paper
                  variant="outlined"
                  sx={{
                    p: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    height: '100%',
                    justifyContent: 'space-between',
                  }}
                >
                  <Box display="flex" alignItems="center" gap={1}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {item.title}
                    </Typography>
                    <Box
                      sx={{
                        px: 1,
                        py: 0.5,
                        fontSize: '0.75rem',
                        borderRadius: '999px',
                        backgroundColor: `${item.color}29`,
                        border: `1px solid ${item.color}`,
                        color: item.color,
                      }}
                    >
                      {item.badge}
                    </Box>
                  </Box>
                  <Typography color="text.secondary">{item.description}</Typography>
                  <Button variant="primary">{item.buttonText}</Button>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Paper>
  );
};

const PointsPage: React.FC = () => {
  const { account } = useContext(AuthContext);
  const { data: { farms } = { farms: [] }, isLoading: isGetFarmsLoading } = useGetFarms({
    accountAddress: account?.address || '',
  });

  return <PointsUi farms={farms} isInitialLoading={isGetFarmsLoading} />;
};

export default PointsPage;
