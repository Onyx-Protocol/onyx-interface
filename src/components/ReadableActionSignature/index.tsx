/** @jsxImportSource @emotion/react */
import { Typography } from '@mui/material';
import React from 'react';
import { ProposalAction } from 'types';
import { generateEthScanUrl } from 'utilities';

import { FormValues } from 'pages/Vote/CreateProposalModal/proposalSchema';

import formatSignature from './formatSignature';
import getContractName from './getContractName';
import { useStyles } from './styles';

interface ReadableActionSignatureProps {
  action: FormValues['actions'][number] | ProposalAction;
  className?: string;
}

export const ReadableActionSignature: React.FC<ReadableActionSignatureProps> = ({
  action,
  className,
}) => {
  const styles = useStyles();

  return (
    <Typography
      css={styles.signature}
      className={className}
      key={`${action.signature}-${action.target}`}
    >
      <Typography
        component="a"
        href={generateEthScanUrl(action.target, 'address')}
        target="_blank"
        rel="noreferrer"
      >
        {getContractName(action.target)}
      </Typography>
      {formatSignature(action)}
    </Typography>
  );
};
