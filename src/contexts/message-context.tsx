"use client"

import { createContext } from "react";
export const MessageContext = createContext({
    showMessage: (
        message: string,
        severity: "success" | "error" | "info" | "warning"
    ) => { },
})