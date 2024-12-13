"use client"

export type MessageContextType = {
    showMessage: (message: string, severity: "success" | "error" | "info" | "warning") => void;
}

import { createContext } from "react";
export const MessageContext = createContext<MessageContextType>({
    showMessage: () => {},
})