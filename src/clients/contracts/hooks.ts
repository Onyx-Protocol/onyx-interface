import { useMemo } from 'react';
import { Token } from 'types';

import { useWeb3 } from 'clients/web3';

import {
  getComptrollerContract,
  getGovernorBravoDelegateContract,
  getInterestModelContract,
  getOTokenContract,
  getPriceOracleContract,
  getTokenContract,
  getTokenContractByAddress,
  getXcnLensContract,
  getXcnStakingContract,
  getWPunksContract,
  getPunkContract,
  getNftContract,
  getLiquidationProxyContract,
  getPunkDataContract,
  getXcnClaimContract,
  getUniSwapRouterContract,
} from './getters';

export const useTokenContract = (token: Token) => {
  const web3 = useWeb3();
  return useMemo(() => getTokenContract(token, web3), [web3, token]);
};

export const useTokenContractByAddress = (address: string) => {
  const web3 = useWeb3();
  return useMemo(() => getTokenContractByAddress(address, web3), [web3, address]);
};

export const useOTokenContract = <T extends string>(name: T) => {
  const web3 = useWeb3();
  return useMemo(() => getOTokenContract<T>(name, web3), [web3, name]);
};

export const useComptrollerContract = () => {
  const web3 = useWeb3();
  return useMemo(() => getComptrollerContract(web3), [web3]);
};

export const usePriceOracleContract = () => {
  const web3 = useWeb3();
  return useMemo(() => getPriceOracleContract(web3), [web3]);
};

export const useInterestModelContract = (address: string) => {
  const web3 = useWeb3();
  return useMemo(() => getInterestModelContract(address, web3), [web3]);
};

export const useXcnLensContract = () => {
  const web3 = useWeb3();
  return useMemo(() => getXcnLensContract(web3), [web3]);
};

export const useGovernorBravoDelegateContract = () => {
  const web3 = useWeb3();
  return useMemo(() => getGovernorBravoDelegateContract(web3), [web3]);
};

export const useXcnStakingContract = () => {
  const web3 = useWeb3();
  return useMemo(() => getXcnStakingContract(web3), [web3]);
};

export const useXcnClaimContract = () => {
  const web3 = useWeb3();
  return useMemo(() => getXcnClaimContract(web3), [web3]);
};

export const useWPunksContract = () => {
  const web3 = useWeb3();
  return useMemo(() => getWPunksContract(web3), [web3]);
};

export const usePunkContract = () => {
  const web3 = useWeb3();
  return useMemo(() => getPunkContract(web3), [web3]);
};

export const useNftContract = (token: Token) => {
  const web3 = useWeb3();
  return useMemo(() => getNftContract(token, web3), [web3, token]);
};

export const usePunkDataContract = () => {
  const web3 = useWeb3();
  return useMemo(() => getPunkDataContract(web3), [web3]);
};

export const useLiquidationProxyContract = () => {
  const web3 = useWeb3();
  return useMemo(() => getLiquidationProxyContract(web3), [web3]);
};

export const useUniSwapRouterContract = () => {
  const web3 = useWeb3();
  return useMemo(() => getUniSwapRouterContract(web3), [web3]);
};
