import { NextResponse } from 'next/server';
import { getLoginURLForZerodha } from '@digi/zerodha';

export async function GET () {
    const loginURL = getLoginURLForZerodha(process.env.KITE_API_KEY, process.env.KITE_LOGIN_URL);
    return NextResponse.redirect(loginURL);
}