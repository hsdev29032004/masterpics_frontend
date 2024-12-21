import type { Metadata } from "next";
import "@/app/globals.css";
import i18nConfig from "./i18nConfig";
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';

export const metadata: Metadata = {
  title: "Master Pics",
  description: "Nơi hội tụ các kiệt tác!",
};

export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }))
}

export default function RootLayout({
  children,
  params: { locale }
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string }
}>) {
  return (
    <html lang={locale}>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300..700&display=swap" rel="stylesheet" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (typeof window !== "undefined") {
                window.history.scrollRestoration = "manual";
                window.scrollTo(0, 0);
              }
            `
          }}
        />
      </head>
      <body>
        <InitColorSchemeScript defaultMode="system" />
        {children}
      </body>
    </html>
  );
}
