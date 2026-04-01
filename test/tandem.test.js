const tandem = require('../src/services/tandem');

// Since tandem.client is already initialized when we require it,
// we should mock its methods.
jest.mock('axios', () => ({
  create: jest.fn(() => ({
    post: jest.fn(),
    get: jest.fn(),
    defaults: { headers: {} }
  }))
}));

describe('Tandem Service', () => {
  test('openTab should call /tabs/open and return tabId', async () => {
    tandem.client.post.mockResolvedValue({ data: { tab: { id: 'tab-123' } } });

    const tabId = await tandem.openTab('https://example.com');

    expect(tandem.client.post).toHaveBeenCalledWith('/tabs/open', {
      url: 'https://example.com',
      focus: false,
      source: 'bharat-cli'
    });
    expect(tabId).toBe('tab-123');
  });

  test('closeTab should call /tabs/close', async () => {
    tandem.client.post.mockResolvedValue({ data: {} });

    await tandem.closeTab('tab-123');

    expect(tandem.client.post).toHaveBeenCalledWith('/tabs/close', { tabId: 'tab-123' });
  });

  test('getSnapshot should call /snapshot with tabId header', async () => {
    tandem.client.get.mockResolvedValue({ data: { tree: [] } });

    await tandem.getSnapshot('tab-123');

    expect(tandem.client.get).toHaveBeenCalledWith('/snapshot', {
      params: { compact: true },
      headers: { 'X-Tab-Id': 'tab-123' }
    });
  });
});
