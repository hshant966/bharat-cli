const axios = require('axios');
const chalk = require('chalk');
const config = require('../utils/config');

module.exports = async () => {
  console.log(chalk.bold.blue('\n--- DEEP System Health Check (Yodha Diagnostics) ---'));

  // 1. Check Tandem (With Token Verification)
  try {
    console.log(chalk.gray('Checking Tandem Browser (Port 8765) with token...'));
    const token = config.tandem.getToken();
    const res = await axios.get(`${config.tandem.api}/tabs/list`, {
      headers: { Authorization: `Bearer ${token}` },
      timeout: 3000
    });
    console.log(chalk.green(`✅ Tandem Browser: ONLINE (${res.data.tabs.length} tabs open)`));
  } catch (e) {
    if (e.response && e.response.status === 401) {
      console.log(chalk.red('❌ Tandem Browser: UNAUTHORIZED (Check API token)'));
    } else {
      console.log(chalk.red('❌ Tandem Browser: OFFLINE (Check if Tandem is running)'));
    }
  }

  // 2. Check OpenClaw Main (18789)
  try {
    console.log(chalk.gray('Checking OpenClaw Main (Port 18789)...'));
    await axios.get(`${config.openclaw.main}/health`, { timeout: 3000 });
    console.log(chalk.green('✅ OpenClaw Main: ONLINE'));
  } catch (e) {
    console.log(chalk.yellow('⚠️ OpenClaw Main: NO RESPONSE (Check port 18789)'));
  }

  // 3. Check OpenClaw Content (18790)
  try {
    console.log(chalk.gray('Checking OpenClaw Content (Port 18790)...'));
    await axios.get(`${config.openclaw.content}/health`, { timeout: 3000 });
    console.log(chalk.green('✅ OpenClaw Content: ONLINE'));
  } catch (e) {
    console.log(chalk.yellow('⚠️ OpenClaw Content: NO RESPONSE (Check port 18790)'));
  }

  // 4. Check Remotion Directory
  try {
    const fs = require('fs');
    if (fs.existsSync(config.remotion.dir)) {
      console.log(chalk.green(`✅ Remotion Project: FOUND (${config.remotion.dir})`));
    } else {
      console.log(chalk.red(`❌ Remotion Project: NOT FOUND (Path: ${config.remotion.dir})`));
    }
  } catch (e) {
    console.log(chalk.red('❌ Remotion Project: Error accessing directory'));
  }

  console.log(chalk.bold.blue('---------------------------\n'));
};
