import type { UseTranslationOptions } from 'react-i18next';
import { useTranslation as UseBaseTranslation } from 'react-i18next';

export function useTranslation(ns?: 'common' | 'component' | 'page', options?: UseTranslationOptions) {
  const translation = UseBaseTranslation(ns, options);

  return translation;
}
