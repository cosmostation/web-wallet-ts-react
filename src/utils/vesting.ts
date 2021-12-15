/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
import dayjs from 'dayjs';
import { filter, find, floor, gt, isArray, isEmpty, isString, reduce, toNumber, transform } from 'lodash';

import type { Amount, AuthAccount, VestingType } from '~/models/common';
import { minus, plus } from '~/utils/calculator';

export interface IVesting {
  originAmount?: Amount;
  amount: Amount;
  startAt?: string;
  releaseAt: string;
  type: VestingType;
}

const getOriginalVestingTotal = (vestingAccount: AuthAccount, denom: string): string => {
  const originVesting = vestingAccount.value.original_vesting || [];
  const filteredVesting = filter(originVesting, { denom });

  return reduce(filteredVesting, (acc, { amount }) => plus(acc, amount, 0), '0');
};

const getPeriodicVestingRemained = (vestingAccount: AuthAccount, denom: string): string => {
  const { start_time, vesting_periods } = vestingAccount.value;

  if (isString(start_time) && isArray(vesting_periods)) {
    const now = dayjs().unix();
    let vestingBaseTime = Number(start_time);

    const remained = filter(vesting_periods, ({ length }) => {
      const _length = Number(length);
      vestingBaseTime += _length;

      return vestingBaseTime > now;
    });

    return reduce(
      remained,
      (acc, { amount: amountArray }) => {
        const _filtered = filter(amountArray, { denom });
        const sum = reduce(_filtered, (_acc, amount) => plus(_acc, amount.amount, 0), '0');
        return plus(acc, sum, 0);
      },
      '0',
    );
  }
  return '0';
};

const getDelayedVestingRemained = (vestingAccount: AuthAccount, denom: string): string => {
  const endTime = vestingAccount.value.end_time;

  if (endTime) {
    const now = dayjs().unix();
    if (now > Number(endTime)) {
      return '0';
    }
    return getOriginalVestingTotal(vestingAccount, denom);
  }
  return '0';
};

const getContinuousVestingRemained = (vestingAccount: AuthAccount, denom: string): string => {
  const now = dayjs().unix();
  const { value } = vestingAccount;

  const startTime = toNumber(value.start_time);
  const endTime = toNumber(value.end_time);

  if (now >= endTime) {
    return '0';
  }

  const originalVestingTotal = getOriginalVestingTotal(vestingAccount, denom);
  if (now < startTime) {
    return originalVestingTotal;
  }

  const ratio = (now - startTime) / (endTime - startTime);
  const vested = floor(toNumber(originalVestingTotal) * ratio);

  return minus(originalVestingTotal, vested, 0);
};

const buildPeriodicVestingArray = (account: AuthAccount): IVesting[] => {
  const now = dayjs();
  let lastTime = dayjs(toNumber(account.value.start_time) * 1000);

  const vestingPeriods = account.value.vesting_periods || [];

  return transform(
    vestingPeriods,
    (result: IVesting[], { amount: amountArray, length }) => {
      if (isEmpty(amountArray)) {
        return;
      }

      lastTime = lastTime.add(dayjs(toNumber(length) * 1000).valueOf());
      if (!now.isAfter(lastTime)) {
        amountArray.forEach((amount) => {
          result.push({
            type: 'PeriodicVestingAccount',
            amount,
            releaseAt: lastTime.toString(),
          });
        });
      }
    },
    [],
  );
};

const buildDelayedVestingArray = (account: AuthAccount): IVesting[] => {
  const endTime = account.value.end_time;
  const originalVesting = account.value.original_vesting || [];

  if (!isEmpty(originalVesting) && endTime) {
    return originalVesting.map((amount) => ({
      type: 'DelayedVestingAccount',
      amount,
      releaseAt: dayjs(toNumber(endTime) * 1000).toString(),
    }));
  }

  return [];
};

const buildContinuousVestingArray = (account: AuthAccount): IVesting[] => {
  const startTime = toNumber(account.value.start_time);
  const endTime = toNumber(account.value.end_time);

  const originalVesting = account.value.original_vesting || [];

  const now = dayjs().unix();

  if (!isEmpty(originalVesting)) {
    return originalVesting.map((vesting) => {
      const originalVestingTotal = getOriginalVestingTotal(account, vesting.denom);
      const denomOriginalVesting = find(originalVesting, { denom: vesting.denom });
      const ratio = (now - startTime) / (endTime - startTime);
      const vested = now > startTime ? floor(toNumber(originalVestingTotal) * ratio) : 0;

      return {
        type: 'ContinuousVestingAccount',
        amount: {
          denom: vesting.denom,
          amount: vested.toString(),
        },
        originAmount: denomOriginalVesting,
        startAt: dayjs(startTime * 1000).toString(),
        releaseAt: dayjs(endTime * 1000).toString(),
      };
    });
  }
  return [];
};

