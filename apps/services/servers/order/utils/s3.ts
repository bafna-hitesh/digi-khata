import { readFileSync } from 'fs';
import { createHash } from 'crypto';
import config from '../config';
import s3Client from '../loaders/s3';

const uploadPostgresBackupToS3 = async (filePath: string, fileName: string) => {
  const fileContent = readFileSync(filePath);
  const md5hash = createHash('md5').update(fileContent).digest('base64');

  const s3Params = {
    Bucket: config.AWS_BACKUP_BUCKET,
    Key: fileName,
    Body: fileContent,
    ContentMD5: md5hash,
  };

  console.log(`Uploading object ${fileName} in bucket ${config.AWS_BACKUP_BUCKET}`);

  await s3Client.putObject(s3Params);
};

export default uploadPostgresBackupToS3;
