"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavLink({ href, text }) {
  const pathname = usePathname()
  const active = pathname === href;
    

  return (
      <Link href={href} className={`text-burntsienna-700 hover:text-gray-900 ${active ? 'font-bold' : ''}`}>
        {text}
      </Link>
  );
}
