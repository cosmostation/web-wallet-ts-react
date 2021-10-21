const baseURL = '/images/symbol';

// chain info key
export const CHAIN = {
  COSMOS: 'cosmos',
  IRIS: 'iris',
  BAND: 'band',
  KAVA: 'kava',
  AKASH: 'akash',
  CERTIK: 'certik',
  SENTINEL: 'sentinel',
  PERSISTENCE: 'persistence',
  FETCH_AI: 'fetch-ai',
  SIFCHAIN: 'sifchain',
  CRYPTO_ORG: 'crypto-org',
  KICHAIN: 'kichain',
  STARNAME: 'starname',
  MEDIBLOC: 'medibloc',
  EMONEY: 'emoney',
  RIZON: 'rizon',
  JUNO: 'juno',
} as const;

// chain info key === path
export const chains = {
  [CHAIN.COSMOS]: {
    name: 'cosmos',
    path: CHAIN.COSMOS,
    imgURL: `${baseURL}/cosmos.png`,
    wallet: {
      hdPath: '44/118/0/0/0',
      prefix: 'cosmos',
    },
    lcdURL: 'https://lcd-cosmos.cosmostation.io',
    symbolName: 'ATOM',
    denomName: 'uatom',
    decimal: 0.000001,
    decimalLength: 6,
  },
  [CHAIN.IRIS]: {
    name: 'iris',
    path: CHAIN.IRIS,
    imgURL: `${baseURL}/iris.png`,
    wallet: {
      hdPath: '44/118/0/0/0',
      prefix: 'iaa',
    },
    lcdURL: 'https://lcd-iris.cosmostation.io',
    symbolName: 'IRIS',
    denomName: 'uiris',
    decimal: 0.000001,
    decimalLength: 6,
  },
  [CHAIN.KAVA]: {
    name: 'kava',
    path: CHAIN.KAVA,
    imgURL: `${baseURL}/kava.png`,
    hdPath: '44/118/0/0/0',
    wallet: {
      hdPath: '44/118/0/0/0',
      prefix: 'kava',
    },
    lcdURL: 'https://lcd-kava.cosmostation.io',
    symbolName: 'KAVA',
    denomName: 'ukava',
    decimal: 0.000001,
    decimalLength: 6,
  },
  [CHAIN.BAND]: {
    name: 'band',
    path: CHAIN.BAND,
    imgURL: `${baseURL}/band.png`,
    hdPath: '44/494/0/0/0',
    wallet: {
      hdPath: '44/494/0/0/0',
      prefix: 'band',
    },
    lcdURL: 'https://lcd-band.cosmostation.io',
    symbolName: 'BAND',
    denomName: 'uband',
    decimal: 0.000001,
    decimalLength: 6,
  },
  [CHAIN.AKASH]: {
    name: 'akash',
    path: CHAIN.AKASH,
    imgURL: `${baseURL}/akash.png`,
    wallet: {
      hdPath: '44/118/0/0/0',
      prefix: 'akash',
    },
    lcdURL: 'https://lcd-akash.cosmostation.io',
    symbolName: 'AKT',
    denomName: 'uakt',
    decimal: 0.000001,
    decimalLength: 6,
  },
  [CHAIN.CERTIK]: {
    name: 'certik',
    path: CHAIN.CERTIK,
    imgURL: `${baseURL}/certik.png`,
    wallet: {
      hdPath: '44/118/0/0/0',
      prefix: 'certik',
    },
    lcdURL: 'https://lcd-certik.cosmostation.io',
    symbolName: 'CTK',
    denomName: 'uctk',
    decimal: 0.000001,
    decimalLength: 6,
  },
  [CHAIN.SENTINEL]: {
    name: 'sentinel',
    path: CHAIN.SENTINEL,
    imgURL: `${baseURL}/sentinel.png`,
    wallet: {
      hdPath: '44/118/0/0/0',
      prefix: 'sent',
    },
    lcdURL: 'https://lcd-sentinel.cosmostation.io',
    symbolName: 'DVPN',
    denomName: 'udvpn',
    decimal: 0.000001,
    decimalLength: 6,
  },
  [CHAIN.PERSISTENCE]: {
    name: 'persistence',
    path: CHAIN.PERSISTENCE,
    imgURL: `${baseURL}/persistence.png`,
    wallet: {
      hdPath: '44/118/0/0/0',
      prefix: 'persistence',
    },
    lcdURL: 'https://lcd-persistence.cosmostation.io',
    symbolName: 'XPRT',
    denomName: 'uxprt',
    decimal: 0.000001,
    decimalLength: 6,
  },
  [CHAIN.FETCH_AI]: {
    name: 'fetch.ai',
    path: CHAIN.FETCH_AI,
    imgURL: `${baseURL}/fetch-ai.png`,
    wallet: {
      hdPath: '44/118/0/0/0',
      prefix: 'fetch',
    },
    lcdURL: 'https://lcd-fetchai.cosmostation.io',
    symbolName: 'FET',
    denomName: 'afet',
    decimal: 0.000000000000000001,
    decimalLength: 18,
  },
  [CHAIN.SIFCHAIN]: {
    name: 'sifchain',
    path: CHAIN.SIFCHAIN,
    imgURL: `${baseURL}/sifchain.png`,
    wallet: {
      hdPath: '44/118/0/0/0',
      prefix: 'sif',
    },
    lcdURL: 'https://lcd-sifchain.cosmostation.io',
    symbolName: 'ROWAN',
    denomName: 'rowan',
    decimal: 0.000000000000000001,
    decimalLength: 18,
  },
  [CHAIN.CRYPTO_ORG]: {
    name: 'crypto.org',
    path: CHAIN.CRYPTO_ORG,
    imgURL: `${baseURL}/crypto-org.png`,
    wallet: {
      hdPath: '44/394/0/0/0',
      prefix: 'cro',
    },
    lcdURL: 'https://lcd-cryptocom.cosmostation.io',
    symbolName: 'CRO',
    denomName: 'basecro',
    decimal: 0.00000001,
    decimalLength: 8,
  },
  [CHAIN.KICHAIN]: {
    name: 'kichain',
    path: CHAIN.KICHAIN,
    imgURL: `${baseURL}/kichain.png`,
    wallet: {
      hdPath: '44/118/0/0/0',
      prefix: 'ki',
    },
    lcdURL: 'https://lcd-kichain.cosmostation.io',
    symbolName: 'XKI',
    denomName: 'uxki',
    decimal: 0.000001,
    decimalLength: 6,
  },
  [CHAIN.STARNAME]: {
    name: 'starname',
    path: CHAIN.STARNAME,
    imgURL: `${baseURL}/starname.png`,
    wallet: {
      hdPath: '44/234/0/0/0',
      prefix: 'star',
    },
    lcdURL: 'https://lcd-iov.cosmostation.io',
    symbolName: 'IOV',
    denomName: 'uiov',
    decimal: 0.000001,
    decimalLength: 6,
  },
  [CHAIN.MEDIBLOC]: {
    name: 'medibloc',
    path: CHAIN.MEDIBLOC,
    imgURL: `${baseURL}/medibloc.png`,
    wallet: {
      hdPath: '44/118/0/0/0',
      prefix: 'panacea',
    },
    lcdURL: 'https://lcd-medibloc.cosmostation.io',
    symbolName: 'MED',
    denomName: 'umed',
    decimal: 0.000001,
    decimalLength: 6,
  },
  [CHAIN.EMONEY]: {
    name: 'emoney',
    path: CHAIN.EMONEY,
    imgURL: `${baseURL}/emoney.png`,
    wallet: {
      hdPath: '44/118/0/0/0',
      prefix: 'emoney',
    },
    lcdURL: 'https://lcd-emoney.cosmostation.io',
    symbolName: 'NGM',
    denomName: 'ungm',
    decimal: 0.000001,
    decimalLength: 6,
  },
  [CHAIN.RIZON]: {
    name: 'rizon',
    path: CHAIN.RIZON,
    imgURL: `${baseURL}/rizon.png`,
    wallet: {
      hdPath: '44/118/0/0/0',
      prefix: 'rizon',
    },
    lcdURL: 'https://lcd-rizon.cosmostation.io',
    symbolName: 'ATOLO',
    denomName: 'uatolo',
    decimal: 0.000001,
    decimalLength: 6,
  },
  [CHAIN.JUNO]: {
    name: 'juno',
    path: CHAIN.JUNO,
    imgURL: `${baseURL}/juno.png`,
    wallet: {
      hdPath: '44/118/0/0/0',
      prefix: 'juno',
    },
    lcdURL: 'https://lcd-juno.cosmostation.io',
    symbolName: 'JUNO',
    denomName: 'ujuno',
    decimal: 0.000001,
    decimalLength: 6,
  },
} as const;

