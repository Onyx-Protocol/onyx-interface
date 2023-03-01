import { EthChainId, Token } from 'types';

import ape from 'assets/img/tokens/ape.svg';
import bayc from 'assets/img/tokens/bayc.svg';
import dai from 'assets/img/tokens/dai.svg';
import eth from 'assets/img/tokens/eth.svg';
import gusd from 'assets/img/tokens/gusd.svg';
import link from 'assets/img/tokens/link.svg';
import matic from 'assets/img/tokens/matic.svg';
import paxg from 'assets/img/tokens/paxg.svg';
import shib from 'assets/img/tokens/shib.svg';
import uni from 'assets/img/tokens/uni.svg';
import usdc from 'assets/img/tokens/usdc.svg';
import usdp from 'assets/img/tokens/usdp.svg';
import usdt from 'assets/img/tokens/usdt.svg';
import wbtc from 'assets/img/tokens/wbtc.svg';
import wpunks from 'assets/img/tokens/wpunks.svg';
import xcn from 'assets/img/tokens/xcn.svg';

import TOKEN_ADDRESSES from '../../contracts/addresses/tokens.json';

export const MAINNET_TOKENS = {
  eth: {
    id: 'eth',
    symbol: 'ETH',
    decimals: 18,
    address: '',
    asset: eth,
    isNative: true,
  } as Token,
  wbtc: {
    id: 'wbtc',
    symbol: 'WBTC',
    decimals: 8,
    address: TOKEN_ADDRESSES.wbtc[EthChainId.MAINNET],
    asset: wbtc,
  } as Token,
  usdt: {
    id: 'usdt',
    symbol: 'USDT',
    decimals: 6,
    address: TOKEN_ADDRESSES.usdt[EthChainId.MAINNET],
    asset: usdt,
  } as Token,
  usdc: {
    id: 'usdc',
    symbol: 'USDC',
    decimals: 6,
    address: TOKEN_ADDRESSES.usdc[EthChainId.MAINNET],
    asset: usdc,
  } as Token,
  dai: {
    id: 'dai',
    symbol: 'DAI',
    decimals: 18,
    address: TOKEN_ADDRESSES.dai[EthChainId.MAINNET],
    asset: dai,
  } as Token,
  link: {
    id: 'link',
    symbol: 'LINK',
    decimals: 18,
    address: TOKEN_ADDRESSES.link[EthChainId.MAINNET],
    asset: link,
  } as Token,
  matic: {
    id: 'matic',
    symbol: 'MATIC',
    decimals: 18,
    address: TOKEN_ADDRESSES.matic[EthChainId.MAINNET],
    asset: matic,
  } as Token,
  uni: {
    id: 'uni',
    symbol: 'UNI',
    decimals: 18,
    address: TOKEN_ADDRESSES.uni[EthChainId.MAINNET],
    asset: uni,
  } as Token,
  ape: {
    id: 'ape',
    symbol: 'APE',
    decimals: 18,
    address: TOKEN_ADDRESSES.ape[EthChainId.MAINNET],
    asset: ape,
  } as Token,
  shib: {
    id: 'shib',
    symbol: 'SHIB',
    decimals: 18,
    address: TOKEN_ADDRESSES.shib[EthChainId.MAINNET],
    asset: shib,
  } as Token,
  usdp: {
    id: 'usdp',
    symbol: 'USDP',
    decimals: 18,
    address: TOKEN_ADDRESSES.usdp[EthChainId.MAINNET],
    asset: usdp,
  } as Token,
  gusd: {
    id: 'gusd',
    symbol: 'GUSD',
    decimals: 2,
    address: TOKEN_ADDRESSES.gusd[EthChainId.MAINNET],
    asset: gusd,
  } as Token,
  paxg: {
    id: 'paxg',
    symbol: 'PAXG',
    decimals: 18,
    address: TOKEN_ADDRESSES.paxg[EthChainId.MAINNET],
    asset: paxg,
  } as Token,
  xcn: {
    id: 'xcn',
    symbol: 'XCN',
    decimals: 18,
    address: TOKEN_ADDRESSES.xcn[EthChainId.MAINNET],
    asset: xcn,
  } as Token,
  bayc: {
    id: 'bayc',
    symbol: 'BAYC',
    decimals: 0,
    address: TOKEN_ADDRESSES.bayc[EthChainId.MAINNET],
    asset: bayc,
  } as Token,
  wpunks: {
    id: 'wpunks',
    symbol: 'WPUNKS',
    decimals: 0,
    address: TOKEN_ADDRESSES.wpunks[EthChainId.MAINNET],
    asset: wpunks,
  } as Token,
};
