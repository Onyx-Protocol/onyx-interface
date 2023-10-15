import { format as formatDate, formatDistanceToNowStrict, isDate } from 'date-fns';
import { enUS, tr } from 'date-fns/locale';
import i18next, { TFunctionKeys } from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import React from 'react';
import {
  Trans as I18NextTrans,
  TransProps as I18NextTransProps,
  initReactI18next,
  useTranslation as useI18NextTranslation,
} from 'react-i18next';

import EnLocales from './translations/en.json';
import TrLocales from './translations/tr.json';

export const I18N_LOCALSTORAGE_KEY = 'i18nextLng';

const init = () => {
  i18next
    .use(initReactI18next)
    .use(LanguageDetector)
    .init({
      detection: {
        order: ['localStorage'],
        lookupLocalStorage: I18N_LOCALSTORAGE_KEY,
      },
      resources: {
        en: {
          translation: EnLocales,
        },
        tr: {
          translation: TrLocales,
        },
      },
      // lng: 'en',
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false,
        format: (value, format, lng) => {
          const locales = { en: enUS, tr };

          if (isDate(value)) {
            const locale =
              lng && lng in locales ? locales[lng as keyof typeof locales] : locales.en;
            if (format === 'distanceToNow') {
              return formatDistanceToNowStrict(value, { locale });
            }

            return formatDate(value, format || 'dd MMM yyyy HH:mm a', { locale });
          }
          return value;
        },
      },
    });
  i18next.loadNamespaces('errors');
  return i18next;
};

interface TransProps extends Omit<I18NextTransProps<'t'>, 't' | 'i18nKey'> {
  i18nKey: string;
}

export const useTranslation = () => {
  const { t, i18n } = useI18NextTranslation();

  const Trans: React.FC<TransProps> = ({ children, ...otherProps }) => (
    <I18NextTrans t={t} {...otherProps}>
      {children}
    </I18NextTrans>
  );

  return {
    t,
    Trans,
    i18n,
  };
};

const i18NextInstance = init();

// Only use this function when you need to render a string from outside a
// component. Otherwise, use the t function or Trans component returned by the
// useTranslation hook.
export const t = (params: TFunctionKeys, values?: Record<string, unknown>) =>
  i18NextInstance.t(params, values);
