/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const { execSync } = require('child_process');
const os = require('os');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Function to check if Nginx is installed
const isNginxInstalled = () => {
  try {
    execSync('nginx -v');
    return true;
  } catch (e) {
    return false;
  }
};

// Function to install Nginx based on the OS
const installNginx = () => {
  const platform = os.platform();
  if (platform === 'darwin') {
    execSync('brew install nginx');
  } else if (platform === 'linux') {
    execSync('sudo apt update && sudo apt install nginx');
  } else {
    console.error('Unsupported operating system for automatic Nginx installation.');
    process.exit(1);
  }
};

// Function to find the Nginx configuration file path
const findNginxConfigPath = () => {
  try {
    const output = execSync('nginx -t 2>&1', { encoding: 'utf8' });
    const match = output.match(/nginx: the configuration file (.+?) syntax is ok/);
    return match ? match[1] : null;
  } catch (e) {
    return null;
  }
};

// Check if Nginx is installed, if not then install it
if (!isNginxInstalled()) {
  console.log('Nginx is not installed. Installing...');
  installNginx();
}

// Find the path to the Nginx configuration file
const nginxConfigPath = findNginxConfigPath();

if (!nginxConfigPath) {
  console.error('Could not find Nginx configuration file.');
  process.exit(1);
}

// Path to the nginx.conf in your project directory
const localNginxConfigPath = path.join(__dirname, 'nginx.conf');

// Read the local nginx.conf file
fs.readFile(localNginxConfigPath, 'utf8', (err, data) => {
  if (err) {
    console.error(`Error reading local Nginx config: ${err}`);
    return;
  }

  // Get the ports from the .env file
  const userPort = process.env.USER_MS_PORT || '6000';
  const orderPort = process.env.ORDER_MS_PORT || '7000';
  const dashboardPort = process.env.DASHBOARD_MS_PORT || '8000';

  // Replace the port placeholders
  const updatedConfig = data
    .replace('USER_PORT', userPort)
    .replace('ORDER_PORT', orderPort)
    .replace('DASHBOARD_PORT', dashboardPort);

  // Write the updated configuration to the found path
  fs.writeFile(nginxConfigPath, updatedConfig, 'utf8', (errors) => {
    if (errors) {
      console.error(`Error writing Nginx config: ${errors}`);
      return;
    }

    // Reload Nginx to apply changes
    try {
      execSync('sudo nginx -s reload');
      console.log('Nginx configuration updated and reloaded.');
    } catch (e) {
      console.error(`Error reloading Nginx: ${e}`);
    }
  });
});
