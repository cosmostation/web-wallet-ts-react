import { useTranslation } from 'react-i18next';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import Dialog from '~/components/Dialog';
import { useChainSWR } from '~/hooks/useChainSWR';
import { useCurrentChain } from '~/hooks/useCurrentChain';
import { divide, pow, times } from '~/utils/calculator';

import styles from './index.module.scss';

type DialogValidatorListProps = {
  title?: string;
  description?: string;
  open: boolean;
  onClose?: () => void;
  validatorAddress?: string; // 리스트 제외
  onClick?: (validatorAddress: string) => void;
};

export default function DialogValidatorList({
  title,
  description,
  open,
  onClose,
  onClick,
  validatorAddress,
}: DialogValidatorListProps) {
  const { data } = useChainSWR();
  const currentChain = useCurrentChain();
  const { t } = useTranslation();

  const { validValidators, validValidatorsTotalToken } = data;
  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="lg">
        <div className={styles.container}>
          {title && <div className={styles.title}>{title}</div>}
          {description && <div className={styles.description}>{description}</div>}

          <TableContainer component={Paper} sx={{ maxHeight: '44rem' }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell align="center" sx={{ fontSize: '1.4rem', backgroundColor: '#fafafa' }} width="40%">
                    {t('component.dialog.dialog_validator_list.validator')}
                  </TableCell>
                  <TableCell align="right" sx={{ fontSize: '1.4rem', backgroundColor: '#fafafa' }}>
                    {t('component.dialog.dialog_validator_list.voting_power')}
                  </TableCell>
                  <TableCell align="right" sx={{ fontSize: '1.4rem', backgroundColor: '#fafafa' }}>
                    {t('component.dialog.dialog_validator_list.validator_fee')}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {[...validValidators.filter((item) => item.operator_address !== validatorAddress)].map((item, idx) => (
                  <TableRow
                    // eslint-disable-next-line react/no-array-index-key
                    key={idx}
                    hover
                    sx={{
                      '&:nth-of-type(even)': {
                        backgroundColor: '#fafafa',
                      },
                      cursor: 'pointer',
                    }}
                    onClick={() => {
                      onClick?.(item.operator_address);
                      onClose?.();
                    }}
                  >
                    <TableCell align="left" sx={{ fontSize: '1.4rem' }}>
                      <div className={styles.validatorContainer}>
                        <div className={styles.validatorImgContainer}>
                          <img
                            src={`https://raw.githubusercontent.com/cosmostation/cosmostation_token_resource/master/moniker/${currentChain.validatorIconDirectory}/${item.operator_address}.png`}
                            alt=""
                            onError={(e) => {
                              e.currentTarget.src = 'https://www.mintscan.io/assets/defaults/no-image.png';
                            }}
                          />
                        </div>
                        <a
                          href={`https://www.mintscan.io/${currentChain.mintscanPath}/validators/${item.operator_address}`}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {item.description.moniker}
                        </a>
                      </div>
                    </TableCell>
                    <TableCell align="right" sx={{ fontSize: '1.4rem' }}>
                      {times(item.tokens, pow(10, -currentChain.decimal), 0)}
                      <br />({times(divide(item.tokens, validValidatorsTotalToken), '100', 2)}%)
                    </TableCell>
                    <TableCell align="right" sx={{ fontSize: '1.4rem' }}>
                      {times(item.commission.commission_rates.rate, '100', 2)}%
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </Dialog>
    </>
  );
}
