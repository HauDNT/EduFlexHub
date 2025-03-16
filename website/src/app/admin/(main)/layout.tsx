import {ThemeProvider} from "@/context/ThemeContext";
import React from "react";
import ContentPage from "@/app/admin/(main)/content";
import AppSidebar from "@/layout/AppSidebar";
import {AdminSidebarItems} from "@/layout/AppSidebarItems";

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
            {/*<AppSidebar navItems={AdminSidebarItems}/>*/}
            {/* Main Content Area */}
            <ContentPage>
                { children }
            </ContentPage>
        </div>
    );
}
