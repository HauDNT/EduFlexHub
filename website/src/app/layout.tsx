import type { Metadata } from "next";
import localFont from "next/font/local"
import { Toaster } from "@/components/ui/toaster"
import ReduxProvider from "@/redux/ReduxProvider";
import "./globals.css";

const webFont = localFont({
    src: '../assets/fonts/OpenSans/OpenSans-Regular.ttf',
    display: 'swap'
})

export const metadata: Metadata = {
    title: "EduFlexHub",
    description: "Nền tảng học tập trực tuyến",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={webFont.className}>
                <ReduxProvider>
                    {children}
                </ReduxProvider>
                <Toaster/>
            </body>
        </html>
    );
}
