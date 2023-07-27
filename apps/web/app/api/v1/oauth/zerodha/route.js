import { NextResponse } from 'next/server';
import config from '../../../../../config';
import crypto from 'crypto';
import axios from 'axios';

export async function GET (req) {
    try {
        const redirectURL = new URL(req.url);
        let requestToken = redirectURL.searchParams.get('request_token');

        if(!requestToken) {
            throw new Error('Request Token not found in redirect URL');
        }

        const checksum = crypto.createHash('sha256').update(config.zerodha.apiKey + requestToken + config.zerodha.apiSecret);

        const sessionURL = `${config.zerodha.baseURL}/session/token`;
        
        let headers = {
            'X-Kite-Version': 3,
            'Content-Type': 'application/x-www-form-urlencoded'
        }

        let sessionBody = {
            'api_key': config.zerodha.apiKey,
            'request_token': requestToken,
            'checksum': checksum
        }

        let sessionResponse = await axios.post(sessionURL, sessionBody, { headers });
        let accessToken = sessionResponse.access_token;
        console.log(accessToken);

        return NextResponse.json({ sessionResponse });
    } catch(error) {
        return NextResponse.redirect(config.loginURL);
    }
}