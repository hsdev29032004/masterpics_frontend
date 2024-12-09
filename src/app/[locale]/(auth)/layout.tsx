import React from 'react';
import "./auth.css";
import CheckLoginAuth from '@/libs/CheckLoginAuth.Wrapper';

export default async function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <CheckLoginAuth>
            {children}
        </CheckLoginAuth>
    );
}