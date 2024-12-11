"use client"
import { useTranslation } from 'react-i18next';

export default function Home() {
    const { t, i18n } = useTranslation();

    return (
        <main className="flex min-h-screen flex-col items-center gap-10 p-24">
            <span className="text-balance font-bold">{t('Statistic')}</span>
            <br />
        </main>
    )
}
