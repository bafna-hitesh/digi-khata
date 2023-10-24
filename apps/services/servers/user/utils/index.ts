import crypto from 'crypto';
import jwt from 'jsonwebtoken';

function generateRandomToken(length: number) {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString('hex')
    .slice(0, length);
}

function generateJWT(token: string, secret: string) {
  const payload = { token };
  return jwt.sign(payload, secret, { expiresIn: '24h' });
}

function isValidEmail(email: string) {
  const emailRegex: RegExp = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return emailRegex.test(email);
}

function isValidName(name: string) {
  const nameRegex: RegExp = /^[a-zA-Z\s]+$/;
  return nameRegex.test(name);
}

export { generateRandomToken, generateJWT, isValidEmail, isValidName };
