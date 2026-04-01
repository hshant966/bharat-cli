const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const HOME = process.env.HOME || process.env.USERPROFILE;

const config = {
  tandem: {
    api: process.env.TANDEM_API || 'http://127.0.0.1:8765',
    tokenPath: path.join(HOME, '.tandem/api-token'),
    getToken() {
      if (process.env.TANDEM_TOKEN) return process.env.TANDEM_TOKEN;
      try {
        return fs.readFileSync(this.tokenPath, 'utf8').trim();
      } catch (e) {
        return '';
      }
    }
  },
  openclaw: {
    main: process.env.OPENCLAW_MAIN_URL || 'http://127.0.0.1:18789',
    content: process.env.OPENCLAW_CONTENT_URL || 'http://127.0.0.1:18790'
  },
  remotion: {
    dir: process.env.REMOTION_DIR || '/home/pranav/ads4you-remotion'
  }
};

module.exports = config;
