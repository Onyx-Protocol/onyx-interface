/** @jsxImportSource @emotion/react */
import BigNumber from 'bignumber.js';
import { VError } from 'errors';
import React, { useContext } from 'react';
import { useTranslation } from 'translation';
import type { TransactionReceipt } from 'web3-core/types';

// import { useClaimXcnReward, useGetXcnReward } from 'clients/api';
import { useClaimXcn, useGetStakingInfos } from 'clients/api';
import { TOKENS } from 'constants/tokens';
import { AuthContext } from 'context/AuthContext';
// import { DisableLunaUstWarningContext } from 'context/DisableLunaUstWarning';
import useConvertWeiToReadableTokenString from 'hooks/useConvertWeiToReadableTokenString';
import useHandleTransactionMutation from 'hooks/useHandleTransactionMutation';

import { ButtonProps, SecondaryButton } from '../../Button';
import { TokenIcon } from '../../TokenIcon';
import TEST_IDS from '../testIds';
import { useStyles } from './styles';

export interface ClaimXcnRewardButtonProps extends Omit<ButtonProps, 'onClick'> {
  onClaimReward: () => Promise<TransactionReceipt | void>;
  amountWei?: BigNumber;
}

export const ClaimXcnRewardButtonUi: React.FC<ClaimXcnRewardButtonProps> = ({
  amountWei,
  onClaimReward,
  ...otherProps
}) => {
  const { t, Trans } = useTranslation();
  const styles = useStyles();

  const handleTransactionMutation = useHandleTransactionMutation();

  const readableAmount = useConvertWeiToReadableTokenString({
    valueWei: amountWei,
    token: TOKENS.xcn,
    minimizeDecimals: true,
  });

  // Check readable amount isn't 0 (since we strip out decimals)
  if (!amountWei || readableAmount.split(' ')[0] === '0') {
    return null;
  }

  const handleClick = () =>
    handleTransactionMutation({
      mutate: onClaimReward,
      successTransactionModalProps: transactionReceipt => ({
        title: t('claimXcnRewardButton.successfulTransactionModal.title'),
        content: t('claimXcnRewardButton.successfulTransactionModal.message'),
        amount: {
          valueWei: amountWei,
          token: TOKENS.xcn,
        },
        transactionHash: transactionReceipt.transactionHash,
      }),
    });

  return (
    <SecondaryButton
      data-testid={TEST_IDS.claimXcnRewardButton}
      css={styles.button}
      onClick={handleClick}
      {...otherProps}
    >
      <Trans
        i18nKey="claimXcnRewardButton.title"
        components={{
          Icon: <TokenIcon token={TOKENS.xcn} css={styles.icon} />,
        }}
        values={{
          amount: readableAmount,
        }}
      />
    </SecondaryButton>
  );
};

export const ClaimXcnRewardButton: React.FC<ButtonProps> = props => {
  const { account } = useContext(AuthContext);

  // const { hasLunaOrUstCollateralEnabled, openLunaUstWarningModal } = useContext(
  //   DisableLunaUstWarningContext,
  // );

  // const { data: xcnRewardData } = useGetXcnReward(
  //   {
  //     accountAddress: account?.address || '',
  //   },
  //   {
  //     enabled: !!account?.address,
  //   },
  // );

  // const { mutateAsync: claimXcnReward, isLoading: isClaimXcnRewardLoading } = useClaimXcnReward();

  const { data: stakingInfo } = useGetStakingInfos({ accountAddress: account?.address || '' });

  const { mutateAsync: claimXcn, isLoading: isClaimXcnLoading } = useClaimXcn();

  // const handleClaim = async () => {
  //   if (!account?.address) {
  //     throw new VError({ type: 'unexpected', code: 'walletNotConnected' });
  //   }

  //   // Block action is user has LUNA or UST enabled as collateral
  //   if (hasLunaOrUstCollateralEnabled) {
  //     openLunaUstWarningModal();
  //     return;
  //   }

  //   return claimXcnReward({
  //     fromAccountAddress: account.address,
  //   });
  // };

  const onClaimReward = async () => {
    if (!account?.address) {
      throw new VError({ type: 'unexpected', code: 'walletNotConnected' });
    }
    // Block action is user has LUNA or UST enabled as collateral
    // if (hasLunaOrUstCollateralEnabled) {
    //   openLunaUstWarningModal();
    //   return;
    // }

    claimXcn({
      accountAddress: account?.address || '',
    });
  };

  // return (
  //   <ClaimXcnRewardButtonUi
  //     amountWei={xcnRewardData?.xcnRewardWei}
  //     loading={isClaimXcnRewardLoading}
  //     onClaimReward={handleClaim}
  //     {...props}
  //   />
  // );
  return (
    <ClaimXcnRewardButtonUi
      amountWei={stakingInfo?.earned}
      loading={isClaimXcnLoading}
      onClaimReward={onClaimReward}
      {...props}
    />
  );
};

export default ClaimXcnRewardButton;
