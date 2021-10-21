import type { ReactNode } from 'react';
import { Box } from '@mui/material';

import DialogChainSelect from '~/components/Dialog/DialogChainSelect';
import DialogWalletConnect from '~/components/Dialog/DialogWalletConnect';
import Header from '~/components/Header';
import Wrapper from '~/components/Wrapper';
import { DRAWER_WIDTH } from '~/constants/common';

type LayoutProps = {
  children?: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div>
      <Wrapper>
        <>
          <Header />
          <Box
            component="div"
            sx={{ height: 'calc(100vh - 6.1rem)', paddingTop: '6.1rem', paddingLeft: { lg: DRAWER_WIDTH } }}
          >
            {children}
          </Box>
          <DialogWalletConnect />
          <DialogChainSelect />
        </>
      </Wrapper>
    </div>
  );
}
