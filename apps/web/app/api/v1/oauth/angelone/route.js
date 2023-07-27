import { NextResponse } from 'next/server';
import config from '../../../../../config';
import axios from 'axios';

export async function GET (req) {
    try {
        const redirectURL = new URL(req.url);
        let accessToken = redirectURL.searchParams.get('auth_token');
        
        if(!accessToken) {
            throw new Error('Code not found in redirect URL');
        }
        
        const userDetailsURL = 'https://apiconnect.angelbroking.com/rest/secure/angelbroking/user/v1/getProfile';

        let headers = {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-UserType': 'USER',
            'X-SourceID': 'WEB',
            'X-ClientLocalIP': '127.0.0.1',
            'X-ClientPublicIP': '127.0.0.1',
            'X-MACAddress': 'MAC_ADDRESS',
            'X-PrivateKey': config.angelone.apiKey
        }

        let userDetails = await axios.get(userDetailsURL, { headers });

        return NextResponse.json({ userDetails });
    } catch(error) {
        return NextResponse.redirect(config.loginURL);
    }
}