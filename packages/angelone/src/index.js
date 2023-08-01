import querystring from 'querystring';

function loginURLForAngelOne(apiKey) {
    let option = {
        api_key: apiKey
    }
    return `${config.angelone.loginURL}?${querystring.stringify(option)}`;
}

export {
    loginURLForAngelOne
}