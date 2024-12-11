import i18nConfig from '@/app/i18nConfig';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export const changeLocale = (currentLocale: string, currentPathname: string, router: AppRouterInstance) => {
    const newLocale = currentLocale === 'en' ? 'vi' : 'en';
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
}
