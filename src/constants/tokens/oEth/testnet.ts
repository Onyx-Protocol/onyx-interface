import { EthChainId, Token } from 'types';

// import oApe from 'assets/img/tokens/oApe.png';
import oBayc from 'assets/img/tokens/oBayc.png';
import oDai from 'assets/img/tokens/oDai.png';
import oEth from 'assets/img/tokens/oEth.png';
// import oGusd from 'assets/img/tokens/oGusd.png';
// import oLink from 'assets/img/tokens/oLink.png';
// import oMatic from 'assets/img/tokens/oMatic.png';
import oMayc from 'assets/img/tokens/oMayc.png';
// import oPaxg from 'assets/img/tokens/oPaxg.png';
// import oShib from 'assets/img/tokens/oShib.png';
// import oUni from 'assets/img/tokens/oUni.png';
import oUsdc from 'assets/img/tokens/oUsdc.png';
// import oUsdp from 'assets/img/tokens/oUsdp.png';
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
