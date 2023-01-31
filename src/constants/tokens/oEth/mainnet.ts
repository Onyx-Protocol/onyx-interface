import { EthChainId, Token } from 'types';

import oApe from 'assets/img/tokens/oApe.svg';
import oBayc from 'assets/img/tokens/oBayc.svg';
import oBusd from 'assets/img/tokens/oBusd.svg';
import oDai from 'assets/img/tokens/oDai.svg';
import oEth from 'assets/img/tokens/oEth.svg';
import oGusd from 'assets/img/tokens/oGusd.svg';
import oLink from 'assets/img/tokens/oLink.svg';
import oMatic from 'assets/img/tokens/oMatic.svg';
import oPaxg from 'assets/img/tokens/oPaxg.svg';
import oShib from 'assets/img/tokens/oShib.svg';
import oUni from 'assets/img/tokens/oUni.svg';
import oUsdc from 'assets/img/tokens/oUsdc.svg';
import oUsdp from 'assets/img/tokens/oUsdp.svg';
import oUsdt from 'assets/img/tokens/oUsdt.svg';
import oWbtc from 'assets/img/tokens/oWbtc.svg';
import oWpunks from 'assets/img/tokens/oWpunks.svg';
import oXcn from 'assets/img/tokens/oXcn.svg';

import OETH_TOKEN_ADDRESSES from '../../contracts/addresses/oEthTokens.json';

export const MAINNET_OETH_TOKENS = {
  eth: {
    id: 'eth',
    symbol: 'oETH',
    decimals: 8,
    address: OETH_TOKEN_ADDRESSES.eth[EthChainId.MAINNET],
    asset: oEth,
  } as Token,
  wbtc: {
    id: 'wbtc',
    symbol: 'oBTC',
    decimals: 8,
    address: OETH_TOKEN_ADDRESSES.wbtc[EthChainId.MAINNET],
    asset: oWbtc,
  } as Token,
  usdt: {
    id: 'usdt',
    symbol: 'oUSDT',
    decimals: 8,
    address: OETH_TOKEN_ADDRESSES.usdt[EthChainId.MAINNET],
    asset: oUsdt,
  } as Token,
  usdc: {
    id: 'usdc',
    symbol: 'oUSDC',
    decimals: 8,
    address: OETH_TOKEN_ADDRESSES.usdc[EthChainId.MAINNET],
    asset: oUsdc,
  } as Token,
  dai: {
    id: 'dai',
    symbol: 'oDAI',
    decimals: 8,
    address: OETH_TOKEN_ADDRESSES.dai[EthChainId.MAINNET],
    asset: oDai,
  } as Token,
  link: {
    id: 'link',
    symbol: 'oLINK',
    decimals: 8,
    address: OETH_TOKEN_ADDRESSES.link[EthChainId.MAINNET],
    asset: oLink,
  } as Token,
  matic: {
    id: 'matic',
    symbol: 'oMATIC',
    decimals: 8,
    address: OETH_TOKEN_ADDRESSES.matic[EthChainId.MAINNET],
    asset: oMatic,
  } as Token,
  uni: {
    id: 'uni',
    symbol: 'oUNI',
    decimals: 8,
    address: OETH_TOKEN_ADDRESSES.uni[EthChainId.MAINNET],
    asset: oUni,
  } as Token,
  ape: {
    id: 'ape',
    symbol: 'oAPE',
    decimals: 8,
    address: OETH_TOKEN_ADDRESSES.ape[EthChainId.MAINNET],
    asset: oApe,
  } as Token,
  shib: {
    id: 'shib',
    symbol: 'oSHIB',
    decimals: 8,
    address: OETH_TOKEN_ADDRESSES.shib[EthChainId.MAINNET],
    asset: oShib,
  } as Token,
  busd: {
    id: 'busd',
    symbol: 'oBUSD',
    decimals: 8,
    address: OETH_TOKEN_ADDRESSES.busd[EthChainId.MAINNET],
    asset: oBusd,
  } as Token,
  usdp: {
    id: 'usdp',
    symbol: 'oUSDP',
    decimals: 8,
    address: OETH_TOKEN_ADDRESSES.usdp[EthChainId.MAINNET],
    asset: oUsdp,
  } as Token,
  gusd: {
    id: 'gusd',
    symbol: 'oGUSD',
    decimals: 2,
    address: OETH_TOKEN_ADDRESSES.gusd[EthChainId.MAINNET],
    asset: oGusd,
  } as Token,
  paxg: {
    id: 'paxg',
    symbol: 'oPAXG',
    decimals: 8,
    address: OETH_TOKEN_ADDRESSES.paxg[EthChainId.MAINNET],
    asset: oPaxg,
  } as Token,
  xcn: {
    id: 'xcn',
    symbol: 'oXCN',
    decimals: 8,
    address: OETH_TOKEN_ADDRESSES.xcn[EthChainId.MAINNET],
    asset: oXcn,
  } as Token,
  bayc: {
    id: 'bayc',
    symbol: 'oBAYC',
    decimals: 0,
    address: OETH_TOKEN_ADDRESSES.bayc[EthChainId.MAINNET],
    asset: oBayc,
  } as Token,
  wpunks: {
    id: 'wpunks',
    symbol: 'oPUNK',
    decimals: 0,
    address: OETH_TOKEN_ADDRESSES.wpunks[EthChainId.MAINNET],
    asset: oWpunks,
  } as Token,
};
