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

export type Delegation = {
  delegator_address: string;
  validator_address: string;
  shares: string;
};

export type DelegationsPayload = {
  result: {
    delegation: Delegation;
    balance: Amount;
    delegator_address: string;
    validator_address: string;
    shares: string;
  }[];
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
  result: {
    rewards: Reward[];
    total: Amount[];
  };
};

export type WithdrawAddressPayload = {
  height: string;
  result: string;
};
