/* eslint-disable jsx-a11y/control-has-associated-label */
import cx from 'clsx';

import styles from './index.module.scss';

export default function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.title}>COSMOSTATION</div>
      <div className={styles.description}>Please use the desktop or app wallet.</div>
      <div className={styles.buttonContainer}>
        <button
          type="button"
          className={cx(styles.button, styles.google)}
          onClick={() => {
            window.open('https://play.google.com/store/apps/details?id=wannabit.io.cosmostaion', '_blank');
          }}
        />
        <button
          type="button"
          className={cx(styles.button, styles.apple)}
          onClick={() => {
            window.open('https://apps.apple.com/app/cosmostation/id1459830339', '_blank');
          }}
        />
      </div>
    </div>
  );
}
