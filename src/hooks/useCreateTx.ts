/* eslint-disable camelcase */
import { useCurrentChain } from '~/hooks/useCurrentChain';
import { useCurrentWallet } from '~/hooks/useCurrentWallet';
import { plus, pow, times } from '~/utils/calculator';

export function useCreateTx() {
  const currentChain = useCurrentChain();
  const currentWallet = useCurrentWallet();

  const recoveryDecimal = pow(10, currentChain.decimal);

  return {
    getSendTxMsg: (toAddress: string, amount: string, memo?: string) => {
      const msgType = 'cosmos-sdk/MsgSend';

      const txMsg = {
        msg: [
          {
            type: msgType,
            value: {
              from_address: currentWallet.address,
              to_address: toAddress,
              amount: [{ denom: currentChain.denom, amount: times(amount, recoveryDecimal) }],
            },
          },
        ],
        fee: {
          amount: [{ denom: currentChain.denom, amount: times(currentChain.fee.withdraw, recoveryDecimal) }],
          gas: currentChain.gas.withdraw,
        },
        signatures: null,
        memo,
      };

      return txMsg;
    },
    getDelegateTxMsg: (validatorAddress: string, amount: string, memo?: string) => {
      const msgType = 'cosmos-sdk/MsgDelegate';

      const txMsg = {
        msg: [
          {
            type: msgType,
            value: {
              delegator_address: currentWallet.address,
              validator_address: validatorAddress,
              amount: { denom: currentChain.denom, amount: times(amount, recoveryDecimal) },
            },
          },
        ],
        fee: {
          amount: [{ denom: currentChain.denom, amount: times(currentChain.fee.delegate, recoveryDecimal) }],
          gas: currentChain.gas.delegate,
        },
        signatures: null,
        memo,
      };

      return txMsg;
    },
    getRedelegateTxMsg: (validatorSrcAddress: string, validatorDstAddress: string, amount: string, memo?: string) => {
      const msgType = 'cosmos-sdk/MsgBeginRedelegate';

      const txMsg = {
        msg: [
          {
            type: msgType,
            value: {
              delegator_address: currentWallet.address,
              validator_src_address: validatorSrcAddress,
              validator_dst_address: validatorDstAddress,
              amount: { denom: currentChain.denom, amount: times(amount, recoveryDecimal) },
            },
          },
        ],
        fee: {
          amount: [{ denom: currentChain.denom, amount: times(currentChain.fee.redelegate, recoveryDecimal) }],
          gas: currentChain.gas.redelegate,
        },
        signatures: null,
        memo,
      };

      return txMsg;
    },

    getUndelegateTxMsg: (validatorAddress: string, amount: string, memo?: string) => {
      const msgType = 'cosmos-sdk/MsgUndelegate';

      const txMsg = {
        msg: [
          {
            type: msgType,
            value: {
              delegator_address: currentWallet.address,
              validator_address: validatorAddress,
              amount: { denom: currentChain.denom, amount: times(amount, recoveryDecimal) },
            },
          },
        ],
        fee: {
          amount: [{ denom: currentChain.denom, amount: times(currentChain.fee.undelegate, recoveryDecimal) }],
          gas: currentChain.gas.undelegate,
        },
        signatures: null,
        memo,
      };

      return txMsg;
    },

    getModifyWithdrawAddressTxMsg: (withdrawAddress: string, memo?: string) => {
      const msgType = 'cosmos-sdk/MsgModifyWithdrawAddress';

      const txMsg = {
        msg: [
          {
            type: msgType,
            value: {
              delegator_address: currentWallet.address,
              withdraw_address: withdrawAddress,
            },
          },
        ],
        fee: {
          amount: [
            { denom: currentChain.denom, amount: times(currentChain.fee.modifyWithdrawAddress, recoveryDecimal) },
          ],
          gas: currentChain.gas.modifyWithdrawAddress,
        },
        signatures: null,
        memo,
      };

      return txMsg;
    },

    getWithdrawRewardTxMsg: (data: { validatorAddress: string }[], memo?: string) => {
      const msgType = 'cosmos-sdk/MsgWithdrawDelegationReward';

      const msgs = data.map((datum) => ({
        type: msgType,
        value: {
          delegator_address: currentWallet.address,
          validator_address: datum.validatorAddress,
        },
      }));

      const gas = times('60000', data.length - 1, 0);

      const fee = times(currentChain.fee.withdrawReward, data.length);

      const txMsg = {
        msg: msgs,
        fee: {
          amount: [{ denom: currentChain.denom, amount: times(fee, recoveryDecimal) }],
          gas: plus(currentChain.gas.withdrawReward, gas, 0),
        },
        signatures: null,
        memo,
      };

      return txMsg;
    },

    getWithdrawValidatorCommissionTxMsg: (validatorAddress: string, memo?: string) => {
      const msgType = 'cosmos-sdk/MsgWithdrawValidatorCommission';

      const txMsg = {
        msg: [
          {
            type: msgType,
            value: {
              validator_address: validatorAddress,
            },
          },
        ],
        fee: {
          amount: [{ denom: currentChain.denom, amount: times(currentChain.fee.withdrawCommission, recoveryDecimal) }],
          gas: currentChain.gas.withdrawCommission,
        },
        signatures: null,
        memo,
      };

      return txMsg;
    },
  };
}

// cosmos-sdk/MsgModifyWithdrawAddress
// cosmos-sdk/MsgWithdrawValidatorCommission
// cosmos-sdk/MsgWithdrawDelegationReward
