import { useEffect } from 'react';
import ReactGA from 'react-ga';
import { useLocation } from 'react-router-dom';

export function useGaTracker() {
  const location = useLocation();

  useEffect(() => {
    ReactGA.pageview(location.pathname);
  }, [location]);
}
