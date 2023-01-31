/** @jsxImportSource @emotion/react */
import { Typography } from '@mui/material';
import BigNumber from 'bignumber.js';
import {
  BorrowBalanceAccountHealth,
  Button,
  Delimiter,
  FormikSubmitButton,
  FormikTokenTextField,
  LabeledInlineContent,
  LabeledInlineContentProps,
  ModalProps,
  ValueUpdate,
  toast,
} from 'components';
import config from 'config';
import { VError, formatVErrorToReadableString } from 'errors';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'translation';
import { Asset } from 'types';
import {
  calculateCollateralValue,
  calculateDailyEarningsCents,
  calculateYearlyEarningsForAssets,
  convertTokensToWei,
  formatCentsToReadableValue,
  formatTokensToReadableValue,
  getBigNumber,
  unsafelyGetOToken,
} from 'utilities';

import NftCheckImg from 'assets/img/nft_check.svg';
import { useGetOTokenCash, useRedeemNFT, useSupplyNFT } from 'clients/api';
import { useNftContract, useOTokenContract, usePunkDataContract } from 'clients/contracts/hooks';
import { BaseURIs } from 'constants/baseURIs';
import { SAFE_BORROW_LIMIT_PERCENTAGE } from 'constants/safeBorrowLimitPercentage';
import { AmountForm, AmountFormProps, ErrorCode } from 'containers/AmountForm';
import { AuthContext } from 'context/AuthContext';
import useDailyXcnDistributionInterests from 'hooks/useDailyXcnDistributionInterests';
import useSuccessfulTransactionModal from 'hooks/useSuccessfulTransactionModal';

import { useStyles } from '../styles';

interface SupplyWithdrawFormUiProps {
  isNFTMarket?: boolean;
  asset: Asset;
  assets: Asset[];
  type: 'supply' | 'withdraw';
  tokenInfo: LabeledInlineContentProps[];
  maxInput: BigNumber;
  userTotalBorrowBalanceCents: BigNumber;
  userTotalBorrowLimitCents: BigNumber;
  inputLabel: string;
  enabledButtonKey: string;
  disabledButtonKey: string;
  calculateNewBalance: (initial: BigNumber, amount: BigNumber) => BigNumber;
  isTransactionLoading: boolean;
  isXcnEnabled: boolean;
  amountValue: string;
  onClose: ModalProps['handleClose'];
}

