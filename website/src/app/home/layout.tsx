import React from 'react'
import './home.css'

export default function HomePageLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div>
            <div>Navigation</div>
            <div>
                {children}
            </div>
        </div>
    )
}