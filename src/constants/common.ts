export const DRAWER_WIDTH = '28.5rem';

export const MENU = {
  DELEGATE: 'delegate',
  WALLET: 'wallet',
  BROATCAST: 'broadcast',
} as const;

export type Menu = ValueOf<typeof MENU>;
