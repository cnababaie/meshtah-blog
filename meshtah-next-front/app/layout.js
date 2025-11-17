import './globals.css';


import Link from 'next/link'
import localFont from 'next/font/local';

import Footer from '../components/Footer';
import NavLink from '../components/navLink';


const estedad = localFont({
  src: '../public/fonts/Estedad-Medium.ttf',
  variable: '--font-estedad',
});

export const metadata = {
  title: 'مشطاح',
  description: 'خانقاه شیخ پیشی',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fa" className={estedad.className}>
      <head>
        <link rel="icon" type="image/x-icon" href="/favicon.svg"></link>
      </head>
      <body>
        <div className="bg-silver min-h-[100dvh] grid grid-rows-[auto_1fr_auto] wholediv">
          <header className='bg-silver backdrop-blur-sm sticky top-0 z-50 shadow-md'>
          
            <nav className='max-w-4xl mx-auto flex items-center justify-between p-4'>
                <Link text="خانقاه" href="/" className='md:block'>
                  <h1 className='text-2xl font-bold text-nightblue right-symbol'>مشطاح</h1>
                </Link>
              <ul className="flex space-x-4">
                <li>
                  <NavLink text="واردات" href="/allposts"></NavLink>
                </li>
                <li>
                  <NavLink text="چیستی" href="/about"></NavLink>
                </li>
                <li>
                  <NavLink text="کیستی" href="/who"></NavLink>
                </li>
              </ul>
            </nav>
          </header>
          <main className="max-w-[100vw]">
            {children}
          </main>
          <Footer></Footer>
        </div>

      </body>
    </html>
  )
}
