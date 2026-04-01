const remotion = require('../src/services/remotion');
const { execa } = require('execa');

jest.mock('execa', () => ({
  execa: jest.fn()
}));

describe('Remotion Service', () => {
  test('renderVideo should execute npm run with correct script', async () => {
    execa.mockResolvedValue({ stdout: 'Render Success' });

    const result = await remotion.renderVideo('build:v1');

    expect(execa).toHaveBeenCalledWith('npm', ['run', 'build:v1'], expect.objectContaining({
      cwd: '/home/pranav/ads4you-remotion'
    }));
    expect(result.success).toBe(true);
  });

  test('renderVideo should handle failure', async () => {
    execa.mockRejectedValue(new Error('Render Error'));

    const result = await remotion.renderVideo('build:v1');

    expect(result.success).toBe(false);
    expect(result.message).toBe('Render Error');
  });
});
