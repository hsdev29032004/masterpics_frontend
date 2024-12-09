import React from 'react';
import initTranslations from '@/configs/i18n';
import TranslationProvider from '@/app/[locale]/translation-provider';
import ThemeProvider from './theme-provider';

const i18nNamespaces = ['translation'];

export default async function Layout({ children, params: { locale } }: any) {
    const { resources } = await initTranslations(locale, i18nNamespaces);

    return (
        <>
            <TranslationProvider locale={locale} resources={resources} namespaces={i18nNamespaces}>
                <ThemeProvider>
                    {children}
                </ThemeProvider>
            </TranslationProvider>
        </>
    );
}