"use client"
import { CssBaseline, Experimental_CssVarsProvider, experimental_extendTheme } from '@mui/material';


export const theme = experimental_extendTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 500,
            md: 800,
            lg: 1200,
            xl: 1500
        },
    },

    colorSchemes: {
        light: {
            palette: {
                text: {
                    primary: "#000",
                },
                background: {
                    default: "#eaeaea",
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
                ".MuiSvgIcon-root": {
                    cursor: "pointer"
                },
                "[data-mui-color-scheme='dark'] body": {
                    "&::-webkit-scrollbar": {
                        width: "8px",
                        // height: "8px",
                    },
                    "&::-webkit-scrollbar-track": {
                        background: "linear-gradient(to bottom, #242526 0%, #242526 60px, transparent 60px)",
                    },
                    "&::-webkit-scrollbar-thumb": {
                        backgroundColor: "#ddd",
                        borderRadius: "4px",
                    },
                    "& .bg-main": {
                        backgroundColor: "#181818"
                    },
                    "& .bg-second": {
                        backgroundColor: "#242526"
                    },
                    "& .hover": {
                        "&:hover": {
                            backgroundColor: "#3a3a3a",
                        },
                    },
                    "& .active": {
                        backgroundColor: "#3a3a3a",
                        // border: "2px solid"
                    },
                    "& .MuiChip-root": {
                        backgroundColor: "rgba(36, 37, 38, 0.4)",
                        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.5)"
                    },
                    "& .MuiSvgIcon-root": {
                        color: "#ddd"
                    }
                },
                "[data-mui-color-scheme='light'] body": {
                    "&::-webkit-scrollbar": {
                        width: "8px",
                        // height: "8px",
                    },
                    "&::-webkit-scrollbar-track": {
                        background: "linear-gradient(to bottom, #fff 0%, #fff 60px, transparent 60px)",
                    },
                    "&::-webkit-scrollbar-thumb": {
                        backgroundColor: "red",
                        borderRadius: "4px",
                    },
                    "& .bg-main": {
                        backgroundColor: "#eaeaea"
                    },
                    "& .bg-second": {
                        backgroundColor: "#ffffff"
                    },
                    "& .hover": {
                        "&:hover": {
                            backgroundColor: "#f1f1f1",
                        },
                    },
                    "& .active": {
                        backgroundColor: "#f1f1f1",
                    },
                    "& .MuiChip-root": {
                        backgroundColor: "#fff",
                        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)"
                    },
                    "& .post-action": {
                        "& .MuiSvgIcon-root": {
                            color: "#5d6673"
                        }
                    }
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

