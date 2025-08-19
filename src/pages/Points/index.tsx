/** @jsxImportSource @emotion/react */
import { faArrowRightArrowLeft, faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Grid, Paper, Typography } from '@mui/material';
import { Button, Spinner } from 'components';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'translation';

import { Farm, useGetFarms } from 'clients/api';
import useGetUserInfo from 'clients/api/queries/getUserInfo/useGetUserInfo';
import useGetUserPoints from 'clients/api/queries/getUserInfo/useGetUserPoints';
import ConnectButton from 'components/Layout/ConnectButton';
import { AuthContext } from 'context/AuthContext';
import LeaderboardTable from 'pages/PointsLeaderboard/LeaderboardTable';

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
  const { account } = React.useContext(AuthContext);
  const styles = useStyles();
  const { t } = useTranslation();
  const { data: userEnrolled } = useGetUserInfo(
    { address: account?.address || '' },
    { enabled: !!account },
  );
  const { data: userStaked } = useGetUserPoints(
    { address: account?.address || '' },
    { enabled: !!account },
  );

  const onEnroll = () => {
    setActiveModal('enroll');
  };
  const closeActiveModal = () => setActiveModal(undefined);

  if (isInitialLoading || farms.length === 0) {
    return <Spinner />;
  }
  return (
    <>
      <Paper css={styles.container}>
        <Box css={styles.titleContainer}>
          <Typography variant="h3" fontWeight="bold" css={styles.titleText}>
            {t('pointsUi.header.title')}
          </Typography>
          <Typography color="text.secondary">{t('pointsUi.header.description')}</Typography>
          <a
            href="https://bridge.onyx.org"
            target="_blank"
            rel="noreferrer"
            css={{ width: 'fit-content' }}
          >
            <Button css={styles.buttonStyle} variant="secondaryConnectWallet">
              <FontAwesomeIcon css={{ paddingTop: '3px' }} icon={faArrowRightArrowLeft} />{' '}
              {t('pointsUi.header.buttonBridge')}
            </Button>
          </a>
        </Box>
        <Box css={styles.pointBeforeUserContainer}>
          {!account && (
            <Box css={styles.pointUserContainer}>
              <Typography color="text.secondary">
                {t('pointsUi.pointsUser.descriptionNotConnect')}
              </Typography>
              <ConnectButton small fullWidth css={styles.enrollButton} />
            </Box>
          )}
          {account && (
            <Box css={styles.pointUserContainer}>
              <Box css={styles.pointsUserEnrollContainer}>
                <Typography color="text.secondary" fontSize={14}>
                  {t('pointsUi.pointsUser.pointsSubtitle')}
                </Typography>
                <Box css={styles.pointsContainer}>
                  <Typography component="h2" css={styles.pointsText}>
                    {formatPoint(userStaked?.points || 0, 2)}
                  </Typography>
                  <Typography component="h2" css={styles.liquidText1}>
                    {formatPoint(userStaked?.points || 0, 2)}
                  </Typography>
                  <Typography component="h2" css={styles.liquidText2}>
                    {formatPoint(userStaked?.points || 0, 2)}
                  </Typography>
                  <Typography component="h2" css={styles.liquidText3}>
                    {formatPoint(userStaked?.points || 0, 2)}
                  </Typography>
                </Box>
              </Box>

              {!userEnrolled && (
                <Box css={styles.pointsUserEnrollContainer}>
                  <Typography color="text.secondary" textAlign="center">
                    {t('pointsUi.pointsUser.descriptionConnect')}
                  </Typography>
                  <Button
                    css={styles.menuMobileButton}
                    variant="secondaryConnectWallet"
                    onClick={onEnroll}
                  >
                    {t('pointsUi.pointsUser.enrollButton')}
                  </Button>
                </Box>
              )}
            </Box>
          )}
        </Box>
        <Box css={styles.howToEarnBefore}>
          <Box css={styles.howToEarnContainer}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6" fontWeight="bold" mb={2}>
                {t('pointsUi.howToEarn.title')}
              </Typography>
              <a href="https://docs.onyx.org/points/onyx-points" target="_blank" rel="noreferrer">
                <Typography color="text.secondary" fontSize="14px">
                  {t('pointsUi.howToEarn.learnMoreButton')}{' '}
                  <FontAwesomeIcon css={{ paddingTop: '3px' }} icon={faArrowUpRightFromSquare} />
                </Typography>
              </a>
            </Box>
            <Grid container spacing={3}>
              {[
                {
                  title: t('pointsUi.howToEarn.passivePoints.title'),
                  description: t('pointsUi.howToEarn.passivePoints.description'),
                  badge: 'PP',
                  color: '#BD6EAC',
                  buttonText: t('pointsUi.howToEarn.passivePoints.actionButton'),
                },
                {
                  title: t('pointsUi.howToEarn.activityPoints.title'),
                  description: t('pointsUi.howToEarn.activityPoints.description'),
                  badge: 'AP',
                  color: '#6EBD70',
                  buttonText: t('pointsUi.howToEarn.activityPoints.actionButton'),
                },
                {
                  title: t('pointsUi.howToEarn.appPoints.title'),
                  description: t('pointsUi.howToEarn.appPoints.description'),
                  badge: 'APP',
                  color: '#7095BD',
                  buttonText: t('pointsUi.howToEarn.appPoints.actionButton'),
                },
              ].map(item => (
                <Grid item xs={12} md={6} xl={4} key={item.title}>
                  <Paper
                    variant="outlined"
                    sx={{
                      p: 6,
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
                        css={styles.badgeContainer}
                        sx={{
                          backgroundColor: `${item.color}29`,
                          border: `1px solid ${item.color}`,
                          color: item.color,
                        }}
                      >
                        {item.badge}
                      </Box>
                      {(item.badge === 'AP' || item.badge === 'APP') && (
                        <Box css={styles.comingSoonBadge}>Coming Soon</Box>
                      )}
                    </Box>
                    <Typography color="text.secondary" fontSize="12px" sx={{ opacity: 50 }}>
                      {item.description}
                    </Typography>
                    {item.badge === 'PP' && (
                      <a
                        href="https://docs.onyx.org/points/earning-points/passive-points"
                        target="_blank"
                        rel="noreferrer"
                        style={{ textDecoration: 'none' }}
                      >
                        <Button variant="primary">{item.buttonText}</Button>
                      </a>
                    )}
                    {item.badge === 'AP' && (
                      <a
                        href="https://docs.onyx.org/points/earning-points/activity-points"
                        target="_blank"
                        rel="noreferrer"
                        style={{ textDecoration: 'none' }}
                      >
                        <Button variant="primary">{item.buttonText}</Button>
                      </a>
                    )}
                    {item.badge === 'APP' && (
                      <a
                        href="https://docs.onyx.org/points/earning-points/app-points"
                        target="_blank"
                        rel="noreferrer"
                        style={{ textDecoration: 'none' }}
                      >
                        <Button variant="primary">{item.buttonText}</Button>
                      </a>
                    )}
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
        <Box css={styles.leaderBoard}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 2,
            }}
          >
            <Typography variant="h6" fontWeight="bold">
              {t('pointsUi.topUsers.title')}
            </Typography>
            <Link to="/points-leaderboard">
              <Typography color="text.secondary" fontSize="14px">
                {t('pointsUi.topUsers.viewAllButton')}
              </Typography>
            </Link>
          </Box>
          <LeaderboardTable useRankIcon={false} isPaginated={false} limit={5} />
        </Box>
      </Paper>
      {activeModal === 'enroll' && <EnrollModal handleClose={closeActiveModal} />}
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
