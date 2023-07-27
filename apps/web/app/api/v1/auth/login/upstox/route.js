import { NextResponse } from "next/server";
import { generateLoginURLForUpstox } from '../../../../../../utils/loginURL.js';

export async function GET () {
    const loginURL = generateLoginURLForUpstox();
    return NextResponse.redirect(loginURL);
}