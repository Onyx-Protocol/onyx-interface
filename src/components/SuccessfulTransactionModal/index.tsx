/** @jsxImportSource @emotion/react */
import Typography from '@mui/material/Typography';
import BigNumber from 'bignumber.js';
import React from 'react';
import { Token } from 'types';
import { convertWeiToTokens } from 'utilities';

import { EthLink } from '../EthLink';
import { Icon } from '../Icon';
import { Modal, ModalProps } from '../Modal';
import { TokenIcon } from '../TokenIcon';
import { useStyles } from './styles';

export interface SuccessfulTransactionModalProps extends Omit<ModalProps, 'children'> {
  title: string;
  content?: string | React.ReactElement;
  transactionHash: string;
  amount?: {
    token: Token;
    valueWei: BigNumber;
    noDisplayTokenIcon?: boolean;
    token2?: Token;
    valueWei2?: BigNumber;
  };
  className?: string;
}

export const SuccessfulTransactionModal: React.FC<SuccessfulTransactionModalProps> = ({
  className,
  title,
  content,
  amount,
  transactionHash,
  isOpen,
  handleClose,
}) => {
  const styles = useStyles();

  return (
    <Modal isOpen={isOpen} handleClose={handleClose}>
      <div className={className} css={styles.container}>
        <Icon name="check" css={styles.headerIcon} />

        <h3 css={styles.title}>{title}</h3>

        <div
          css={styles.messageContainer}
          style={{ flexDirection: amount?.token2 ? 'column' : 'row' }}
        >
          {!!content && (
            <Typography variant="small1" component="p">
              {content}
            </Typography>
          )}
          {amount && (
            <div style={{ display: 'flex' }}>
              <div css={styles.amountContainer}>
                {!amount.noDisplayTokenIcon && (
                  <TokenIcon token={amount.token} css={styles.amountTokenIcon} />
                )}

                <Typography variant="small1" component="span">
                  {convertWeiToTokens({
                    valueWei: amount.valueWei,
                    token: amount.token,
                    minimizeDecimals: !!amount?.token2,
                    returnInReadableFormat: true,
                  })}
                </Typography>
              </div>

              {amount?.token2 && amount?.valueWei2 && (
                <div css={styles.amountContainer}>
                  &&nbsp;&nbsp;&nbsp;
                  {!amount.noDisplayTokenIcon && (
                    <TokenIcon token={amount.token2} css={styles.amountTokenIcon} />
                  )}
                  <Typography variant="small1" component="span">
                    {convertWeiToTokens({
                      valueWei: amount.valueWei2,
                      token: amount.token2,
                      minimizeDecimals: true,
                      returnInReadableFormat: true,
                    })}
                  </Typography>
                </div>
              )}
            </div>
          )}
        </div>

        <EthLink hash={transactionHash} urlType="tx" />
      </div>
    </Modal>
  );
};
