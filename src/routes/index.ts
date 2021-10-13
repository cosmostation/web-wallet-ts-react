import type { ComponentType } from 'react';

import Home from '~/pages/Home/Home';

interface IRountItem {
  name: string;
  path: string;
  component?: ComponentType;
}

const routes: IRountItem[] = [
  {
    name: 'index',
    path: '/',
    component: Home,
  },
];

export { routes };
