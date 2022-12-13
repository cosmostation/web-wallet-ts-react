/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable camelcase */
import { useMemo } from 'react';
import type { AxiosError } from 'axios';
import axios from 'axios';
import Big from 'big.js';
import useSWR from 'swr';

import type { ChainGeckoId } from '~/constants/chain';
import { CHAIN, chains } from '~/constants/chain';
import { useCurrentChain } from '~/hooks/useCurrentChain';
import { useCurrentLanguage } from '~/hooks/useCurrentLanguage';
import { useCurrentWallet } from '~/hooks/useCurrentWallet';
import type {
  AuthAccount,
  AuthAccountPubKey,
  AuthAccountsPayload,
  AuthAccountValue,
  AuthBaseVestingAccount,
  AuthBaseWithStartAndPeriod,
  BalancePayload,
  Delegation,
  DelegationPayload,
  DesmosAccount,
  DesmosAuthAccount,
  DesmosAuthAccountsPayload,
  DesmosBaseAccount,
  DesmosModuleAccount,
  KavaDelegationPayload,
  RewardPayload,
  UnbondingPayload,
  ValidatorPayload,
  WithdrawAddressPayload,
} from '~/models/common';
import { gt, plus, pow, times } from '~/utils/calculator';
import LcdURL from '~/utils/lcdURL';
import {
  calculatingDelegatedVestingTotal,
  getDelegatedVestingTotal,
  getPersistenceVestingRelatedBalances,
  getVestingRelatedBalances,
  getVestingRemained,
} from '~/utils/vesting';

async function get<T>(path: string): Promise<T> {
  const { data } = await axios.get<T>(path);
  return data;
}

export function useBalanceSWR() {
  const currentChain = useCurrentChain();
  const currentWallet = useCurrentWallet();

  const lcdURL = LcdURL(currentChain.path);

  const requestURL = lcdURL.getBalance(currentWallet.address!);

  const fetcher = (fetchUrl: string) => get<BalancePayload>(fetchUrl);

  const { data, error, mutate } = useSWR<BalancePayload, AxiosError>(requestURL, fetcher, {
    refreshInterval: 0,
    revalidateOnFocus: false,
    isPaused: () => !currentWallet.address?.startsWith(currentChain.wallet.prefix),
  });

  const returnData = data
    ? { balance: data.result ? data.result : data.balances, pagination: data.pagination }
    : undefined;

  return {
    data: returnData,
    error,
    mutate,
  };
}

export function useDelegationsSWR() {
  const currentChain = useCurrentChain();
  const currentWallet = useCurrentWallet();

  const lcdURL = LcdURL(currentChain.path);

  const requestURL = lcdURL.getDelegations(currentWallet.address!);

  const fetcher = (fetchUrl: string) => get<DelegationPayload | KavaDelegationPayload>(fetchUrl);

  const { data, error, mutate } = useSWR<DelegationPayload | KavaDelegationPayload, AxiosError>(requestURL, fetcher, {
    refreshInterval: 0,
    revalidateOnFocus: false,
    isPaused: () => !currentWallet.address?.startsWith(currentChain.wallet.prefix),
  });

  const isKavaPayload = (payload: DelegationPayload | KavaDelegationPayload): payload is KavaDelegationPayload =>
    (payload as KavaDelegationPayload).result?.[0]?.delegation?.delegator_address !== undefined;

  const returnData: Delegation[] = useMemo(() => {
    if (data) {
      if (isKavaPayload(data)) {
        if (data.result) {
          return data.result.map((delegation) => ({
            delegatorAddress: delegation.delegation?.delegator_address || '',
            validatorAddress: delegation.delegation?.validator_address || '',
            amount: delegation.balance,
          }));
        }

        return [];
      }

      if (data.delegation_responses) {
        return data.delegation_responses.map((delegation) => ({
          delegatorAddress: delegation.delegation.delegator_address,
          validatorAddress: delegation.delegation.validator_address,
          amount: delegation.balance,
        }));
      }

      if (data.result) {
        return data.result.map((delegation) => {
          const amount = typeof delegation.balance === 'string' ? delegation.balance : delegation.balance.amount;
          const denom = typeof delegation.balance === 'string' ? currentChain.denom : delegation.balance.denom;

          return {
            delegatorAddress: delegation.delegator_address,
            validatorAddress: delegation.validator_address,
            amount: {
              amount,
              denom,
            },
          };
        });
      }
    }
    return [];
  }, [currentChain.denom, data]);

  return {
    data: returnData,
    error,
    mutate,
  };
}

