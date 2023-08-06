import querystring from 'querystring';
import crypto from 'crypto';
import axios from 'axios';

function getLoginURLForZerodha(apiKey, loginURL) {
    let options = {
        v: 3,
        api_key: apiKey
    }
    return `${loginURL}?${querystring.stringify(options)}`;
}

function getRequestToken(url) {
    const redirectURL = new URL(url);
    return redirectURL.searchParams.get('request_token');
}

async function getUserProfileWithAccessToken(apiKey, apiSecret, requestToken, kiteBaseURL) {
    const checksum = crypto.createHash('sha256').update(apiKey + requestToken + apiSecret).digest('hex');
        
    let headers = {
        'X-Kite-Version': 3,
        'Content-Type': 'application/x-www-form-urlencoded'
    }

    let sessionBody = `api_key=${apiKey}&request_token=${requestToken}&checksum=${checksum}`;

    let sessionResponse = await axios.post(`${kiteBaseURL}/session/token`, sessionBody, { headers });
    return sessionResponse.data.data;
}

export {
    getLoginURLForZerodha,
    getRequestToken,
    getUserProfileWithAccessToken
}