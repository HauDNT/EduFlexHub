import type { Metadata } from "next";
import localFont from "next/font/local"
import ReduxProvider from "@/redux/ReduxProvider";
import "./globals.css";

const webFont = localFont({
    src: '../assets/fonts/Roboto/static/Roboto_SemiCondensed-Regular.ttf',
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
            </body>
        </html>
    );
}