export function useRewardsSWR() {
  const currentChain = useCurrentChain();
  const currentWallet = useCurrentWallet();

  const lcdURL = LcdURL(currentChain.path);

  const requestURL = lcdURL.getRewards(currentWallet.address!);

  const fetcher = (fetchUrl: string) => get<RewardPayload>(fetchUrl);

  const { data, error, mutate } = useSWR<RewardPayload, AxiosError>(requestURL, fetcher, {
    refreshInterval: 0,
    revalidateOnFocus: false,
    isPaused: () => !currentWallet.address?.startsWith(currentChain.wallet.prefix),
  });

  const returnData = useMemo(() => {
    if (data?.result) {
      return { ...data.result };
    }

    if (data?.rewards && data?.total) {
      return { rewards: data.rewards, total: data.total };
    }

    return undefined;
  }, [data]);

  return {
    data: returnData,
    error,
    mutate,
  };
}

export function useUnbondingDelegationsSWR() {
  const currentChain = useCurrentChain();
  const currentWallet = useCurrentWallet();

  const lcdURL = LcdURL(currentChain.path);

  const requestURL = lcdURL.getUnbondingDelegations(currentWallet.address!);

  const fetcher = (fetchUrl: string) => get<UnbondingPayload>(fetchUrl);

  const { data, error, mutate } = useSWR<UnbondingPayload, AxiosError>(requestURL, fetcher, {
    refreshInterval: 0,
    revalidateOnFocus: false,
    isPaused: () => !currentWallet.address?.startsWith(currentChain.wallet.prefix),
  });

  const returnData = useMemo(() => {
    if (data) {
      if (data.unbonding_responses) {
        return data.unbonding_responses?.map((item) =>
          item.entries.map((entry) => ({
            delegator_address: item.delegator_address,
            validator_address: item.validator_address,
            entries: entry,
          })),
        );
      }

      if (data.result) {
        return data.result.map((item) =>
          item.entries.map((entry) => ({
            delegator_address: item.delegator_address,
            validator_address: item.validator_address,
            entries: entry,
          })),
        );
      }
    }
    return [];
  }, [data]);

  const flattenData = useMemo(() => returnData?.flat() || [], [returnData]);

  return {
    data: flattenData,
    error,
    mutate,
  };
}

