#!/usr/bin/env node

const { Command } = require('commander');
const chalk = require('chalk');
const { z } = require('zod');
const program = new Command();

// Commands
const jobAction = require('../src/commands/jobs');
const adsAction = require('../src/commands/ads');
const statusAction = require('../src/commands/status');
const superpowerAction = require('../src/commands/superpower');

program
  .name('bharat')
  .description('Yodha CLI for Bharat & Ads4you Automation')
  .version('0.1.0');

// Schemas for Validation
const jobSchema = z.object({
  daily: z.boolean().optional(),
});

const adsSchema = z.object({
  generate: z.boolean().optional(),
  script: z.string().min(1, 'Script name is required').optional(),
});

program
  .command('namaste')
  .description('Greeting and daily summary')
  .option('-s, --super', 'Activate Yodha Superpowers (Deep Search)')
  .action((options) => {
    if (options.super) {
      superpowerAction();
    } else {
      console.log(chalk.bold.green('\nNamaste Pranav! 🙏'));
      console.log(chalk.cyan('Yodha is online and ready to build for Bharat.\n'));
      console.log(chalk.yellow('Current Focus:'));
      console.log('1. Ads4you Content Automation (Port 18790)');
      console.log('2. Indian Gov Job Daily Search');
      console.log('3. Business CRM (Port 18789)\n');
      console.log(chalk.gray('Run `bharat status` for full diagnostic.'));
    }
  });

program
  .command('status')
  .description('Check health of all automation services')
  .action(statusAction);

program
  .command('jobs')
  .description('Search for Indian Gov Jobs')
  .option('-d, --daily', 'Perform daily check')
  .action((options) => {
    try {
      jobSchema.parse(options);
      jobAction(options);
    } catch (err) {
      console.error(chalk.red('Invalid options for jobs command:'), err.errors);
    }
  });

program
  .command('ads')
  .description('Automate Ads4you video production')
  .option('-g, --generate', 'Generate and render a new ad')
  .option('-s, --script <name>', 'Specific remotion build script', 'build:v1')
  .action((options) => {
    try {
      adsSchema.parse(options);
      adsAction(options);
    } catch (err) {
      console.error(chalk.red('Invalid options for ads command:'), err.errors);
    }
  });

program.parse(process.argv);
