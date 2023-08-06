import { NextResponse } from "next/server";
import { loginURLForUpstox } from '@digi/upstox';

export async function GET () {
    const loginURL = loginURLForUpstox(process.env.UPSTOX_API_KEY, process.env.UPSTOX_LOGIN_URL, process.env.UPSTOX_REDIRECT_URL);
    return NextResponse.redirect(loginURL);
}