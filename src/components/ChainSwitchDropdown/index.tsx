/** @jsxImportSource @emotion/react */
import { SelectChangeEvent } from '@mui/material/Select';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'translation';

import { switchToChain } from 'components/Layout/AddNetworkButton/onyx-chain-utils';
import { Select } from 'components/Select';
import { toast } from 'components/Toast';
import { SUPPORTED_CHAINS, getChainByHexId } from 'constants/wallet-chains';

interface ChainSwitchDropdownProps {
  className?: string;
  showOnlyImage?: boolean;
}

export const ChainSwitchDropdown: React.FC<ChainSwitchDropdownProps> = ({ className, showOnlyImage = false }) => {
  const { t } = useTranslation();
  const [currentChainId, setCurrentChainId] = useState<string>('');

  useEffect(() => {
    if (!window.ethereum) return;

    window.ethereum.request({ method: 'eth_chainId' }).then(setCurrentChainId);

    const handleChainChanged = (chainId: string) => {
      setCurrentChainId(chainId);
    };

    window.ethereum.on('chainChanged', handleChainChanged);

    return () => {
      window.ethereum.removeListener('chainChanged', handleChainChanged);
    };
  }, []);

  const handleChainChange = useCallback(async (event: SelectChangeEvent) => {
    const selectedChain = getChainByHexId(event.target.value);

    if (!selectedChain) return;

    try {
      await switchToChain(selectedChain.config);
    } catch (error) {
      toast.error({
        message: 'Failed to change chain.',
      });
    }
  }, []);

  const options = SUPPORTED_CHAINS.map(chain => ({
    value: chain.config.chainId,
    label: chain.displayName,
    image: chain.icon,
  }));

  return (
    <Select
      className={className}
      options={options}
      value={currentChainId}
      onChange={handleChainChange}
      ariaLabel={t('chainSwitchDropdown.ariaLabel', 'Select blockchain network')}
      title={t('chainSwitchDropdown.title', 'Select Network')}
      buttonVariant
      showOnlyImage={showOnlyImage}
    />
  );
};

export default ChainSwitchDropdown;
