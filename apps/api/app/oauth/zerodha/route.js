import { NextResponse } from 'next/server';
import crypto from 'crypto';
import axios from 'axios';

export async function GET (req) {
    try {
        const redirectURL = new URL(req.url);
        let requestToken = redirectURL.searchParams.get('request_token');

        if(!requestToken) {
            throw new Error('Request Token not found in redirect URL');
        }

        const checksum = crypto.createHash('sha256').update(process.env.KITE_API_KEY + requestToken + process.env.KITE_API_SECRET).digest('hex');
        
        let headers = {
            'X-Kite-Version': 3,
            'Content-Type': 'application/x-www-form-urlencoded'
        }

        let sessionBody = `api_key=${process.env.KITE_API_KEY}&request_token=${requestToken}&checksum=${checksum}`;

        let sessionResponse = await axios.post(`${process.env.KITE_BASE_URL}/session/token`, sessionBody, { headers });
        let accessToken = sessionResponse.data.data.access_token;
        return NextResponse.json({ sessionResponse: sessionResponse.data });

    } catch(error) {
        console.log('[Error] Some Exception occured' + JSON.stringify(error));
        return NextResponse.redirect(process.env.APP_HOME_URL);
    }
}