/* eslint-disable no-console */
import { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Web3 from 'web3';
import type { Contract, ContractSendMethod } from 'web3-eth-contract';
import type { AbiItem } from 'web3-utils';
import { Interface } from '@ethersproject/abi';
import { forAddress } from '@truffle/decoder';

import DialogWalletConnect from '~/components/Dialog/DialogWalletConnect';
import Layout from '~/components/Layout';
import { useCurrentChain } from '~/hooks/useCurrentChain';

import { erc20 } from './erc20';
import { fetch } from './fetch';
import { item } from './item';

import styles from './index.module.scss';

type gravityBridgetContractMethods = {
  sendToCosmos: (erc20Address: string, gravityBridgeAddress: string, amount: string) => ContractSendMethod;
  deployERC20: (cosmosDenom: string, tokenName: string, symbol: string, decimal: number) => ContractSendMethod;
};

export type erc20ContractMethods = {
  balanceOf: (ethAddress: string) => ContractSendMethod;
  name: () => ContractSendMethod;
  decimals: () => ContractSendMethod;
  symbol: () => ContractSendMethod;
  approve: (spender: string, amount: string) => ContractSendMethod;
  transfer: (spender: string, amount: string) => ContractSendMethod;
  transferFrom: (from: string, to: string, amount: string) => ContractSendMethod;
};

export default function Home() {
  const [open, setOpen] = useState(false);

  const abiInterface = new Interface(erc20);

  const currentChain = useCurrentChain();

  const history = useHistory();

  const handleOnOpenConnect = () => setOpen(true);

  const handleOnSuccess = () => {
    history.push(`/${currentChain.path}/wallet`);
  };

  const web3 = useRef<Web3 | null>(null);

  const getERC20Balance = async (): Promise<unknown> => {
    const contract = new web3.current!.eth.Contract(erc20 as AbiItem[], '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2');
    return (contract.methods as erc20ContractMethods).balanceOf('0xe4a7e953486d01d4fdc76986a0c88fa4f87b30e5').call();
  };

  const approve = async (): Promise<Contract> => {
    const contract = new web3.current!.eth.Contract(erc20 as AbiItem[], '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2');
    const method = (contract.methods as erc20ContractMethods).approve(
      '0xE4A7e953486D01d4Fdc76986a0c88fa4F87B30e5',
      '1000000000000000',
    );
    return method.send({ from: '0xE4A7e953486D01d4Fdc76986a0c88fa4F87B30e5' });
  };

  const transfer = async (): Promise<Contract> => {
    const contract = new web3.current!.eth.Contract(erc20 as AbiItem[], '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2');
    const method = (contract.methods as erc20ContractMethods).transfer(
      '0xE4A7e953486D01d4Fdc76986a0c88fa4F87B30e5',
      '1000000000000000',
    );
    return method.send({ from: '0xE4A7e953486D01d4Fdc76986a0c88fa4F87B30e5' });
  };

  const transferFrom = async (): Promise<Contract> => {
    const contract = new web3.current!.eth.Contract(erc20 as AbiItem[], '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2');
    const method = (contract.methods as erc20ContractMethods).transferFrom(
      '0xE4A7e953486D01d4Fdc76986a0c88fa4F87B30e5',
      '0xE4A7e953486D01d4Fdc76986a0c88fa4F87B30e5',
      '1000000000000000',
    );
    return method.send({ from: '0xE4A7e953486D01d4Fdc76986a0c88fa4F87B30e5' });
  };

  const sendToCosmos = async (): Promise<Contract> => {
    const contract = new web3.current!.eth.Contract(item, '0xa4108aa1ec4967f8b52220a4f7e94a8201f2d906');
    const method = (contract.methods as gravityBridgetContractMethods).sendToCosmos(
      '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      'gravity1gr0e3pj3y6fqvzyfm0qxyw9h5dwfrvh8xur7qf',
      '1000000000000000',
    );
    return method.send({ from: '0xE4A7e953486D01d4Fdc76986a0c88fa4F87B30e5' });
  };

  useEffect(() => {
    // console.log('ethereum', window.keplr);
    // console.log('ethereum', window.cosmostation);
    setTimeout(() => {
      web3.current = new Web3(window.cosmostation.ethereum);
      // web3.current = new Web3(window.xfi.ethereum);
      // web3.current = new Web3(window.ethereum);
    }, 1000);
  }, []);

  return (
    <Layout>
      <>
        <button
          type="button"
          onClick={async () => {
            const contract = new web3.current!.eth.Contract(item, '0xa4108aa1ec4967f8b52220a4f7e94a8201f2d906');
            const method = (contract.methods as gravityBridgetContractMethods).sendToCosmos(
              '0x9575eB2a7804c43F68dC7998EB0f250832DF9f10',
              'gravity1lhhtz0qmf7zkgcmpa2mgkt7nf8njyluyr464zs',
              '1000000',
            );
            try {
              console.log(await method.send({ from: '0x9575eB2a7804c43F68dC7998EB0f250832DF9f10' }));
            } catch (e) {
              console.log(e);
            }
            // console.log(await web3.current?.eth.getBalance('0x9575eB2a7804c43F68dC7998EB0f250832DF9f10'));
          }}
        >
          dddd
        </button>
        <button
          type="button"
          onClick={async () => {
            console.log(await getERC20Balance());
          }}
        >
          getTokenBalance
        </button>

        <button
          type="button"
          onClick={async () => {
            console.log(await approve());
          }}
        >
          approve
        </button>
        <button
          type="button"
          onClick={async () => {
            console.log(await transfer());
          }}
        >
          transfer
        </button>
        <button
          type="button"
          onClick={async () => {
            console.log(await transferFrom());
          }}
        >
          transferFrom
        </button>
        <button
          type="button"
          onClick={async () => {
            console.log(await sendToCosmos());
          }}
        >
          sendToCosmos
        </button>

        <button
          type="button"
          onClick={() => {
            console.log(
              abiInterface.parseTransaction({
                data: '0x095ea7b3000000000000000000000000e4a7e953486d01d4fdc76986a0c88fa4f87b30e500000000000000000000000000000000000000000000000000038d7ea4c68000',
              }),
            );
          }}
        >
          abi parse
        </button>

        <button
          type="button"
          onClick={async () => {
            const { info: projectInfo } = fetch;
            const decoder = await forAddress('0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2', {
              provider: window.cosmostation.ethereum,
              projectInfo,
            });

            console.log('decoder', decoder);

            const decoding = await decoder.decodeTransaction({
              from: '0xe4a7e953486d01d4fdc76986a0c88fa4f87b30e5',
              to: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
              input:
                '0x095ea7b3000000000000000000000000e4a7e953486d01d4fdc76986a0c88fa4f87b30e500000000000000000000000000000000000000000000000000038d7ea4c68000',
              blockNumber: null,
            });

            console.log('decoding', decoding);
          }}
        >
          decoding
        </button>

        <button
          type="button"
          onClick={async () => {
            console.log(
              await web3.current!.eth.signTransaction({
                from: '0xE4A7e953486D01d4Fdc76986a0c88fa4F87B30e5',
                to: '0xDdDf66022c8307222DC8a118F4DE97e131C17936',
                value: '1000000000000000',
                gas: 21000,
                // maxFeePerGas: '300',
                // maxPriorityFeePerGas: '10',
                // nonce: 11,
              }),
            );
          }}
        >
          sendTransaction
        </button>

        <button
          type="button"
          onClick={async () => {
            console.log(
              await web3.current!.eth.sign(
                '12312312311231231231123123123112',
                '0xE4A7e953486D01d4Fdc76986a0c88fa4F87B30e5',
              ),
            );
          }}
        >
          sign
        </button>
        <div className={styles.container}>
          <div className={styles.mainImg} />
          <button type="button" onClick={handleOnOpenConnect} className={styles.connectButton}>
            Connect Wallet
          </button>
        </div>
        {open && <DialogWalletConnect open={open} onClose={() => setOpen(false)} onSuccess={handleOnSuccess} />}
      </>
    </Layout>
  );
}
