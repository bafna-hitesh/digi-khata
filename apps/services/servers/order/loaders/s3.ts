import S3 from 'aws-sdk/clients/s3';
import config from '../config';

const s3Client = new S3({
  accessKeyId: config.AWS_ACCESS_KEY_ID,
  secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
  sslEnabled: true,
});

export default s3Client;