export const SupplyWithdrawContent: React.FC<SupplyWithdrawFormUiProps> = ({
  isNFTMarket,
  asset,
  type,
  tokenInfo,
  userTotalBorrowBalanceCents,
  userTotalBorrowLimitCents,
  assets,
  maxInput,
  inputLabel,
  enabledButtonKey,
  disabledButtonKey,
  calculateNewBalance,
  isTransactionLoading,
  isXcnEnabled,
  amountValue,
  onClose,
}) => {
  const styles = useStyles();
  const { t, Trans } = useTranslation();
  const { data: oTokenCashData } = useGetOTokenCash({
    oTokenId: asset.token.id,
  });
  const oTokenContract: any = useOTokenContract(asset.token.id);

  const nftTokenContract: any = useNftContract(asset.token);
  const punkDataContract = usePunkDataContract();

  const { account: { address: accountAddress = '' } = {} } = useContext(AuthContext);
  const [nfts, setNFTs] = useState<any>([]);
  const [nft, setNFT] = useState<any>([]);

  const { mutateAsync: supplyNFT, isLoading: isSupplyNFTLoading } = useSupplyNFT({
    oTokenId: asset?.token.id,
    accountAddress,
  });

  const { mutateAsync: redeemNFT, isLoading: isRedeemNFTLoading } = useRedeemNFT({
    oTokenId: asset?.token.id,
    accountAddress,
  });

  const { openSuccessfulTransactionModal } = useSuccessfulTransactionModal();

  const amount = new BigNumber(amountValue || 0);
  const validAmount = amount && !amount.isZero() && !amount.isNaN();

  const selection = nft.map((item: any) => item.collectionTokenId);
  const selectAvailable = nfts.length;

  const toFixed = (number: number, decimals: number, string = false) => {
    const value = new BigNumber(new BigNumber(number).toFixed(decimals, 1));
    return string ? value : value.toNumber();
  };

  const current = asset.supplyBalance.toNumber();
  const cash: any = (oTokenCashData || {}).cashWei ? (oTokenCashData || {}).cashWei?.toNumber() : 1;

  const available = asset && toFixed(Math.min(current, cash), asset.token.decimals);

  useEffect(() => {
    if (!asset || !nftTokenContract) return;
    const oTokenAddress = unsafelyGetOToken(asset.token.id).address;

    if (asset.token.decimals === 0) {
      const balance = asset.walletBalance.toString();
      const promise =
        type === 'supply'
          ? Promise.all(
              new Array(Number(balance))
                .fill(1)
                .map((_, idx) =>
                  nftTokenContract.methods.tokenOfOwnerByIndex(accountAddress, idx).call(),
                ),
            )
          : Promise.all(
              new Array(Number(current))
                .fill(1)
                .map((_, idx) => oTokenContract.methods.userTokens(accountAddress, idx).call()),
            );
      promise
        .then(tokenIds => {
          const baseURI: string = BaseURIs[asset.token.symbol];
          const fetchPromise = baseURI
            ? new Promise(resolve =>
                fetch(
                  `${config.apiUrl}/user_nfts?address=${
                    type === 'supply' ? accountAddress : oTokenAddress
                  }&collections=${asset.token.address}`,
                  {
                    method: 'GET',
                    headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json',
                    },
                  },
                )
                  .then(res => res.json())
                  .then(({ data: [data = { tokenIds: [] }] }) =>
                    resolve(
                      Number(tokenIds[0]) === 0
                        ? data.tokenIds
                            .map((item: any) => [item.tokenId, item.tokenURI])
                            .slice(0, balance)
                        : tokenIds.map(tokenId => [
                            tokenId,
                            data.tokenIds.find((item: any) => item.tokenId === tokenId)?.tokenURI ||
                              `/cryptologos/${asset.token.symbol.toLowerCase()}.jpg`,
                          ]),
                    ),
                  )
                  .catch(() => {
                    resolve(
                      new Array(tokenIds.length)
                        .fill(`/cryptologos/${asset.token.symbol.toLowerCase()}.jpg`)
                        .map((image, idx) => [tokenIds[idx], image]),
                    );
                  }),
              )
            : Promise.all(
                tokenIds.map(tokenId =>
                  Promise.all([
                    Promise.resolve(tokenId),
                    punkDataContract.methods.punkImageSvg(tokenId).call(),
                  ]),
                ),
              );
          fetchPromise
            .then((tokenData: any) => {
              setNFTs(
                tokenData.map(([collectionTokenId, image]: any, index: any) => ({
                  index,
                  collectionTokenId,
                  collectionTokenContract: asset.token.address,
                  imageUrl: image
                    .replace('ipfs://', 'https://ipfs.io/ipfs/')
                    .replace('data:image/svg+xml;utf8,', ''),
                })),
              );
            })
            .catch(console.log);
        })
        .catch(console.log);
    } else {
      setNFTs([]);
    }
  }, [type, asset, available]);

  const hypotheticalTokenSupplyBalance = amountValue
    ? calculateNewBalance(asset.supplyBalance, amount)
    : undefined;

  // TODO: handle loading state
  const { dailyXcnDistributionInterestsCents } = useDailyXcnDistributionInterests();

  const hypotheticalBorrowLimitCents = useMemo(() => {
    const tokenPrice = getBigNumber(asset?.tokenPrice);
    let updateBorrowLimitCents;

    if (tokenPrice && validAmount) {
      const amountInCents = calculateCollateralValue({
        amountWei: convertTokensToWei({ value: amount, token: asset.token }),
        token: asset.token,
        tokenPriceTokens: asset.tokenPrice,
        collateralFactor: asset.collateralFactor,
      }).times(100);

      const temp = calculateNewBalance(userTotalBorrowLimitCents, amountInCents);
      updateBorrowLimitCents = BigNumber.maximum(temp, 0);
    }

    return updateBorrowLimitCents;
  }, [amount, asset.token, userTotalBorrowBalanceCents, userTotalBorrowLimitCents]);

  const [dailyEarningsCents, hypotheticalDailyEarningCents] = useMemo(() => {
    let hypotheticalDailyEarningCentsValue;
    const hypotheticalAssets = [...assets];
    const yearlyEarningsCents =
      dailyXcnDistributionInterestsCents &&
      calculateYearlyEarningsForAssets({
        assets,
        isXcnEnabled,
        dailyXcnDistributionInterestsCents,
      });
    const dailyEarningsCentsValue =
      yearlyEarningsCents && calculateDailyEarningsCents(yearlyEarningsCents);

    // Modify asset with hypotheticalBalance
    if (validAmount) {
      const hypotheticalAsset = {
        ...asset,
        supplyBalance: calculateNewBalance(asset.supplyBalance, amount),
      };
      const currentIndex = assets.findIndex(a => a.token.address === asset.token.address);
      hypotheticalAssets.splice(currentIndex, 1, hypotheticalAsset);
      const hypotheticalYearlyEarningsCents =
        dailyXcnDistributionInterestsCents &&
        calculateYearlyEarningsForAssets({
          assets: hypotheticalAssets,
          isXcnEnabled,
          dailyXcnDistributionInterestsCents,
        });
      hypotheticalDailyEarningCentsValue =
        hypotheticalYearlyEarningsCents &&
        calculateDailyEarningsCents(hypotheticalYearlyEarningsCents);
    }
    return [dailyEarningsCentsValue, hypotheticalDailyEarningCentsValue];
  }, [amount, asset.token.address, isXcnEnabled, JSON.stringify(assets)]);

  // Prevent users from supplying LUNA tokens. This is a temporary hotfix
  // following the crash of the LUNA token
  const isSupplyingLuna = type === 'supply' && asset.token.id === 'luna';

  const handleEnterNFT = (nftIds: any = []) => {
    setNFT(nfts.filter((item: any) => nftIds.includes(item.collectionTokenId)));
  };

  const handleSupplyWithdraw = async () => {
    let transactionHash;

    if (type === 'supply') {
      const res = await supplyNFT({
        tokenIds: nft
          .sort((a: any, b: any) => b.index - a.index)
          .map((item: any) => item.collectionTokenId),
      });
      ({ transactionHash } = res);
    } else {
      const res = await redeemNFT({
        tokenIds: nft.sort((a: any, b: any) => b.index - a.index).map((item: any) => item.index),
      });
      ({ transactionHash } = res);
    }

    onClose();

    if (transactionHash) {
      openSuccessfulTransactionModal({
        title:
          type === 'supply'
            ? t('supplyWithdraw.successfulSupplyTransactionModal.title')
            : t('supplyWithdraw.successfulWithdrawTransactionModal.title'),
        content:
          type === 'supply'
            ? t('supplyWithdraw.successfulSupplyTransactionModal.message')
            : t('supplyWithdraw.successfulWithdrawTransactionModal.message'),
        transactionHash,
      });
    }
  };

  const renderNftSupply = () => (
    <>
      <div css={styles.nftContent}>
        <div css={styles.nftSelectionWrap}>
          {(nfts || []).map((_nft: any) => (
            <div
              className={`nftItem ${
                selection.includes(_nft.collectionTokenId) ? 'selectedNft' : ''
              }`}
              key={_nft.collectionTokenId}
              onClick={() =>
                handleEnterNFT(
                  selection.includes(_nft.collectionTokenId)
                    ? selection.filter((item: any) => item !== _nft.collectionTokenId)
                    : [...selection, _nft.collectionTokenId],
                )
              }
            >
              {selection.includes(_nft.collectionTokenId) && (
                <img className="nftCheckMark" src={NftCheckImg} alt="check nft" />
              )}
              {_nft.imageUrl.startsWith('<svg') ? (
                <div
                  className="nftImg"
                  dangerouslySetInnerHTML={{
                    __html: _nft.imageUrl,
                  }}
                />
              ) : (
                <img className="nftImg" src={_nft.imageUrl} alt="nft" />
              )}
              <div className="tokenId">Token #{_nft.collectionTokenId}</div>
            </div>
          ))}
        </div>
      </div>
      <div css={styles.nftConfirmBtnWrap}>
        <span className="lightgrey">
          Available to supply: <br />
          {selectAvailable} {asset.token.symbol}
        </span>
        <div
          className="totalSelectedNft"
          onClick={() => handleEnterNFT(nfts.map((item: any) => item.collectionTokenId))}
        >
          Select all
        </div>
      </div>
      <div css={styles.nftConfirmBtnWrap}>
        <span className="lightgrey">
          Selected: {selection.length}&nbsp;
          {asset.token.symbol}
          <br />
          <span>
            {formatCentsToReadableValue({
              value: new BigNumber(selection.length)
                .multipliedBy(asset.tokenPrice)
                .multipliedBy(100),
              shortenLargeValue: true,
            })}
          </span>
        </span>
        <div className="totalSelectedNft" onClick={() => handleEnterNFT([])}>
          Deselect all
        </div>
      </div>
      <div css={styles.btnWrap}>
        <Button disabled={nft.length === 0 || isSupplyNFTLoading} onClick={handleSupplyWithdraw}>
          Supply
        </Button>
      </div>
    </>
  );
  const renderNftWithdraw = () => (
    <>
      <div css={styles.nftContent}>
        <div css={styles.nftSelectionWrap}>
          {(nfts || []).map((_nft: any) => (
            <div
              className={`nftItem ${
                selection.includes(_nft.collectionTokenId) ? 'selectedNft' : ''
              }`}
              key={_nft.collectionTokenId}
              onClick={() =>
                handleEnterNFT(
                  selection.includes(_nft.collectionTokenId)
                    ? selection.filter((item: any) => item !== _nft.collectionTokenId)
                    : [...selection, _nft.collectionTokenId],
                )
              }
            >
              {selection.includes(_nft.collectionTokenId) && (
                <img className="nftCheckMark" src={NftCheckImg} alt="check nft" />
              )}
              {_nft.imageUrl.startsWith('<svg') ? (
                <div
                  className="nftImg"
                  dangerouslySetInnerHTML={{
                    __html: _nft.imageUrl,
                  }}
                />
              ) : (
                <img className="nftImg" src={_nft.imageUrl} alt="nft" />
              )}
              <div className="tokenId">Token #{_nft.collectionTokenId}</div>
            </div>
          ))}
        </div>
      </div>
      <div css={styles.nftConfirmBtnWrap}>
        <span className="lightgrey">
          Available to withdraw: <br />
          {new BigNumber(available).isNegative() ? 0 : Number(available)} {asset.token.symbol}
        </span>
        <div
          className="totalSelectedNft"
          onClick={() => handleEnterNFT(nfts.map((item: any) => item.collectionTokenId))}
        >
          Select all
        </div>
      </div>
      <div css={styles.nftConfirmBtnWrap}>
        <span className="lightgrey">
          Selected: {selection.length}&nbsp;
          {asset.token.symbol}
          <br />
          <span>
            {formatCentsToReadableValue({
              value: new BigNumber(selection.length)
                .multipliedBy(asset.tokenPrice)
                .multipliedBy(100),
              shortenLargeValue: true,
            })}
          </span>
        </span>
        <div className="totalSelectedNft" onClick={() => handleEnterNFT([])}>
          Deselect all
        </div>
      </div>
      <div css={styles.btnWrap}>
        <Button
          disabled={
            nft.length === 0 || new BigNumber(available).lt(nft.length) || isRedeemNFTLoading
          }
          onClick={handleSupplyWithdraw}
        >
          Withdraw
        </Button>
      </div>
    </>
  );

  return !isNFTMarket ? (
    <>
      <FormikTokenTextField
        name="amount"
        token={asset.token}
        disabled={isTransactionLoading || isSupplyingLuna}
        rightMaxButton={{
          label: t('supplyWithdraw.max').toUpperCase(),
          valueOnClick: maxInput.toFixed(),
        }}
        css={styles.input}
        // Only display error state if amount is higher than borrow limit
        displayableErrorCodes={[ErrorCode.HIGHER_THAN_MAX]}
      />
      <Typography
        component="div"
        variant="small2"
        css={[styles.greyLabel, styles.getRow({ isLast: true })]}
      >
        <Trans
          i18nKey={inputLabel}
          components={{
            White: <span css={styles.whiteLabel} />,
          }}
          values={{
            amount: formatTokensToReadableValue({
              value: type === 'supply' ? asset.walletBalance : maxInput,
              token: asset.token,
            }),
          }}
        />
      </Typography>

      {tokenInfo.map((info, index) => (
        <LabeledInlineContent
          css={styles.getRow({ isLast: index === tokenInfo.length - 1 })}
          className="info-row"
          {...info}
          key={info.label}
        />
      ))}

      <Delimiter css={styles.getRow({ isLast: true })} />

      <BorrowBalanceAccountHealth
        css={styles.getRow({ isLast: true })}
        borrowBalanceCents={userTotalBorrowBalanceCents.toNumber()}
        borrowLimitCents={
          hypotheticalBorrowLimitCents?.toNumber() || userTotalBorrowLimitCents.toNumber()
        }
        safeBorrowLimitPercentage={SAFE_BORROW_LIMIT_PERCENTAGE}
      />

      <LabeledInlineContent
        label={t('supplyWithdraw.borrowLimit')}
        css={styles.getRow({ isLast: true })}
        className="info-row"
      >
        <ValueUpdate original={userTotalBorrowLimitCents} update={hypotheticalBorrowLimitCents} />
      </LabeledInlineContent>
      <Delimiter css={styles.getRow({ isLast: true })} />
      <LabeledInlineContent
        label={t('supplyWithdraw.dailyEarnings')}
        css={styles.getRow({ isLast: false })}
        className="info-row"
      >
        <ValueUpdate original={dailyEarningsCents} update={hypotheticalDailyEarningCents} />
      </LabeledInlineContent>
      <LabeledInlineContent
        label={t('supplyWithdraw.supplyBalance', { tokenSymbol: asset.token.symbol })}
        css={styles.getRow({ isLast: true })}
        className="info-row"
      >
        <ValueUpdate
          original={asset.supplyBalance}
          update={hypotheticalTokenSupplyBalance}
          format={(value: BigNumber | undefined) =>
            formatTokensToReadableValue({
              value,
              token: asset.token,
              minimizeDecimals: true,
              addSymbol: false,
            })
          }
        />
      </LabeledInlineContent>
      <FormikSubmitButton
        fullWidth
        disabled={!validAmount || isSupplyingLuna}
        loading={isTransactionLoading}
        enabledLabel={enabledButtonKey}
        disabledLabel={disabledButtonKey}
      />
    </>
  ) : (
    <>{type === 'supply' ? renderNftSupply() : renderNftWithdraw()}</>
  );
};

interface SupplyWithdrawFormProps extends Omit<SupplyWithdrawFormUiProps, 'amountValue'> {
  onSubmit: AmountFormProps['onSubmit'];
}

const SupplyWithdrawForm: React.FC<SupplyWithdrawFormProps> = ({
  onSubmit,
  maxInput,
  ...props
}) => {
  const onSubmitHandleError: AmountFormProps['onSubmit'] = async (value: string) => {
    try {
      await onSubmit(value);
    } catch (error) {
      let { message } = error as Error;
      if (error instanceof VError) {
        message = formatVErrorToReadableString(error);
        toast.error({
          message,
        });
      }
    }
  };

  return (
    <AmountForm onSubmit={onSubmitHandleError} maxAmount={maxInput.toFixed()}>
      {({ values }) => (
        <SupplyWithdrawContent maxInput={maxInput} amountValue={values.amount} {...props} />
      )}
    </AmountForm>
  );
};

export default SupplyWithdrawForm;
