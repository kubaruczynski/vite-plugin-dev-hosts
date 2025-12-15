import { describe, it, expect } from 'vitest';
import { transformUrl, filterAndTransform } from '@/utils';
import type { DevHostOption } from '@/types';

describe('transformUrl', () => {
  it('replaces vite. with custom base and adds emoji for main', () => {
    const url = 'https://vite.mydomain.test:5173/';
    const host: DevHostOption = { phrase: 'mydomain.test', main: true };
    const result = transformUrl(url, host, 'base');

    expect(result).toContain('base.mydomain.test');
    expect(result).toContain('👈');
  });

  it('overrides port if portOverride is set', () => {
    const url = 'https://vite.short.test:5173/';
    const host: DevHostOption = { phrase: 'short.test', portOverride: 3001 };
    const result = transformUrl(url, host, 'base');

    expect(result).toContain(':3001/');
  });

  it('returns unchanged url if no match', () => {
    const url = 'https://localhost:5173/';
    const host: DevHostOption = 'localhost';
    const result = transformUrl(url, host);

    expect(result).toBe(url);
  });

  it('calls main function if main is a function', () => {
    const url = 'https://vite.mydomain.test:5173/';
    const mainFn = (url: string) => '⭐️ ' + url;
    const host: DevHostOption = { phrase: 'mydomain.test', main: mainFn };
    const result = transformUrl(url, host, 'base');

    expect(result).toContain('⭐️ https://base.mydomain.test:5173/');
  });
});

describe('filterAndTransform', () => {
  it('filters and transforms urls according to hosts', () => {
    const urls = [
      'https://vite.mydomain.test:5173/',
      'https://vite.short.test:5173/',
      'https://localhost:5173/'
    ];
    const hosts: DevHostOption[] = [
      { phrase: 'mydomain.test', main: true },
      { phrase: 'short.test', portOverride: 3001 },
      'localhost'
    ];
    const result = filterAndTransform(urls, hosts, 'base');

    expect(result[0]).toContain('base.mydomain.test');
    expect(result[0]).toContain('👈');
    expect(result[1]).toContain('base.short.test:3001');
    expect(result[2]).toContain('localhost:5173');
  });
});
