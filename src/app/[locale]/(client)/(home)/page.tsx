'use client';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootState } from '@/stores/store';

export default function Home() {
    const { t, i18n } = useTranslation();
    const user = useSelector((state: RootState) => state.user)

    return (
        <main className="flex min-h-screen flex-col items-center gap-10 p-24">
            <span className="text-balance font-bold">{t('Home')}</span>
            <br />
            {JSON.stringify(user)}
        </main>
    );
}
