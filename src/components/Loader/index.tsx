import { useRecoilValue } from 'recoil';

import { loaderState } from '~/stores/loader';

import styles from './index.module.scss';

export default function Loader() {
  const isShow = useRecoilValue(loaderState);
  return <>{isShow && <div className={styles.container} />}</>;
}
