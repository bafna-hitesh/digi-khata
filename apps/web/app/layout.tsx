'use client';

import { Provider, StyledComponentsRegistry } from '@digi/components';
import './global.scss';
import './flex.scss';
import { Inter } from 'next/font/google';
// If loading a variable font, you don't need to specify the font weight
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang='en' className='dark'>
      <body className={inter.className}>
        <Provider isDarkMode>
          <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
        </Provider>
      </body>
    </html>
  );
}
