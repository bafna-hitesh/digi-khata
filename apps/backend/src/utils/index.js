import crypto from 'crypto';
import jwt from 'jsonwebtoken';

function generateRandomToken(length) {
    return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
}

function generateJWT(token, secret) {
    let payload = { token };
    return jwt.sign(payload, secret, { expiresIn: '24h'});
}

export {
    generateRandomToken,
    generateJWT
}