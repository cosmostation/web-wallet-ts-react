import { useLocation } from 'react-router-dom';

export function useCurrentPath() {
  const location = useLocation();

  const { pathname } = location;

  return {
    toString: () => pathname,
    getPathWithDepth: (depth: number) => {
      const splitedPath = pathname.split('/');

      return splitedPath[depth] || '';
    },
  };
}
