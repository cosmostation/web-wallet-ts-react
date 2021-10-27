import { useTranslation } from 'react-i18next';

export function useCurrentLanguage() {
  const { i18n } = useTranslation();
  return i18n.language;
}