export function useValidatorsSWR() {
  const currentChain = useCurrentChain();

  const lcdURL = LcdURL(currentChain.path);

  const requestURL = lcdURL.getValidators();

  const isMoreQuery = requestURL.endsWith('/staking/validators');

  const fetcher = (fetchUrl: string) => get<ValidatorPayload>(fetchUrl);

  const bondSWR = useSWR<ValidatorPayload, AxiosError>(requestURL, fetcher, {
    refreshInterval: 0,
    revalidateOnFocus: false,
    isPaused: () => !currentChain,
  });

  const unbondedRequestURL = isMoreQuery
    ? currentChain.path === CHAIN.KICHAIN
      ? `${requestURL}?status=BOND_STATUS_UNBONDED`
      : `${requestURL}?status=unbonded`
    : requestURL;

  const unbondingRequestURL = isMoreQuery
    ? currentChain.path === CHAIN.KICHAIN
      ? `${requestURL}?status=BOND_STATUS_UNBONDING`
      : `${requestURL}?status=unbonding`
    : requestURL;

  const unbondedSWR = useSWR<ValidatorPayload, AxiosError>(unbondedRequestURL, fetcher, {
    refreshInterval: 0,
    revalidateOnFocus: false,
    isPaused: () => !currentChain,
  });

  const unbondingSWR = useSWR<ValidatorPayload, AxiosError>(unbondingRequestURL, fetcher, {
    refreshInterval: 0,
    revalidateOnFocus: false,
    isPaused: () => !currentChain,
  });

  const mutates = () => {
    void bondSWR.mutate();
    void unbondedSWR.mutate();
    void unbondingSWR.mutate();
  };

  const bondReturnData = bondSWR.data
    ? {
        validators: bondSWR.data.result ? bondSWR.data.result : bondSWR.data.validators,
        pagination: bondSWR.data.pagination,
      }
    : undefined;

  const unbondedReturnData = unbondedSWR.data
    ? {
        validators: unbondedSWR.data.result ? unbondedSWR.data.result : unbondedSWR.data.validators,
        pagination: unbondedSWR.data.pagination,
      }
    : undefined;

  const unbondingReturnData = unbondingSWR.data
    ? {
        validators: unbondingSWR.data.result ? unbondingSWR.data.result : unbondingSWR.data.validators,
        pagination: unbondingSWR.data.pagination,
      }
    : undefined;

  const returnData = !isMoreQuery
    ? bondSWR.data
    : !bondReturnData && !unbondedReturnData && !unbondingReturnData
    ? undefined
    : {
        validators: [
          ...(bondReturnData?.validators ? bondReturnData.validators : []),
          ...(unbondedReturnData?.validators ? unbondedReturnData.validators : []),
          ...(unbondingReturnData?.validators ? unbondingReturnData.validators : []),
        ],
      };

  return {
    data: returnData,
    error: bondSWR.error,
    mutate: mutates,
  };
}

