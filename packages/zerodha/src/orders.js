import axios from 'axios';

function getAllOrdersForTheDay(apiKey, accessToken, kiteBaseURL) {
    let headers = {
        'X-Kite-Version': 3,
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `token ${apiKey}:${accessToken}`
    }

    return axios.get(`${kiteBaseURL}/orders`, { headers });
}

export {
    getAllOrdersForTheDay
}