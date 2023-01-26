import { EthChainId, Token } from 'types';

import oApe from 'assets/img/tokens/oApe.svg';
import oBayc from 'assets/img/tokens/oBayc.svg';
import oBusd from 'assets/img/tokens/oBusd.svg';
import oDai from 'assets/img/tokens/oDai.svg';
import oEth from 'assets/img/tokens/oEth.svg';
import oFipunks from 'assets/img/tokens/oFipunks.svg';
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
import oXcn from 'assets/img/tokens/oXcn.svg';

import OETH_TOKEN_ADDRESSES from '../../contracts/addresses/oEthTokens.json';

export const TESTNET_OETH_TOKENS = {
  eth: {
    id: 'eth',
    symbol: 'oETH',
    decimals: 8,
    address: OETH_TOKEN_ADDRESSES.eth[EthChainId.TESTNET],
    asset: oEth,
  } as Token,
  wbtc: {
    id: 'wbtc',
    symbol: 'oBTC',
    decimals: 8,
    address: OETH_TOKEN_ADDRESSES.wbtc[EthChainId.TESTNET],
    asset: oWbtc,
  } as Token,
  usdt: {
    id: 'usdt',
    symbol: 'oUSDT',
    decimals: 8,
    address: OETH_TOKEN_ADDRESSES.usdt[EthChainId.TESTNET],
    asset: oUsdt,
  } as Token,
  usdc: {
    id: 'usdc',
    symbol: 'oUSDC',
    decimals: 8,
    address: OETH_TOKEN_ADDRESSES.usdc[EthChainId.TESTNET],
    asset: oUsdc,
  } as Token,
  dai: {
    id: 'dai',
    symbol: 'oDAI',
    decimals: 8,
    address: OETH_TOKEN_ADDRESSES.dai[EthChainId.TESTNET],
    asset: oDai,
  } as Token,
  link: {
    id: 'link',
    symbol: 'oLINK',
    decimals: 8,
    address: OETH_TOKEN_ADDRESSES.link[EthChainId.TESTNET],
    asset: oLink,
  } as Token,
  matic: {
    id: 'matic',
    symbol: 'oMATIC',
    decimals: 8,
    address: OETH_TOKEN_ADDRESSES.matic[EthChainId.TESTNET],
    asset: oMatic,
  } as Token,
  uni: {
    id: 'uni',
    symbol: 'oUNI',
    decimals: 8,
    address: OETH_TOKEN_ADDRESSES.uni[EthChainId.TESTNET],
    asset: oUni,
  } as Token,
  ape: {
    id: 'ape',
    symbol: 'oAPE',
    decimals: 8,
    address: OETH_TOKEN_ADDRESSES.ape[EthChainId.TESTNET],
    asset: oApe,
  } as Token,
  shib: {
    id: 'shib',
    symbol: 'oSHIB',
    decimals: 8,
    address: OETH_TOKEN_ADDRESSES.shib[EthChainId.TESTNET],
    asset: oShib,
  } as Token,
  busd: {
    id: 'busd',
    symbol: 'oBUSD',
    decimals: 8,
    address: OETH_TOKEN_ADDRESSES.busd[EthChainId.TESTNET],
    asset: oBusd,
  } as Token,
  usdp: {
    id: 'usdp',
    symbol: 'oUSDP',
    decimals: 8,
    address: OETH_TOKEN_ADDRESSES.usdp[EthChainId.TESTNET],
    asset: oUsdp,
  } as Token,
  gusd: {
    id: 'gusd',
    symbol: 'oGUSD',
    decimals: 2,
    address: OETH_TOKEN_ADDRESSES.gusd[EthChainId.TESTNET],
    asset: oGusd,
  } as Token,
  paxg: {
    id: 'paxg',
    symbol: 'oPAXG',
    decimals: 8,
    address: OETH_TOKEN_ADDRESSES.paxg[EthChainId.TESTNET],
    asset: oPaxg,
  } as Token,
  xcn: {
    id: 'xcn',
    symbol: 'oXCN',
    decimals: 8,
    address: OETH_TOKEN_ADDRESSES.xcn[EthChainId.TESTNET],
    asset: oXcn,
  } as Token,
  bayc: {
    id: 'bayc',
    symbol: 'oBAYC',
    decimals: 0,
    address: OETH_TOKEN_ADDRESSES.bayc[EthChainId.TESTNET],
    asset: oBayc,
  } as Token,
  fipunks: {
    id: 'fipunks',
    symbol: 'oPUNK',
    decimals: 0,
    address: OETH_TOKEN_ADDRESSES.fipunks[EthChainId.TESTNET],
    asset: oFipunks,
  } as Token,
};
