/** @jsxImportSource @emotion/react */
import { Pagination } from 'components';
import config from 'config';
import React, { useContext, useEffect, useState } from 'react';
import { getHistorySubGraph } from 'utilities';

import { AuthContext } from 'context/AuthContext';
import { Filter, HistoryItem, HistoryItemType } from 'utilities/getHistorySubGraph';

import Filters, { ALL_VALUE, FilterProps } from './Filters';
import HistoryTable from './HistoryTable';

interface HistoryUiProps extends FilterProps {
  historyItems: HistoryItem[];
  isFetching: boolean;
  total: number | undefined;
  limit: number | undefined;
  setCurrentPage: (page: number) => void;
}

export const HistoryUi: React.FC<HistoryUiProps> = ({
  historyItemType,
  setHistoryItemType,
  asset,
  setAsset,
  showOnlyMyTxns,
  setShowOnlyMyTxns,
  historyItems,
  walletConnected,
  isFetching,
  total,
  limit,
  setCurrentPage,
}) => (
  <div style={{ marginBottom: '20px' }}>
    <Filters
      historyItemType={historyItemType}
      setHistoryItemType={setHistoryItemType}
      asset={asset}
      setAsset={setAsset}
      showOnlyMyTxns={showOnlyMyTxns}
      setShowOnlyMyTxns={setShowOnlyMyTxns}
      walletConnected={walletConnected}
    />
    <HistoryTable historyItems={historyItems} isFetching={isFetching} />
    {total ? (
      <Pagination
        itemsCount={total}
        onChange={(nextIndex: number) => {
          setCurrentPage(nextIndex);
          window.scrollTo(0, 0);
        }}
        itemsPerPageCount={limit || 20}
      />
    ) : null}
  </div>
);

const History: React.FC = () => {
  const { account } = useContext(AuthContext);
  const accountAddress = account?.address;
  const limit = 25;
  const [currentPage, setCurrentPage] = useState(0);
  const [historyItemType, setHistoryItemType] = useState<HistoryItemType | typeof ALL_VALUE>(
    ALL_VALUE,
  );
  const [asset, setAsset] = useState(ALL_VALUE);
  const [showOnlyMyTxns, setShowOnlyMyTxns] = useState(false);
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>([]);
  const [isFetching, setIsFetching] = useState(false);

  const fetchHistorySubGraph = async () => {
    setIsFetching(true);
    const filter: Filter = {};

    if (asset !== ALL_VALUE) {
      filter.to = asset;
    }

    if (historyItemType !== ALL_VALUE) {
      filter.type = historyItemType;
    }
    const historyItemsFetched = await getHistorySubGraph(
      config.chainId,
      filter,
      {
        direction: 'desc',
        field: 'blockTimestamp',
      },
      {
        limit,
        offset: currentPage * limit,
      },
    );

    setHistoryItems(historyItemsFetched);
    setIsFetching(false);
  };

  useEffect(() => {
    fetchHistorySubGraph();
  }, [asset, historyItemType, currentPage]);

  return (
    <HistoryUi
      historyItemType={historyItemType}
      setHistoryItemType={setHistoryItemType}
      asset={asset}
      setAsset={setAsset}
      showOnlyMyTxns={showOnlyMyTxns}
      setShowOnlyMyTxns={setShowOnlyMyTxns}
      historyItems={historyItems}
      walletConnected={!!accountAddress}
      isFetching={isFetching}
      total={historyItems.length}
      limit={limit}
      setCurrentPage={setCurrentPage}
    />
  );
};

export default History;
