import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import Button from '~/components/Button';
import DialogDelegation from '~/components/Dialog/DialogDelegation';
import { useChainSWR } from '~/hooks/useChainSWR';
import { useCurrentChain } from '~/hooks/useCurrentChain';
import { divide, gt, pow, times } from '~/utils/calculator';

import styles from './index.module.scss';

type AvailableValidatorProps = {
  className?: string;
};

export default function AvailableValidator({ className }: AvailableValidatorProps) {
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();
  const { data } = useChainSWR();
  const currentChain = useCurrentChain();

  const [delegation, setDelegation] = useState({ open: false, validatorAddress: '' });

  const { validValidators, validValidatorsTotalToken, myValidators, availableAmount } = data;

  if (!validValidators.length) {
    return null;
  }

  return (
    <div className={className}>
      <div className={styles.title}>{t('component.page_section.available_validator.available_validator')}</div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#fafafa' }}>
              <TableCell align="center" sx={{ fontSize: '1.4rem' }} width="40%">
                {t('component.page_section.available_validator.validator')}
              </TableCell>
              <TableCell align="right" sx={{ fontSize: '1.4rem' }}>
                {t('component.page_section.available_validator.voting_power')}
              </TableCell>
              <TableCell align="right" sx={{ fontSize: '1.4rem' }}>
                {t('component.page_section.available_validator.validator_fee')}
              </TableCell>
              <TableCell align="center" sx={{ fontSize: '1.4rem' }}>
                {t('component.page_section.available_validator.status')}
              </TableCell>
              <TableCell align="center" sx={{ fontSize: '1.4rem' }}>
                {t('component.page_section.available_validator.noun_delegate')}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[
              ...validValidators.filter(
                (item) => item.description.moniker === 'Cosmostation' && !myValidators.includes(item.operator_address),
              ),
              ...validValidators.filter(
                (item) => item.description.moniker !== 'Cosmostation' && !myValidators.includes(item.operator_address),
              ),
            ].map((item, idx) => (
              <TableRow
                // eslint-disable-next-line react/no-array-index-key
                key={idx}
                sx={{
                  '&:nth-of-type(even)': {
                    backgroundColor: '#fafafa',
                  },
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
                <TableCell align="center" sx={{ fontSize: '1.4rem' }}>
                  <CheckCircleIcon sx={{ color: '#37CC6E', width: '2rem', height: '2rem' }} />
                </TableCell>
                <TableCell align="center" sx={{ fontSize: '1.4rem' }}>
                  <Button
                    onClick={() => {
                      if (gt(currentChain.fee.delegate, availableAmount)) {
                        enqueueSnackbar(t('component.page_section.available_validator.error_need_more_fee'), {
                          variant: 'error',
                        });
                        return;
                      }

                      setDelegation({ open: true, validatorAddress: item.operator_address });
                    }}
                  >
                    {t('component.page_section.available_validator.noun_delegate')}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <DialogDelegation
        open={delegation.open}
        inputData={{ type: 'delegate', validatorAddress: delegation.validatorAddress }}
        onClose={() => setDelegation((prev) => ({ ...prev, open: false }))}
      />
    </div>
  );
}
