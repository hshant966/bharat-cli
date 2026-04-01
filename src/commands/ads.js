const remotion = require('../services/remotion');
const chalk = require('chalk');

module.exports = async (options) => {
  console.log(chalk.magenta('Triggering Ads4you Remotion render engine...'));

  const scriptName = options.script || 'build:v1';
  console.log(chalk.cyan(`Target script: ${scriptName}`));

  const result = await remotion.renderVideo(scriptName);

  if (result.success) {
    console.log(chalk.bold.green('\n🔥 Video rendered successfully!'));
    console.log(chalk.yellow('Output path: /home/pranav/ads4you-remotion/out/video1.mp4'));
  } else {
    console.log(chalk.red('\nVideo generation failed. Please check remotion.config.ts.'));
  }
};
