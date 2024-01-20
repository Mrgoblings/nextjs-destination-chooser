"use client";

import { useTheme } from 'next-themes';
import Link from 'next/link';
import Image from 'next/image'
import logoLight from '../../public/logo-light.png';
import logoDark from '../../public/logo-dark.png';

interface LogoProps {
    id: string;
}


const Logo: React.FC<LogoProps> = ({id}) => {
    const { theme, resolvedTheme } = useTheme();
    const currentTheme = theme ?? resolvedTheme; 
    return (
        <Link href="/">
            {currentTheme === 'dark' ? (
                <Image src={logoLight} alt="Nomad Networks" width={130} id={id} priority className="mx-5" />
            ) : (
                <Image src={logoDark} alt="Nomad Networks" width={130} id={id} priority className="mx-5" />
            )}
        </Link>
    );
};

export default Logo;