export const chainNames = Object.values(chains).map((chain) => chain.name);

export const chainPaths = Object.values(CHAIN);

export type ChainPath = typeof chainPaths[number];

/**
 * 
 * 
COSMOS_LCD_URL = 'https://lcd-cosmos.cosmostation.io';
IRIS_LCD_URL = 'https://lcd-iris.cosmostation.io';
KAVA_LCD_URL = 'https://lcd-kava.cosmostation.io';
BAND_LCD_URL = 'https://lcd-band.cosmostation.io'; // 44
AKASH_LCD_URL = 'https://lcd-akash.cosmostation.io';
CERTIK_LCD_URL = 'https://lcd-certik.cosmostation.io'; // 42
PERSISTENCE_LCD_URL = 'https://lcd-persistence.cosmostation.io';
SENTINEL_LCD_URL = 'https://lcd-sentinel.cosmostation.io'; // 37 -> 42
FETCHAI_LCD_URL = 'https://lcd-fetchai.cosmostation.io'; // 38 -> 42
SIFCHAIN_LCD_URL = 'https://lcd-sifchain.cosmostation.io'; // 39 -> 42
CRYPTOORG_LCD_URL = 'https://lcd-cryptocom.cosmostation.io'; // 40
KICHAIN_LCD_URL = 'https://lcd-kichain.cosmostation.io'; // 38
STARNAME_LCD_URL = 'https://lcd-iov.cosmostation.io'; // 42
MEDIBLOC_LCD_URL = 'https://lcd-medibloc.cosmostation.io'; // 42
EMONEY_LCD_URL = 'https://lcd-emoney.cosmostation.io'; // 42
RIZON_LCD_URL = 'https://lcd-rizon.cosmostation.io'; // 42
JUNO_LCD_URL = 'https://lcd-juno.cosmostation.io'; // 44
BITCANNA_LCD_URL = 'https://lcd-bitcanna.cosmostation.io'; // 44
 */
