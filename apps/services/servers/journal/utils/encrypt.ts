import crypto from 'crypto';
import config from '../config';

const encryptData = (data: string) => {
  const key = config.AES_KEY; // 256-bit key for AES-256-CBC
  const iv = config.AES_IV; // 128-bit IV for AES-256-CBC

  const bufferKey = Buffer.from(key, 'hex');
  const bufferIv = Buffer.from(iv, 'hex');

  const cipher = crypto.createCipheriv('aes-256-cbc', bufferKey, bufferIv);

  const encryptedData = cipher.update(data, 'utf8', 'hex') + cipher.final('hex');

  return encryptedData;
};

export default encryptData;
