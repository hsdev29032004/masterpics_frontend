import Header from '@/components/layout/client/Header';
import React from 'react';

export default async function Layout({ children, params: { locale } }: any) {
    return (
        <>
            <Header />
            {children}
        </>
    );
}