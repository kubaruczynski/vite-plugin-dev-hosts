import { describe, it, expect, vi } from 'vitest';
import { devHostsPlugin } from '@/vite-plugin-dev-hosts';

describe('devHostsPlugin', () => {
  it('should be a function and return a plugin object', () => {
    const plugin = devHostsPlugin();

    expect(typeof plugin).toBe('object');
    expect(plugin).toHaveProperty('name', 'vite-plugin-dev-hosts');
    expect(plugin).toHaveProperty('apply', 'serve');
    expect(plugin).toHaveProperty('configureServer');
  });

  it('should patch printUrls on the server', async () => {
    const fakeServer: any = {
      printUrls: vi.fn(),
      resolvedUrls: {
        local: ['https://vite.mydomain.test:5173/'],
        network: ['https://vite.mydomain.test:5173/']
      },
      config: { server: {}, logger: { info: vi.fn() } }
    };
    const plugin = devHostsPlugin({
      hosts: [{ phrase: 'mydomain.test', main: true }],
      baseReplace: 'base'
    });
    // @ts-ignore
    await plugin.configureServer(fakeServer);
    fakeServer.printUrls();

    expect(fakeServer.resolvedUrls.local[0]).toContain('base.mydomain.test');
    expect(fakeServer.resolvedUrls.local[0]).toContain('👈');
  });
});

