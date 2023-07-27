import { NextResponse } from 'next/server';
import { generateLoginURLForAngelOne } from '../../../../../../utils/loginURL';

export async function GET () {
    const loginURL = generateLoginURLForAngelOne();
    return NextResponse.redirect(loginURL);
}