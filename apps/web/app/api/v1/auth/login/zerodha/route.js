import { NextResponse } from "next/server";
import { generateLoginURLForZerodha } from '../../../../../../utils/loginURL.js';

export async function GET () {
    const redirectURL = generateLoginURLForZerodha();
    return NextResponse.redirect(redirectURL);
}