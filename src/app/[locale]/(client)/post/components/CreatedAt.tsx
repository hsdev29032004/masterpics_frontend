"use client"
import { useTranslation } from "react-i18next"

export default function CreatedAt({time}: {time: [number, string] | string}) {
    const { t } = useTranslation()    
    return (
        <p style={{fontSize: "13px"}}>
            {time[0]} {t(time[1])}
        </p>
    )
}