"use client"
import { MessageContext } from "@/contexts/message-context";
import { Alert, Snackbar } from "@mui/material";
import { useState } from "react";

export default function MessageWrapper({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [severity, setSeverity] = useState<"success" | "error" | "info" | "warning">("success");

    const showMessage = (
        message: string,
        severity: "success" | "error" | "info" | "warning"
    ) => {
        setSnackbarMessage(message);
        setSeverity(severity);
        setOpenSnackbar(true);
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <MessageContext.Provider value={{ showMessage }}>
            {children}
            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={severity}
                    sx={{ width: "100%" }}
                    variant="outlined"
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </MessageContext.Provider>
    );
}