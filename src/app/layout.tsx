'use client'
import { Inter } from "next/font/google";
import "./globals.css";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [theme, setTheme] = useState('');

    useEffect(() => {
        // 从 localStorage 获取主题值
        const storedTheme = localStorage.getItem("theme") || 'light';
        if (storedTheme) {
            setTheme(storedTheme);
        }
    }, []);

    return (
        <html lang="en" data-theme={theme} id="rootHtml">
            <head>
                <title>MAOJI</title>
                <meta name="description" content="Mark your memos"></meta>
            </head>
            <body className={inter.className}>{children}</body>
        </html>
    );
}