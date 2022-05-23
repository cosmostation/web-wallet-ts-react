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
          <div className={styles.trustednodeImage} />
          <div>
            <a href="https://trustednode.io/" target="_blank" rel="noreferrer">
              Earn the rewards you deserve on the coins you love
            </a>
          </div>
        </div>
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
      </Carousel>
    </div>
  );
}
