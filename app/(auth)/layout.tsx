import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';
import { ClerkProvider } from '@clerk/nextjs';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Threads',
    description: 'A Next.js 14 Meta Threads Application',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body className={`${inter.className} bg-black`}>
                    {children}
                </body>
            </html>
        </ClerkProvider>
    );
}
