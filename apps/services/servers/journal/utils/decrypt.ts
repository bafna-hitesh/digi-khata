import crypto from 'crypto';
import config from '../config';

const decryptData = (encryptedData: string) => {
  const key = config.AES_KEY; // 256-bit key for AES-256-CBC
  const iv = config.AES_IV; // 128-bit IV for AES-256-CBC

  const bufferKey = Buffer.from(key, 'hex');
  const bufferIv = Buffer.from(iv, 'hex');

  const decipher = crypto.createDecipheriv('aes-256-cbc', bufferKey, bufferIv);

  const decryptedData = decipher.update(encryptedData, 'hex', 'utf8') + decipher.final('utf8');

  return decryptedData;
};

export default decryptData;
