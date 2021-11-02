import { useState } from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import Button from '~/components/Button';
import Delegation from '~/components/Dialog/Delegation';
import { useChainSWR } from '~/hooks/useChainSWR';
import { useCurrentChain } from '~/hooks/useCurrentChain';
import { divide, pow, times } from '~/utils/calculator';

import styles from './index.module.scss';

type AvailableValidatorProps = {
  className?: string;
};

export default function AvailableValidator({ className }: AvailableValidatorProps) {
  const { data } = useChainSWR();
  const currentChain = useCurrentChain();

  const [delegation, setDelegation] = useState({ open: false, validatorAddress: '' });

  const { validValidators, validValidatorsTotalToken, myValidators } = data;

  if (!validValidators.length) {
    return null;
  }

  return (
    <div className={className}>
      <div className={styles.title}>위임 가능한 검증인</div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#fafafa' }}>
              <TableCell align="center" sx={{ fontSize: '1.4rem' }} width="40%">
                검증인
              </TableCell>
              <TableCell align="right" sx={{ fontSize: '1.4rem' }}>
                총 위임량
              </TableCell>
              <TableCell align="right" sx={{ fontSize: '1.4rem' }}>
                검증인 수수료
              </TableCell>
              <TableCell align="center" sx={{ fontSize: '1.4rem' }}>
                상태
              </TableCell>
              <TableCell align="center" sx={{ fontSize: '1.4rem' }}>
                위임
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
                          e.currentTarget.src = 'https://www.mintscan.io/static/media/validator_none.f01f85a0.svg';
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
                      setDelegation({ open: true, validatorAddress: item.operator_address });
                    }}
                  >
                    위임
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Delegation
        open={delegation.open}
        inputData={{ type: 'delegate', validatorAddress: delegation.validatorAddress }}
        onClose={() => setDelegation((prev) => ({ ...prev, open: false }))}
      />
    </div>
  );
}
