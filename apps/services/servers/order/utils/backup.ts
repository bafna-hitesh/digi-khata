import { exec } from 'child_process';
import config from '../config';
import uploadPostgresBackupToS3 from './s3';

const generatePostgresBackup = async () => {
  const fileName = `${new Date().toISOString()}.sql`;
  const filePath = `/tmp/${fileName}`;

  console.log(`Taking postgres backup ${fileName} at path ${filePath}`);
  // Restore Command - psql -U postgres -h localhost -d Digi-Khata -f ~/postgres/dk.sql
  // Make sure the postgres password is stored in ~/.pgpass with appropriate permissions (0600)
  const backupCommand = `pg_dump -U ${config.POSTGRES_USER} -h ${config.POSTGRES_HOST} -d ${config.POSTGRES_DATABASE} > ${filePath}`;

  await exec(backupCommand);

  await uploadPostgresBackupToS3(filePath, fileName);
};

export default generatePostgresBackup;
