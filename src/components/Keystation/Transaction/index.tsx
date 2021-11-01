/* eslint-disable camelcase */
import { useCallback, useEffect } from 'react';

type SuccessParams = {
  data: { txhash: string };
};

type TransactionProps = {
  onSuccess?: (params: SuccessParams) => void;
};

export default function Transaction({ onSuccess }: TransactionProps) {
  const messageHandler = useCallback(
    (e: MessageEvent) => {
      if (e.origin === 'https://keystation.cosmostation.io') {
        if (e.data) {
          if (e.data === 'deny') {
            return;
          }
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          onSuccess?.({ data: (e.data?.tx_response ? e.data?.tx_response : e.data) as { txhash: string } });
        }
      }
    },
    [onSuccess],
  );

  useEffect(() => {
    window.addEventListener('message', messageHandler);

    return () => {
      window.removeEventListener('message', messageHandler);
    };
  }, [messageHandler]);

  return <></>;
}
