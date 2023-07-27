import config from '../config/';
import querystring from 'querystring';

function generateLoginURLForZerodha() {
    const loginURL = config.zerodha.loginURL;
    let options = {
        v: 3,
        api_key: config.zerodha.apiKey
    }
    return `${loginURL}?${querystring.stringify(options)}`;
}

function generateLoginURLForUpstox() {
    const loginURL = config.upstox.loginURL;
    let options = {
        response_type: 'code',
        client_id: config.upstox.apiKey,
        redirect_uri: config.upstox.redirectURL
    }
    return `${loginURL}?${querystring.stringify(options)}`;
}

function generateLoginURLForAngelOne() {
    const loginURL = config.angelone.loginURL;
    let option = {
        api_key: config.angelone.apiKey
    }
    return `${config.angelone.loginURL}?${querystring.stringify(option)}`;
}

function generateLoginURLFor5Paisa() {

}

function generateLoginURLForICICIDirect() {

}

function generateLoginURLForIIFL() {

}

export {
    generateLoginURLForZerodha,
    generateLoginURLForUpstox,
    generateLoginURLForAngelOne,
    generateLoginURLFor5Paisa,
    generateLoginURLForICICIDirect,
    generateLoginURLForIIFL
}