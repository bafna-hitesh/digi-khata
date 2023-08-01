import querystring from 'querystring';

function loginURLForUpstox(apiKey, loginURL, redirectURL) {
    let options = {
        response_type: 'code',
        client_id: apiKey,
        redirect_uri: redirectURL
    }
    return `${loginURL}?${querystring.stringify(options)}`;
}

export {
    loginURLForUpstox
}