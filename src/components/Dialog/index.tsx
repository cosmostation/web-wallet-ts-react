import CloseIcon from '@mui/icons-material/Close';
import type { DialogProps as BaseDialogProps } from '@mui/material';
import { Dialog as BaseDialog, IconButton } from '@mui/material';

import styles from './index.module.scss';

type DialogProps = Omit<BaseDialogProps, 'onClose'> & {
  title?: string;
  onClose?: () => void;
};

export default function Dialog({ title, children, onClose, ...props }: DialogProps) {
  return (
    <BaseDialog {...props} onClose={onClose}>
      {(title || onClose) && <DialogTitle onClose={onClose} title={title} />}
      {children}
    </BaseDialog>
  );
}

type DialogTitleProps = { onClose?: () => void; title?: string };

function DialogTitle({ title, onClose }: DialogTitleProps) {
  return (
    <div className={styles.titleContainer}>
      <div className={styles.title}>{title}</div>
      {onClose ? (
        <IconButton aria-label="close" onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </div>
  );
}
