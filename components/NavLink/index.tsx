import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { ReactNode } from 'react';
import styles from './NavLink.module.scss';

interface NavLinkProps {
  href: string;
  children: ReactNode;
  exact?: boolean;
  className?: string;
}

const NavLink = ({ href, children, exact = false, className = '' }: NavLinkProps) => {
  const router = useRouter();

  const isActive = exact ? router.pathname === href : router.pathname.startsWith(href);

  return (
    <Link href={href} className={`${styles.link} ${isActive ? styles.active : ''} ${className}`}>
      {children}
    </Link>
  );
};

export default NavLink;
