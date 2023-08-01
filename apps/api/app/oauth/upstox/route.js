import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET (req) {
    try {
        const redirectURL = new URL(req.url);
        let code = redirectURL.searchParams.get('code');

        if(!code) {
            throw new Error('Code not found in redirect URL');
        }
        
        let headers = {
            'accept': 'application/json',
            'Api-Version': '2.0',
            'Content-Type': 'application/x-www-form-urlencoded'
        }

        let body = {
            'code': code,
            'client_id': process.env.UPSTOX_API_KEY,
            'client_secret': process.env.UPSTOX_API_SECRET,
            'redirect_uri': process.env.ANGELONE_REDIRECT_URL,
            'grant_type': 'authorization_code'
        }

        let accessToken = await axios.post(`${process.env.UPSTOX_BASE_URL}/login/authorization/token`, body, { headers });

        let userDetails = await axios.post(`${process.env.UPSTOX_BASE_URL}/login/authorization/token`, body, { headers });

        return NextResponse.json({ userDetails });
    } catch(error) {
        return NextResponse.redirect(process.env.APP_LOGIN_URL);
    }
}