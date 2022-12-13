/* eslint-disable camelcase */
export type Amount = {
  denom: string;
  amount: string;
};

export type Pagination = {
  next_key: string | null;
  total: string;
};

export type BalancePayload = {
  balances?: Amount[];
  // kava
  result?: Amount[];
  pagination: Pagination;
};

export type LcdValidatorDelegator = {
  amount: string;
  delegator_address: string;
  shares: string;
  validator_address: string;
};

export type LcdDelegationResponse = {
  balance: Amount;
  delegation: LcdValidatorDelegator;
};

export type DelegationResult = {
  balance: Amount | string;
  delegator_address: string;
  validator_address: string;
  shares: string;
};

export type Delegation = {
  delegatorAddress: string;
  validatorAddress: string;
  amount: Amount;
  reward?: Amount;
  moniker?: string;
};

export type DelegationPayload = {
  delegation_responses?: LcdDelegationResponse[];
  result?: DelegationResult[];
  pagination: Pagination;
};

export type KavaValidatorDelegator = {
  delegator_address: string;
  validator_address: string;
  shares: string;
};

export type KavaDelegationResult = {
  balance: Amount;
  delegation?: KavaValidatorDelegator;
};

export type KavaDelegationPayload = {
  height: string;
  result: KavaDelegationResult[];
};

export type Account = {
  '@type': string;
  address: string;
  pub_key: {
    '@type': string;
    key: string;
  };
  account_number: string;
  sequence: string;
  base_vesting_account: {
    base_account: {
      account_number: string;
      sequence: string;
    };
  };
  account: Account;
};

export type AccountPayload = {
  result: {
    value: {
      account_number: string;
      sequence: string;
      PeriodicVestingAccount: {
        BaseVestingAccount: {
          BaseAccount: {
            account_number: string;
            sequence: string;
          };
        };
      };
    };
  };
  account: Account;
};

export type Uptime = {
  address: string;
  missed_blocks: number;
  over_blocks: number;
};

export type Validators = {
  account_address: string;
  consensus_pubkey: string;
  delegator_shares: string;
  details: string;
  identity: string;
  jailed: boolean;
  keybase_url: string;
  max_change_rate: string;
  max_rate: string;
  min_self_delegation: string;
  moniker: string;
  operator_address: string;
  rank: number;
  rate: string;
  status: number;
  tokens: string;
  unbonding_height: string;
  unbonding_time: string;
  update_time: string;
  uptime: Uptime;
  website: string;
};

export type ParsingUnbondingProps = {
  balance: string;
  validator_address: string;
  moniker: string | Validators;
  completion_time: string;
  creation_height: string;
};

export type Entries = {
  balance: string;
  completion_time: string;
  creation_height: string;
  initial_balance: string;
};

export type UnbondingResponses = {
  delegator_address: string;
  validator_address: string;
  entries: Entries[];
};

export type UnbondingPayload = {
  unbonding_responses: UnbondingResponses[];
  result?: UnbondingResponses[];
  pagination: Pagination;
};

export type Unbonding = {
  delegator_address: string;
  validator_address: string;
  entries: Entries;
};

export type Validator = {
  operator_address: string;
  consensus_pubkey: string;
  jailed: boolean;
  status: number | string;
  tokens: string;
  delegator_shares: string;
  description: {
    moniker: string;
    identity: string;
    website: string;
    security_contact: string;
    details: string;
  };
  unbonding_height: string;
  unbonding_time: string;
  commission: {
    commission_rates: {
      rate: string;
      max_rate: string;
      max_change_rate: string;
    };
    update_time: string;
  };
  min_self_delegation: string;
};

export type ValidatorPayload = {
  result?: Validator[];
  validators?: Validator[];
  pagination?: Pagination;
};

export type Reward = {
  reward: Amount[];
  validator_address: string;
};

export type RewardPayload = {
  rewards?: Reward[];
  total?: Amount[];
  result?: {
    rewards: Reward[];
    total: Amount[];
  };
};

export type WithdrawAddressPayload = {
  withdraw_address: string;
};

export type VestingType =
  | 'BaseVestingAccount'
  | 'ContinuousVestingAccount'
  | 'DelayedVestingAccount'
  | 'Period'
  | 'PeriodicVestingAccount'
  | 'PermanentLockedAccount';

export type AuthAccountPubKey = {
  type: string;
  value: string;
};

type VestingPeriod = {
  length: string;
  amount: Amount[];
};

export type AuthAccountValue = {
  address: string;
  coins?: Amount[];
  public_key: AuthAccountPubKey;
  account_number: string;
  sequence: string;
  original_vesting?: Amount[];
  delegated_free?: Amount[];
  delegated_vesting?: Amount[];
  end_time?: string;
  start_time?: string;
  vesting_periods?: VestingPeriod[];
  code_hash?: string;
};

type BaseAccount = {
  address: string;
  public_key: AuthAccountPubKey;
  account_number: string;
  sequence: string;
};

export type AuthBaseVestingAccount = {
  base_vesting_account: {
    base_account: BaseAccount;
    original_vesting: Amount[];
    delegated_free: Amount[];
    delegated_vesting: Amount[];
    end_time: string;
  };
  start_time?: string;
};

export type AuthBaseWithStartAndPeriod = {
  base_vesting_account: {
    base_account: BaseAccount;
    original_vesting: Amount[];
    delegated_free: Amount[];
    delegated_vesting: Amount[];
    end_time: string;
  };
  start_time: string;
  vesting_periods: VestingPeriod[];
};

export type AuthBaseAccount = {
  account_number: string;
  address: string;
  sequence?: string;
};

export type AuthAccountResult = {
  base_account?: AuthBaseAccount;
  type?: VestingType;
  value: AuthAccountValue | AuthBaseVestingAccount | AuthBaseWithStartAndPeriod;
  account_number?: string;
  sequence?: string;
  address?: string;
  public_key?: AuthAccountPubKey;
  code_hash?: string;
};

export type AuthAccountsPayload = {
  height: string;
  result: AuthAccountResult;
};

export type AuthAccount = {
  type: VestingType;
  value: AuthAccountValue;
};

type DesmosAuthAccountPubKey = {
  '@type': string;
  key: string;
};

export type DesmosBaseAccount = {
  '@type': string;
  address: string;
  pub_key: DesmosAuthAccountPubKey;
  account_number: string;
  sequence: string;
};

export type DesmosAccount = {
  '@type': string;
  base_vesting_account: {
    base_account: DesmosBaseAccount;
    original_vesting: Amount[];
    delegated_free: Amount[];
    delegated_vesting: Amount[];
    end_time: string;
  };
  start_time: string;
  vesting_periods: VestingPeriod[];
};

export type DesmosAuthAccount = {
  '@type': string;
  account: DesmosAccount | DesmosBaseAccount;
  dtag: string;
  nickname: string;
  bio: string;
  pictures: {
    profile: string;
    cover: string;
  };
  creation_date: string;
};

export type DesmosModuleAccount = {
  '@type': string;
  base_account: DesmosBaseAccount;
  name: string;
};

export type DesmosAuthAccountsPayload = {
  account: DesmosAuthAccount | DesmosAccount | DesmosModuleAccount;
};
