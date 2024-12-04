"use client"
import { useTranslation } from "react-i18next";

export default function Helloworld(){
    const { t } = useTranslation();
    return(
        <>
            <b>{t('Helloworld')}</b>
        </>
    )
}