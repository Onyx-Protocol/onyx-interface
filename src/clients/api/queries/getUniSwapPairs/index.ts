import { Pair as PSPair } from '@uniswap/sdk';
import { ContractCallContext, ContractCallResults } from 'ethereum-multicall';

import uniSwapPairAbi from 'constants/contracts/abis/uniSwapPair.json';

import formatToPairs from './formatToPairs';
import { GetUniSwapPairsInput, GetUniSwapPairsOutput, PairAddress } from './types';

export * from './types';

const getUniSwapPairs = async ({
  multicall,
  tokenCombinations,
}: GetUniSwapPairsInput): Promise<GetUniSwapPairsOutput> => {
  // Generate pair addresses from token combinations
  const pairAddresses: PairAddress[] = tokenCombinations.reduce((acc, [tokenA, tokenB]) => {
    try {
      const address = PSPair.getAddress(tokenA, tokenB);

      const pairAddress: PairAddress = {
        tokenCombination: [tokenA, tokenB],
        address,
      };

      return [...acc, pairAddress];
    } catch {
      // PSPair.getAddress can error out, in which case we exclude the pair from
      // the list
      return acc;
    }
  }, [] as PairAddress[]);

  // Generate call context
  const contractCallContext: ContractCallContext[] = pairAddresses.map(pairAddress => ({
    reference: pairAddress.address,
    contractAddress: pairAddress.address,
    abi: uniSwapPairAbi,
    calls: [{ reference: 'getReserves', methodName: 'getReserves()', methodParameters: [] }],
  }));

  const reserveCallResults: ContractCallResults = await multicall.call(contractCallContext);

  const pairs = formatToPairs({
    pairAddresses,
    reserveCallResults,
  });

  return { pairs };
};

export default getUniSwapPairs;
