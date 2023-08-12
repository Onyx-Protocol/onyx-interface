/** @jsxImportSource @emotion/react */
import Typography from '@mui/material/Typography';
import config from 'config';
import React from 'react';
import { useTranslation } from 'translation';

import { Connector } from 'clients/web3';

import {
  // INTEGRATED_WALLETS,
  UPCOMING_WALLETS,
  WALLETS,
  XCN_TERMS_OF_SERVICE_URL,
} from '../constants';
import { useStyles } from './styles';

export interface WalletListProps {
  onLogin: (connector: Connector) => void;
}

export const WalletList: React.FC<WalletListProps> = ({ onLogin }) => {
  const styles = useStyles();
  const { t, Trans } = useTranslation();

  return (
    <div css={styles.container}>
      <div css={styles.walletList}>
        {WALLETS.filter(({ mainnetOnly }) => !mainnetOnly || !config.isOnTestnet).map(
          ({ name, connector, Logo }) => (
            <button
              css={styles.getListItem({ isActionable: true })}
              key={`wallet-${name}`}
              type="button"
              onClick={() => onLogin(connector)}
            >
              <Logo css={styles.walletLogo} />

              <Typography variant="tiny" component="div">
                {name}
              </Typography>

              <Typography variant="tiny" component="div">
                <svg
                  width="10"
                  height="16"
                  viewBox="0 0 10 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M6.13274 8L0.196818 2.15601C-0.0678416 1.89559 -0.0651412 1.4789 0.202218 1.21848L1.26355 0.194996C1.53632 -0.0654317 1.97381 -0.0654317 2.24387 0.1976L9.79746 7.52863C9.93249 7.65884 10 7.82812 10 8C10 8.17188 9.93249 8.34116 9.79746 8.47137L2.24387 15.8024C1.97381 16.0654 1.53632 16.0654 1.26356 15.805L0.202219 14.7815C-0.0651406 14.5211 -0.0678411 14.1044 0.196818 13.844L6.13274 8Z" />
                </svg>
              </Typography>
            </button>
          ),
        )}

        {/* {INTEGRATED_WALLETS.map(({ name, Logo, linkUrl }) => (
          <a
            css={styles.getListItem({ isActionable: true })}
            key={`wallet-${name}`}
            href={linkUrl}
            target="_blank"
            rel="noreferrer"
          >
            <Logo css={styles.walletLogo} />

            <Typography variant="tiny" component="div">
              {name}
            </Typography>
          </a>
        ))} */}

        {UPCOMING_WALLETS.map(({ name, Logo }) => (
          <div css={styles.getListItem({ isActionable: false })} key={`upcoming-wallet-${name}`}>
            <Logo css={styles.walletLogo} />

            <Typography variant="tiny" css={styles.comingSoonText} component="div">
              {t('authModal.walletList.comingSoon')}
            </Typography>
          </div>
        ))}
      </div>

      <div css={styles.footer}>
        <Typography variant="small2">
          <Trans
            i18nKey="authModal.walletList.termsOfServiceLink"
            components={{
              Anchor: (
                <a // eslint-disable-line jsx-a11y/anchor-has-content
                  href={XCN_TERMS_OF_SERVICE_URL}
                  target="_blank"
                  rel="noreferrer"
                  css={styles.footerLink}
                />
              ),
            }}
          />
        </Typography>
      </div>
    </div>
  );
};
