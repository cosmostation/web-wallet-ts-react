import type { ChainPath } from '~/constants/chain';
import { CHAIN, chains } from '~/constants/chain';

export default function LcdURL(chain: ChainPath) {
  const chainInfo = chains[chain];

  return {
    getBalance: (address: string) => {
      const exceptionChains = [CHAIN.KAVA, CHAIN.KICHAIN] as string[];
      const path = exceptionChains.includes(chainInfo.path) ? '/bank/balances/' : '/cosmos/bank/v1beta1/balances/';

      return `${chainInfo.lcdURL}${path}${address}?pagination.limit=10000`;
    },
    getDelegations: (address: string) => `${chainInfo.lcdURL}/staking/delegators/${address}/delegations`,
    getRewards: (address: string) => `${chainInfo.lcdURL}/distribution/delegators/${address}/rewards`,
    getUnbondingDelegations: (address: string) =>
      `${chainInfo.lcdURL}/staking/delegators/${address}/unbonding_delegations`,
    getValidators: () => {
      const exceptionChains = [CHAIN.KICHAIN] as string[];
      const path = exceptionChains.includes(chainInfo.path)
        ? '/staking/validators'
        : '/cosmos/staking/v1beta1/validators?pagination.limit=10000';

      return `${chainInfo.lcdURL}${path}`;
    },
    getAccount: (address: string) => {
      const path = '/auth/accounts/';

      return `${chainInfo.lcdURL}${path}${address}`;
    },
    getWithdrawAddress: (address: string) => `${chainInfo.lcdURL}/distribution/delegators/${address}/withdraw_address`,
    postTx: () => `${chainInfo.lcdURL}/txs`,
    postProtoTx: () => `${chainInfo.lcdURL}/cosmos/tx/v1beta1/txs`,
  };
}
