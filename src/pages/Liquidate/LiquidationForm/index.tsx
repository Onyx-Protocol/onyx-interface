/** @jsxImportSource @emotion/react */
import BigNumber from 'bignumber.js';
import { Button } from 'components';
import config from 'config';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'translation';
import { Market, MarketWithBorrowBalance, Nft, SubgraphToken } from 'types';
import { getTokenByAddress } from 'utilities';

import NftCheckImg from 'assets/img/nft_check.svg';
import { getOTokenContract } from 'clients/contracts/getters';
import { usePunkDataContract } from 'clients/contracts/hooks';
import { useWeb3 } from 'clients/web3';
import { NULL_ADDRESS } from 'constants/address';
import { BaseURIs } from 'constants/baseURIs';
import { AuthContext } from 'context/AuthContext';
import { OTokenEx } from 'types/contracts';

import { useStyles } from './styles';

const defaults = {
  amount: 1,
  repay: '0',
};

type Props = {
  isLoading: boolean;
  current?: MarketWithBorrowBalance;
  availables: MarketWithBorrowBalance[];
  onChange: (value: MarketWithBorrowBalance) => void;
  token: Partial<SubgraphToken>;
  markets: Market[];
  allowed: string[];
  onSubmit: (form: { amount: number; repay: string }) => void;
  onClose: () => void;
  onAmount: (amount: number, selectedIds: number[]) => Promise<{ 0: string; 1: string; 2: string }>;
  userId?: string;
};

