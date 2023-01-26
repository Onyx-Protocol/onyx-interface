import config from 'config';
import { ContractCallContext, ContractCallReturnContext } from 'ethereum-multicall';
import { getContractAddress } from 'utilities';

import punkAbi from 'constants/contracts/abis/punk.json';

const getOwnedPunkIds = async ({ accountAddress, multicall }: any): Promise<any> => {
  if (!accountAddress) return {};

  if (config.chainId === 5) {
    const contractCallContexts = new Array(1000).fill(['0']).map((_v, _idx) => {
      const contractCallContext: ContractCallContext = {
        reference: `${getContractAddress('punk')}-${_idx}`,
        contractAddress: getContractAddress('punk'),
        abi: punkAbi,
        calls: [
          {
            reference: 'punkIndexToAddress',
            methodName: 'punkIndexToAddress',
            methodParameters: [_idx + 1],
          },
        ],
      };
      return contractCallContext;
    });
    const unformattedResults = await multicall.call(contractCallContexts);
    const results: ContractCallReturnContext[] = Object.values(unformattedResults.results);
    const ownedIds = results.reduce((a: any, result, index) => {
      const returnContext = result.callsReturnContext[0];
      if (!returnContext.success) {
        return a;
      }
      const address = returnContext.returnValues[0];
      if (!a[address]) a[address] = [];
      if (address !== '0x0000000000000000000000000000000000000000') a[address].push(index + 1);
      return a;
    }, {});
    return ownedIds;
  }
  let ownedIds = {};
  await fetch(
    `${config.apiUrl}/user_nfts?address=${accountAddress}&collections=${getContractAddress(
      'punk',
    )}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
  )
    .then(res => res.json())
    .then(({ data: [data = { tokenIds: [] }] }) => {
      ownedIds = data.tokenIds.reduce((a: any, token: any) => {
        if (!a[accountAddress]) a[accountAddress] = [];
        a[accountAddress].push(token.tokenId);
        return a;
      }, {});
    });
  return ownedIds;
};

export default getOwnedPunkIds;
