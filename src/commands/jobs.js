const tandem = require('../services/tandem');
const chalk = require('chalk');
const pLimit = require('p-limit');

const limit = pLimit(3); // Process 3 portals at once

module.exports = async (options) => {
  console.log(chalk.bold.blue('🚀 AGGRESSIVE WORKER: Initializing parallel scraping engine...'));

  const targets = [
    { name: 'SarkariResult', url: 'https://www.sarkariresult.com/' },
    { name: 'FreeJobAlert', url: 'https://www.freejobalert.com/' },
    { name: 'Google Trends (Jobs)', url: 'https://www.google.com/search?q=Indian+Government+Jobs+2026' }
  ];

  const scrapePortal = async (portal) => {
    let tabId;
    try {
      console.log(chalk.gray(`[Worker] Opening ${portal.name}...`));
      tabId = await tandem.openTab(portal.url, false);

      // Wait for page load
      await new Promise(resolve => setTimeout(resolve, 4000));

      const content = await tandem.getPageContent(tabId);

      // Extraction logic (more robust check for keywords)
      const updates = ['Railway', 'SSC', 'Banking', 'UPSC'].filter(kw =>
        content.toLowerCase().includes(kw.toLowerCase())
      );

      return {
        portal: portal.name,
        success: true,
        updates: updates.length > 0 ? updates : ['General check completed']
      };
    } catch (err) {
      return { portal: portal.name, success: false, error: err.message };
    } finally {
      if (tabId) await tandem.closeTab(tabId);
    }
  };

  const results = await Promise.all(targets.map(t => limit(() => scrapePortal(t))));

  console.log(chalk.bold.green('\n--- Unified Job Report (Parallel Scan) ---'));
  results.forEach(res => {
    if (res.success) {
      console.log(chalk.white(`✅ ${res.portal}: `) + chalk.cyan(res.updates.join(', ')));
    } else {
      console.log(chalk.red(`❌ ${res.portal}: Failed (${res.error})`));
    }
  });

  console.log(chalk.yellow('\nAction Required: Verify portals for specific notifications.'));
};
