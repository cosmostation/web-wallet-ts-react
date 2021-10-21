type ValueOf<T> = T[keyof T];

declare class Keystation {
  constructor(client?: string, lcd?: string, path?: string);

  client: string;

  lcd: string;

  path: string;

  openWindow(type?: string, payload?: string, account?: string): { closed: boolean };
}
