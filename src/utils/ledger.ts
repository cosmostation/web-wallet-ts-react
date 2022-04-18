import { bech32 } from 'bech32';
import crypto from 'crypto';
import CosmosApp from 'ledger-cosmos-js';
import Ripemd160 from 'ripemd160';
import sortKeys from 'sort-keys';
import TransportWebHID from '@ledgerhq/hw-transport-webhid';
import TransportWebUSB from '@ledgerhq/hw-transport-webusb';

export class LedgerError extends Error {
  public code?: number;

  constructor(code?: number, message?: string) {
    super(message);
    this.code = code;
  }
}

export default async function Ledger() {
  const transportInfo = await getTransport();

  if (!transportInfo) {
    throw new Error('check the connection of ledger');
  }

  const { transport } = transportInfo;

  const cosmosApp = new CosmosApp(transport);

  return {
    getPublicKey: async (path: number[]) => {
      const result = await cosmosApp.publicKey(path);

      if (result.return_code !== 0x9000) {
        throw new LedgerError(result.return_code, result.error_message);
      }

      return result.compressed_pk!;
    },
    getVersion: async () => {
      const result = await cosmosApp.getVersion();

      if (result.return_code !== 0x9000) {
        throw new LedgerError(result.return_code, result.error_message);
      }

      return {
        deviceLocked: result.device_locked!,
        major: result.major!,
        minor: result.minor!,
        patch: result.patch!,
        targetId: result.target_id!,
        testMode: result.test_mode!,
      };
    },
    sign: async (path: number[], message: Uint8Array): Promise<Uint8Array> => {
      const result = await cosmosApp.sign(path, message);

      if (result.return_code !== 0x9000) {
        throw new LedgerError(result.return_code, result.error_message);
      }

      return result.signature!;
    },
    close: async () => {
      await transport.close();
    },
    isLocked: async () => {
      const result = await cosmosApp.getVersion();

      if (result.return_code !== 0x9000) {
        throw new LedgerError(result.return_code, result.error_message);
      }

      return result.device_locked;
    },
  };
}

async function getTransport() {
  try {
    if (await TransportWebUSB.isSupported()) {
      const transport = await TransportWebUSB.create();
      return { transport, type: 'WebUSB' };
    }

    if (await TransportWebHID.isSupported()) {
      const transport = await TransportWebHID.create();
      return { transport, type: 'WebHID' };
    }
  } catch {
    return null;
  }
  return null;
}

export function getBech32FromPK(prefix: string, publicKey: Buffer) {
  if (publicKey.length !== 33) {
    throw new Error('expected compressed public key [31 bytes]');
  }
  const hashSha256 = crypto.createHash('sha256').update(publicKey).digest();
  const hashRip = new Ripemd160().update(hashSha256).digest();
  return bech32.encode(prefix, bech32.toWords(hashRip));
}

type Message = {
  fee: Record<string, unknown>;
  msg: Record<string, unknown>[];
  signatures: null;
  memo?: string;
};

type MsgForLedgerParams = {
  message: Message;
  chainId: string;
  accountNumber: string;
  sequence: string;
};

export function createMsgForLedger({ message, chainId, accountNumber, sequence }: MsgForLedgerParams) {
  return JSON.stringify(
    sortKeys(
      {
        chain_id: chainId,
        fee: message.fee,
        memo: message.memo || '',
        msgs: message.msg,
        sequence,
        account_number: accountNumber,
      },
      { deep: true },
    ),
  );
}

export function createMsg({ message, chainId, accountNumber, sequence }: MsgForLedgerParams) {
  return sortKeys(
    {
      chain_id: chainId,
      fee: message.fee,
      memo: message.memo || '',
      msgs: message.msg,
      sequence,
      account_number: accountNumber,
    },
    { deep: true },
  );
}
