interface Window {
  cosmostation: {
    ethereum: {
      sendAsync: () => null;
      request: (message: import('~/types/message').RequestMessage) => Promise<T>;
      on: (eventName: import('~/types/message').ListenerType, eventHandler: (event?: unknown) => void) => void;
    };
  };
  ethereum: {
    sendAsync: () => null;
    request: (message: import('~/types/message').RequestMessage) => Promise<T>;
    on: (eventName: import('~/types/message').ListenerType, eventHandler: (event?: unknown) => void) => void;
  };

  keplr: {
    sendAsync: () => null;
    request: (message: import('~/types/message').RequestMessage) => Promise<T>;
    on: (eventName: import('~/types/message').ListenerType, eventHandler: (event?: unknown) => void) => void;
  };
}
