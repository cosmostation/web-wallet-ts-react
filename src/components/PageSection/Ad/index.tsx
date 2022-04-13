import 'react-responsive-carousel/lib/styles/carousel.min.css';

import { Carousel } from 'react-responsive-carousel';

import styles from './index.module.scss';

export default function Ad() {
  return (
    <div className={styles.adContainer}>
      <Carousel
        showArrows={false}
        showStatus={false}
        showIndicators={false}
        autoPlay
        axis="vertical"
        infiniteLoop
        showThumbs={false}
        swipeable={false}
      >
        <div className={styles.aditem}>
          <div>Sponsored: </div>
          <div className={styles.crescentImage} />
          <div>
            Swap, Liquid Stake and Farm on{' '}
            <a href="https://crescent.network" target="_blank" rel="noreferrer">
              Crescent Network&apos;s Hybrid DEX now!
            </a>
          </div>
        </div>
        <div className={styles.aditem}>
          <div>Sponsored: </div>
          <div className={styles.koinlyImage} />
          <div>
            Tax deadline?{' '}
            <a
              href="https://koinly.io?utm_source=mintscan.io&utm_medium=mobile_banner"
              target="_blank"
              rel="noreferrer"
            >
              Sort your crypto taxes FAST with Koinly!
            </a>
          </div>
        </div>
        <div className={styles.aditem}>
          <div>
            $MNTL Airdrop is Live!{' '}
            <a href="https://airdrop.assetmantle.one/" target="_blank" rel="noreferrer">
              Check Your Eligibility
            </a>
          </div>
        </div>
        <div className={styles.aditem}>
          <div>Sponsored: </div>
          <div className={styles.cosmosImage} />
          <div>
            Bringing DeFi to Cosmos:{' '}
            <a
              href="https://cosmos.network/gravity-dex?utm_source=mintscan&utm_medium=cpc&utm_campaign=gravitydex_launch&utm_term=gravitydex&utm_content=paid_banner"
              target="_blank"
              rel="noreferrer"
            >
              Gravity DEX protocol
            </a>
          </div>
        </div>
        <div className={styles.aditem}>
          Sponsored: <div className={styles.defiImage} />{' '}
          <div>
            <a href="https://www.defistation.io/" target="_blank" rel="noreferrer">
              Defistation
            </a>{' '}
            - DeFi analytics & leaderboard for protocols on Binance Smart Chain
          </div>
        </div>
      </Carousel>
    </div>
  );
}
