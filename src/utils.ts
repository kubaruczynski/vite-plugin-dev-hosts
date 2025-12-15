import { DevHostOption } from '@/types';

export function transformUrl(urlStr: string, hostOption: DevHostOption, baseReplace?: string): string {
  const parsed = new URL(urlStr);
  if (parsed.hostname.startsWith('vite.') && baseReplace != null) {
    parsed.hostname = parsed.hostname.replace(/^vite/, baseReplace);
  }
  if (typeof hostOption === 'object' && hostOption.portOverride) {
    parsed.port = String(hostOption.portOverride);
  }
  if (typeof hostOption === 'object' && hostOption.hasOwnProperty('main')) {
    if (typeof hostOption.main === 'boolean' && hostOption.main) {
      return parsed.toString() + ' 👈';
    }
    if (typeof hostOption.main === 'function') {
      return hostOption.main(parsed.toString());
    }
  }
  return parsed.toString();
}

export function filterAndTransform(urls: string[], hosts: DevHostOption[], baseReplace?: string): string[] {
  const result: string[] = [];
  for (const hostOption of hosts) {
    const phrase = typeof hostOption === 'string' ? hostOption : hostOption.phrase;
    const urlMatch = urls.find(url => url.includes(phrase));
    if (urlMatch) {
      result.push(transformUrl(urlMatch, hostOption, baseReplace));
    }
  }
  return result;
}

