/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useEffect, useRef, useState } from 'react';
import { ethers } from 'ethers';
import Web3 from 'web3';
import type { Contract, ContractSendMethod } from 'web3-eth-contract';
import { ethereum, InstallError } from '@cosmostation/extension-client';

import { erc20 } from './erc20';
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

export default function Ethereum() {
  const metamaskWeb3 = useRef<Web3 | null>(null);
  const cosmostationWeb3 = useRef<Web3 | null>(null);
  const cosmostationEthers = useRef<ethers.providers.Web3Provider | null>(null);

  const [metamaskResult, setMetamaskResult] = useState<unknown>();
  const [cosmostationResult, setCosmostationResult] = useState<unknown>();

  const [metamaskAccounts, setMetamaskAccounts] = useState<string[]>([]);
  const [cosmostationAccounts, setCosmostationAccounts] = useState<string[]>([]);

  const [metamaskChainId, setMetamaskChainId] = useState<string>();
  const [cosmostationChainId, setCosmostationChainId] = useState<string>();

  const approve = async (web3: React.MutableRefObject<Web3 | null>): Promise<Contract> => {
    const contract = new web3.current!.eth.Contract(erc20, '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2');
    const method = (contract.methods as erc20ContractMethods).approve(
      '0xa4108aA1Ec4967F8b52220a4f7e94A8201F2D906',
      '10000000000000',
    );
    const gas = await method.estimateGas({ from: '0xE4A7e953486D01d4Fdc76986a0c88fa4F87B30e5' });
    return method.send({ from: '0xE4A7e953486D01d4Fdc76986a0c88fa4F87B30e5', gas });
  };

  const transfer = async (web3: React.MutableRefObject<Web3 | null>): Promise<Contract> => {
    const contract = new web3.current!.eth.Contract(erc20, '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2');
    const method = (contract.methods as erc20ContractMethods).transfer(
      '0xDdDf66022c8307222DC8a118F4DE97e131C17936',
      '10000000000000',
    );
    const gas = await method.estimateGas({ from: '0xE4A7e953486D01d4Fdc76986a0c88fa4F87B30e5' });
    return method.send({ from: '0xE4A7e953486D01d4Fdc76986a0c88fa4F87B30e5', gas });
  };

  const sendToCosmos = async (web3: React.MutableRefObject<Web3 | null>): Promise<Contract> => {
    const contract = new web3.current!.eth.Contract(item, '0xa4108aa1ec4967f8b52220a4f7e94a8201f2d906');
    const method = (contract.methods as gravityBridgetContractMethods).sendToCosmos(
      '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      'gravity1gr0e3pj3y6fqvzyfm0qxyw9h5dwfrvh8xur7qf',
      '10000000000000',
    );
    const gas = await method.estimateGas({ from: '0xE4A7e953486D01d4Fdc76986a0c88fa4F87B30e5' });
    return method.send({ from: '0xE4A7e953486D01d4Fdc76986a0c88fa4F87B30e5', gas });
  };

  const send = async (web3: React.MutableRefObject<Web3 | null>) =>
    web3.current!.eth.sendTransaction({
      from: '0xE4A7e953486D01d4Fdc76986a0c88fa4F87B30e5',
      to: '0xDdDf66022c8307222DC8a118F4DE97e131C17936',
      value: '1000000000000000',
      gas: 21000,
      // maxFeePerGas: '300',
      // maxPriorityFeePerGas: '10',
      // nonce: 11,
    });

  const sendSignTransaction = async (web3: React.MutableRefObject<Web3 | null>) =>
    web3.current!.eth.signTransaction({
      from: '0xE4A7e953486D01d4Fdc76986a0c88fa4F87B30e5',
      to: '0xDdDf66022c8307222DC8a118F4DE97e131C17936',
      value: '1000000000000000',
      gas: 21000,
      // maxFeePerGas: '300',
      // maxPriorityFeePerGas: '10',
      // nonce: 11,
    });

  const requestAccounts = async (web3: React.MutableRefObject<Web3 | null>) => web3.current?.eth.requestAccounts();

  const requestAccountsEthers = async () => cosmostationEthers.current?.send('eth_requestAccounts', []);

  const sign = async (web3: React.MutableRefObject<Web3 | null>) => {
    const result = web3.current?.eth.sign(
      '0x3132333435363738393071776572747975696f706173646667686a6b6c7a7863',
      '0xE4A7e953486D01d4Fdc76986a0c88fa4F87B30e5',
    );

    return result;
  };

  const personalSign = async (web3: React.MutableRefObject<Web3 | null>) => {
    const result = web3.current?.eth.personal.sign('personal sign', '0xE4A7e953486D01d4Fdc76986a0c88fa4F87B30e5', '');

    return result;
  };

  const signTypedData = (web3: React.MutableRefObject<Web3 | null>) => {
    const msgParams = JSON.stringify({
      domain: {
        // Defining the chain aka Rinkeby testnet or Ethereum Main Net
        chainId: 1,
        // Give a user friendly name to the specific contract you are signing for.
        name: 'Ether Mail',
        // If name isn't enough add verifying contract to make sure you are establishing contracts with the proper entity
        verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
        // Just let's you know the latest version. Definitely make sure the field name is correct.
        version: '1',
      },

      // Defining the message signing data content.
      message: {
        /*
         - Anything you want. Just a JSON Blob that encodes the data you want to send
         - No required fields
         - This is DApp Specific
         - Be as explicit as possible when building out the message schema.
        */
        contents: 'Hello, Bob!',
        attachedMoneyInEth: 4.2,
        from: {
          name: 'Cow',
          wallets: ['0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826', '0xDeaDbeefdEAdbeefdEadbEEFdeadbeEFdEaDbeeF'],
        },
        to: [
          {
            name: 'Bob',
            wallets: [
              '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
              '0xB0BdaBea57B0BDABeA57b0bdABEA57b0BDabEa57',
              '0xB0B0b0b0b0b0B000000000000000000000000000',
            ],
          },
        ],
      },
      // Refers to the keys of the *types* object below.
      primaryType: 'Mail',
      types: {
        // TODO: Clarify if EIP712Domain refers to the domain the contract is hosted on
        EIP712Domain: [
          { name: 'name', type: 'string' },
          { name: 'version', type: 'string' },
          { name: 'chainId', type: 'uint256' },
          { name: 'verifyingContract', type: 'address' },
        ],
        // Not an EIP712Domain definition
        Group: [
          { name: 'name', type: 'string' },
          { name: 'members', type: 'Person[]' },
        ],
        // Refer to PrimaryType
        Mail: [
          { name: 'from', type: 'Person' },
          { name: 'to', type: 'Person[]' },
          { name: 'contents', type: 'string' },
        ],
        // Not an EIP712Domain definition
        Person: [
          { name: 'name', type: 'string' },
          { name: 'wallets', type: 'address[]' },
        ],
      },
    });

    const from = '0xE4A7e953486D01d4Fdc76986a0c88fa4F87B30e5';
    const params = [from, msgParams];
    const method = 'eth_signTypedData_v4';
    const result = (web3.current!.currentProvider as any).request({
      method,
      params,
    }) as Promise<string>;

    return result;
  };

  useEffect(() => {
    // console.log('ethereum', window.keplr);
    // console.log('ethereum', window.cosmostation);

    void (async () => {
      try {
        const provider = await ethereum();

        cosmostationWeb3.current = new Web3(provider);
        cosmostationEthers.current = new ethers.providers.Web3Provider(provider);

        provider.on('accountsChanged', (data) => setCosmostationAccounts(data as string[]));
        provider.on('chainChanged', (data) => setCosmostationChainId(data as string));
      } catch (e) {
        if (e instanceof InstallError) {
          console.log('not installed');
        }
      }
    })();
    setTimeout(() => {
      metamaskWeb3.current = new Web3(window.ethereum);
      // web3.current = new Web3(window.xfi.ethereum);
      // web3.current = new Web3(window.ethereum);

      window.ethereum.on('accountsChanged', (data) => setMetamaskAccounts(data as string[]));

      window.ethereum.on('chainChanged', (data) => setMetamaskChainId(data as string));
    }, 1000);
  }, []);
  return (
    <div className={styles.container}>
      <div style={{ border: '0.1rem solid yellow' }}>
        <div>Metamask</div>
        <div>
          <button
            type="button"
            onClick={async () => {
              setMetamaskResult(await requestAccounts(metamaskWeb3));
            }}
          >
            requestAccounts
          </button>
          <button
            type="button"
            onClick={async () => {
              setMetamaskResult(
                await window.ethereum.request({
                  method: 'wallet_addEthereumChain',
                  params: [
                    {
                      chainId: '0x38',
                      chainName: 'Smart Chain',
                      rpcUrls: ['https://bsc-dataseed.binance.org'],
                      iconUrls: ['https://www.coinreaders.com/imgdata/coinreaders_com/202107/2021072701234398.png'],
                      nativeCurrency: {
                        name: 'BNB',
                        symbol: 'BNB',
                        decimals: 18,
                      },
                      blockExplorerUrls: ['https://bscscan.com'],
                    },
                  ],
                }),
              );
            }}
          >
            add network (bsc)
          </button>
          <button
            type="button"
            onClick={async () => {
              setMetamaskResult(
                await window.ethereum.request({
                  method: 'wallet_switchEthereumChain',
                  params: [{ chainId: '0x38' }],
                }),
              );
            }}
          >
            switch network (bsc)
          </button>
          <button
            type="button"
            onClick={async () => {
              setMetamaskResult(
                await window.ethereum.request({
                  method: 'wallet_switchEthereumChain',
                  params: [{ chainId: '0x1' }],
                }),
              );
            }}
          >
            switch network (mainnet)
          </button>
          <button
            type="button"
            onClick={async () => {
              setMetamaskResult(await send(metamaskWeb3));
            }}
          >
            send
          </button>
          <button
            type="button"
            onClick={async () => {
              setMetamaskResult(await approve(metamaskWeb3));
            }}
          >
            approve
          </button>
          <button
            type="button"
            onClick={async () => {
              setMetamaskResult(await sendToCosmos(metamaskWeb3));
            }}
          >
            sendToCosmos
          </button>
          <button
            type="button"
            onClick={async () => {
              setMetamaskResult(await transfer(metamaskWeb3));
            }}
          >
            transfer
          </button>
          <button
            type="button"
            onClick={async () => {
              setMetamaskResult(await sign(metamaskWeb3));
            }}
          >
            sign
          </button>
          <button
            type="button"
            onClick={async () => {
              setMetamaskResult(await personalSign(metamaskWeb3));
            }}
          >
            personalSign
          </button>
          <button
            type="button"
            onClick={async () => {
              setMetamaskResult(await signTypedData(metamaskWeb3));
            }}
          >
            signTypedData
          </button>
        </div>
        <div style={{ wordBreak: 'break-all' }}>{JSON.stringify(metamaskResult)}</div>
        <div style={{ wordBreak: 'break-all' }}>{JSON.stringify(metamaskAccounts)}</div>
        <div style={{ wordBreak: 'break-all' }}>{JSON.stringify(metamaskChainId)}</div>
      </div>

      <div className={styles.marginTop10} style={{ border: '0.1rem solid red' }}>
        <div>Cosmostation</div>
        <div>
          <button
            type="button"
            onClick={async () => {
              setCosmostationResult(await requestAccountsEthers());
            }}
          >
            requestAccounts
          </button>
          <button
            type="button"
            onClick={async () => {
              setCosmostationResult(
                await window.cosmostation.ethereum.request({
                  method: 'wallet_addEthereumChain',
                  params: [
                    {
                      chainId: '0x38',
                      chainName: 'Smart Chain',
                      rpcUrls: ['https://bsc-dataseed.binance.org'],
                      iconUrls: ['https://www.coinreaders.com/imgdata/coinreaders_com/202107/2021072701234398.png'],
                      nativeCurrency: {
                        name: 'BNB',
                        symbol: 'BNB',
                        decimals: 18,
                      },
                      blockExplorerUrls: ['https://bscscan.com'],
                    },
                  ],
                }),
              );
            }}
          >
            add network (bsc)
          </button>
          <button
            type="button"
            onClick={async () => {
              setCosmostationResult(
                await window.cosmostation.ethereum.request({
                  method: 'wallet_switchEthereumChain',
                  params: [{ chainId: '0x38' }],
                }),
              );
            }}
          >
            switch network (bsc)
          </button>
          <button
            type="button"
            onClick={async () => {
              setCosmostationResult(
                await window.cosmostation.ethereum.request({
                  method: 'wallet_switchEthereumChain',
                  params: [{ chainId: '0x1' }],
                }),
              );
            }}
          >
            switch network (mainnet)
          </button>
          <button
            type="button"
            onClick={async () => {
              setCosmostationResult(await send(cosmostationWeb3));
            }}
          >
            send
          </button>
          <button
            type="button"
            onClick={async () => {
              setCosmostationResult(await approve(cosmostationWeb3));
            }}
          >
            approve
          </button>
          <button
            type="button"
            onClick={async () => {
              setCosmostationResult(await sendToCosmos(cosmostationWeb3));
            }}
          >
            sendToCosmos
          </button>
          <button
            type="button"
            onClick={async () => {
              setCosmostationResult(await transfer(cosmostationWeb3));
            }}
          >
            transfer
          </button>
          <button
            type="button"
            onClick={async () => {
              setCosmostationResult(await sign(cosmostationWeb3));
            }}
          >
            sign
          </button>
          <button
            type="button"
            onClick={async () => {
              setCosmostationResult(await personalSign(cosmostationWeb3));
            }}
          >
            personalSign
          </button>
          <button
            type="button"
            onClick={async () => {
              setCosmostationResult(await signTypedData(cosmostationWeb3));
            }}
          >
            signTypedData
          </button>
          <button
            type="button"
            onClick={async () => {
              setCosmostationResult(await sendSignTransaction(cosmostationWeb3));
            }}
          >
            signTransaction
          </button>
        </div>
        <div style={{ wordBreak: 'break-all' }}>{JSON.stringify(cosmostationResult)}</div>
        <div style={{ wordBreak: 'break-all' }}>{JSON.stringify(cosmostationAccounts)}</div>
        <div style={{ wordBreak: 'break-all' }}>{JSON.stringify(cosmostationChainId)}</div>
      </div>
    </div>
  );
}
