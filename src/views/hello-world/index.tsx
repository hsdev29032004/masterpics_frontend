"use client"
import { useTranslation } from "react-i18next";

export default function Helloworld(){
    const { t } = useTranslation();
    return(
        <>
            <h1>{t('Helloworld')}</h1>
        </>
    )
}