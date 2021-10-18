import Dialog from '~/components/Dialog';
import { chainNames } from '~/constants/chain';
import { getSymbolURL } from '~/utils/urls';

import styles from './index.module.scss';

type DialogChainSelectProps = {
  open: boolean;
  onClose?: () => void;
};

export default function DialogChainSelect({ open, onClose }: DialogChainSelectProps) {
  return (
    <Dialog open={open} onClose={onClose} title="Select a Chain" maxWidth="lg">
      <div className={styles.container}>
        {chainNames.map((chain) => (
          <ChainButton key={chain} name={chain} imgURL={getSymbolURL(chain)} />
        ))}
      </div>
    </Dialog>
  );
}

type ChainButtonProps = {
  onClick?: () => void;
  name: string;
  imgURL: string;
};

function ChainButton({ name, imgURL, onClick }: ChainButtonProps) {
  return (
    <div className={styles.buttonContainer}>
      <button type="button" className={styles.button} onClick={onClick}>
        <div className={styles.imgContainer}>
          <img src={imgURL} alt={name} />
        </div>
        <div className={styles.text}>{name}</div>
      </button>
    </div>
  );
}
