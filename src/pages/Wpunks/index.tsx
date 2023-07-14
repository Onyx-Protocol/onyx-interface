/** @jsxImportSource @emotion/react */
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Button } from 'components';
import config from 'config';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'translation';

import PunkImg from 'assets/img/punk1.png';
import {
  useBurnWPunks,
  useDepositPunk,
  useGetOwnedPunkIds,
  useGetOwnedWPunksIds,
  useGetProxies,
  useMintWPunks,
  useRegisterProxy,
} from 'clients/api';
import { usePunkDataContract } from 'clients/contracts/hooks';
import { AuthContext, AuthContextValue } from 'context/AuthContext';
import useSuccessfulTransactionModal from 'hooks/useSuccessfulTransactionModal';

import { useStyles } from './styles';

export const ZERO = '0x0000000000000000000000000000000000000000';

const Wpunks: React.FC = () => {
  const styles = useStyles();
  const { t } = useTranslation();
  const { account }: AuthContextValue = useContext(AuthContext);

  const punkDataContract = usePunkDataContract();

  const { openSuccessfulTransactionModal } = useSuccessfulTransactionModal();

  const { mutateAsync: registerProxy, isLoading: isRegisterProxyLoading } = useRegisterProxy({
    accountAddress: account?.address || '',
  });

  const { mutateAsync: depositPunk, isLoading: isDepositPunkLoading } = useDepositPunk({
    accountAddress: account?.address || '',
  });

  const { mutateAsync: mintWPunks, isLoading: isMintWPunksLoading } = useMintWPunks({
    accountAddress: account?.address || '',
  });

  const { mutateAsync: burnWPunks, isLoading: isBurnWPunksLoading } = useBurnWPunks({
    accountAddress: account?.address || '',
  });

  const { data: userProxyAddress } = useGetProxies({ accountAddress: account?.address || '' });

  const { data: punkOwners = {}, isLoading: ownPunkIdsLoading } = useGetOwnedPunkIds({
    accountAddress: (config.chainId === 5 ? account?.address : userProxyAddress) || '',
  });

  const { data: ownedWPunksIds = [], isLoading: ownWPunksIdsLoading } = useGetOwnedWPunksIds({
    accountAddress: account?.address || '',
  });
  const ownedPunkIds = punkOwners[account?.address || ''] || [];
  const ownedProxyPunkIds = punkOwners[userProxyAddress || '0x'] || [];
  const [loaded, setLoaded] = useState(
    ownedPunkIds.length > 0 || ownedProxyPunkIds.length > 0 || ownedWPunksIds.length > 0,
  );

  const [images, setImages] = useState<Record<string, string>>({});
  const [selectedId, setSelectedId] = useState('');

  useEffect(() => {
    const unknown = [...ownedPunkIds, ...ownedProxyPunkIds, ...ownedWPunksIds].filter(
      id => !images[id],
    );
    if (unknown.length > 0) {
      Promise.all(unknown.map(tokenId => punkDataContract.methods.punkImageSvg(tokenId).call()))
        .then(svgs => {
          setImages({
            ...images,
            ...svgs.reduce(
              (a, c, idx) => ({
                ...a,
                [unknown[idx]]: c.replace('data:image/svg+xml;utf8,', ''),
              }),
              {},
            ),
          });
        })
        .catch(console.log);
    }
  }, [images, ownedPunkIds, ownedProxyPunkIds, ownedWPunksIds, setImages]);

  useEffect(() => {
    if (!ownPunkIdsLoading && !ownWPunksIdsLoading) {
      setLoaded(true);
    }
  }, [ownPunkIdsLoading, ownWPunksIdsLoading]);

  const handleDeposit = async (id: string) => {
    if (!userProxyAddress || userProxyAddress === ZERO || !account?.address) return;
    setSelectedId(id);
    const res = await depositPunk({ userProxyAddress, id });
    const { transactionHash } = res;
    if (transactionHash) {
      openSuccessfulTransactionModal({
        title: t('wpunks.depositPunkSuccessfully'),
        content: t('wpunks.pleaseAllowTimeForConfirmation'),
        transactionHash,
      });
    }
  };

  const handleMint = async (id: string) => {
    if (!account?.address) {
      return;
    }
    setSelectedId(id);
    const res = await mintWPunks({ id });
    const { transactionHash } = res;
    if (transactionHash) {
      openSuccessfulTransactionModal({
        title: t('wpunks.mintWPUNKSSuccessfully'),
        content: t('wpunks.pleaseAllowTimeForConfirmation'),
        transactionHash,
      });
    }
  };

  const handleBurn = async (id: string) => {
    if (!account?.address) {
      return;
    }
    setSelectedId(id);
    const res = await burnWPunks({ id });
    const { transactionHash } = res;
    if (transactionHash) {
      openSuccessfulTransactionModal({
        title: t('wpunks.burnWPUNKSSuccessfully'),
        content: t('wpunks.pleaseAllowTimeForConfirmation'),
        transactionHash,
      });
    }
  };

  const handleRegister = async () => {
    if (!account?.address) {
      return;
    }
    const res = await registerProxy();
    const { transactionHash } = res;
    if (transactionHash) {
      openSuccessfulTransactionModal({
        title: t('wpunks.registerProxyCreatedSuccessfully'),
        content: t('wpunks.pleaseAllowTimeForConfirmation'),
        transactionHash,
      });
    }
  };

  return (
    <div>
      <div css={styles.topTitle}>{t('wpunks.turnPunkIntoERC721')}</div>

      <Paper css={styles.container}>
        <Typography variant="h6" color="white">
          {t('wpunks.title')}
        </Typography>
        {!loaded && <p>Loading ...</p>}
        <div css={styles.punkList}>
          {(ownedPunkIds || []).map(id => (
            <div css={styles.nftItem} key={id}>
              {images[id] ? (
                <div css={styles.nftImg} dangerouslySetInnerHTML={{ __html: images[id] }} />
              ) : (
                <img css={styles.nftImg} src={PunkImg} alt="nft" />
              )}
              <div css={styles.tokenId}>Punk #{id}</div>
              <Button
                disabled={
                  !userProxyAddress ||
                  userProxyAddress === ZERO ||
                  (id === selectedId && isDepositPunkLoading)
                }
                onClick={() => handleDeposit(id)}
              >
                Deposit
              </Button>
            </div>
          ))}
          {loaded && ownedPunkIds.length === 0 && (
            <Typography variant="h6" color="white">
              {t('wpunks.emptyPunk')}
            </Typography>
          )}
        </div>
      </Paper>
      <Paper css={styles.container}>
        <Typography variant="h6" color="white">
          {t('wpunks.wPunksTitle')}
        </Typography>
        {!loaded && <p>Loading ...</p>}
        {userProxyAddress === ZERO ? (
          <>
            <Typography variant="h6" color="white">
              {t('wpunks.description')}
            </Typography>
            <Button css={styles.button} disabled={isRegisterProxyLoading} onClick={handleRegister}>
              {t('wpunks.registerProxyBtn')}
            </Button>
          </>
        ) : (
          <div css={styles.punkList}>
            {(ownedWPunksIds || []).map(id => (
              <div css={styles.nftItem} key={id}>
                {images[id] ? (
                  <div css={styles.nftImg} dangerouslySetInnerHTML={{ __html: images[id] }} />
                ) : (
                  <img css={styles.nftImg} src={PunkImg} alt="nft" />
                )}
                <div css={styles.tokenId}>WPUNKS #{id}</div>
                <Button
                  disabled={id === selectedId && isBurnWPunksLoading}
                  onClick={() => handleBurn(id)}
                >
                  Withdraw
                </Button>
              </div>
            ))}
            {(ownedProxyPunkIds || []).map(id => (
              <div css={styles.nftItem} key={id}>
                {images[id] ? (
                  <div css={styles.nftImg} dangerouslySetInnerHTML={{ __html: images[id] }} />
                ) : (
                  <img css={styles.nftImg} src={PunkImg} alt="nft" />
                )}
                <div css={styles.tokenId}>Punk #{id}</div>
                <Button
                  disabled={id === selectedId && isMintWPunksLoading}
                  onClick={() => handleMint(id)}
                >
                  Unlock
                </Button>
              </div>
            ))}
            {loaded && ownedWPunksIds.length === 0 && ownedProxyPunkIds.length === 0 && (
              <Typography variant="h6" color="white">
                {t('wpunks.emptyWPUNKSOrLockedPunk')}
              </Typography>
            )}
          </div>
        )}
      </Paper>
    </div>
  );
};

export default Wpunks;
