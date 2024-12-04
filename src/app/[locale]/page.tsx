'use client';
import { useTranslation } from 'react-i18next';
import { usePathname, useRouter } from 'next/navigation';
import i18nConfig from '@/app/i18nConfig';
import { Button, Switch, useColorScheme } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';

export default function Home() {
    const { t, i18n } = useTranslation();
    const currentLocale = i18n.language;
    const router = useRouter();
    const currentPathname = usePathname();

    const { colorScheme, setColorScheme } = useColorScheme()
    const [mounted, setMounted] = useState(false)

    const handleChange = useCallback(
        (newLocale: string) => () => {
            const days = 30;
            const date = new Date();
            date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
            const expires = '; expires=' + date.toUTCString();
            document.cookie = `NEXT_LOCALE=${newLocale};expires=${expires};path=/`;

            if (currentLocale === i18nConfig.defaultLocale) {
                router.push('/' + newLocale + currentPathname);
            } else {
                router.push(currentPathname.replace(`/${currentLocale}`, `/${newLocale}`));
            }

            router.refresh();
        },
        [currentLocale, currentPathname, router],
    );

    useEffect(() => {
        setMounted(true);
    }, [])


    if (!mounted) {
        return null;
    }

    return (
        <main className="flex min-h-screen flex-col items-center gap-10 p-24">
            <span className="text-balance font-bold">{t('Home')}</span>
            <div className="flex flex-row gap-4">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handleChange('en')}
                >
                    English
                </button>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handleChange('vi')}
                >
                    Vietnamese
                </button>
            </div>

            <Button
                onClick={() => setColorScheme(colorScheme === "light" ? "dark" : "light")}
            >
                {colorScheme == "light" ? t("Light") : t("Dark")}
            </Button>
        </main>
    );
}
