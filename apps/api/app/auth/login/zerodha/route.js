import { NextResponse } from 'next/server';
import { loginURLForZerodha } from '@digi/zerodha';

export async function GET () {
    const loginURL = loginURLForZerodha(process.env.KITE_API_KEY, process.env.KITE_LOGIN_URL);
    return NextResponse.redirect(loginURL);
}