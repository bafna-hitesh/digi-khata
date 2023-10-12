'use client';

import Provider from '@digi/components';
import './global.scss';
import { Inter } from 'next/font/google';
// If loading a variable font, you don't need to specify the font weight
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

console.log('coming in >>>>', Provider);
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' className='dark'>
      <body className={inter.className}>
        <Provider isDarkMode>{children}</Provider>
      </body>
    </html>
  );
}
