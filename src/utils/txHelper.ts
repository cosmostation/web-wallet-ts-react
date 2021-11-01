export function createSignedTx(tx: Record<string, unknown>, signature: unknown) {
  return { ...tx, signatures: [signature] };
}

type CreateSignatureParams = {
  signature: Uint8Array;
  publicKey: Uint8Array;
  accountNumber: string;
  sequence: string;
};
export function createSignature({ signature, publicKey, accountNumber, sequence }: CreateSignatureParams) {
  return {
    signature: Buffer.from(signature).toString('base64'),
    account_number: accountNumber,
    sequence,
    pub_key: {
      type: 'tendermint/PubKeySecp256k1',
      value: Buffer.from(publicKey).toString('base64'),
    },
  };
}

export function createBroadcastBody(signedTx: Record<string, unknown>) {
  return {
    tx: signedTx,
    mode: 'sync',
  };
}
