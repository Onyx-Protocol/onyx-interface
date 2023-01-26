import { Multicall } from 'ethereum-multicall';
import Web3 from 'web3';

import fakeMulticallResponses from '__mocks__/contracts/multicall';
import fakeAccountAddress from '__mocks__/models/address';
import { MAINNET_TOKENS } from 'constants/tokens';

import getTokenBalances from '.';

const tokens = [MAINNET_TOKENS.usdt, MAINNET_TOKENS.wbtc];
const tokensWithEth = [...tokens, MAINNET_TOKENS.eth];

describe('api/queries/getTokenBalances', () => {
  test('throws an error when multicall request fails', async () => {
    const fakeMulticall = {
      call: async () => {
        throw new Error('Fake error message');
      },
    } as unknown as Multicall;

    const fakeWeb3 = {} as unknown as Web3;

    try {
      await getTokenBalances({
        web3: fakeWeb3,
        multicall: fakeMulticall,
        accountAddress: fakeAccountAddress,
        tokens,
      });

      throw new Error('getTokenBalances should have thrown an error but did not');
    } catch (error) {
      expect(error).toMatchInlineSnapshot('[Error: Fake error message]');
    }
  });

  test('throws an error when web3 request fails', async () => {
    const fakeMulticall = {
      call: jest.fn(async () => fakeMulticallResponses.eth20.balanceOfTokens),
    } as unknown as Multicall;

    const fakeWeb3 = {
      eth: {
        getBalance: async () => {
          throw new Error('Fake error message');
        },
      },
    } as unknown as Web3;

    try {
      await getTokenBalances({
        web3: fakeWeb3,
        multicall: fakeMulticall,
        accountAddress: fakeAccountAddress,
        tokens: tokensWithEth,
      });

      throw new Error('getTokenBalances should have thrown an error but did not');
    } catch (error) {
      expect(error).toMatchInlineSnapshot('[Error: Fake error message]');
    }
  });

  test('returns token balances in the right format on success', async () => {
    const fakeWeb3 = {} as unknown as Web3;

    const fakeMulticall = {
      call: jest.fn(async () => fakeMulticallResponses.eth20.balanceOfTokens),
    } as unknown as Multicall;

    const res = await getTokenBalances({
      web3: fakeWeb3,
      multicall: fakeMulticall,
      accountAddress: fakeAccountAddress,
      tokens,
    });

    expect(fakeMulticall.call).toHaveBeenCalledTimes(1);
    expect((fakeMulticall.call as jest.Mock).mock.calls[0][0]).toMatchSnapshot();

    expect(res).toMatchSnapshot();
  });

  test('returns token balances, including ETH, in the right format on success', async () => {
    const fakeWeb3 = {
      eth: {
        getBalance: async () => '123456789',
      },
    } as unknown as Web3;

    const fakeMulticall = {
      call: jest.fn(async () => fakeMulticallResponses.eth20.balanceOfTokens),
    } as unknown as Multicall;

    const res = await getTokenBalances({
      web3: fakeWeb3,
      multicall: fakeMulticall,
      accountAddress: fakeAccountAddress,
      tokens: tokensWithEth,
    });

    expect(fakeMulticall.call).toHaveBeenCalledTimes(1);
    expect((fakeMulticall.call as jest.Mock).mock.calls[0][0]).toMatchSnapshot();

    expect(res).toMatchSnapshot();
  });
});
