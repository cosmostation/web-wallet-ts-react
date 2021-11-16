/* eslint-disable camelcase */
import { useCurrentChain } from '~/hooks/useCurrentChain';
import { useCurrentWallet } from '~/hooks/useCurrentWallet';
import { MsgSend } from '~/proto/cosmos/bank/v1beta1/tx_pb';
import { DecCoin } from '~/proto/cosmos/base/v1beta1/coin_pb';
import { PubKey } from '~/proto/cosmos/crypto/secp256k1/keys_pb';
import {
  MsgSetWithdrawAddress,
  MsgWithdrawDelegatorReward,
  MsgWithdrawValidatorCommission,
} from '~/proto/cosmos/distribution/v1beta1/tx_pb';
import { MsgBeginRedelegate, MsgDelegate, MsgUndelegate } from '~/proto/cosmos/staking/v1beta1/tx_pb';
import { SignMode } from '~/proto/cosmos/tx/signing/v1beta1/signing_pb';
import { AuthInfo, Fee, ModeInfo, SignerInfo, TxBody, TxRaw } from '~/proto/cosmos/tx/v1beta1/tx_pb';
import { Any } from '~/proto/google/protobuf/any_pb';
import { pow, times } from '~/utils/calculator';

export function useCreateProtoTx() {
  const currentChain = useCurrentChain();
  const currentWallet = useCurrentWallet();

  const recoveryDecimal = pow(10, currentChain.decimal);

  return {
    getSendTxBody: (toAddress: string, amount: string, memo?: string) => {
      const msgSend = new MsgSend();
      const decCoin = new DecCoin();
      const any = new Any();

      const txBody = new TxBody();

      msgSend.setFromAddress(currentWallet.address!);
      msgSend.setToAddress(toAddress);

      decCoin.setDenom(currentChain.denom);
      decCoin.setAmount(times(amount, recoveryDecimal));

      msgSend.setAmountList([decCoin]);

      any.setValue(msgSend.serializeBinary());
      any.setTypeUrl('/cosmos.bank.v1beta1.MsgSend');

      txBody.setMessagesList([any]);
      txBody.setMemo(memo || '');

      return txBody;
    },

    getAuthInfo: (msgFee: string, msgGas: string, publicKey: Uint8Array, sequence?: string | number) => {
      const mode = SignMode.SIGN_MODE_LEGACY_AMINO_JSON;

      const single = new ModeInfo.Single();
      single.setMode(mode);

      const modeInfo = new ModeInfo();
      modeInfo.setSingle(single);

      const pubKey = new PubKey();
      pubKey.setKey(publicKey);

      const any = new Any();
      any.setTypeUrl('/cosmos.crypto.secp256k1.PubKey');
      any.setValue(pubKey.serializeBinary());

      const signerInfo = new SignerInfo();
      signerInfo.setPublicKey(any);
      signerInfo.setModeInfo(modeInfo);
      signerInfo.setSequence(Number(sequence) || 0);

      const decCoin = new DecCoin();
      decCoin.setDenom(currentChain.denom);
      decCoin.setAmount(times(msgFee, recoveryDecimal));

      const fee = new Fee();
      fee.setAmountList([decCoin]);
      fee.setGasLimit(Number(msgGas));

      const authInfo = new AuthInfo();
      authInfo.setSignerInfosList([signerInfo]);
      authInfo.setFee(fee);

      return authInfo;
    },

    getTxRaw: (txBody: TxBody, authInfo: AuthInfo, signature: Uint8Array) => {
      const txRaw = new TxRaw();

      txRaw.setAuthInfoBytes(authInfo.serializeBinary());
      txRaw.setBodyBytes(txBody.serializeBinary());
      txRaw.setSignaturesList([signature]);

      return txRaw;
    },
    getDelegateTxBody: (validatorAddress: string, amount: string, memo?: string) => {
      const msgDelegate = new MsgDelegate();

      const decCoin = new DecCoin();
      const any = new Any();

      const txBody = new TxBody();

      msgDelegate.setDelegatorAddress(currentWallet.address!);
      msgDelegate.setValidatorAddress(validatorAddress);

      decCoin.setDenom(currentChain.denom);
      decCoin.setAmount(times(amount, recoveryDecimal));

      msgDelegate.setAmount(decCoin);

      any.setValue(msgDelegate.serializeBinary());
      any.setTypeUrl('/cosmos.staking.v1beta1.MsgDelegate');

      txBody.setMessagesList([any]);
      txBody.setMemo(memo || '');

      return txBody;
    },
    getRedelegateTxBody: (validatorSrcAddress: string, validatorDstAddress: string, amount: string, memo?: string) => {
      const msgBeginRedelegate = new MsgBeginRedelegate();

      const decCoin = new DecCoin();
      const any = new Any();

      const txBody = new TxBody();

      msgBeginRedelegate.setDelegatorAddress(currentWallet.address!);
      msgBeginRedelegate.setValidatorSrcAddress(validatorSrcAddress);
      msgBeginRedelegate.setValidatorDstAddress(validatorDstAddress);

      decCoin.setDenom(currentChain.denom);
      decCoin.setAmount(times(amount, recoveryDecimal));

      msgBeginRedelegate.setAmount(decCoin);

      any.setValue(msgBeginRedelegate.serializeBinary());
      any.setTypeUrl('/cosmos.staking.v1beta1.MsgBeginRedelegate');

      txBody.setMessagesList([any]);
      txBody.setMemo(memo || '');

      return txBody;
    },

    getUndelegateTxBody: (validatorAddress: string, amount: string, memo?: string) => {
      const msgUndelegate = new MsgUndelegate();

      const decCoin = new DecCoin();
      const any = new Any();

      const txBody = new TxBody();

      msgUndelegate.setDelegatorAddress(currentWallet.address!);
      msgUndelegate.setValidatorAddress(validatorAddress);

      decCoin.setDenom(currentChain.denom);
      decCoin.setAmount(times(amount, recoveryDecimal));

      msgUndelegate.setAmount(decCoin);

      any.setValue(msgUndelegate.serializeBinary());
      any.setTypeUrl('/cosmos.staking.v1beta1.MsgUndelegate');

      txBody.setMessagesList([any]);
      txBody.setMemo(memo || '');

      return txBody;
    },

    getModifyWithdrawAddressTxBody: (withdrawAddress: string, memo?: string) => {
      const msgSetWithdrawAddress = new MsgSetWithdrawAddress();

      const any = new Any();

      const txBody = new TxBody();

      msgSetWithdrawAddress.setDelegatorAddress(currentWallet.address!);
      msgSetWithdrawAddress.setWithdrawAddress(withdrawAddress);

      any.setValue(msgSetWithdrawAddress.serializeBinary());
      any.setTypeUrl('/cosmos.distribution.v1beta1.MsgSetWithdrawAddress');

      txBody.setMessagesList([any]);
      txBody.setMemo(memo || '');

      return txBody;
    },

    getWithdrawRewardTxBody: (data: { validatorAddress: string }[], memo?: string) => {
      const anys = data.map((datum) => {
        const msgWithdrawDelegatorReward = new MsgWithdrawDelegatorReward();
        msgWithdrawDelegatorReward.setDelegatorAddress(currentWallet.address!);
        msgWithdrawDelegatorReward.setValidatorAddress(datum.validatorAddress);

        const any = new Any();

        any.setValue(msgWithdrawDelegatorReward.serializeBinary());
        any.setTypeUrl('/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward');

        return any;
      });

      const txBody = new TxBody();

      txBody.setMessagesList(anys);
      txBody.setMemo(memo || '');

      return txBody;
    },

    getWithdrawValidatorCommissionTxBody: (validatorAddress: string, memo?: string) => {
      const msgWithdrawValidatorCommission = new MsgWithdrawValidatorCommission();

      const any = new Any();

      const txBody = new TxBody();

      msgWithdrawValidatorCommission.setValidatorAddress(validatorAddress);

      any.setValue(msgWithdrawValidatorCommission.serializeBinary());
      any.setTypeUrl('/cosmos.distribution.v1beta1.MsgWithdrawValidatorCommission');

      txBody.setMessagesList([any]);
      txBody.setMemo(memo || '');

      return txBody;
    },
  };
}
