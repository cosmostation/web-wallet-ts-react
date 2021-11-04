import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import type { chainPaths } from '~/constants/chain';
import { chainValues } from '~/constants/chain';
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
        history.replace(`/${chainPath}/wallet`);
        return;
      }
    }

    if (!walletInfo.address && getPathWithDepth(2)) {
      if (getPathWithDepth(1)) {
        history.replace(`/${getPathWithDepth(1)}`);
      } else {
        history.replace(`/cosmos`);
      }
    }
  }, [walletInfo, getPathWithDepth, recoilChain, history]);

  useEffect(() => {
    if (sessionWallet) {
      setWalletInfo(JSON.parse(sessionWallet) as WalletInfo);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!recoilChain) return null;

  return children;
}
