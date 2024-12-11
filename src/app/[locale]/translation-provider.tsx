'use client';

import React, { PropsWithChildren } from 'react';
import { I18nextProvider } from 'react-i18next';
import { createInstance } from 'i18next';
import initTranslations from '@/configs/i18n';
import { Provider } from 'react-redux';
import { store } from '@/stores/store';

interface TranslationProviderProps {
    locale: string;
    namespaces: string[];
    resources: any;
}

const TranslationProvider = React.memo<PropsWithChildren<TranslationProviderProps>>(
    ({ children, locale, namespaces, resources }) => {
        const i18n = createInstance();

        initTranslations(locale, namespaces, i18n, resources);

        return (
            <Provider store={store}>
                <I18nextProvider i18n={i18n}>
                    {children}
                </I18nextProvider>
            </Provider>
        )
        
    },
);

export default TranslationProvider;