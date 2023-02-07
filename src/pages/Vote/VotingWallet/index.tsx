/** @jsxImportSource @emotion/react */
import { Paper, Typography } from '@mui/material';
import BigNumber from 'bignumber.js';
import { Delimiter, PrimaryButton } from 'components';
import React, { useContext, useMemo } from 'react';
import { useTranslation } from 'translation';
import { convertWeiToTokens } from 'utilities';

import { useGetCurrentVotes } from 'clients/api';
import { TOKENS } from 'constants/tokens';
import { AuthContext } from 'context/AuthContext';

import { useStyles } from './styles';
import TEST_IDS from './testIds';

interface VotingWalletUiProps {
  votingWeightWei: BigNumber;
  openAuthModal: () => void;
  connectedWallet: boolean;
}

export const VotingWalletUi: React.FC<VotingWalletUiProps> = ({
  votingWeightWei,
  connectedWallet,
  openAuthModal,
}) => {
  const { t, Trans } = useTranslation();
  const styles = useStyles();

  const readableVoteWeight = useMemo(
    () =>
      convertWeiToTokens({
        valueWei: votingWeightWei,
        token: TOKENS.xcn,
        returnInReadableFormat: true,
        addSymbol: false,
        minimizeDecimals: true,
      }),
    [votingWeightWei],
  );

  return (
    <div css={styles.root}>
      <Typography variant="h4">{t('vote.votingWallet')}</Typography>

      <Paper css={styles.votingWalletPaper}>
        <div css={styles.votingWeightContainer}>
          <Typography variant="body2" css={styles.subtitle}>
            {t('vote.votingWeight')}
          </Typography>

          <Typography variant="h3" css={styles.value} data-testid={TEST_IDS.votingWeightValue}>
            {readableVoteWeight}
          </Typography>
        </div>

        <Delimiter css={styles.delimiter} />

        {!connectedWallet && (
          <PrimaryButton css={styles.actionButton} onClick={openAuthModal}>
            {t('connectWallet.connectButton')}
          </PrimaryButton>
        )}
      </Paper>

      <Paper css={[styles.votingWalletPaper, styles.voteSection]}>
        <Typography variant="body2" color="textPrimary" css={styles.toVote}>
          {t('vote.toVoteYouShould')}
        </Typography>

        <Typography variant="small2" color="textPrimary" css={styles.depositTokens}>
          <Trans
            i18nKey="vote.depositYourTokens"
            components={{
              Anchor: (
                <a // eslint-disable-line jsx-a11y/anchor-has-content
                  href="/stake"
                  css={styles.link}
                />
              ),
            }}
          />
        </Typography>
      </Paper>
    </div>
  );
};

const VotingWallet: React.FC = () => {
  const { account: { address: accountAddress } = { address: undefined }, openAuthModal } =
    useContext(AuthContext);

  const { data: currentVotesData } = useGetCurrentVotes(
    { accountAddress: accountAddress || '' },
    { enabled: !!accountAddress },
  );

  return (
    <VotingWalletUi
      votingWeightWei={currentVotesData?.votesWei || new BigNumber(0)}
      connectedWallet={!!accountAddress}
      openAuthModal={openAuthModal}
    />
  );
};

export default VotingWallet;
