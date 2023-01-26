/** @jsxImportSource @emotion/react */
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Button } from 'components';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'translation';

import PunkImg from 'assets/img/punk1.png';
import {
  useBurnFiPunk,
  useDepositPunk,
  useGetOwnedFiPunkIds,
  useGetOwnedPunkIds,
  useGetProxies,
  useMintFiPunk,
  useRegisterProxy,
} from 'clients/api';
import { useFiPunkContract } from 'clients/contracts/hooks';
import { AuthContext } from 'context/AuthContext';
import useSuccessfulTransactionModal from 'hooks/useSuccessfulTransactionModal';

import { useStyles } from './styles';

export const ZERO = '0x0000000000000000000000000000000000000000';

const Fpunk: React.FC = () => {
  const styles = useStyles();
  const { t } = useTranslation();
  const { account }: any = useContext(AuthContext);
  const fiPunkContract = useFiPunkContract();

  const { openSuccessfulTransactionModal } = useSuccessfulTransactionModal();

  const { mutateAsync: registerProxy, isLoading: isRegisterProxyLoading } = useRegisterProxy({
    accountAddress: account?.address || '',
  });

  const { mutateAsync: depositPunk, isLoading: isDepositPunkLoading } = useDepositPunk({
    accountAddress: account?.address || '',
  });

  const { mutateAsync: mintFiPunk, isLoading: isMintFiPunkLoading } = useMintFiPunk({
    accountAddress: account?.address || '',
  });

  const { mutateAsync: burnFiPunk, isLoading: isBurnFiPunkLoading } = useBurnFiPunk({
    accountAddress: account?.address || '',
  });

  const { data: userProxyAddress } = useGetProxies({ accountAddress: account?.address || '' });

  const { data: punkOwners = {}, isLoading: ownPunkIdsLoading }: any = useGetOwnedPunkIds({
    accountAddress: account?.address || '',
  });

  const { data: ownedFiPunkIds = [], isLoading: ownFiPunkIdsLoading }: any = useGetOwnedFiPunkIds({
    accountAddress: account?.address || '',
  });
  const ownedPunkIds = punkOwners[account?.address || ''] || [];
  const ownedProxyPunkIds = punkOwners[userProxyAddress || '0x'] || [];
  const [loaded, setLoaded] = useState(
    ownedPunkIds.length > 0 || ownedProxyPunkIds.length > 0 || ownedFiPunkIds.length > 0,
  );

  const [images, setImages] = useState<any>({});
  const [selectedId, setSelectedId] = useState('');

  useEffect(() => {
    const unknown = [...ownedPunkIds, ...ownedProxyPunkIds, ...ownedFiPunkIds].filter(
      id => !images[id],
    );
    if (unknown.length > 0) {
      Promise.all(unknown.map(tokenId => fiPunkContract.methods.punkImageSvg(tokenId).call()))
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
  }, [images, ownedPunkIds, ownedProxyPunkIds, ownedFiPunkIds, setImages]);

  useEffect(() => {
    if (!ownPunkIdsLoading && !ownFiPunkIdsLoading) {
      setLoaded(true);
    }
  }, [ownPunkIdsLoading, ownFiPunkIdsLoading]);

  const handleDeposit = async (id: any) => {
    if (!userProxyAddress || userProxyAddress === ZERO || !account?.address) return;
    setSelectedId(id);
    const res = await depositPunk({ userProxyAddress, id });
    const { transactionHash } = res;
    if (transactionHash) {
      openSuccessfulTransactionModal({
        title: t('fipunk.depositPunkSuccessfully'),
        content: t('fipunk.pleaseAllowTimeForConfirmation'),
        transactionHash,
      });
    }
  };

  const handleMint = async (id: any) => {
    if (!account?.address) {
      return;
    }
    setSelectedId(id);
    const res = await mintFiPunk({ id });
    const { transactionHash } = res;
    if (transactionHash) {
      openSuccessfulTransactionModal({
        title: t('fipunk.mintFiPunkSuccessfully'),
        content: t('fipunk.pleaseAllowTimeForConfirmation'),
        transactionHash,
      });
    }
  };

  const handleBurn = async (id: any) => {
    if (!account?.address) {
      return;
    }
    setSelectedId(id);
    const res = await burnFiPunk({ id });
    const { transactionHash } = res;
    if (transactionHash) {
      openSuccessfulTransactionModal({
        title: t('fipunk.burnFiPunkSuccessfully'),
        content: t('fipunk.pleaseAllowTimeForConfirmation'),
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
        title: t('fipunk.registerProxyCreatedSuccessfully'),
        content: t('fipunk.pleaseAllowTimeForConfirmation'),
        transactionHash,
      });
    }
  };

  return (
    <div>
      <Paper css={styles.container}>
        <Typography variant="h6" color="white">
          {t('fipunk.title')}
        </Typography>
        {!loaded && <p>Loading ...</p>}
        <div css={styles.punkList}>
          {(ownedPunkIds || []).map((id: any) => (
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
              {t('fipunk.emptyPunk')}
            </Typography>
          )}
        </div>
      </Paper>
      <Paper css={styles.container}>
        <Typography variant="h6" color="white">
          {t('fipunk.fiPunkTitle')}
        </Typography>
        {!loaded && <p>Loading ...</p>}
        {userProxyAddress === ZERO ? (
          <>
            <Typography variant="h6" color="white">
              {t('fipunk.description')}
            </Typography>
            <Button css={styles.button} disabled={isRegisterProxyLoading} onClick={handleRegister}>
              {t('fipunk.registerProxyBtn')}
            </Button>
          </>
        ) : (
          <div css={styles.punkList}>
            {(ownedFiPunkIds || []).map((id: any) => (
              <div css={styles.nftItem} key={id}>
                {images[id] ? (
                  <div css={styles.nftImg} dangerouslySetInnerHTML={{ __html: images[id] }} />
                ) : (
                  <img css={styles.nftImg} src={PunkImg} alt="nft" />
                )}
                <div css={styles.tokenId}>fiPunk #{id}</div>
                <Button
                  disabled={id === selectedId && isBurnFiPunkLoading}
                  onClick={() => handleBurn(id)}
                >
                  Withdraw
                </Button>
              </div>
            ))}
            {(ownedProxyPunkIds || []).map((id: any) => (
              <div css={styles.nftItem} key={id}>
                {images[id] ? (
                  <div css={styles.nftImg} dangerouslySetInnerHTML={{ __html: images[id] }} />
                ) : (
                  <img css={styles.nftImg} src={PunkImg} alt="nft" />
                )}
                <div css={styles.tokenId}>Punk #{id}</div>
                <Button
                  disabled={id === selectedId && isMintFiPunkLoading}
                  onClick={() => handleMint(id)}
                >
                  Unlock
                </Button>
              </div>
            ))}
            {loaded && ownedFiPunkIds.length === 0 && ownedProxyPunkIds.length === 0 && (
              <Typography variant="h6" color="white">
                {t('fipunk.emptyFiPunkOrLockedPunk')}
              </Typography>
            )}
          </div>
        )}
      </Paper>
    </div>
  );
};

export default Fpunk;
