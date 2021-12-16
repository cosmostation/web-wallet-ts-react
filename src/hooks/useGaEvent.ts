import ReactGA from 'react-ga';

import { useCurrentChain } from '~/hooks/useCurrentChain';

export function useGaEvent() {
  const currentChain = useCurrentChain();

  const gaEvent = (
    action:
      | 'Send'
      | 'Delegate'
      | 'Redelegate'
      | 'Undelegate'
      | 'ModifyWithdrawAddress'
      | 'ClaimReward'
      | 'WithdrawCommission',
    label?: 'ledger' | 'keystation',
  ) => {
    ReactGA.event({ category: currentChain.name, action, label });
  };

  return gaEvent;
}
