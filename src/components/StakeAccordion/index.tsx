/** @jsxImportSource @emotion/react */
import MuiAccordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import React from 'react';
import { useTranslation } from 'translation';
import { generateEthScanUrl, truncateAddress } from 'utilities';

import copyImg from 'assets/img/copy2.svg';
import linkImg from 'assets/img/link2.svg';
import useCopyToClipboard from 'hooks/useCopyToClipboard';

import { Icon } from '../Icon';
import { useStyles } from './styles';

export interface StakeAccordionProps {
  className?: string;
  expanded: boolean;
  onChange: (index: number | undefined) => void;
  id: number;
  txHash: string;
}

export const StakeAccordion: React.FC<StakeAccordionProps> = ({
  className,
  expanded,
  onChange,
  id,
  txHash,
  children,
}) => {
  const styles = useStyles();

  const { t } = useTranslation();

  const copyToClipboard = useCopyToClipboard(t('interactive.copy.txHash'));

  const handleChange =
    (actionIdx: number) => (event: React.SyntheticEvent, newExpandedIdx: boolean) => {
      onChange(newExpandedIdx ? actionIdx : undefined);
    };
  return (
    <MuiAccordion
      className={className}
      expanded={expanded}
      onChange={handleChange(id)}
      css={styles.accordionRoot}
    >
      <AccordionSummary
        aria-controls={`panel${id}-content`}
        id={`panel${id}-header`}
        css={styles.accordionSummary}
      >
        <div css={styles.firstBar}>
          <span className="id">ID - {id}</span>
          <div>
            <img src={copyImg} alt="link" onClick={() => copyToClipboard(txHash)} />
            <a href={generateEthScanUrl(txHash, 'tx')} target="_blank" rel="noreferrer">
              <img src={linkImg} alt="link" />
            </a>
          </div>
        </div>
        <div css={styles.secondBar}>
          <div className="txhash">{truncateAddress(txHash, 20, -6)}</div>
          <div className="buttonGroup">
            <Icon name="arrowUpLiquidate" css={styles.arrow(expanded)} />
          </div>
        </div>
      </AccordionSummary>
      <AccordionDetails css={styles.content}>{children}</AccordionDetails>
    </MuiAccordion>
  );
};
