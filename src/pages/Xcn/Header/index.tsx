/** @jsxImportSource @emotion/react */
import { Paper, Typography } from '@mui/material';
import BigNumber from 'bignumber.js';
import { EllipseAddress, Icon, LabeledProgressBar, TokenIcon } from 'components';
import React, { useContext, useMemo } from 'react';
import { useTranslation } from 'translation';
import {
  convertWeiToTokens,
  formatTokensToReadableValue,
  generateEthScanUrl,
  getContractAddress,
} from 'utilities';

import { useGetBalanceOf, useGetUserMarketInfo } from 'clients/api';
import { TOKENS } from 'constants/tokens';
import { AuthContext } from 'context/AuthContext';
import useCopyToClipboard from 'hooks/useCopyToClipboard';

import { MINTED_XCN_WEI } from '../constants';
import { useStyles } from '../styles';

interface HeaderProps {
  className?: string;
}

interface HeaderContainerProps {
  remainingDistributionWei: BigNumber;
  dailyXcnWei: BigNumber;
  // totalXcnDistributedWei: BigNumber;
}

export const HeaderUi: React.FC<HeaderProps & HeaderContainerProps> = ({
  className,
  remainingDistributionWei,
  dailyXcnWei,
  // totalXcnDistributedWei,
}) => {
  const styles = useStyles();
  const { t } = useTranslation();

  const copy = useCopyToClipboard(t('interactive.copy.contractAddress'));
  const copyAddress = () => copy(getContractAddress('comptroller'));

  const readableDailyDistribution = useMemo(() => {
    const dailyXcnTokens = convertWeiToTokens({
      valueWei: dailyXcnWei,
      token: TOKENS.xcn,
    });

    const dailyDistribution = dailyXcnTokens;

    return formatTokensToReadableValue({
      value: dailyDistribution,
      token: TOKENS.xcn,
      minimizeDecimals: true,
    });
  }, [dailyXcnWei.toFixed()]);

  const readableRemainingDistribution = useMemo(
    () =>
      convertWeiToTokens({
        valueWei: remainingDistributionWei,
        token: TOKENS.xcn,
        returnInReadableFormat: true,
        minimizeDecimals: true,
      }),
    [remainingDistributionWei.toFixed()],
  );

  const percentOfXcnDistributed = useMemo(
    // () => totalXcnDistributedWei.dividedBy(MINTED_XCN_WEI).multipliedBy(100).toNumber(),
    () =>
      MINTED_XCN_WEI.minus(remainingDistributionWei)
        .dividedBy(MINTED_XCN_WEI)
        .multipliedBy(100)
        .toNumber(),
    [],
  );

  return (
    <Paper className={className} css={styles.headerRoot}>
      <div css={styles.addressContainer}>
        <div css={styles.xcnIconContainer}>
          <TokenIcon token={TOKENS.xcn} css={styles.icon} />
        </div>

        <Typography
          href={generateEthScanUrl('xcn', 'token')}
          target="_blank"
          rel="noreferrer"
          variant="small2"
          component="a"
          css={[styles.whiteText, styles.addressText]}
        >
          <EllipseAddress address={getContractAddress('comptroller')} ellipseBreakpoint="xl" />
        </Typography>

        <div css={styles.copyIconContainer}>
          <Icon name="copy" onClick={copyAddress} css={styles.copyIcon} size={styles.iconSizeXl} />
        </div>
      </div>

      <div css={styles.slider}>
        <LabeledProgressBar
          css={styles.progressBar}
          min={1}
          max={100}
          step={1}
          value={percentOfXcnDistributed}
          ariaLabel={t('xcn.progressBar')}
          greyLeftText={t('xcn.dailyDistribution')}
          whiteLeftText={readableDailyDistribution}
          greyRightText={t('xcn.remaining')}
          whiteRightText={readableRemainingDistribution}
        />
      </div>
    </Paper>
  );
};

const Header: React.FC<HeaderProps> = ({ className }) => {
  const { account } = useContext(AuthContext);
  const {
    data: { dailyXcnWei },
  } = useGetUserMarketInfo({
    accountAddress: account?.address,
  });
  const { data: xcnRemainingDistributionData } = useGetBalanceOf({
    token: TOKENS.xcn,
    accountAddress: getContractAddress('xcnClaim'),
  });

  return (
    <HeaderUi
      remainingDistributionWei={xcnRemainingDistributionData?.balanceWei || new BigNumber(0)}
      className={className}
      dailyXcnWei={dailyXcnWei}
      // totalXcnDistributedWei={totalXcnDistributedWei}
    />
  );
};

export default Header;
