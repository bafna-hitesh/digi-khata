import crypto from 'crypto';

function generateRandomToken(length) {
    return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
}

export {
    generateRandomToken
}