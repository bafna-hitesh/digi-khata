import { NextResponse } from "next/server";
import { generateLoginURLForZerodha } from '../../../../../../utils/loginURL.js';

export async function GET () {
    const loginURL = generateLoginURLForZerodha();
    return NextResponse.redirect(loginURL);
}