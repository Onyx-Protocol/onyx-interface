import { EthChainId, Token } from 'types';

import oApe from 'assets/img/tokens/oApe.png';
import oBayc from 'assets/img/tokens/oBayc.png';
import oDai from 'assets/img/tokens/oDai.png';
import oEth from 'assets/img/tokens/oEth.png';
import oGusd from 'assets/img/tokens/oGusd.png';
import oLink from 'assets/img/tokens/oLink.png';
import oMatic from 'assets/img/tokens/oMatic.png';
import oMayc from 'assets/img/tokens/oMayc.png';
import oPaxg from 'assets/img/tokens/oPaxg.png';
import oShib from 'assets/img/tokens/oShib.png';
import oUni from 'assets/img/tokens/oUni.png';
import oUsdc from 'assets/img/tokens/oUsdc.png';
import oUsdp from 'assets/img/tokens/oUsdp.png';
import oUsdt from 'assets/img/tokens/oUsdt.png';
import oWbtc from 'assets/img/tokens/oWbtc.png';
import oWpunks from 'assets/img/tokens/oWpunks.png';
import oXcn from 'assets/img/tokens/oXcn.png';

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
    decimals: 8,
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
  mayc: {
    id: 'mayc',
    symbol: 'oMAYC',
    decimals: 0,
    address: OETH_TOKEN_ADDRESSES.mayc[EthChainId.TESTNET],
    asset: oMayc,
  } as Token,
  wpunks: {
    id: 'wpunks',
    symbol: 'oPUNK',
    decimals: 0,
    address: OETH_TOKEN_ADDRESSES.wpunks[EthChainId.TESTNET],
    asset: oWpunks,
  } as Token,
};
