import { Token as PSToken } from '@uniswap/sdk';
import BigNumber from 'bignumber.js';

export enum EthChainId {
  'MAINNET' = 1,
  'TESTNET' = 5,
}

export interface User {
  Token: string;
}

export interface Asset {
  token: Token;
  tokenPrice: BigNumber;
  borrowBalance: BigNumber;
  walletBalance: BigNumber;
  borrowApy: BigNumber;
  xcnBorrowApy: BigNumber;
  borrowCaps: BigNumber;
  liquidity: BigNumber;
  xcnSupplyApy: BigNumber;
  supplyApy: BigNumber;
  supplyCaps: BigNumber;
  collateralFactor: BigNumber;
  collateral: boolean;
  supplyBalance: BigNumber;
  percentOfLimit: string;
  // treasuryBalance: BigNumber;
  treasuryTotalBorrowsCents: BigNumber;
  treasuryTotalSupplyCents: BigNumber;
  treasuryTotalSupply: BigNumber;
  treasuryTotalBorrows: BigNumber;
  totalReserves: BigNumber;
  cash: BigNumber;
  xcnPerDay: BigNumber;
}

export interface Token {
  id: string; // TODO: remove (related to ONYX-723)
  symbol: Uppercase<string>;
  decimals: number;
  address: string | '';
  asset: string;
  isNative?: boolean;
}

export interface TokenBalance {
  token: Token;
  balanceWei: BigNumber;
}

export interface Setting {
  marketType?: string; // 'supply'
  withXCN?: boolean;
  pendingInfo: {
    type: string; // 'Borrow'
    status: boolean;
    symbol: string;
    amount: string | number;
  };
  vaultVaiStaked?: BigNumber.Value | null;
  vaiAPY?: number | string;
}

export type ProposalState =
  | 'Pending'
  | 'Active'
  | 'Canceled'
  | 'Defeated'
  | 'Successded'
  | 'Queued'
  | 'Expired'
  | 'Executed';

export interface ProposalAction {
  callData: string;
  signature: string;
  target: string;
  value: string;
}

export interface DescriptionV2 {
  version: 'v2';
  title: string;
  description: string;
  forDescription: string;
  againstDescription: string;
  abstainDescription: string;
}

export interface DescriptionV1 {
  version: 'v1';
  title: string;
  description: string;
  forDescription?: undefined;
  againstDescription?: undefined;
  abstainDescription?: undefined;
}

export interface Proposal {
  abstainedVotesWei: BigNumber;
  againstVotesWei: BigNumber;
  createdDate: Date | undefined;
  description: DescriptionV1 | DescriptionV2;
  endBlock: number;
  executedDate: Date | undefined;
  forVotesWei: BigNumber;
  id: number;
  proposer: string;
  queuedDate: Date | undefined;
  startDate: Date | undefined;
  state: ProposalState;
  cancelDate: Date | undefined;
  createdTxHash: string | undefined;
  cancelTxHash: string | undefined;
  endTxHash: string | undefined;
  executedTxHash: string | undefined;
  queuedTxHash: string | undefined;
  startTxHash: string | undefined;
  totalVotesWei: BigNumber;
  actions: ProposalAction[];
  blockNumber?: number;
  endDate?: Date;
}

export interface StakeHistory {
  id: number;
  address: string;
  tx_hash: string;
  block_hash: string;
  amount: BigNumber;
  price: string;
  reward: BigNumber;
  type: number;
  created_at: Date;
  updated_at: Date;
}

export type VoteSupport = 'FOR' | 'AGAINST' | 'ABSTAIN' | 'NOT_VOTED';

export interface VotersDetails {
  result: {
    address: string;
    support: VoteSupport;
    voteWeightWei: BigNumber;
    reason?: string | undefined;
  }[];
  sumVotes: BigNumber;
}

export interface Pool {
  poolId: BigNumber;
  stakedToken: string;
  rewardToken: string;
  userStakedAmount: BigNumber;
  pendingReward: BigNumber;
  lockPeriodSecond: BigNumber;
  apr: BigNumber;
  totalStaked: BigNumber;
  dailyEmission: BigNumber;
}

export interface VoteTransaction {
  support: boolean;
  type: 'vote';
  blockTimestamp: number;
  amount: string;
  to: string;
  votes: string;
}

