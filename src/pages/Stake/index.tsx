/** @jsxImportSource @emotion/react */
import { Pagination, Spinner } from 'components';
import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { generateEthScanUrl, truncateAddress } from 'utilities';

import copyImg from 'assets/img/copy2.svg';
import linkImg from 'assets/img/link2.svg';
import { useGetStakeHistories } from 'clients/api';
import { AuthContext } from 'context/AuthContext';
import useCopyToClipboard from 'hooks/useCopyToClipboard';

import { useStyles } from './styles';

export const Stake: React.FC = () => {
  const styles = useStyles();
  const { t } = useTranslation();
  const { account } = useContext(AuthContext);

  const [currentPage, setCurrentPage] = useState(0);

  const copyTxHash = useCopyToClipboard(t('interactive.copy.txHash'));

  const {
    data: { stakeHistories, total } = { stakeHistories: [] },
    isFetching: isGetStakeHistoriesFetching,
  } = useGetStakeHistories({
    page: currentPage,
    address: account?.address,
  });

  return (
    <div css={styles.root}>
      <div css={styles.stakeForm}>
        <div className="header">Balance</div>
        <div className="content">
          <div className="info">
            <span>Stake:</span>
            <span className="value">0.00</span>
            <span className="xcn">XCN</span>

            <span>Wallet:</span>
            <span className="value">0.00</span>
            <span className="xcn">XCN</span>

            <span>Earned:</span>
            <span className="value">0.00</span>
            <span className="xcn">XCN</span>

            <span>APR:</span>
            <span className="value">0.00%</span>
          </div>
          <div className="buttons">
            <div className="button_row">
              <div className="button">APPROVE</div>
              <div className="button disabled">WITHDRAW</div>
            </div>
            <div className="button disabled">CLAIM</div>
          </div>
        </div>
      </div>
      <div css={styles.historyForm}>
        <div className="header">History</div>
        <div className="content-desktop">
          {isGetStakeHistoriesFetching && <Spinner css={styles.loader} />}
          <div className="table-header">
            <span>ID</span>
            <span>Transaction Hash</span>
            <span>Type</span>
            <span>Amount</span>
            <span>Reward</span>
            <span>Date</span>
          </div>

          {stakeHistories.map(history => (
            <div className="table-record">
              <span>{history.id}</span>
              <span className="txHash">
                {truncateAddress(history.tx_hash, 6, -4)}
                <div className="actions">
                  <img src={copyImg} alt="copy" onClick={() => copyTxHash(history.tx_hash)} />
                  <a
                    href={generateEthScanUrl(history.tx_hash, 'tx')}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img src={linkImg} alt="link" />
                  </a>
                </div>
              </span>
              <span>{history.type === 0 ? 'Stake' : 'Withdraw'}</span>
              <span>
                {history.amount.div(1e18).toFixed(4)}{' '}
                <span className="usdValue">${Number(history.price).toFixed(2)}</span>
              </span>
              <span>{history.reward.div(1e18).toFixed(4)}</span>
              <span>{history.created_at.toLocaleDateString('en-CA')}</span>
            </div>
          ))}
          {total ? (
            <Pagination
              itemsCount={total}
              onChange={(nextIndex: number) => {
                setCurrentPage(nextIndex);
                window.scrollTo(0, 0);
              }}
              itemsPerPageCount={6}
            />
          ) : null}
        </div>
        <div className="content-mobile">Mobile Content</div>
      </div>
    </div>
  );
};

export default Stake;
