/** @jsxImportSource @emotion/react */
import MuiAccordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import React from 'react';
import { Link } from 'react-router-dom';
import { generateEthScanUrl, truncateAddress } from 'utilities';

import linkImg from 'assets/img/link.svg';
import viewImg from 'assets/img/view.svg';

import { Icon } from '../Icon';
import { useStyles } from './styles';

export interface LiquidateAccordionProps {
  className?: string;
  expanded: boolean;
  onChange: (index: number | undefined) => void;
  id: number;
  account: string;
  borrowPercent: number;
}

export const LiquidateAccordion: React.FC<LiquidateAccordionProps> = ({
  className,
  expanded,
  onChange,
  id,
  account,
  borrowPercent,
  children,
}) => {
  const styles = useStyles();

  let barBg = 'rgba(30, 185, 166, 1)';

  if (borrowPercent >= 100) {
    barBg = '#f37056';
  }

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
        <div css={styles.accountBar}>
          <span>{truncateAddress(account, 20, -6)}</span>
          <a href={generateEthScanUrl(account, 'address')} target="_blank" rel="noreferrer">
            <img src={linkImg} alt="link" />
          </a>
        </div>
        <div css={styles.percentBar}>
          <div
            className="percent"
            style={{
              color: `${barBg}`,
            }}
          >
            {borrowPercent.toFixed(2)}%
          </div>
          <div className="buttonGroup">
            <Link to={`/liquidate/${account}`}>
              <img src={viewImg} alt="view" />
            </Link>
            <Icon name="arrowUpLiquidate" css={styles.arrow(expanded)} />
          </div>
        </div>
      </AccordionSummary>
      <AccordionDetails css={styles.content}>{children}</AccordionDetails>
    </MuiAccordion>
  );
};
