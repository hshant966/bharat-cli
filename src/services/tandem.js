const axios = require('axios');
const config = require('../utils/config');

const TOKEN = config.tandem.getToken();

const client = axios.create({
  baseURL: config.tandem.api,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
    'Content-Type': 'application/json'
  }
});

module.exports = {
  client,
  async openTab(url, focus = false) {
    const res = await client.post('/tabs/open', { url, focus, source: 'bharat-cli' });
    return res.data.tab.id;
  },

  async focusTab(tabId) {
    await client.post('/tabs/focus', { tabId });
  },

  async closeTab(tabId) {
    await client.post('/tabs/close', { tabId });
  },

  async getSnapshot(tabId) {
    const res = await client.get('/snapshot', {
      params: { compact: true },
      headers: { 'X-Tab-Id': tabId }
    });
    return res.data;
  },

  async getPageContent(tabId) {
    const res = await client.get('/page-content', {
      headers: { 'X-Tab-Id': tabId }
    });
    return res.data;
  },

  async wait(tabId, selector, timeout = 10000) {
    await client.post('/wait', { selector, timeout }, {
      headers: { 'X-Tab-Id': tabId }
    });
  },

  async executeJs(tabId, code) {
    const res = await client.post('/execute-js', { code }, {
      headers: { 'X-Tab-Id': tabId }
    });
    return res.data;
  }
};
