import React from 'react'
import Header from "@/app/(customer)/(main)/home/components/header";

export default function HomeLayout({children}: Readonly<{ children: React.ReactNode }>) {
    return (
        <main>
            <Header/>
            {children}
        </main>
    )
}
