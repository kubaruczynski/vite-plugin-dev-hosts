import type { Plugin, ViteDevServer } from 'vite';
import { DevHostsPluginOptions } from '@/types';
import { filterAndTransform } from '@/utils';

export function devHostsPlugin(options: DevHostsPluginOptions = {}): Plugin {
  return {
    name: 'vite-plugin-dev-hosts',
    apply: 'serve',
    async configureServer(server: ViteDevServer) {
      const origPrintUrls = server.printUrls;
      const hosts = options.hosts || [];
      const baseReplace = options.baseReplace;

      server.printUrls = function patchedPrintUrls() {
        if (server.resolvedUrls) {
          if (hosts.length > 0) {
            server.resolvedUrls.local = filterAndTransform(server.resolvedUrls.local, hosts, baseReplace);
            server.resolvedUrls.network = filterAndTransform(server.resolvedUrls.network, hosts, baseReplace);
          }
        }
        origPrintUrls.call(server);
      };
    },
  };
}
