import AdminSidebar from "@/app/admin/(main)/components/AdminSidebar";
import {ThemeProvider} from "@/context/ThemeContext";
import React from "react";
import ContentPage from "@/app/admin/(main)/content";

export default function AdminLayout({children}: Readonly<{ children: React.ReactNode }>) {
    return (
        <main>
            <ThemeProvider>
                <AdminLayoutContent>{children}</AdminLayoutContent>
            </ThemeProvider>
        </main>
    );
}

function AdminLayoutContent({children}: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen xl:flex">
            {/* Sidebar */}
            <AdminSidebar/>
            {/* Main Content Area */}
            <ContentPage>
                { children }
            </ContentPage>
        </div>
    );
}
