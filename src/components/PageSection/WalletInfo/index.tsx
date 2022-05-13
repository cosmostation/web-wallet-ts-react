import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import cx from 'clsx';
import copy from 'copy-to-clipboard';
import { useSnackbar } from 'notistack';
import QRCode from 'qrcode.react';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Divider, IconButton } from '@mui/material';

import Button from '~/components/Button';
import DialogWithdrawCommission from '~/components/Dialog/DialogWithdrawCommission';
import { validatorSet } from '~/constants/validator';
import { useChainSWR } from '~/hooks/useChainSWR';
import { useCurrentChain } from '~/hooks/useCurrentChain';
import { useCurrentWallet } from '~/hooks/useCurrentWallet';
import { numberFormat } from '~/utils/format';

import styles from './index.module.scss';

type WalletInfoProps = {
  className?: string;
};

export default function WalletInfo({ className }: WalletInfoProps) {
  const currentChain = useCurrentChain();
  const currentWallet = useCurrentWallet();
  const { enqueueSnackbar } = useSnackbar();

  const { i18n, t } = useTranslation();
  const { data } = useChainSWR();

  const [isOpenedCommission, setIsOpenedCommission] = useState(false);

  const {
    availableAmount,
    vestingNotDelegate,
    price,
    totalAmount,
    totalPrice,
    delegationAmount,
    unbondingAmount,
    rewardAmount,
  } = data;

  const isAddressOfValidator = validatorSet.map((item) => item.address).includes(currentWallet.address || '');

  return (
    <>
      <div className={cx(styles.container, className)}>
        <div className={styles.firstContentContainer}>
          <div className={styles.firstContentQRContainer}>
            {currentWallet.address && <QRCode value={currentWallet.address} size={70} />}
          </div>
          <div className={styles.firstContentInfoContainer}>
            <div className={styles.firstContentInfoFirstLineContainer}>
              {currentWallet.walletType && <div className={styles[currentWallet.walletType]} />}
              <div className={styles.firstContentInfoFirstLineTitle}>
                {t('component.page_section.wallet_info.address')}
              </div>
              {currentWallet.walletType !== 'cosmostation-extension' && (
                <div className={styles.firstContentInfoFirstLineHdPath}>HD derivation path: {currentWallet.HDPath}</div>
              )}
            </div>
            <div className={styles.firstContentInfoSecondLineContainer}>
              {currentWallet.address}{' '}
              <IconButton
                size="small"
                onClick={() => {
                  if (!currentWallet.address) {
                    enqueueSnackbar('copy failed', { variant: 'error' });
                    return;
                  }

                  const result = copy(currentWallet.address);

                  if (!result) {
                    enqueueSnackbar('copy failed', { variant: 'error' });
                  }
                  enqueueSnackbar(`'${currentWallet.address}' copied!`);
                }}
              >
                <ContentCopyIcon sx={{ width: '2rem', height: '2rem' }} />
              </IconButton>
            </div>
            <div className={styles.firstContentInfoThirdLineContainer}>
              <Button
                sx={{ fontWeight: 'bold', fontSize: '1.4rem' }}
                onClick={() => {
                  window.open(
                    `https://www.mintscan.io/${currentChain.mintscanPath}/account/${currentWallet.address || ''}`,
                    '_blank',
                  );
                }}
              >
                {t('component.page_section.wallet_info.address_detail')}
              </Button>

              {isAddressOfValidator && (
                <Button
                  sx={{ fontWeight: 'bold', fontSize: '1.4rem', marginLeft: '1rem' }}
                  onClick={() => setIsOpenedCommission(true)}
                >
                  {t('component.page_section.wallet_info.withdraw_commission')}
                </Button>
              )}
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
                Total(1{currentChain.symbolName} ≈ {i18n.language === 'ko' ? '₩' : '$'}
                {numberFormat(price)})
              </div>
              <div className={styles.secondContentCalContentContainer}>
                <div>
                  {totalAmount} {currentChain.symbolName}
                </div>
                <div>
                  ≈ {i18n.language === 'ko' ? '₩' : '$'}
                  {numberFormat(totalPrice)}
                </div>
              </div>
            </div>
          </div>
          <Divider orientation="vertical" flexItem />
          <div className={styles.secondContentDelegateContainer}>
            <div className={styles.delegateInfoContainer}>
              <div>{t('component.page_section.wallet_info.available_amount')}</div>
              <div>{availableAmount}</div>
            </div>
            <div className={styles.delegateInfoContainer}>
              <div>{t('component.page_section.wallet_info.delegate_amount')}</div>
              <div>{delegationAmount}</div>
            </div>
            <div className={styles.delegateInfoContainer}>
              <div>{t('component.page_section.wallet_info.undelegating_amount')}</div>
              <div>{unbondingAmount}</div>
            </div>
            <div className={styles.delegateInfoContainer}>
              <div>{t('component.page_section.wallet_info.reward_amount')}</div>
              <div>{rewardAmount}</div>
            </div>
            <div className={styles.delegateInfoContainer}>
              <div>{t('component.page_section.wallet_info.vesting_amount')}</div>
              <div>{vestingNotDelegate}</div>
            </div>
            <div className={styles.delegateInfoContainer} />
          </div>
        </div>
        {currentWallet.walletType === 'keystation' && (
          <div className={styles.keystationDescriptionContainer}>
            <div>
              <InfoOutlinedIcon sx={{ color: '#CD1A1A', width: '1.2rem', height: '1.2rem' }} />
            </div>
            <div className={styles.keystationTextContainer}>
              {i18n.language === 'ko' ? (
                <>
                  <span style={{ color: '#CD1A1A' }}>키스테이션 서비스</span>가 곧 종료됩니다. 코스모스테이션 웹 지갑을
                  사용하고 싶으신 분들은,
                  <br />
                  <a
                    href="https://chrome.google.com/webstore/detail/cosmostation/fpkhgmpbidmiogeglndfbkegfdlnajnf"
                    target="_blank"
                    rel="noreferrer"
                  >
                    이곳
                  </a>
                  을 클릭해서 코스모스테이션 월렛 익스텐션을 다운로드하세요.
                  <br /> 마이그레이션 가이드 정보는{' '}
                  <a href="https://github.com/cosmostation/keystation" target="_blank" rel="noreferrer">
                    여기
                  </a>
                  를 참고하세요.
                </>
              ) : (
                <>
                  <span style={{ color: '#CD1A1A' }}>Keystation</span> service will soon be terminated. If you wish to
                  use Cosmostation web wallet,
                  <br />
                  please click{' '}
                  <a
                    href="https://chrome.google.com/webstore/detail/cosmostation/fpkhgmpbidmiogeglndfbkegfdlnajnf"
                    target="_blank"
                    rel="noreferrer"
                  >
                    here
                  </a>{' '}
                  to download Cosmostation Wallet Extension.
                  <br />
                  Please refer to the migration guide{' '}
                  <a href="https://github.com/cosmostation/keystation" target="_blank" rel="noreferrer">
                    here
                  </a>
                  .
                </>
              )}
            </div>
          </div>
        )}
      </div>
      <DialogWithdrawCommission open={isOpenedCommission} onClose={() => setIsOpenedCommission(false)} />
    </>
  );
}
