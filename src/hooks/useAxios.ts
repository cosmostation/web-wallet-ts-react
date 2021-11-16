/* eslint-disable camelcase */
import axios from 'axios';

import { useCurrentChain } from '~/hooks/useCurrentChain';
import LcdURL from '~/utils/lcdURL';

async function post<T>(path: string, body?: Record<string, unknown>): Promise<T> {
  const { data } = await axios.post<T>(path, body);
  return data;
}

export function useAxios() {
  const currentChain = useCurrentChain();

  const lcdURL = LcdURL(currentChain.path);

  return {
    broadcastTx: (body?: Record<string, unknown>) => post<{ txhash: string }>(lcdURL.postTx(), body),
    broadcastProtoTx: (body?: Record<string, unknown>) =>
      post<{ tx_response: { txhash: string } }>(lcdURL.postProtoTx(), body),
  };
}
