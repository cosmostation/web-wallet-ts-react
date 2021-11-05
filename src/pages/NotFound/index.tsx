import styles from './index.module.scss';

export default function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.title}>404</div>
      <div className={styles.description}>Not Found</div>
    </div>
  );
}
