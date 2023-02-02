/* eslint-disable no-nested-ternary */

/** @jsxImportSource @emotion/react */
import { Button, Pagination, PrimaryButton, Spinner } from 'components';
import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  formatPercentage,
  formatTokensToReadableValue,
  generateEthScanUrl,
  getContractAddress,
  truncateAddress,
} from 'utilities';

import copyImg from 'assets/img/copy2.svg';
import linkImg from 'assets/img/link2.svg';
import {
  useClaimXcn,
  useGetBalanceOf,
  useGetStakeHistories,
  useGetStakingApy,
  useGetStakingInfos,
} from 'clients/api';
import { TOKENS } from 'constants/tokens';
import { AuthContext } from 'context/AuthContext';
import useCopyToClipboard from 'hooks/useCopyToClipboard';
import useTokenApproval from 'hooks/useTokenApproval';

import { StakeModal, WithdrawModal } from './Modals';
import { useStyles } from './styles';

export const Stake: React.FC = () => {
  const styles = useStyles();
  const { t } = useTranslation();
  const { account, openAuthModal } = useContext(AuthContext);
  const accountAddress = account?.address || '';

  const [currentPage, setCurrentPage] = useState(0);

  const [showStakeModal, setShowStakeModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);

  const xcnToken = TOKENS.xcn;

  const { data: xcnBalance } = useGetBalanceOf({
    token: xcnToken,
    accountAddress,
  });

  const { data: stakingInfo } = useGetStakingInfos({ accountAddress });
  const { data: stakingApy } = useGetStakingApy();

  const { isTokenApprovalStatusLoading, isTokenApproved, approveToken, isApproveTokenLoading } =
    useTokenApproval({
      token: xcnToken,
      spenderAddress: getContractAddress('xcnStaking'),
      accountAddress,
    });

  const { mutateAsync: claimXcn, isLoading: isClaimXcnLoading } = useClaimXcn();

  const copyTxHash = useCopyToClipboard(t('interactive.copy.txHash'));

  const {
    data: { stakeHistories, total } = { stakeHistories: [] },
    isFetching: isGetStakeHistoriesFetching,
  } = useGetStakeHistories({
    page: currentPage,
    address: accountAddress,
  });

  return (
    <div css={styles.root}>
      <div css={styles.stakeForm}>
        <div className="header">Balance</div>
        <div className="content">
          <div className="info">
            <span>Stake:</span>
            <span className="value">
              {formatTokensToReadableValue({
                value: stakingInfo?.staked.div(1e18),
                token: TOKENS.xcn,
                minimizeDecimals: true,
                addSymbol: false,
              })}
            </span>
            <span className="xcn">XCN</span>

            <span>Wallet:</span>
            <span className="value">
              {formatTokensToReadableValue({
                value: xcnBalance?.balanceWei.div(1e18),
                token: TOKENS.xcn,
                minimizeDecimals: true,
                addSymbol: false,
              })}
            </span>
            <span className="xcn">XCN</span>

            <span>Earned:</span>
            <span className="value">
              {formatTokensToReadableValue({
                value: stakingInfo?.earned.div(1e18),
                token: TOKENS.xcn,
                minimizeDecimals: true,
                addSymbol: false,
              })}
            </span>
            <span className="xcn">XCN</span>

            <span>APR:</span>
            <span className="value">{formatPercentage(stakingApy ? stakingApy?.apy : 0)}%</span>
          </div>
          <div className="buttons">
            {!accountAddress ? (
              <Button className="button" onClick={openAuthModal}>
                {t('connectWallet.connectButton')}
              </Button>
            ) : isTokenApprovalStatusLoading ? (
              <Spinner css={styles.loader} />
            ) : (
              <>
                <div className="button_row">
                  {isTokenApproved ? (
                    <PrimaryButton className="button" onClick={() => setShowStakeModal(true)}>
                      STAKE
                    </PrimaryButton>
                  ) : (
                    <PrimaryButton
                      loading={isApproveTokenLoading}
                      className={`button ${isApproveTokenLoading ? 'disabled' : ''}`}
                      onClick={approveToken}
                    >
                      APPROVE
                    </PrimaryButton>
                  )}
                  <PrimaryButton className="button" onClick={() => setShowWithdrawModal(true)}>
                    WITHDRAW
                  </PrimaryButton>
                </div>
                <PrimaryButton
                  loading={isClaimXcnLoading}
                  className={`button ${isClaimXcnLoading ? 'disabled' : ''}`}
                  onClick={() =>
                    claimXcn({
                      accountAddress,
                    })
                  }
                >
                  CLAIM
                </PrimaryButton>
              </>
            )}
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
      {showStakeModal && (
        <StakeModal
          isOpen={showStakeModal}
          balance={xcnBalance?.balanceWei}
          onClose={() => setShowStakeModal(false)}
        />
      )}
      {showWithdrawModal && (
        <WithdrawModal
          isOpen={showWithdrawModal}
          balance={stakingInfo?.staked}
          onClose={() => setShowWithdrawModal(false)}
        />
      )}
    </div>
  );
};

export default Stake;
