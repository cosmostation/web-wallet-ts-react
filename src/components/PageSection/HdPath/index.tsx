import cx from 'clsx';
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded';
import { IconButton, TextField } from '@mui/material';

import Button from '~/components/Button';

import styles from './index.module.scss';

type HdPathProps = {
  className?: string;
};

export default function HdPath({ className }: HdPathProps) {
  return (
    <div className={cx(styles.container, className)}>
      <div className={styles.titleContainer}>
        <div className={styles.title}>HD derivation path</div>
        <IconButton
          aria-label="help"
          sx={{
            color: '#5DCFDB',
          }}
        >
          <HelpOutlineRoundedIcon />
        </IconButton>
      </div>
      <div className={styles.inputContainer}>
        <TextField
          variant="outlined"
          sx={{
            width: '20rem',
            '& .MuiOutlinedInput-root': {
              height: '4rem',
            },
            '& .MuiOutlinedInput-root:hover': {
              '& > fieldset': {
                borderColor: 'black',
              },
            },
            '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'black',
            },
          }}
        />
        <Button fontSize="1.4rem" fontWeight="bold">
          적용
        </Button>
        <Button fontSize="1.4rem" fontWeight="bold">
          Path 초기화
        </Button>
      </div>
    </div>
  );
}
