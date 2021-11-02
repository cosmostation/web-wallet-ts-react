import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { useChainSWR } from '~/hooks/useChainSWR';
import { useCurrentChain } from '~/hooks/useCurrentChain';
import { pow, times } from '~/utils/calculator';

import styles from './index.module.scss';

type MyUndelegationProps = {
  className?: string;
};

export default function MyUndelegation({ className }: MyUndelegationProps) {
  const { swr } = useChainSWR();
  const currentChain = useCurrentChain();

  const undelegation = swr.unbondingDelegation.data;
  const validator = swr.validator.data;

  if (!undelegation?.result?.length || !validator?.validators) {
    return null;
  }

  return (
    <div className={className}>
      <div className={styles.title}>나의 위임해제내역</div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#fafafa' }}>
              <TableCell align="center" sx={{ fontSize: '1.4rem' }}>
                검증인
              </TableCell>
              <TableCell align="right" sx={{ fontSize: '1.4rem' }}>
                블록높이
              </TableCell>
              <TableCell align="right" sx={{ fontSize: '1.4rem' }}>
                위임 철회 중 수량
              </TableCell>
              <TableCell align="center" sx={{ fontSize: '1.4rem' }}>
                완료 시간
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {undelegation.result.map((item) => {
              const validatorInfo = validator.validators!.find(
                (validatorItem) => validatorItem.operator_address === item.validator_address,
              );

              return item.entries.map((entryItem, idx) => (
                <TableRow
                  // eslint-disable-next-line react/no-array-index-key
                  key={`${validatorInfo!.operator_address}_${idx}`}
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
                          src={`https://raw.githubusercontent.com/cosmostation/cosmostation_token_resource/master/moniker/${
                            currentChain.validatorIconDirectory
                          }/${validatorInfo!.operator_address}.png`}
                          alt=""
                          onError={(e) => {
                            e.currentTarget.src = 'https://www.mintscan.io/static/media/validator_none.f01f85a0.svg';
                          }}
                        />
                      </div>
                      <a
                        href={`https://www.mintscan.io/${currentChain.mintscanPath}/validators/${
                          validatorInfo!.operator_address
                        }`}
                        target="_blank"
                        rel="noreferrer"
                        className={styles.aElementStyle}
                      >
                        {validatorInfo!.description.moniker}
                      </a>
                    </div>
                  </TableCell>
                  <TableCell align="right" sx={{ fontSize: '1.4rem' }}>
                    <a
                      href={`https://www.mintscan.io/${currentChain.mintscanPath}/blocks/${entryItem.creation_height}`}
                      target="_blank"
                      rel="noreferrer"
                      className={styles.aElementStyle}
                    >
                      {entryItem.creation_height}
                    </a>
                  </TableCell>
                  <TableCell align="right" sx={{ fontSize: '1.4rem' }}>
                    {times(entryItem.balance, pow(10, -currentChain.decimal), currentChain.decimal)}
                  </TableCell>
                  <TableCell align="center" sx={{ fontSize: '1.4rem' }}>
                    {new Date(entryItem.completion_time).toLocaleString()}
                  </TableCell>
                </TableRow>
              ));
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
