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

}

function generateLoginURLForAngelOne() {

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