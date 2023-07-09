// app/providers.tsx
'use client'

import {NextUIProvider} from '@nextui-org/system';
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";

import './global.css';
export interface ProvidersProps {
	children: React.ReactNode;
	themeProps?: ThemeProviderProps;
}

const Providers = ({ children, themeProps }:ProvidersProps) => {
  return (
    <NextUIProvider>
      <NextThemesProvider {...themeProps}>
        {children}
      </NextThemesProvider>
    </NextUIProvider>
  )
};

export default Providers;
