import Header from '@/components/layout/client/Header';
import CheckLogin from '@/libs/CheckLogin.Wrapper';
import React from 'react';

export default async function Layout({ children, params: { locale } }: any) {
    return (
        <CheckLogin>
            <Header />
            {children}
        </CheckLogin>
    );
}