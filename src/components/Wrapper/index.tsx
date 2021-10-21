import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';

import type { chainPaths } from '~/constants/chain';
import { chainState } from '~/stores/chain';
import type { WalletInfo } from '~/stores/wallet';
import { walletInfoState } from '~/stores/wallet';

type WrapperProps = {
  children: JSX.Element;
};

export default function Chained({ children }: WrapperProps) {
  const [recoilChain, setRecoilChain] = useRecoilState(chainState);
  const setWalletInfo = useSetRecoilState(walletInfoState);

  const { chain } = useParams<{ chain?: typeof chainPaths[number] }>();

  const sessionWallet = sessionStorage.getItem('wallet');

  useEffect(() => {
    if (chain) {
      setRecoilChain(chain);
    }
  }, [chain, setRecoilChain]);

  useEffect(() => {
    if (sessionWallet) {
      setWalletInfo(JSON.parse(sessionWallet) as WalletInfo);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!recoilChain) return null;

  return children;
}
