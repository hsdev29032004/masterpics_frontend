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
                    default: "#ffffff",
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

