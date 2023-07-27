let config = {
    'zerodha': {
        'apiKey': 'x8qw1x9c0wrweuz6',
        'apiSecret': 'ioyxelwyhxbfroyup8yggfqsckazyiil',
        'baseURL': 'https://api.kite.trade',
        'loginURL': 'https://kite.zerodha.com/connect/login',
        'redirectURL': 'http://localhost:3000/api/v1/oauth/zerodha'
    },
    'upstox': {
        'apiKey': '',
        'apiSecret': '',
        'baseURL': 'https://api-v2.upstox.com',
        'loginURL': 'https://api-v2.upstox.com/login/authorization/dialog',
        'redirectURL': 'http://localhost:3000/api/v1/oauth/upstox'
    },
    'angelone': {
        'apiKey': '',
        'apiSecret': '',
        'baseURL': 'https://apiconnect.angelbroking.com',
        'loginURL': 'https://smartapi.angelbroking.com/publisher-login',
        'redirectURL': 'http://localhost:3000/api/v1/oauth/angelone'
    },
    'icicidirect': {
        'apiKey': '',
        'apiSecret': '',
        'baseURL': '',
        'loginURL': '',
        'redirectURL': ''
    },
    '5paisa': {
        'apiKey': '',
        'apiSecret': '',
        'baseURL': '',
        'loginURL': '',
        'redirectURL': ''
    },
    'iifl': {
        'apiKey': '',
        'apiSecret': '',
        'baseURL': '',
        'loginURL': '',
        'redirectURL': ''
    },
    'loginURL': 'http://localhost/api/v1/auth/login'
};

export default config;