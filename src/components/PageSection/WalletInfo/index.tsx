import { useEffect } from 'react';
import Big from 'big.js';
import cx from 'clsx';
import QRCode from 'qrcode.react';
import { useSetRecoilState } from 'recoil';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Divider, IconButton } from '@mui/material';

import Button from '~/components/Button';
import { useBalanceSWR, useChainPriceSWR, useDelegationsSWR, useUnbondingDelegationsSWR } from '~/hooks/useChainSWR';
import { useCurrentChain } from '~/hooks/useCurrentChain';
import { useCurrentLanguage } from '~/hooks/useCurrentLanguage';
import { useCurrentWallet } from '~/hooks/useCurrentWallet';
import { loaderState } from '~/stores/loader';
import { numberFormat } from '~/utils/format';

import styles from './index.module.scss';

type WalletInfoProps = {
  className?: string;
};

export default function WalletInfo({ className }: WalletInfoProps) {
  const setLoader = useSetRecoilState(loaderState);
  const currentChain = useCurrentChain();
  const currentWallet = useCurrentWallet();
  const currentLanguage = useCurrentLanguage();
  const balance = useBalanceSWR();
  const delegations = useDelegationsSWR();
  const unbondingDelegation = useUnbondingDelegationsSWR();
  const chainPrice = useChainPriceSWR();

  useEffect(() => {
    setLoader(true);

    if (
      (balance.data || balance.error) &&
      (delegations.data || delegations.error) &&
      (unbondingDelegation.data || unbondingDelegation.error) &&
      (chainPrice.data || chainPrice.error)
    ) {
      setLoader(false);
    }
  }, [balance, delegations, unbondingDelegation, chainPrice, setLoader]);

  const amount = new Big(balance.data?.balance?.find((item) => item.denom === currentChain.denom)?.amount || '0')
    .times(currentChain.decimal)
    .toFixed(currentChain.decimalLength);

  const price = (chainPrice.data?.[currentChain.coingeckoId] || { usd: 0, krw: 0 })[
    currentLanguage === 'ko' ? 'krw' : 'usd'
  ].toFixed(currentLanguage === 'ko' ? 0 : 4);

  const totalPrice = new Big(amount).times(price).toFixed(currentLanguage === 'ko' ? 0 : 4);

  const delegationAmount = new Big(
    delegations.data?.result
      ?.filter((item) => item.balance?.denom === currentChain.denom)
      ?.reduce((ac, cu) => ac + Number(cu.balance.amount), 0) || 0,
  )
    .times(currentChain.decimal)
    .toFixed(currentChain.decimalLength);

  return (
    <div className={cx(styles.container, className)}>
      <div className={styles.firstContentContainer}>
        <div className={styles.firstContentQRContainer}>
          {currentWallet.address && <QRCode value={currentWallet.address} size={70} />}
        </div>
        <div className={styles.firstContentInfoContainer}>
          <div className={styles.firstContentInfoFirstLineContainer}>
            {currentWallet.walletType && <div className={styles[currentWallet.walletType]} />}
            <div className={styles.firstContentInfoFirstLineTitle}>지갑 주소</div>
            <div className={styles.firstContentInfoFirstLineHdPath}>HD derivation path: {currentWallet.HDPath}</div>
          </div>
          <div className={styles.firstContentInfoSecondLineContainer}>
            {currentWallet.address}{' '}
            <IconButton size="small">
              <ContentCopyIcon sx={{ width: '2rem', height: '2rem' }} />
            </IconButton>
          </div>
          <div className={styles.firstContentInfoThirdLineContainer}>
            <Button fontWeight="bold" fontSize="1.4rem">
              지갑 상세정보
            </Button>
          </div>
        </div>
      </div>
      <Divider sx={{ margin: '2rem 0' }} />
      <div className={styles.secondContentContainer}>
        <div className={styles.secondContentTotalContainer}>
          <div className={styles.secondContentTotalSymbolContainer}>
            <img src={currentChain.imgURL} alt="" /> {currentChain.symbolName}
          </div>
          <div className={styles.secondContentTotalContentContainer}>
            <div className={styles.secondContentTotalContentBold}>
              Total(1{currentChain.symbolName} ≈ ₩{numberFormat(price)})
            </div>
            <div className={styles.secondContentCalContentContainer}>
              <div>
                {amount} {currentChain.symbolName}
              </div>
              <div>≈ ₩{numberFormat(totalPrice)}</div>
            </div>
          </div>
        </div>
        <Divider orientation="vertical" flexItem />
        <div className={styles.secondContentDelegateContainer}>
          <div className={styles.delegateInfoContainer}>
            <div>사용 가능 수량</div>
            <div>{amount}</div>
          </div>
          <div className={styles.delegateInfoContainer}>
            <div>위임한 수량</div>
            <div>{delegationAmount}</div>
          </div>
          <div className={styles.delegateInfoContainer}>
            <div>위임 철회 중 수량</div>
            <div>20.0000000</div>
          </div>
          <div className={styles.delegateInfoContainer}>
            <div>이자</div>
            <div>20.0000000</div>
          </div>
        </div>
      </div>
    </div>
  );
}
