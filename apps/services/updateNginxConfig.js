/* eslint-disable no-console */
/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs').promises;
const { exec } = require('child_process');
const os = require('os');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const installNginx = () => {
  return new Promise((resolve, reject) => {
    const platform = os.platform();
    let command;

    if (platform === 'darwin') {
      command = 'brew install nginx';
    } else if (platform === 'linux') {
      command = 'sudo apt update && sudo apt install nginx';
    } else {
      reject(new Error('Unsupported OS'));
      return;
    }

    exec(command, (error) => {
      if (error) {
        return reject(error);
      }
      resolve();
    });
  });
};

const findNginxConfigPath = async () => {
  return new Promise((resolve, reject) => {
    exec('nginx -t 2>&1', { encoding: 'utf8' }, (error, stdout) => {
      if (error) {
        return reject(error);
      }
      const match = stdout.match(/nginx: the configuration file (.+?) syntax is ok/);
      resolve(match ? match[1] : null);
    });
  });
};

const run = async () => {
  let nginxConfigPath;

  try {
    nginxConfigPath = await findNginxConfigPath();
  } catch (error) {
    console.log('Nginx not found, installing...');
    await installNginx();
    nginxConfigPath = await findNginxConfigPath();
  }

  if (!nginxConfigPath) {
    console.error('Could not find or install Nginx.');
    process.exit(1);
  }

  const localNginxConfigPath = path.join(__dirname, 'nginx.conf');
  const newConfigData = await fs.readFile(localNginxConfigPath, 'utf8');

  const userPort = process.env.USER_MS_PORT || '6000';
  const orderPort = process.env.ORDER_MS_PORT || '7000';
  const dashboardPort = process.env.DASHBOARD_MS_PORT || '8000';

  const updatedNewConfig = newConfigData
    .replace('USER_PORT', userPort)
    .replace('ORDER_PORT', orderPort)
    .replace('DASHBOARD_PORT', dashboardPort);

  // Replace the existing nginx.conf with the new configuration
  await fs.writeFile(nginxConfigPath, updatedNewConfig, 'utf8');

  exec('nginx -s reload', (error) => {
    if (error) {
      console.error(`Error reloading Nginx: ${error}`);
      return;
    }
    console.log('Nginx configuration updated and reloaded.');
  });
};

run().catch((error) => {
  console.error(`An error occurred: ${error}`);
});
