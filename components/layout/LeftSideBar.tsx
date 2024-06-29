'use client';

import { sideBarLinks } from '@/constants';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import logout from '../../assets/logout.svg';
import { SignOutButton, SignedIn, SignedOut } from '@clerk/nextjs';
import { HomeIcon } from '@/lib/svg';

const LeftSideBar = () => {
    // const route = useRouter();
    const pathname = usePathname();

    return (
        <section className="hidden flex-col items-center justify-between py-4 sm:flex">
            <div></div>
            <div className="flex w-full flex-col gap-2 px-3">
                {sideBarLinks.map((v, i) => {
                    const isActive = pathname === v.route;
                    if (i != 2)
                        return (
                            <Link
                                key={i}
                                href={v.route}
                                className={`rounded-md p-3 ${isActive ? 'bg-white/25' : ''}`}
                            >
                                <Image
                                    src={v.icon}
                                    alt={v.label}
                                    width={24}
                                    height={24}
                                />
                            </Link>
                        );
                })}
            </div>

            <SignedIn>
                <SignOutButton redirectUrl="/sign-in">
                    <div className="flex cursor-pointer">
                        <Image
                            src={logout}
                            alt="logout"
                            width={20}
                            height={20}
                        />
                    </div>
                </SignOutButton>
            </SignedIn>

            <SignedOut>
                <div></div>
            </SignedOut>
        </section>
    );
};

export default LeftSideBar;
