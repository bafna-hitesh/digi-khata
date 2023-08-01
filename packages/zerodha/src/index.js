import querystring from 'querystring';

function loginURLForZerodha(apiKey, loginURL) {
    let options = {
        v: 3,
        api_key: apiKey
    }
    return `${loginURL}?${querystring.stringify(options)}`;
}

export {
    loginURLForZerodha
}