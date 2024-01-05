import cron from 'node-cron';
import generatePostgresBackup from '../utils/backup';

const schedulePostgresBackup = () => {
  // Schedule postgres backup every week at Friday 22:00
  cron.schedule('0 22 * * 5', () => {
    generatePostgresBackup();
  });
};

export default schedulePostgresBackup;
