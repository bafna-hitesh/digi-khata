import { NextResponse } from 'next/server';
import { getRequestToken, getAccessToken } from '@digi/zerodha';

export async function GET (req) {
    try {
        let requestToken = getRequestToken(req.url);

        if(!requestToken) {
            throw new Error('Request Token not found in redirect URL');
        }

        let accessToken = await getAccessToken(process.env.KITE_API_KEY, process.env.KITE_API_SECRET, requestToken, process.env.KITE_BASE_URL);

        // return NextResponse.json({ sessionResponse: sessionResponse.data });

        return NextResponse.redirect(process.env.APP_HOME_URL);

    } catch(error) {
        console.log('[Error] Some Exception occured' + JSON.stringify(error));
        return NextResponse.redirect(process.env.APP_LOGIN_URL);
    }
}