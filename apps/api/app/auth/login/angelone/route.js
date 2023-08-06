import { NextResponse } from 'next/server';
import { loginURLForAngelOne } from '@digi/angelone';

export async function GET () {
    const loginURL = loginURLForAngelOne(process.env.ANGELONE_API_KEY);
    return NextResponse.redirect(loginURL);
}