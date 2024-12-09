"use client"
import { CssBaseline, Experimental_CssVarsProvider, experimental_extendTheme } from '@mui/material';


const theme = experimental_extendTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 576,
            md: 968,
            lg: 1200,
            xl: 1536
        },
    },

    colorSchemes: {
        light: {
            palette: {
                text: {
                    primary: "#000",
                },
                background: {
                    default: "#f0f2f5",
                },
            },
        },
        dark: {
            palette: {
                text: {
                    primary: "#fff",
                },
                background: {
                    default: "#181818",
                },
            },
        },
    },

    components: {
        MuiCssBaseline: {
            styleOverrides: {
                "*": {
                    boxSizing: "border-box",
                },
                "[data-mui-color-scheme='dark'] body": {
                    "& .MuiChip-root": {
                        backgroundColor: "rgba(36, 37, 38, 0.4)",
                        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.5)"
                    },
                },
                "[data-mui-color-scheme='light'] body": {
                    "& .MuiChip-root": {
                        backgroundColor: "#fff",
                        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)"
                    },
                },
            },
        },
    },

    typography: {
        fontFamily: "Quicksand, sans-serif",
    },
})

export default function ThemeProvider({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <Experimental_CssVarsProvider theme={theme} defaultMode="system">
            <CssBaseline />
            {children}
        </Experimental_CssVarsProvider>
    );
}

