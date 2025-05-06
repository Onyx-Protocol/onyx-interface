/** @jsxImportSource @emotion/react */
import { Box, Grid, Paper, Typography } from '@mui/material';
import { Button, Spinner } from 'components';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import { Farm, useGetFarms } from 'clients/api';
import useGetUserInfo from 'clients/api/queries/getUserInfo/useGetUserInfo';
import ConnectButton from 'components/Layout/ConnectButton';
import { AuthContext } from 'context/AuthContext';

import EnrollModal from './modals/EnrollModal';
// import PointUser from './PointUser';
import { useStyles } from './styles';

export interface PointsUiProps {
  farms: Farm[];
  isInitialLoading: boolean;
}

// const generateFarmKey = (farm: Farm) => `farm-${farm.pid}`;
type ActiveModal = 'enroll';

export const formatPoint = (point: number, digit?: number) => {
  if (digit) {
    return (+point).toLocaleString('en-US', {
      maximumFractionDigits: digit || 2,
    });
  }

  let [real, imaginary] = point.toString().split('.');
  real = (+real).toLocaleString('en-US');
  imaginary = imaginary ? `.${imaginary}` : '';
  return `${real}${imaginary}`;
};

export const PointsUi: React.FC<PointsUiProps> = ({ farms, isInitialLoading }) => {
  const [activeModal, setActiveModal] = useState<ActiveModal | undefined>();
  const styles = useStyles();
  const { account } = React.useContext(AuthContext);

  const { data } = useGetUserInfo({ address: account?.address || '' }, { enabled: !!account });
  const onEnroll = () => {
    setActiveModal('enroll');
  };
  const closeActiveModal = () => setActiveModal(undefined);

  if (isInitialLoading || farms.length === 0) {
    return <Spinner />;
  }
  return (
    <>
      <Paper elevation={3} css={styles.container}>
        <Box css={styles.titleContainer}>
          <Typography variant="h3" fontWeight="bold" css={styles.titleText}>
            Onyx Points
          </Typography>
          <Typography color="text.secondary">
            Track your points and see how you rank against other users
          </Typography>
          <a href="https://bridge.onyx.org" target="_blank" rel="noreferrer">
            <Button css={styles.buttonStyle} variant="secondaryConnectWallet">
              Bridge
            </Button>
          </a>
        </Box>
        <Box css={styles.pointBeforeUserContainer}>
          {!account && (
            <Box css={styles.pointUserContainer}>
              <Typography color="text.secondary">
                Connect your wallet to view your points
              </Typography>
              <ConnectButton small fullWidth css={styles.enrollButton} />
            </Box>
          )}
          {account && data && (
            <Box css={styles.pointUserContainer}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography color="text.secondary" sx={{ fontSize: '12px' }}>
                  My Onyx Points
                </Typography>
                <Box css={styles.pointsContainer}>
                  <Typography component="h2" css={styles.pointsText}>
                    {formatPoint(data.points, 2)}
                  </Typography>
                  <Typography component="h2" css={styles.liquidText1}>
                    {formatPoint(data.points, 2)}
                  </Typography>
                  <Typography component="h2" css={styles.liquidText2}>
                    {formatPoint(data.points, 2)}
                  </Typography>
                  <Typography component="h2" css={styles.liquidText3}>
                    {formatPoint(data.points, 2)}
                  </Typography>
                </Box>
              </Box>
            </Box>
          )}
          {account && !data && (
            <Box css={styles.pointUserContainer}>
              <Typography color="text.secondary">
                Join the Onyx system now to earn points and win amazing rewards — be part of a
                growing community of thousands!
              </Typography>
              <Button
                css={styles.menuMobileButton}
                variant="secondaryConnectWallet"
                onClick={onEnroll}
              >
                Enroll now!
              </Button>
            </Box>
          )}
        </Box>
        <Box css={styles.howToEarnBefore}>
          <Box css={styles.howToEarnContainer}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6" fontWeight="bold" mb={2}>
                How to Earn Points
              </Typography>
              <Link to="/">
                <Typography color="text.secondary" fontSize="14px">
                  Learn more
                </Typography>
              </Link>
            </Box>
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
      {activeModal === 'enroll' && <EnrollModal farm={farms[0]} handleClose={closeActiveModal} />}
    </>
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
