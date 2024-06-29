import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import Topbar from '@/components/layout/TopBar';
import LeftSideBar from '@/components/layout/LeftSideBar';
import BottomBar from '@/components/layout/BottomBar';
import RightSideBar from '@/components/layout/RightSideBar';
import { dark } from '@clerk/themes';

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
        <ClerkProvider
            appearance={{
                baseTheme: dark,
            }}
        >
            <html lang="en">
                <body
                    className={`${inter.className} flex h-screen flex-col bg-black`}
                >
                    <Topbar />

                    <main className="flex h-full">
                        <LeftSideBar />
                        <section className="main-container w-full">
                            <div className="w-full max-w-4xl">{children}</div>
                        </section>
                        <RightSideBar />
                    </main>

                    <BottomBar />
                </body>
            </html>
        </ClerkProvider>
    );
}