const LiquidationForm = ({
  isLoading,
  token,
  markets = [],
  allowed,
  onSubmit,
  onClose,
  onAmount,
  current,
  availables,
  onChange,
  userId,
}: Props) => {
  const styles = useStyles();
  const { t } = useTranslation();

  const { account, openAuthModal } = useContext(AuthContext);
  const web3 = useWeb3();

  useEffect(() => {
    if (!current && availables.length > 0) {
      onChange(availables[0]);
    }
  }, [current, availables, onChange]);

  const [form, setForm] = useState<{ amount: number; repay: string }>(defaults);
  const [nfts, setNFTs] = useState<Nft[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const isAllowed =
    Number(
      new BigNumber(form.repay).gt(
        new BigNumber(current?.storedBorrowBalance || 0).times(
          new BigNumber(10).pow(current?.underlyingDecimals || 18),
        ),
      )
        ? allowed[1]
        : allowed[0],
    ) > 0;

  const fetchAmount = (amount: number) => {
    setForm({
      amount,
      repay: '-',
    });
    onAmount(amount, selectedIds)
      .then(repay => {
        setForm({
          amount,
          repay: repay[2],
        });
      })
      .catch(console.log);
  };
  useEffect(() => {
    if (current) {
      fetchAmount(form.amount);
    }
  }, [token, current]);
  useEffect(() => {
    fetchAmount(selectedIds.length);
  }, [selectedIds.length]);

  const symbol =
    (markets || []).find(market => market.address === token?.market?.id)?.underlyingSymbol || '';

  const oTokenContract = token?.market?.id
    ? (getOTokenContract(symbol.toLowerCase(), web3) as unknown as OTokenEx)
    : null;

  const punkDataContract = usePunkDataContract();

  useEffect(() => {
    if (token?.market?.underlyingDecimals !== 0 && oTokenContract && userId) {
      oTokenContract.methods
        .balanceOfUnderlying(userId)
        .call()
        .then((supplyBalance: string) => {
          const promise = Promise.all(
            new Array(Number(supplyBalance || '0'))
              .fill(1)
              .map((_, idx) => oTokenContract.methods.userTokens(userId, idx).call()),
          );
          promise
            .then(tokenIds => {
              const baseURI = BaseURIs[symbol];
              const fetchPromise = baseURI
                ? new Promise(resolve =>
                    fetch(
                      `${config.apiUrl}/user_nfts?address=${token.market?.id}&collections=${token.market?.underlyingAddress}`,
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
                            ? data.tokenIds.map((item: any) => [item.tokenId, item.tokenURI])
                            : tokenIds.map(tokenId => [
                                tokenId,
                                data.tokenIds.find((item: any) => item.tokenId === tokenId)
                                  ?.tokenURI || `/cryptologos/${symbol.toLowerCase()}.jpg`,
                              ]),
                        ),
                      )
                      .catch(() => {
                        resolve(
                          new Array(tokenIds.length)
                            .fill(`/cryptologos/${symbol.toLowerCase()}.jpg`)
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
                    tokenData.map(([collectionTokenId, image]: string[], index: number) => ({
                      index,
                      collectionTokenId,
                      collectionTokenContract: token.market?.underlyingAddress,
                      imageUrl: image
                        .replace('ipfs://', 'https://ipfs.io/ipfs/')
                        .replace('data:image/svg+xml;utf8,', ''),
                    })),
                  );
                })
                .catch(console.log);
            })
            .catch(console.log);
        });
    } else {
      setNFTs([]);
    }
  }, [token, account]);

  const handleSubmit = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    onSubmit({ ...form });
  };

  return (
    <div css={styles.liquidationForm} onMouseDown={e => e.stopPropagation()}>
      <div className="closeBtn" onClick={() => onClose()}>
        Close
      </div>
      {!token.market ? (
        <div>Please select supplied token</div>
      ) : (
        <>
          <div className="flex-center">
            <div className="nftSelectionWrap">
              {nfts.map(nft => (
                <div
                  className={`nftItem ${selectedIds.includes(nft.index) ? 'selectedNft' : ''}`}
                  key={nft.index}
                  onClick={() =>
                    setSelectedIds(
                      selectedIds.includes(nft.index)
                        ? selectedIds.filter(item => item !== nft.index)
                        : [...selectedIds, nft.index],
                    )
                  }
                >
                  {selectedIds.includes(nft.index) && (
                    <img className="nftCheckMark" src={NftCheckImg} alt="check nft" />
                  )}
                  {nft.imageUrl.startsWith('<svg') ? (
                    <div
                      className="nftImg"
                      dangerouslySetInnerHTML={{
                        __html: nft.imageUrl,
                      }}
                    />
                  ) : (
                    <img className="nftImg" src={nft.imageUrl} alt="nft" />
                  )}
                  <div className="flex-center tokenId">Token #{nft.collectionTokenId}</div>
                </div>
              ))}
            </div>
          </div>
          {current && (
            <div className="tokenlist">
              {(availables || []).map(repayToken => (
                <div
                  className={`flex-center tokenItem ${
                    repayToken.id === current.id ? 'activeToken' : ''
                  }`}
                  key={repayToken.id}
                  onClick={() => onChange(repayToken)}
                >
                  <img
                    src={
                      getTokenByAddress(
                        repayToken.underlyingAddress === NULL_ADDRESS
                          ? ''
                          : repayToken.underlyingAddress,
                      )?.asset
                    }
                    alt="token"
                  />
                  <span>
                    {
                      getTokenByAddress(
                        repayToken.underlyingAddress === NULL_ADDRESS
                          ? ''
                          : repayToken.underlyingAddress,
                      )?.symbol
                    }
                  </span>
                </div>
              ))}
            </div>
          )}
          {current && (
            <div>
              Required{' '}
              {
                getTokenByAddress(
                  current.underlyingAddress === NULL_ADDRESS ? '' : current.underlyingAddress,
                )?.symbol
              }
              :{' '}
              {form.repay === '-'
                ? '...'
                : new BigNumber(form.repay)
                    .div(new BigNumber(10).pow(current?.underlyingDecimals))
                    .dp(2, 1)
                    .toString()}
            </div>
          )}
          <div className="btnWrapper">
            {!account?.address ? (
              <Button onClick={openAuthModal}>{t('connectWallet.connectButton')}</Button>
            ) : (
              <Button
                disabled={
                  isLoading ||
                  !token.market ||
                  form.amount >
                    new BigNumber(token.oTokenBalance ?? 0)
                      .times(token.market.exchangeRate)
                      .toNumber()
                }
                onClick={handleSubmit}
              >
                {isAllowed ? 'Liquidate' : 'Approve'}
              </Button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default LiquidationForm;
