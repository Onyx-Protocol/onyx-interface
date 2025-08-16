/** @jsxImportSource @emotion/react */
import { SelectChangeEvent } from '@mui/material/Select';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'translation';

import { switchToChain } from 'components/Layout/AddNetworkButton/onyxChainUtils';
import { Select } from 'components/Select';
import { toast } from 'components/Toast';
import { SUPPORTED_CHAINS, getChainByHexId } from 'constants/wallet-chains';

interface Props {
  className?: string;
  showOnlyImage?: boolean;
}

export const ChainSwitchDropdown = ({ className, showOnlyImage = false }: Props) => {
  const { t } = useTranslation();
  const [currentChainId, setCurrentChainId] = useState<string>('');
  const [isSwitching, setIsSwitching] = useState<boolean>(false);

  useEffect(() => {
    if (!window.ethereum) return;

    window.ethereum.request({ method: 'eth_chainId' }).then(setCurrentChainId);

    const handleChainChanged = (chainId: string) => {
      setCurrentChainId(chainId);
      setIsSwitching(false);
    };

    window.ethereum.on('chainChanged', handleChainChanged);

    return () => {
      window.ethereum.removeListener('chainChanged', handleChainChanged);
    };
  }, []);

  const handleChainChange = useCallback(
    async (event: SelectChangeEvent) => {
      if (isSwitching) return;

      const selectedChain = getChainByHexId(event.target.value);
      if (!selectedChain) return;

      setIsSwitching(true);

      try {
        await switchToChain(selectedChain.config);
      } catch (error) {
        setIsSwitching(false);
        toast.error({
          message: 'Failed to change chain.',
        });
      }
    },
    [isSwitching],
  );

  const options = SUPPORTED_CHAINS.map(chain => ({
    value: chain.config.chainId,
    label: chain.displayName,
    image: chain.icon,
  }));

  return (
    <div css={{ position: 'relative' }}>
      <Select
        className={className}
        css={{
          opacity: isSwitching ? 0.3 : 1,
          transition: 'opacity 0.2s ease',
          pointerEvents: isSwitching ? 'none' : 'auto',
        }}
        options={options}
        value={currentChainId}
        onChange={handleChainChange}
        ariaLabel={t('chainSwitchDropdown.ariaLabel', 'Select blockchain network')}
        buttonVariant
        showOnlyImage={showOnlyImage}
        title={t('chainSwitchDropdown.title', 'Select Network')}
      />
      {isSwitching && (
        <div
          css={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        >
          <div
            css={{
              width: 16,
              height: 16,
              border: '2px solid #ccc',
              borderTopColor: '#007bff',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              '@keyframes spin': {
                '0%': { transform: 'rotate(0deg)' },
                '100%': { transform: 'rotate(360deg)' },
              },
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ChainSwitchDropdown;
