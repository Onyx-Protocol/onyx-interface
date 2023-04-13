/* eslint-disable no-await-in-loop */
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
  const farms: Array<Farm> = [];
  for (let i = 0; i < farmConfig.length; i++) {
    const tempFarm = farmConfig[i];

    const lpAddress = getAddress(farmConfig[i].lpAddresses);
    const contractCallContexts: Array<ContractCallContext> = [];
    contractCallContexts.push({
      reference: farmConfig[i].token.address,
      contractAddress: farmConfig[i].token.address,
      abi: eth20Abi,
      calls: [
        {
          reference: 'balanceOf',
          methodName: 'balanceOf',
          methodParameters: [lpAddress],
        },
        {
          reference: 'decimals',
          methodName: 'decimals',
          methodParameters: [],
        },
      ],
    });

    contractCallContexts.push({
      reference: farmConfig[i].quoteToken.address,
      contractAddress: farmConfig[i].quoteToken.address,
      abi: eth20Abi,
      calls: [
        {
          reference: 'balanceOf',
          methodName: 'balanceOf',
          methodParameters: [lpAddress],
        },
        {
          reference: 'decimals',
          methodName: 'decimals',
          methodParameters: [],
        },
      ],
    });

    contractCallContexts.push({
      reference: lpAddress,
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
    console.log('results = ', results);

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
    console.log('masterChefCallResults = ', masterChefCallResults);

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

      const unformattedUserResults = await multicall.call(contractCallForUserContexts);
      const userResults: ContractCallReturnContext[] = Object.values(
        unformattedUserResults.results,
      );
      console.log('userResults = ', userResults);
    }

    farms.push(tempFarm);
  }

  return { farms };
};

export default getFarms;