export function useAccountSWR() {
  const currentChain = useCurrentChain();
  const currentWallet = useCurrentWallet();

  const lcdURL = LcdURL(currentChain.path);

  const requestURL = lcdURL.getAccount(currentWallet.address!);

  const fetcher = (fetchUrl: string) => get<AuthAccountsPayload>(fetchUrl);

  const { data, error, mutate } = useSWR<AuthAccountsPayload, AxiosError>(requestURL, fetcher, {
    refreshInterval: 0,
    revalidateOnFocus: false,
    errorRetryCount: 0,
    isPaused: () => !currentWallet.address?.startsWith(currentChain.wallet.prefix),
  });

  const isBaseVestingAccount = (
    payload: AuthAccountValue | AuthBaseVestingAccount | AuthBaseWithStartAndPeriod,
  ): payload is AuthBaseVestingAccount =>
    (payload as AuthBaseVestingAccount).base_vesting_account !== undefined &&
    (payload as AuthBaseWithStartAndPeriod).vesting_periods === undefined;

  const isBaseWithStartAndPeriod = (
    payload: AuthAccountValue | AuthBaseVestingAccount | AuthBaseWithStartAndPeriod,
  ): payload is AuthBaseWithStartAndPeriod =>
    (payload as AuthBaseWithStartAndPeriod).base_vesting_account !== undefined &&
    (payload as AuthBaseWithStartAndPeriod).start_time !== undefined &&
    (payload as AuthBaseWithStartAndPeriod).vesting_periods !== undefined;

  const isDesmosPayload = (
    payload: DesmosAuthAccountsPayload | AuthAccountsPayload,
  ): payload is DesmosAuthAccountsPayload =>
    (payload as DesmosAuthAccountsPayload).account !== undefined &&
    (payload as DesmosAuthAccountsPayload).account['@type'] !== undefined;

  const isDesmosBasePayload = (
    payload: DesmosAuthAccount | DesmosAccount | DesmosModuleAccount,
  ): payload is DesmosAccount =>
    (payload as DesmosAccount)['@type'] !== '/desmos.profiles.v1beta1.Profile' &&
    (payload as DesmosAccount).base_vesting_account !== undefined;

  const isDesmosModulePayload = (
    payload: DesmosAuthAccount | DesmosAccount | DesmosModuleAccount,
  ): payload is DesmosModuleAccount =>
    (payload as DesmosModuleAccount)['@type'] !== '/cosmos.auth.v1beta1.ModuleAccount' &&
    (payload as DesmosModuleAccount).base_account !== undefined;

  const isDesmosBaseAccount = (
    account: DesmosAccount | DesmosBaseAccount | DesmosModuleAccount,
  ): account is DesmosBaseAccount =>
    (account as DesmosBaseAccount).address !== undefined && (account as DesmosBaseAccount).pub_key !== undefined;

  const isDesmosModuleAccount = (account: DesmosAccount | DesmosModuleAccount): account is DesmosModuleAccount =>
    (account as DesmosAccount).base_vesting_account === undefined &&
    (account as DesmosModuleAccount).base_account !== undefined;

  const result = useMemo(() => {
    if (data) {
      if (isDesmosPayload(data)) {
        const account =
          isDesmosBasePayload(data.account) || isDesmosModulePayload(data.account)
            ? data.account
            : data.account.account || data.account;

        if (isDesmosBaseAccount(account)) {
          const basePubKey = {
            type: account.pub_key?.['@type'],
            value: account.pub_key?.key,
          } as AuthAccountPubKey;

          const typeArray = account['@type'].split('.');

          return {
            type: typeArray[typeArray.length - 1],
            value: {
              address: account.address,
              public_key: basePubKey,
              account_number: account.account_number,
              sequence: account.sequence,
            },
          } as AuthAccount;
        }

        if (isDesmosModuleAccount(account)) {
          const basePubKey = {
            type: account.base_account.pub_key?.['@type'],
            value: account.base_account?.pub_key?.key,
          } as AuthAccountPubKey;

          const typeArray = account['@type'].split('.');

          return {
            type: typeArray[typeArray.length - 1],
            value: {
              address: account.base_account.address,
              public_key: basePubKey,
              account_number: account.base_account.account_number,
              sequence: account.base_account.sequence,
            },
          } as AuthAccount;
        }

        const baseVestingAccount = account.base_vesting_account;

        const pubKey = {
          type: baseVestingAccount?.base_account.pub_key?.['@type'],
          value: baseVestingAccount?.base_account.pub_key?.key,
        } as AuthAccountPubKey;

        const typeArray = account['@type'].split('.');

        return {
          type: typeArray[typeArray.length - 1],
          value: {
            address: baseVestingAccount?.base_account.address,
            public_key: pubKey,
            account_number: baseVestingAccount?.base_account.account_number,
            sequence: baseVestingAccount?.base_account.sequence,
            original_vesting: baseVestingAccount?.original_vesting,
            delegated_free: baseVestingAccount?.delegated_free,
            delegated_vesting: baseVestingAccount?.delegated_vesting,
            start_time: account.start_time,
            vesting_periods: account.vesting_periods,
            end_time: baseVestingAccount?.end_time,
          },
        } as AuthAccount;
      }

      const value = data.result.value || data.result;

      if (isBaseWithStartAndPeriod(value)) {
        const vestingAccount = value.base_vesting_account;

        return {
          type: data.result.type?.split('/')[1],
          value: {
            address: vestingAccount.base_account.address,
            public_key: vestingAccount.base_account.public_key,
            account_number: vestingAccount.base_account.account_number,
            sequence: vestingAccount.base_account.sequence,
            original_vesting: vestingAccount.original_vesting,
            delegated_free: vestingAccount.delegated_free,
            delegated_vesting: vestingAccount.delegated_vesting,
            start_time: value.start_time,
            vesting_periods: value.vesting_periods,
            end_time: vestingAccount.end_time,
          },
        } as AuthAccount;
      }

      if (isBaseVestingAccount(value)) {
        const vestingAccount = value.base_vesting_account;

        return {
          type: data.result.type?.split('/')[1],
          value: {
            address: vestingAccount.base_account.address,
            public_key: vestingAccount.base_account.public_key,
            account_number: vestingAccount.base_account.account_number,
            sequence: vestingAccount.base_account.sequence,
            original_vesting: vestingAccount.original_vesting,
            delegated_free: vestingAccount.delegated_free,
            delegated_vesting: vestingAccount.delegated_vesting,
            start_time: value.start_time,
            end_time: vestingAccount.end_time,
          },
        } as AuthAccount;
      }

      if (data.result.account_number) {
        return {
          value: data.result,
          type: data.result.type?.split('/')[1],
        } as AuthAccount;
      }

      if (data.result.base_account) {
        return {
          value: {
            ...data.result.base_account,
            code_hash: data.result.code_hash,
          },
          type: data.result.type?.split('/')[1],
        } as AuthAccount;
      }

      return {
        ...data.result,
        type: data.result.type?.split('/')[1],
      } as AuthAccount;
    }

    return data as unknown as AuthAccount;
  }, [data]);

  return {
    data: result,
    error,
    mutate,
  };
}
type ChainPricePayload = Record<ChainGeckoId, { usd: number; krw: number }>;

