import BigNumber from 'bignumber.js';
import { MutationObserverOptions, useMutation, useQuery } from 'react-query';

import fakeAddress from '__mocks__/models/address';
import { assetData } from '__mocks__/models/asset';
import proposals from '__mocks__/models/proposals';
import transactionReceipt from '__mocks__/models/transactionReceipt';
import voters from '__mocks__/models/voters';
import FunctionKey from 'constants/functionKey';

import { GetBalanceOfInput } from '../queries/getBalanceOf';

// Queries
export const getBlockNumber = jest.fn();
export const useGetBlockNumber = () => useQuery(FunctionKey.GET_BLOCK_NUMBER, getBlockNumber);

export const getAssetsInAccount = jest.fn();
export const useGetAssetsInAccount = () =>
  useQuery(FunctionKey.GET_ASSETS_IN_ACCOUNT, getAssetsInAccount);

export const getHypotheticalAccountLiquidity = jest.fn();

export const getMarkets = jest.fn();
export const useGetMarkets = () => useQuery(FunctionKey.GET_MARKETS, getMarkets);

export const getMarketHistory = jest.fn();
export const useGetMarketHistory = () => useQuery(FunctionKey.GET_MARKET_HISTORY, getMarketHistory);

export const getOTokenBalancesAll = jest.fn();
export const useGetOTokenBalancesAll = jest.fn(() =>
  useQuery(FunctionKey.GET_O_TOKEN_BALANCES_ALL, getOTokenBalancesAll),
);

export const getXcnReward = jest.fn();
export const useGetXcnReward = () => useQuery(FunctionKey.GET_XCN_REWARD, getXcnReward);

export const getOTokenBalanceOf = jest.fn();
export const useGetOTokenBalanceOf = () =>
  useQuery(FunctionKey.GET_O_TOKEN_BALANCE, getOTokenBalanceOf);

export const getOTokenBorrowBalance = jest.fn();
export const useGetOTokenBorrowBalance = () =>
  useQuery(FunctionKey.GET_O_TOKEN_BORROW_BALANCE, getOTokenBorrowBalance);

export const getAllowance = jest.fn();
export const useGetAllowance = () => useQuery(FunctionKey.GET_TOKEN_ALLOWANCE, getAllowance);

export const getBalanceOf = jest.fn();
export const useGetBalanceOf = (input: Omit<GetBalanceOfInput, 'web3'>) =>
  useQuery(
    [
      FunctionKey.GET_BALANCE_OF,
      {
        accountAddress: input.accountAddress,
        tokenAddress: input.token.address,
      },
    ],
    () => getBalanceOf(input),
  );

export const getTokenBalances = jest.fn();
export const useGetTokenBalances = () => useQuery(FunctionKey.GET_TOKEN_BALANCES, getTokenBalances);

export const getXcnWithdrawableAmount = jest.fn();
export const useGetXcnWithdrawableAmount = () =>
  useQuery(FunctionKey.GET_XCN_WITHDRAWABLE_AMOUNT, getXcnWithdrawableAmount);

export const getOTokenCash = jest.fn();
export const useGetOTokenCash = () => useQuery(FunctionKey.GET_O_TOKEN_CASH, getOTokenCash);

export const getOTokenInterestRateModel = jest.fn();
export const useGetOTokenInterestRateModel = () =>
  useQuery(FunctionKey.GET_O_TOKEN_INTEREST_RATE_MODEL, getOTokenInterestRateModel);

export const getOTokenApySimulations = jest.fn();
export const useGetOTokenApySimulations = () =>
  useQuery(FunctionKey.GET_O_TOKEN_APY_SIMULATIONS, getOTokenApySimulations);

export const getOTokenSupplyRate = jest.fn();

export const getOTokenBorrowRate = jest.fn();

export const getTransactions = jest.fn();
export const useGetTransactions = jest.fn(() =>
  useQuery([FunctionKey.GET_TRANSACTIONS, {}], getTransactions),
);

export const useGetTreasuryTotals = jest.fn();

export const useGetUserMarketInfo = jest.fn(() => ({
  isLoading: false,
  data: {
    assets: assetData,
  },
}));

export const getCurrentVotes = jest.fn(() => new BigNumber(100000000000000000));
export const useGetCurrentVotes = () => useQuery(FunctionKey.GET_CURRENT_VOTES, getCurrentVotes);

export const getPriorVotes = jest.fn(() => new BigNumber(100000000000000000));
export const useGetPriorVotes = () => useQuery(FunctionKey.GET_PRIOR_VOTES, getPriorVotes);

export const getProposals = jest.fn();
export const useGetProposals = () => useQuery(FunctionKey.GET_PROPOSALS, getProposals);

export const getProposal = jest.fn(async () => (await proposals)[0]);
export const useGetProposal = () => useQuery(FunctionKey.GET_PROPOSAL, getProposal);

export const getDailyXcn = jest.fn();
export const useGetDailyXcn = () => useQuery(FunctionKey.GET_O_TOKEN_DAILY_XCN, getDailyXcn);

export const getVoters = jest.fn(() => voters);
export const useGetVoters = jest.fn(() => useQuery(FunctionKey.GET_VOTERS, getVoters));

export const getVoterHistory = jest.fn();
export const useGetVoterHistory = () => useQuery(FunctionKey.GET_VOTER_HISTORY, getVoterHistory);

export const getVoterDetails = jest.fn();
export const useGetVoterDetails = () => useQuery(FunctionKey.GET_VOTER_DETAILS, getVoterDetails);

