import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  const { swr, data } = useChainSWR();
  const currentChain = useCurrentChain();

  const undelegation = swr.unbondingDelegation.data;

  const { validators } = data;

  if (!undelegation?.result?.length || !validators.length) {
    return null;
  }

  return (
    <div className={className}>
      <div className={styles.title}>{t('component.page_section.my_undelegation.my_undelegation')}</div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#fafafa' }}>
              <TableCell align="center" sx={{ fontSize: '1.4rem' }}>
                {t('component.page_section.my_undelegation.validator')}
              </TableCell>
              <TableCell align="right" sx={{ fontSize: '1.4rem' }}>
                {t('component.page_section.my_undelegation.block_height')}
              </TableCell>
              <TableCell align="right" sx={{ fontSize: '1.4rem' }}>
                {t('component.page_section.my_undelegation.undelegating_amount')}
              </TableCell>
              <TableCell align="center" sx={{ fontSize: '1.4rem' }}>
                {t('component.page_section.my_undelegation.undelegation_complete_time')}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {undelegation.result.map((item) => {
              const validatorInfo = validators.find(
                (validatorItem) => validatorItem.operator_address === item.validator_address,
              );

              if (!validatorInfo) {
                return null;
              }

              return item.entries.map((entryItem, idx) => (
                <TableRow
                  // eslint-disable-next-line react/no-array-index-key
                  key={`${validatorInfo.operator_address}_${idx}`}
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
                          src={`https://raw.githubusercontent.com/cosmostation/cosmostation_token_resource/master/moniker/${currentChain.validatorIconDirectory}/${validatorInfo.operator_address}.png`}
                          alt=""
                          onError={(e) => {
                            e.currentTarget.src = 'https://www.mintscan.io/static/media/validator_none.f01f85a0.svg';
                          }}
                        />
                      </div>
                      <a
                        href={`https://www.mintscan.io/${currentChain.mintscanPath}/validators/${validatorInfo.operator_address}`}
                        target="_blank"
                        rel="noreferrer"
                        className={styles.aElementStyle}
                      >
                        {validatorInfo.description.moniker}
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
