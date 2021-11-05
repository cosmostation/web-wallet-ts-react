import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { detect } from 'detect-browser';
import MobileDetect from 'mobile-detect';
import { useSnackbar } from 'notistack';
import { useRecoilState } from 'recoil';

import type { chainPaths } from '~/constants/chain';
import { chainValues } from '~/constants/chain';
import { MENU } from '~/constants/common';
import { useCurrentPath } from '~/hooks/useCurrentPath';
import { chainState } from '~/stores/chain';
import type { WalletInfo } from '~/stores/wallet';
import { walletInfoState } from '~/stores/wallet';

type WrapperProps = {
  children: JSX.Element;
};

export default function Wrapper({ children }: WrapperProps) {
  const [recoilChain, setRecoilChain] = useRecoilState(chainState);
  const [walletInfo, setWalletInfo] = useRecoilState(walletInfoState);
  const { enqueueSnackbar } = useSnackbar();

  const history = useHistory();

  const { getPathWithDepth } = useCurrentPath();

  const { chain } = useParams<{ chain?: typeof chainPaths[number] }>();

  const sessionWallet = sessionStorage.getItem('wallet');

  useEffect(() => {
    if (chain) {
      setRecoilChain(chain);
    }
  }, [chain, setRecoilChain]);

  useEffect(() => {
    if (walletInfo.address) {
      const chainPath = chainValues.find((item) => walletInfo.address?.startsWith(item.wallet.prefix))?.path;

      if (!chainPath) return;

      if (getPathWithDepth(2)) {
        if (recoilChain === chainPath) return;

        history.replace(`/${chainPath}/${getPathWithDepth(2)}`);
        return;
      }

      if (getPathWithDepth(1) !== chainPath) {
        history.replace(`/${chainPath}/${MENU.WALLET}`);
        return;
      }

      if (!getPathWithDepth(2)) {
        history.replace(`/${chainPath}/${MENU.WALLET}`);
      }
    }

    if (walletInfo.address === null && getPathWithDepth(2)) {
      history.replace(`/${getPathWithDepth(1)}`);
    }
  }, [walletInfo, getPathWithDepth, recoilChain, history]);

  useEffect(() => {
    const md = new MobileDetect(window.navigator.userAgent);
    const browser = detect();

    if (md.mobile()) {
      history.replace(`/mobile`);
    }

    if (browser?.name !== 'chrome') {
      enqueueSnackbar('Supported only in Chrome Browser.', { variant: 'error', autoHideDuration: 10000 });
    }

    if (sessionWallet) {
      setWalletInfo(JSON.parse(sessionWallet) as WalletInfo);
    } else {
      setWalletInfo({ walletType: null, HDPath: null, address: null, keystationAccount: null });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!recoilChain) return null;

  return children;
}
