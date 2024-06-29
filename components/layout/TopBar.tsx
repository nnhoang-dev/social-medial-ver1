import { OrganizationSwitcher } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import Image from 'next/image';
import Link from 'next/link';

import logo from '../../assets/threads-app-icon.svg';

function Topbar() {
    return (
        <nav className="topbar flex justify-between px-4 py-2">
            <Link href="/" className="flex items-center gap-4">
                <Image src={logo} alt="logo" width={50} height={50} />
                {/* <p className="text-heading3-bold text-light-1 max-xs:hidden">
                    Threads
                </p> */}
            </Link>

            <div className="flex items-center gap-1">
                <OrganizationSwitcher
                    appearance={{
                        baseTheme: dark,
                        elements: {
                            organizationSwitcherTrigger: 'py-2 px-4',
                        },
                    }}
                />
            </div>
        </nav>
    );
}

export default Topbar;