export function useChainPriceSWR() {
  const geckoIds = Object.values(chains)
    .map((chain) => chain.coingeckoId)
    .join(',');

  const requestURL = `https://api.coingecko.com/api/v3/simple/price?vs_currencies=usd,krw&ids=${geckoIds}`;

  const fetcher = (fetchUrl: string) => get<ChainPricePayload>(fetchUrl);

  const { data, error, mutate } = useSWR<ChainPricePayload, AxiosError>(requestURL, fetcher, {
    refreshInterval: 60000,
    revalidateOnFocus: false,
  });

  return {
    data,
    error,
    mutate,
  };
}

export function useWithdrawAddressSWR() {
  const currentChain = useCurrentChain();
  const currentWallet = useCurrentWallet();

  const lcdURL = LcdURL(currentChain.path);

  const requestURL = lcdURL.getWithdrawAddress(currentWallet.address!);

  const fetcher = (fetchUrl: string) => get<WithdrawAddressPayload>(fetchUrl);

  const { data, error, mutate } = useSWR<WithdrawAddressPayload, AxiosError>(requestURL, fetcher, {
    refreshInterval: 0,
    revalidateOnFocus: false,
    isPaused: () => !currentWallet.address?.startsWith(currentChain.wallet.prefix),
  });

  return {
    data,
    error,
    mutate,
  };
}

