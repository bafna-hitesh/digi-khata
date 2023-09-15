import crypto from 'crypto';
import jwt from 'jsonwebtoken';

function generateRandomToken(length: number) {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString('hex')
    .slice(0, length);
}

function generateJWT(token: string, secret: string) {
  let payload = { token };
  return jwt.sign(payload, secret, { expiresIn: '24h' });
}

export { generateRandomToken, generateJWT };
