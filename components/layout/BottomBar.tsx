'use client';

import { sideBarLinks } from '@/constants';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const BottomBar = () => {
    const pathname = usePathname();

    return (
        <section className="sm:hidden">
            <div className="flex w-full items-center justify-around gap-2 px-3 py-2">
                {sideBarLinks.map((v, i) => {
                    const isActive = pathname === v.route;
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
        </section>
    );
};

export default BottomBar;
