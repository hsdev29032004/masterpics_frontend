import React from 'react';
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
    )
}