export interface Market {
  id: string;
  address: string;
  borrowApy: BigNumber;
  borrowCap: string; // NO-DATA
  borrowRatePerBlock: string;
  borrowXcnApy: BigNumber;
  borrowerCount: number;
  borrowerDailyXcn: string;
  cash: string;
  collateralFactor: string;
  exchangeRate: string;
  lastCalculatedBlockNumber: number;
  liquidity: BigNumber;
  name: string;
  reserveFactor: string;
  supplierCount: number;
  supplierDailyXcn: string;
  supplyApy: BigNumber;
  supplyCap: string;
  supplyRatePerBlock: string;
  supplyXcnApy: BigNumber;
  symbol: string;
  tokenPrice: BigNumber;
  totalBorrows: string;
  totalBorrows2: string;
  totalBorrowsUsd: string;
  totalDistributed: string;
  totalDistributed2: string;
  totalReserves: string;
  totalSupply: string;
  totalSupply2: string;
  totalSupplyUsd: string;
  underlyingAddress: string;
  underlyingDecimal: number;
  underlyingName: string;
  underlyingPrice: string;
  underlyingSymbol: string;
  xcnBorrowIndex: string;
  xcnSpeeds: string;
  xcnSupplyIndex: string;
  treasuryTotalBorrowsCents: BigNumber;
  treasuryTotalSupplyCents: BigNumber;
}

export interface MarketSnapshot {
  asset: string;
  blockNumber: number;
  blockTimestamp: number;
  borrowApy: string;
  borrowXcnApy: string;
  createdAt: string;
  exchangeRate: string;
  id: string;
  priceUSD: string;
  supplyApy: string;
  supplyXcnApy: string;
  totalBorrow: string;
  totalSupply: string;
  updatedAt: string;
}

export type TransactionEvent =
  | 'Supply'
  | 'Redeem'
  | 'Borrow'
  | 'RepayBorrow'
  | 'LiquidateBorrow'
  | 'Stake'
  | 'Withdraw'
  | 'Claim'
  | 'Propose'
  | 'Vote';

export enum TransactionCategory {
  otoken = 'otoken',
  vai = 'vai',
  vote = 'vote',
}

export interface Transaction {
  id: number;
  amountWei: BigNumber;
  blockNumber: number;
  category: TransactionCategory;
  createdAt: Date;
  event: TransactionEvent;
  from: string;
  to: string;
  blockTimestamp: string | null;
  txHash: string;
  updatedAt: Date;
  oTokenAddress: string;
}

export interface Vault {
  stakedTokenId: string;
  rewardTokenId: string;
  stakingAprPercentage: number;
  totalStakedWei: BigNumber;
  dailyEmissionWei: BigNumber;
  lockingPeriodMs?: number;
  userStakedWei?: BigNumber;
  userPendingRewardWei?: BigNumber;
  poolIndex?: number;
}

export interface VoterAccount {
  rank: number;
  address: string;
  chnStake: BigNumber;
  proposalsVoted: number;
  voteWeightPercent: number;
}

export interface LockedDeposit {
  amountWei: BigNumber;
  unlockedAt: Date;
}

export type VoteDetailTransactionTransfer = {
  amountWei: BigNumber;
  blockNumber: number;
  blockTimestamp: Date;
  createdAt: Date;
  from: string;
  to: string;
  transactionHash: string;
  transactionIndex: number;
  type: 'transfer';
  updatedAt: Date;
};

export type VoteDetailTransactionVote = {
  votesWei: BigNumber;
  blockNumber: number;
  blockTimestamp: Date;
  createdAt: Date;
  from: string;
  to: string;
  transactionHash: string;
  transactionIndex: number;
  type: 'vote';
  updatedAt: Date;
  support: VoteSupport;
};

export type VoteDetailTransaction = VoteDetailTransactionTransfer | VoteDetailTransactionVote;

export interface VoterDetails {
  balanceWei: BigNumber;
  delegateCount: number;
  delegateAddress: string;
  delegating: boolean;
  votesWei: BigNumber;
  voterTransactions: VoteDetailTransaction[];
}

export interface VoterHistory {
  address: string;
  blockNumber: number;
  blockTimestamp: number;
  createdAt: Date;
  id: string;
  proposal: Proposal;
  reason: string | undefined;
  support: VoteSupport;
  updatedAt: Date;
  votesWei: BigNumber;
}

export type SwapDirection = 'exactAmountIn' | 'exactAmountOut';

interface SwapBase {
  fromToken: Token;
  toToken: Token;
  exchangeRate: BigNumber;
  direction: SwapDirection;
  routePath: string[]; // Token addresses
}

export interface ExactAmountInSwap extends SwapBase {
  fromTokenAmountSoldWei: BigNumber;
  expectedToTokenAmountReceivedWei: BigNumber;
  minimumToTokenAmountReceivedWei: BigNumber;
  direction: 'exactAmountIn';
}

export interface ExactAmountOutSwap extends SwapBase {
  expectedFromTokenAmountSoldWei: BigNumber;
  maximumFromTokenAmountSoldWei: BigNumber;
  toTokenAmountReceivedWei: BigNumber;
  direction: 'exactAmountOut';
}

export type Swap = ExactAmountInSwap | ExactAmountOutSwap;

export type PSTokenCombination = [PSToken, PSToken];
