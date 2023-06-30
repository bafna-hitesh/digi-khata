// app/providers.tsx
'use client'

import {NextUIProvider} from '@nextui-org/react'
import './global.css';

const Providers = ({children}: { children: React.ReactNode }) => {
  return (
    <NextUIProvider>
        {children}
    </NextUIProvider>
  )
};

export default Providers;
