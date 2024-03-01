import cron from 'node-cron';
import generatePostgresBackup from '../utils/backup';
import { produceDataToKafka } from './kafka';
import { getAllUsers, getBrokerTokensForUser } from '../utils/users';
import User from '../../user/models/User';

const schedulePostgresBackup = () => {
  // Schedule postgres backup every week at Friday 22:00
  cron.schedule('0 22 * * 5', () => {
    generatePostgresBackup();
  });
};

const scheduleTradesSync = () => {
  // Schedule Trades Sync at 3:30 PM every working weekday (Mon - Fri)
  cron.schedule('30 15 * * 1-5', async () => {
    // Get all users
    const users = await getAllUsers();

    // Get active broker tokens for each user
    users.map(async (user: User) => {
      const brokerTokens = await getBrokerTokensForUser(user.get('id') as string);

      const data = {
        tokens: brokerTokens,
      };
      // Sync Trades for User
      produceDataToKafka('trades', data, user.get('id') as string);
    });
  });
};

const scheduleOrdersSync = () => {
  // Schedule Trades Sync at 3:30 PM every working weekday (Mon - Fri)
  cron.schedule('30 15 * * 1-5', async () => {
    // Get all users
    const users = await getAllUsers();

    // Get active broker tokens for each user
    users.map(async (user: User) => {
      const brokerTokens = await getBrokerTokensForUser(user.get('id') as string);

      const data = {
        tokens: brokerTokens,
      };
      // Sync Trades for User
      produceDataToKafka('orders', data, user.get('id') as string);
    });
  });
};

const scheduleCronJobs = () => {
  schedulePostgresBackup();
  scheduleOrdersSync();
  scheduleTradesSync();
};

export default scheduleCronJobs;