export function useChainSWR() {
  const currentChain = useCurrentChain();
  const currentLanguage = useCurrentLanguage();
  const balance = useBalanceSWR();
  const delegations = useDelegationsSWR();
  const unbondingDelegation = useUnbondingDelegationsSWR();
  const chainPrice = useChainPriceSWR();
  const rewards = useRewardsSWR();
  const validator = useValidatorsSWR();
  const account = useAccountSWR();
  const withdrawAddress = useWithdrawAddressSWR();

  const isLoading =
    (balance.data || balance.error) &&
    (delegations.data || delegations.error) &&
    (unbondingDelegation.data || unbondingDelegation.error) &&
    (chainPrice.data || chainPrice.error) &&
    (rewards.data || rewards.error) &&
    (validator.data || validator.error) &&
    (account.data || account.error) &&
    (withdrawAddress.data || withdrawAddress.error);

  const availableAmount = balance.data?.balance?.find((item) => item.denom === currentChain.denom)?.amount || '0';

  const price = (chainPrice.data?.[currentChain.coingeckoId] || { usd: 0, krw: 0 })[
    currentLanguage === 'ko' ? 'krw' : 'usd'
  ].toFixed(currentLanguage === 'ko' ? 0 : 4);

  const delegationAmount =
    delegations.data
      ?.filter((item) => item.amount.denom === currentChain.denom)
      ?.reduce((ac, cu) => ac.plus(cu.amount.amount), new Big('0'))
      .toString() || '0';

  const unbondingAmount =
    unbondingDelegation.data
      ?.map((item) => item.entries.balance || '0')
      ?.reduce((ac, cu) => ac.plus(cu), new Big('0'))
      .toString() || '0';

  const rewardAmount = rewards.data?.total?.find((item) => item.denom === currentChain.denom)?.amount || '0';

  const validators = useMemo(() => validator?.data?.validators || [], [validator]);

  const validValidators = useMemo(
    () =>
      validator?.data?.validators
        ?.filter(
          (item) =>
            !item.jailed &&
            (item.status === 2 ||
              item.status === 'BOND_STATUS_BONDED' ||
              (currentChain.path === CHAIN.KICHAIN && item.status === 3)),
        )
        ?.sort((a, b) => (gt(b.tokens, a.tokens) ? 1 : -1)) || [],
    [validator, currentChain],
  );

  const validValidatorsTotalToken = validValidators.reduce((ac, cu) => plus(cu.tokens, ac, 0), '0');

  const myValidators = useMemo(() => delegations?.data?.map((item) => item.validatorAddress) || [], [delegations]);

  const accountInfo = useMemo(
    () =>
      account.data?.value?.account_number
        ? {
            account_number: String(account.data?.value?.account_number),
            sequence: String(account.data?.value?.sequence || '0'),
          }
        : undefined,
    [account],
  );

  const vestingRemained = getVestingRemained(account.data, currentChain.denom);
  const delegatedVestingTotal =
    currentChain.name === 'kava'
      ? getDelegatedVestingTotal(account.data, currentChain.denom)
      : calculatingDelegatedVestingTotal(vestingRemained, delegationAmount);

  const [vestingRelatedAvailable, vestingNotDelegate] = (() => {
    if (gt(vestingRemained, '0')) {
      if (currentChain.name === 'persistence') {
        return getPersistenceVestingRelatedBalances(availableAmount, vestingRemained);
      }

      return getVestingRelatedBalances(availableAmount, vestingRemained, delegatedVestingTotal);
    }

    return [availableAmount, '0'];
  })();

  const totalAmount = new Big(vestingRelatedAvailable)
    .plus(vestingNotDelegate)
    .plus(delegationAmount)
    .plus(unbondingAmount)
    .plus(rewardAmount)
    .toString();

  const totalPrice = new Big(times(totalAmount, pow(10, currentChain.decimal * -1), currentChain.decimal))
    .times(price)
    .toFixed(currentLanguage === 'ko' ? 0 : 4, 0);

  return useMemo(
    () => ({
      isLoading,
      swr: {
        balance,
        delegations,
        unbondingDelegation,
        chainPrice,
        rewards,
        validator,
        account,
        withdrawAddress,
      },
      data: {
        availableAmount: times(vestingRelatedAvailable, pow(10, currentChain.decimal * -1), currentChain.decimal),
        delegationAmount: times(delegationAmount, pow(10, currentChain.decimal * -1), currentChain.decimal),
        unbondingAmount: times(unbondingAmount, pow(10, currentChain.decimal * -1), currentChain.decimal),
        rewardAmount: times(rewardAmount, pow(10, currentChain.decimal * -1), currentChain.decimal),
        totalAmount: times(totalAmount, pow(10, currentChain.decimal * -1), currentChain.decimal),
        vestingRemained: times(vestingRemained, pow(10, currentChain.decimal * -1), currentChain.decimal),
        vestingNotDelegate: times(vestingNotDelegate, pow(10, currentChain.decimal * -1), currentChain.decimal),
        price,
        totalPrice,
        account: accountInfo,
        validators,
        validValidators,
        validValidatorsTotalToken,
        myValidators,
        withdrawAddress: withdrawAddress?.data?.withdraw_address || '',
      },
    }),
    [
      vestingRemained,
      vestingNotDelegate,
      vestingRelatedAvailable,
      currentChain,
      accountInfo,
      account,
      balance,
      chainPrice,
      delegationAmount,
      delegations,
      isLoading,
      myValidators,
      price,
      rewardAmount,
      rewards,
      totalAmount,
      totalPrice,
      unbondingAmount,
      unbondingDelegation,
      validValidators,
      validValidatorsTotalToken,
      validator,
      validators,
      withdrawAddress,
    ],
  );
}