export const isPeriodicVestingAccount = (account: AuthAccount): boolean => {
  const { type } = account;
  return type === 'PeriodicVestingAccount';
};

export const isContinuousVestingAccount = (account: AuthAccount): boolean => {
  const { type } = account;
  return type === 'ContinuousVestingAccount';
};

export const isDelayedVestingAccount = (account: AuthAccount): boolean => {
  const { type } = account;
  return type === 'DelayedVestingAccount';
};

export const isVestingAccount = (account: AuthAccount): boolean =>
  isPeriodicVestingAccount(account) || isContinuousVestingAccount(account) || isDelayedVestingAccount(account);

export const calculatingDelegatedVestingTotal = (vestingRemained: string, delegateAmount: string): string => {
  if (gt(vestingRemained, delegateAmount)) {
    return delegateAmount;
  }

  return vestingRemained;
};

export const getDelegatedVestingTotal = (vestingAccount: AuthAccount, denom: string): string => {
  const delegatedVesting = vestingAccount?.value?.delegated_vesting || [];
  const denomDelegatedVesting = filter(delegatedVesting, { denom });

  return reduce(denomDelegatedVesting, (acc, { amount }) => plus(acc, amount, 0), '0');
};

export const getVestingRemained = (account: AuthAccount, denom: string): string => {
  try {
    if (isPeriodicVestingAccount(account)) {
      return getPeriodicVestingRemained(account, denom);
    }

    if (isDelayedVestingAccount(account)) {
      return getDelayedVestingRemained(account, denom);
    }

    if (isContinuousVestingAccount(account)) {
      return getContinuousVestingRemained(account, denom);
    }

    return '0';
  } catch (error) {
    return '0';
  }
};

export const getVestings = (account: AuthAccount): IVesting[] | undefined => {
  if (isPeriodicVestingAccount(account)) {
    return buildPeriodicVestingArray(account);
  }

  if (isDelayedVestingAccount(account)) {
    return buildDelayedVestingArray(account);
  }

  if (isContinuousVestingAccount(account)) {
    return buildContinuousVestingArray(account);
  }

  return undefined;
};

/**
 * Vesting 어카운트일 경우 bankBalance에 위임가능한 vesting 값이 더해져 있음.
 * 위임 가능한 vesting 양은
 * delegatableVesting = remainedVesting - delegatedVesting
 * 민트스캔에서의 available은 전송 가능한 토큰량이기 때문에
 * available = bankBalance - delegatableVesting
 * 자세한 내용은 https://docs.cosmos.network/v0.42/modules/auth/05_vesting.html 참고
 *
 * @returns [available count, vesting count without delegate]
 */
export const getVestingRelatedBalances = (
  bankBalance: string,
  vestingRemained: string,
  delegatedVestingTotal: string,
): string[] => {
  let available = bankBalance;

  const delegatableVesting = Math.max(0, toNumber(minus(vestingRemained, delegatedVestingTotal, 0)));

  if (gt(delegatableVesting, '0')) {
    available = Math.max(0, toNumber(minus(bankBalance, delegatableVesting, 0))).toString();
  }

  return [available.toString(), delegatableVesting.toString()];
};

/**
 * 퍼시스턴스는 다른 체인들과 다르게 위임시 transferable이 vesting보다 먼저 위임됨.
 * 또 퍼시스턴스는 Auth/Account 모듈에서 delegatedVesting 값을 주지 않음.
 * 먼저 민트스캔에서 available은 전송이 가능한 토큰량이기 때문에
 * available = bankBalance - vestingRemained
 * bankBalance는 위임이 가능한 토큰량이기 때문에 vesting된 토큰중 위임이 가능한 양은
 * delegatableVesting = bankBalance - available
 *
 * @returns [available count, vesting count without delegate]
 */
export const getPersistenceVestingRelatedBalances = (bankBalance: string, vestingRemained: string): string[] => {
  const available = Math.max(0, toNumber(minus(bankBalance, vestingRemained, 0)));
  const delegatableVesting = Math.max(0, toNumber(minus(bankBalance, available, 0)));

  return [available.toString(), delegatableVesting.toString()];
};
