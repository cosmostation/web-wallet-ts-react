const baseURL = '/images/symbol';

export const chains = [
  { name: 'cosmos', path: 'cosmos', imgURL: `${baseURL}/cosmos.png` },
  { name: 'iris', path: 'iris', imgURL: `${baseURL}/iris.png` },
  { name: 'band', path: 'band', imgURL: `${baseURL}/band.png` },
  { name: 'akash', path: 'akash', imgURL: `${baseURL}/akash.png` },
  { name: 'certik', path: 'certik', imgURL: `${baseURL}/certik.png` },
  { name: 'sentinel', path: 'sentinel', imgURL: `${baseURL}/sentinel.png` },
  { name: 'persistence', path: 'persistence', imgURL: `${baseURL}/persistence.png` },
  { name: 'fetch.ai', path: 'fetch-ai', imgURL: `${baseURL}/fetch-ai.png` },
  { name: 'sifchain', path: 'sifchain', imgURL: `${baseURL}/sifchain.png` },
  { name: 'crypto.org', path: 'crypto-org', imgURL: `${baseURL}/crypto-org.png` },
  { name: 'kichain', path: 'kichain', imgURL: `${baseURL}/kichain.png` },
  { name: 'starname', path: 'starname', imgURL: `${baseURL}/starname.png` },
  { name: 'medibloc', path: 'medibloc', imgURL: `${baseURL}/medibloc.png` },
  { name: 'emoney', path: 'emoney', imgURL: `${baseURL}/emoney.png` },
  { name: 'rizon', path: 'rizon', imgURL: `${baseURL}/rizon.png` },
  { name: 'juno', path: 'juno', imgURL: `${baseURL}/juno.png` },
] as const;

export const chainNames = chains.map((chain) => chain.name);

export const chainPaths = chains.map((chain) => chain.path);
