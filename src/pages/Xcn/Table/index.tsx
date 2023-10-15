/** @jsxImportSource @emotion/react */
import { Typography } from '@mui/material';
import { Table, TableProps, TokenIconWithSymbol } from 'components';
import React, { useContext, useMemo } from 'react';
import { useTranslation } from 'translation';
import { Asset } from 'types';
import { formatToReadablePercentage, formatTokensToReadableValue } from 'utilities';

import { useGetUserMarketInfo } from 'clients/api';
import { TOKENS } from 'constants/tokens';
import { AuthContext } from 'context/AuthContext';

import { useStyles } from '../styles';

type TableAsset = {
  token: Asset['token'];
  xcnPerDay: Asset['xcnPerDay'] | undefined;
  xcnSupplyApy: Asset['xcnSupplyApy'] | undefined;
  xcnBorrowApy: Asset['xcnBorrowApy'] | undefined;
};

interface XcnTableProps {
  assets: TableAsset[];
}

const XcnTableUi: React.FC<XcnTableProps> = ({ assets }) => {
  const { t, i18n } = useTranslation();
  const styles = useStyles();

  const columns = useMemo(
    () => [
      { key: 'asset', label: t('xcn.columns.asset'), orderable: false, align: 'left' },
      { key: 'xcnPerDay', label: t('xcn.columns.xcnPerDay'), orderable: true, align: 'right' },
      {
        key: 'supplyXcnApy',
        label: t('xcn.columns.supplyXcnApy'),
        orderable: true,
        align: 'right',
      },
      {
        key: 'borrowXcnApy',
        label: t('xcn.columns.borrowXcnApy'),
        orderable: true,
        align: 'right',
      },
    ],
    [i18n.language],
  );

  // Format assets to rows
  const rows: TableProps['data'] = assets.map(asset => [
    {
      key: 'asset',
      render: () => <TokenIconWithSymbol token={asset.token} />,
      value: asset.token.id,
      align: 'left',
    },
    {
      key: 'xcnPerDay',
      render: () => (
        <Typography variant="small1" css={[styles.whiteText, styles.fontWeight400]}>
          {formatTokensToReadableValue({
            value: asset.xcnPerDay,
            token: TOKENS.xcn,
            minimizeDecimals: true,
          })}
        </Typography>
      ),
      value: asset.xcnPerDay?.toFixed() || 0,
      align: 'right',
    },
    {
      key: 'supplyXcnApy',
      render: () => (
        <Typography variant="small1" css={[styles.whiteText, styles.fontWeight400]}>
          {asset.xcnSupplyApy?.isNaN() ? 'Pending' : formatToReadablePercentage(asset.xcnSupplyApy)}
        </Typography>
      ),
      value: asset.xcnSupplyApy?.toFixed() || 0,
      align: 'right',
    },
    {
      key: 'borrowXcnApy',
      render: () => (
        <Typography variant="small1" css={[styles.whiteText, styles.fontWeight400]}>
          {asset.xcnBorrowApy?.isNaN() ? 'Pending' : formatToReadablePercentage(asset.xcnBorrowApy)}
        </Typography>
      ),
      value: asset.xcnBorrowApy?.toFixed() || 0,
      align: 'right',
    },
  ]);

  return (
    <Table
      columns={columns}
      data={rows}
      // initialOrder={{
      //   orderBy: 'xcnPerDay',
      //   orderDirection: 'desc',
      // }}
      rowKeyIndex={0}
      tableCss={styles.table}
      cardsCss={styles.cards}
      css={styles.cardContentGrid}
    />
  );
};

const XcnTable: React.FC = () => {
  const { account } = useContext(AuthContext);
  // TODO: handle loading state (see https://app.clickup.com/t/2d4rcee)
  const {
    data: { assets },
  } = useGetUserMarketInfo({
    accountAddress: account?.address,
  });

  return <XcnTableUi assets={assets} />;
};

export default XcnTable;
