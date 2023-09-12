/** @jsxImportSource @emotion/react */
import Typography from '@mui/material/Typography';
import config from 'config';
import React from 'react';
import { useTranslation } from 'translation';
import { UrlType, generateEthScanUrl } from 'utilities';

import { Breakpoint, EllipseAddress } from '../EllipseAddress';
import { Icon } from '../Icon';
import { useStyles } from './styles';

export interface EthLinkProps {
  hash: string;
  ellipseBreakpoint?: Breakpoint;
  urlType?: UrlType;
  className?: string;
  text?: string;
}

export const EthLink: React.FC<EthLinkProps> = ({
  hash,
  className,
  urlType,
  text,
  ellipseBreakpoint,
}) => {
  const { t } = useTranslation();
  const styles = useStyles();

  let content;

  if (text) {
    content = ellipseBreakpoint ? (
      <EllipseAddress ellipseBreakpoint={ellipseBreakpoint} address={text} />
    ) : (
      text
    );
  } else {
    content = t('ethLink.content', { scanurl: config.ethScanUrl });
  }

  return (
    <div css={styles.container} className={className}>
      <Typography
        component="a"
        href={generateEthScanUrl(hash, urlType)}
        target="_blank"
        rel="noreferrer"
        variant="small1"
        css={styles.text}
      >
        {content}

        <Icon name="open" css={styles.icon} />
      </Typography>
    </div>
  );
};
