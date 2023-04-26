/* eslint-disable no-await-in-loop */
import BigNumber from 'bignumber.js';
import {
  ContractCallContext,
  ContractCallResults,
  ContractCallReturnContext,
} from 'ethereum-multicall';
import { getContractAddress } from 'utilities';

import eth20Abi from 'constants/contracts/abis/eth20.json';
import masterChefAbi from 'constants/contracts/abis/masterChef.json';

import farmConfig from './config';
import { Farm, GetFarmsInput, GetFarmsOutput, getAddress } from './types';

export * from './types';

const getFarms = async ({ multicall, accountAddress }: GetFarmsInput): Promise<GetFarmsOutput> => {
  const masterChefAddress = getContractAddress('masterChef');
  const uniswapRouterAddress = getContractAddress('uniSwapRouter');
  const farms: Array<Farm> = [];
  for (let i = 0; i < farmConfig.length; i++) {
    const tempFarm: Farm = { ...farmConfig[i] };

    const lpAddress = getAddress(farmConfig[i].lpAddresses);
    const contractCallContexts: Array<ContractCallContext> = [];
    contractCallContexts.push({
      reference: 'tokenInfo1',
      contractAddress: farmConfig[i].token.address,
      abi: eth20Abi,
      calls: [
        {
          reference: 'balanceOf',
          methodName: 'balanceOf',
          methodParameters: [lpAddress],
        },
      ],
    });

    contractCallContexts.push({
      reference: 'tokenInfo2',
      contractAddress: farmConfig[i].quoteToken.address,
      abi: eth20Abi,
      calls: [
        {
          reference: 'balanceOf',
          methodName: 'balanceOf',
          methodParameters: [lpAddress],
        },
      ],
    });

    contractCallContexts.push({
      reference: 'lpInfo',
      contractAddress: lpAddress,
      abi: eth20Abi,
      calls: [
        {
          reference: 'balanceOf',
          methodName: 'balanceOf',
          methodParameters: [masterChefAddress],
        },
        {
          reference: 'totalSupply',
          methodName: 'totalSupply',
          methodParameters: [],
        },
      ],
    });

    const unformattedResults = await multicall.call(contractCallContexts);
    const results: ContractCallReturnContext[] = Object.values(unformattedResults.results);

    let tokenAmount = new BigNumber(0);
    let quoteTokenAmount = new BigNumber(0);
    let lpTokenBalanceMC = new BigNumber(0);
    let lpTotalSupply = new BigNumber(0);
    results.forEach(result => {
      if (result.originalContractCallContext.reference === 'tokenInfo1') {
        tokenAmount = new BigNumber(result.callsReturnContext[0].returnValues[0].hex);
      } else if (result.originalContractCallContext.reference === 'tokenInfo2') {
        quoteTokenAmount = new BigNumber(result.callsReturnContext[0].returnValues[0].hex);
      } else if (result.originalContractCallContext.reference === 'lpInfo') {
        lpTokenBalanceMC = new BigNumber(result.callsReturnContext[0].returnValues[0].hex);
        lpTotalSupply = new BigNumber(result.callsReturnContext[1].returnValues[0].hex);
      }
    });

    tempFarm.tokenAmount = tokenAmount;
    tempFarm.quoteTokenAmount = quoteTokenAmount;
    tempFarm.lpTokenBalanceMC = lpTokenBalanceMC;

    const lpTokenRatio = lpTotalSupply.isZero()
      ? 0
      : new BigNumber(tempFarm.lpTokenBalanceMC).div(lpTotalSupply);

    // Total value in staking in quote token value
    tempFarm.lpTotalInQuoteToken = tempFarm.quoteTokenAmount
      .div(new BigNumber(10).pow(tempFarm.quoteToken.decimals))
      .times(new BigNumber(2))
      .times(lpTokenRatio);

    const masterChefCalls: ContractCallContext['calls'] = [];

    masterChefCalls.push({
      reference: 'poolInfo',
      methodName: 'poolInfo',
      methodParameters: [farmConfig[i].pid],
    });

    masterChefCalls.push({
      reference: 'totalAllocPoint',
      methodName: 'totalAllocPoint',
      methodParameters: [],
    });

    masterChefCalls.push({
      reference: 'xcnPerSecond',
      methodName: 'xcnPerSecond',
      methodParameters: [],
    });

    const masterChefCallContext: ContractCallContext = {
      reference: 'masterChef',
      contractAddress: masterChefAddress,
      abi: masterChefAbi,
      calls: masterChefCalls,
    };

    const masterChefCallResults: ContractCallResults = await multicall.call(masterChefCallContext);
    const allocPoint = new BigNumber(
      masterChefCallResults.results.masterChef.callsReturnContext[0].returnValues[1].hex,
    );
    const totalAllocPoint = new BigNumber(
      masterChefCallResults.results.masterChef.callsReturnContext[1].returnValues[0].hex,
    );
    const rewardPerSecond = new BigNumber(
      masterChefCallResults.results.masterChef.callsReturnContext[2].returnValues[0].hex,
    );

    tempFarm.poolWeight = allocPoint.div(totalAllocPoint);
    tempFarm.multiplier = `${allocPoint.div(100).toString()}X`;
    tempFarm.tokenPerSecond = new BigNumber(
      new BigNumber(rewardPerSecond).isZero() ? 200000000000000000 : rewardPerSecond,
    ).div(1e18);

    tempFarm.tokenPriceVsQuote = tempFarm.tokenAmount.isZero()
      ? new BigNumber(0)
      : tempFarm.quoteTokenAmount.div(tempFarm.tokenAmount);

    if (accountAddress) {
      const contractCallForUserContexts: Array<ContractCallContext> = [];
      contractCallForUserContexts.push({
        reference: lpAddress,
        contractAddress: lpAddress,
        abi: eth20Abi,
        calls: [
          {
            reference: 'allowance',
            methodName: 'allowance',
            methodParameters: [accountAddress, masterChefAddress],
          },
          {
            reference: 'balanceOf',
            methodName: 'balanceOf',
            methodParameters: [accountAddress],
          },
        ],
      });

      contractCallForUserContexts.push({
        reference: masterChefAddress,
        contractAddress: masterChefAddress,
        abi: masterChefAbi,
        calls: [
          {
            reference: 'userInfo',
            methodName: 'userInfo',
            methodParameters: [farmConfig[i].pid, accountAddress],
          },
          {
            reference: 'pendingXcn',
            methodName: 'pendingXcn',
            methodParameters: [farmConfig[i].pid, accountAddress],
          },
        ],
      });

      contractCallForUserContexts.push({
        reference: tempFarm.token.address,
        contractAddress: tempFarm.token.address,
        abi: eth20Abi,
        calls: [
          {
            reference: 'allowance',
            methodName: 'allowance',
            methodParameters: [accountAddress, uniswapRouterAddress],
          },
          {
            reference: 'balanceOf',
            methodName: 'balanceOf',
            methodParameters: [accountAddress],
          },
        ],
      });

      contractCallForUserContexts.push({
        reference: tempFarm.quoteToken.address,
        contractAddress: tempFarm.quoteToken.address,
        abi: eth20Abi,
        calls: [
          {
            reference: 'allowance',
            methodName: 'allowance',
            methodParameters: [accountAddress, uniswapRouterAddress],
          },
          {
            reference: 'balanceOf',
            methodName: 'balanceOf',
            methodParameters: [accountAddress],
          },
        ],
      });

      const unformattedUserResults = await multicall.call(contractCallForUserContexts);
      const userResults: ContractCallReturnContext[] = Object.values(
        unformattedUserResults.results,
      );

      let allowance = new BigNumber(0);
      let tokenBalance = new BigNumber(0);
      let stakedBalance = new BigNumber(0);
      let earnings = new BigNumber(0);
      let tokenBalance1 = new BigNumber(0);
      let allowance1 = new BigNumber(0);
      let tokenBalance2 = new BigNumber(0);
      let allowance2 = new BigNumber(0);
      userResults.forEach(result => {
        if (result.originalContractCallContext.reference === lpAddress) {
          allowance = new BigNumber(result.callsReturnContext[0].returnValues[0].hex);
          tokenBalance = new BigNumber(result.callsReturnContext[1].returnValues[0].hex);
        } else if (result.originalContractCallContext.reference === masterChefAddress) {
          stakedBalance = new BigNumber(result.callsReturnContext[0].returnValues[0].hex);
          earnings = new BigNumber(result.callsReturnContext[1].returnValues[0].hex);
        } else if (result.originalContractCallContext.reference === tempFarm.token.address) {
          allowance1 = new BigNumber(result.callsReturnContext[0].returnValues[0].hex);
          tokenBalance1 = new BigNumber(result.callsReturnContext[1].returnValues[0].hex);
        } else if (result.originalContractCallContext.reference === tempFarm.quoteToken.address) {
          allowance2 = new BigNumber(result.callsReturnContext[0].returnValues[0].hex);
          tokenBalance2 = new BigNumber(result.callsReturnContext[1].returnValues[0].hex);
        }
      });

      tempFarm.userData = {
        allowance,
        tokenBalance,
        stakedBalance,
        earnings,
        tokenBalance1,
        allowance1,
        tokenBalance2,
        allowance2,
      };
    }

    farms.push(tempFarm);
  }

  return { farms };
};

export default getFarms;
