/** @jsxImportSource @emotion/react */
import { Paper } from '@mui/material';
import BigNumber from 'bignumber.js';
import { Tabs } from 'components';
import React, { useState } from 'react';
import { useTranslation } from 'translation';
import { Asset } from 'types';

import { useStyles as useSharedStyles } from '../styles';
import BorrowMarket from './BorrowMarket';
import SupplyMarket from './SupplyMarket';
import { useStyles as useLocalStyles } from './styles';

export interface MarketsProps {
  isXcnEnabled: boolean;
  accountAddress: string;
  userTotalBorrowLimitCents: BigNumber;
  suppliedAssets: Asset[];
  supplyMarketAssets: Asset[];
  borrowingAssets: Asset[];
  borrowMarketAssets: Asset[];
}

const Markets: React.FC<MarketsProps> = ({
  isXcnEnabled,
  accountAddress,
  userTotalBorrowLimitCents,
  suppliedAssets,
  supplyMarketAssets,
  borrowingAssets,
  borrowMarketAssets,
}) => {
  const { t } = useTranslation();
  const sharedStyles = useSharedStyles();
  const localStyles = useLocalStyles();
  const styles = {
    ...sharedStyles,
    ...localStyles,
  };

  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const tabsContent = [
    {
      title: t('dashboard.markets.tabSupply'),
      content: (
        <SupplyMarket
          css={styles.market}
          isXcnEnabled={isXcnEnabled}
          suppliedAssets={suppliedAssets}
          supplyMarketAssets={supplyMarketAssets}
          accountAddress={accountAddress}
        />
      ),
    },
    {
      name: t('markets.borrowMarketTableTitle'),
      title: t('dashboard.markets.tabBorrow'),
      content: (
        <BorrowMarket
          css={styles.market}
          isXcnEnabled={isXcnEnabled}
          borrowingAssets={borrowingAssets}
          borrowMarketAssets={borrowMarketAssets}
          userTotalBorrowLimitCents={userTotalBorrowLimitCents}
        />
      ),
    },
  ];

  const getTabsComponentTitle = () => {
    if (activeTabIndex === 0) {
      return suppliedAssets.length > 0
        ? t('markets.suppliedTableTitle')
        : t('markets.supplyMarketTableTitle');
    }

    return borrowingAssets.length > 0
      ? t('markets.borrowingTableTitle')
      : t('markets.borrowMarketTableTitle');
  };

  return (
    <>
      {/* Desktop display */}
      <div css={[styles.row, styles.desktopViewContainer]}>
        <SupplyMarket
          css={styles.column}
          isXcnEnabled={isXcnEnabled}
          suppliedAssets={suppliedAssets}
          supplyMarketAssets={supplyMarketAssets}
          accountAddress={accountAddress}
        />

        <BorrowMarket
          css={styles.column}
          isXcnEnabled={isXcnEnabled}
          borrowingAssets={borrowingAssets}
          borrowMarketAssets={borrowMarketAssets}
          userTotalBorrowLimitCents={userTotalBorrowLimitCents}
        />
      </div>

      {/* Tablet view */}
      <Paper css={styles.tabletViewContainer}>
        <Tabs
          css={styles.tabsHeader}
          componentTitle={getTabsComponentTitle()}
          tabsContent={tabsContent}
          onTabChange={setActiveTabIndex}
        />
      </Paper>

      {/* Mobile display */}
      <Paper css={styles.mobileViewContainer}>
        <h4 css={[styles.tabsHeader, styles.tabsTitle]}>{t('dashboard.markets.title')}</h4>

        <Tabs css={styles.tabsHeader} tabsContent={tabsContent} onTabChange={setActiveTabIndex} />
      </Paper>
    </>
  );
};

export default Markets;
