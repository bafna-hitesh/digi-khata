import { NextResponse } from 'next/server';
import config from '../../../../../config';
import axios from 'axios';

export async function GET (req) {
    try {
        const redirectURL = new URL(req.url);
        let code = redirectURL.searchParams.get('code');

        if(!code) {
            throw new Error('Code not found in redirect URL');
        }

        const accessTokenURL = `${config.upstox.baseURL}/login/authorization/token`;
        
        let headers = {
            'accept': 'application/json',
            'Api-Version': '2.0',
            'Content-Type': 'application/x-www-form-urlencoded'
        }

        let body = {
            'code': code,
            'client_id': config.upstox.apiKey,
            'client_secret': config.upstox.apiSecret,
            'redirect_uri': config.upstox.redirectURL,
            'grant_type': 'authorization_code'
        }

        let accessToken = await axios.post(accessTokenURL, body, { headers });
        console.log(accessToken);

        const loginTokenURL = `${config.upstox.baseURL}/login/authorization/token`;

        let userDetails = await axios.post(loginTokenURL, body, { headers });

        return NextResponse.json({ userDetails });
    } catch(error) {
        return NextResponse.redirect(config.loginURL);
    }
}