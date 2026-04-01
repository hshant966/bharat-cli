const { execa } = require('execa');
const path = require('path');
const chalk = require('chalk');

const REMOTION_DIR = '/home/pranav/ads4you-remotion';

module.exports = {
  async renderVideo(scriptName = 'build:v1') {
    console.log(chalk.cyan(`Starting Remotion render: ${scriptName}...`));
    try {
      const { stdout } = await execa('npm', ['run', scriptName], {
        cwd: REMOTION_DIR,
        env: { ...process.env, FORCE_COLOR: 'true' }
      });
      console.log(stdout);
      return { success: true, message: 'Render completed successfully.' };
    } catch (error) {
      console.error(chalk.red('Render failed:'), error.message);
      return { success: false, message: error.message };
    }
  }
};
