"use client"
import formatTime from "@/helpers/formatTime"
import { useTranslation } from "react-i18next"

export default function CreatedAt({createdAt}: {createdAt: string}) {
    const { t } = useTranslation()
    const time = formatTime(createdAt)
    return (
        <p style={{fontSize: "13px"}}>
            {time[0]} {t(time[1])}
        </p>
    )
}