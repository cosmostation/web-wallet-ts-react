/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable camelcase */
/* eslint-disable max-classes-per-file */

type ValueOf<T> = T[keyof T];

declare class Keystation {
  constructor(client?: string, lcd?: string, path?: string);

  client: string;

  lcd: string;

  path: string;

  openWindow(type?: string, payload?: string, account?: string): { closed: boolean };
}

type PublicKey = {
  pk?: string;
  compressed_pk?: Uint8Array;
  return_code: number;
  error_message: string;
};

type GetVersion = {
  return_code: number;
  error_message: string;
  test_mode?: boolean;
  major?: number;
  minor?: number;
  patch?: number;
  device_locked?: boolean;
  target_id?: string;
};

type Sign = {
  return_code: number;
  error_message: string;
  signature?: Uint8Array;
};
declare module 'ledger-cosmos-js' {
  export default class CosmosApp {
    constructor(transport?: import('@ledgerhq/hw-transport').default, scrambleKey?: string);

    async publicKey(path: number[]): Promise<PublicKey>;

    async getVersion(): Promise<GetVersion>;

    async sign(path: number[], message: Uint8Array): Promise<Sign>;
  }
}