export const getVoteReceipt = jest.fn();
export const useGetVoteReceipt = () => useQuery(FunctionKey.GET_VOTE_RECEIPT, getVoteReceipt);

export const getVoteDelegateAddress = jest.fn();
export const useGetVoteDelegateAddress = () =>
  useQuery([FunctionKey.GET_VOTE_DELEGATE_ADDRESS, fakeAddress], getVoteDelegateAddress);

export const getLatestProposalIdByProposer = jest.fn();
export const useGetLatestProposalIdByProposer = () =>
  useQuery(
    [FunctionKey.GET_LATEST_PROPOSAL_ID_BY_PROPOSER, fakeAddress],
    getLatestProposalIdByProposer,
  );
export const useGetActiveProposal = jest.fn();

export const getVoterAccounts = jest.fn();
export const useGetVoterAccounts = () => useQuery(FunctionKey.GET_VOTER_ACCOUNTS, getVoterAccounts);

export const getProposalThreshold = jest.fn(() => new BigNumber('10000000000000000000000'));
export const useGetProposalThreshold = () =>
  useQuery(FunctionKey.GET_PROPOSAL_THRESHOLD, getProposalThreshold);

export const getProposalState = jest.fn();
export const useGetProposalState = () => useQuery(FunctionKey.GET_PROPOSAL_STATE, getProposalState);

export const getProposalEta = jest.fn();
export const useGetProposalEta = () => useQuery(FunctionKey.GET_PROPOSAL_ETA, getProposalEta);

// Mutations
export const approveToken = jest.fn();
export const useApproveToken = (options?: MutationObserverOptions) =>
  useMutation(FunctionKey.APPROVE_TOKEN, approveToken, options);

export const enterMarkets = jest.fn();
export const useEnterMarkets = (options?: MutationObserverOptions) =>
  useMutation(FunctionKey.ENTER_MARKETS, enterMarkets, options);

export const exitMarket = jest.fn();
export const useExitMarket = (options?: MutationObserverOptions) =>
  useMutation(FunctionKey.EXIT_MARKET, exitMarket, options);

export const claimXcnReward = jest.fn();
export const useClaimXcnReward = (options?: MutationObserverOptions) =>
  useMutation(FunctionKey.CLAIM_XCN_REWARD, claimXcnReward, options);

export const repayEth = jest.fn();
export const useRepayEth = () => useMutation(FunctionKey.REPAY_ETH, repayEth);

export const repayNonEthOToken = jest.fn();
export const useRepayNonEthOToken = () =>
  useMutation(FunctionKey.REPAY_NON_ETH_O_TOKEN, repayNonEthOToken);

export const useRepayOToken = useRepayNonEthOToken;

export const supply = jest.fn();
export const useSupply = () => useMutation(FunctionKey.SUPPLY, supply);
export const supplyNonEth = jest.fn();
export const useSupplyNonEth = () => useMutation(FunctionKey.SUPPLY, supplyNonEth);

export const supplyEth = jest.fn();
export const useSupplyEth = () => useMutation(FunctionKey.SUPPLY_ETH, supplyEth);

export const redeem = jest.fn();
export const useRedeem = () => useMutation(FunctionKey.REDEEM, redeem);

export const redeemUnderlying = jest.fn();
export const useRedeemUnderlying = () => useMutation(FunctionKey.REDEEM, redeemUnderlying);

export const borrowOToken = jest.fn();
export const useBorrowOToken = () => useMutation(FunctionKey.BORROW_O_TOKEN, borrowOToken);

export const setVoteDelegate = jest.fn();
export const useSetVoteDelegate = (options?: MutationObserverOptions) =>
  useMutation(FunctionKey.SET_VOTE_DELEGATE, setVoteDelegate, options);

export const createProposal = jest.fn();
export const useCreateProposal = (options?: MutationObserverOptions) =>
  useMutation(FunctionKey.CREATE_PROPOSAL, createProposal, options);

export const cancelProposal = jest.fn(async () => transactionReceipt);
export const useCancelProposal = (options?: MutationObserverOptions) =>
  useMutation(FunctionKey.CANCEL_PROPOSAL, cancelProposal, options);

export const executeProposal = jest.fn(async () => transactionReceipt);
export const useExecuteProposal = (options?: MutationObserverOptions) =>
  useMutation(FunctionKey.EXECUTE_PROPOSAL, executeProposal, options);

export const queueProposal = jest.fn(async () => transactionReceipt);
export const useQueueProposal = (options?: MutationObserverOptions) =>
  useMutation(FunctionKey.QUEUE_PROPOSAL, queueProposal, options);

export const castVote = jest.fn();
export const useCastVote = (options?: MutationObserverOptions) =>
  useMutation(FunctionKey.CAST_VOTE, castVote, options);

export const swapTokens = jest.fn();
export const useSwapTokens = (options?: MutationObserverOptions) =>
  useMutation(FunctionKey.SWAP_TOKENS, swapTokens, options);

export const getIsApprovedForAll = jest.fn();
export const useGetIsApprovedForAll = (options?: MutationObserverOptions) =>
  useMutation(FunctionKey.GET_NFT_ALLOWANCE, getIsApprovedForAll, options);

export const approveNftForAll = jest.fn();
export const useApproveNftForAll = (options?: MutationObserverOptions) =>
  useMutation(FunctionKey.APPROVE_NFT_TOKEN, approveNftForAll, options);
