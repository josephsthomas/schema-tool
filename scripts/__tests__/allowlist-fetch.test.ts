import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  AllowlistError,
  allowlistFetch,
  getFetchAuditLog,
  resetFetchAuditLog,
  SOURCE_ALLOWLIST,
} from '../allowlist-fetch.ts';

describe('SOURCE_ALLOWLIST', () => {
  it('contains every authoritative medical citation source named in build brief Section 2.1', () => {
    const required = [
      'dailymed.nlm.nih.gov',
      'medlineplus.gov',
      'www.cancer.gov',
      'www.cdc.gov',
      'meshb.nlm.nih.gov',
      'www.nlm.nih.gov',
      'clinicaltrials.gov',
      'browser.ihtsdotools.org',
      'developers.google.com',
    ];
    for (const host of required) {
      expect(SOURCE_ALLOWLIST).toContain(host);
    }
  });

  it('includes schema.org for the vocabulary fetch', () => {
    expect(SOURCE_ALLOWLIST).toContain('schema.org');
  });
});

describe('allowlistFetch', () => {
  beforeEach(() => {
    resetFetchAuditLog();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('rejects non-allowlisted hosts with AllowlistError and still logs the attempt', async () => {
    await expect(
      allowlistFetch('https://example.com/some-fact', { purpose: 'content:test' }),
    ).rejects.toBeInstanceOf(AllowlistError);

    const log = getFetchAuditLog();
    expect(log).toHaveLength(1);
    expect(log[0]).toMatchObject({
      url: 'https://example.com/some-fact',
      host: 'example.com',
      allowlisted: false,
      status: 0,
      context: 'content:test',
    });
  });

  it('rejects malformed URLs', async () => {
    await expect(
      allowlistFetch('not-a-url', { purpose: 'content:test' }),
    ).rejects.toBeInstanceOf(AllowlistError);
  });

  it('fetches from allowlisted hosts and records body + sha256 in the audit log', async () => {
    const fakeBody = '<html>active ingredient: ibuprofen</html>';
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(fakeBody, { status: 200 }),
    );

    const result = await allowlistFetch(
      'https://medlineplus.gov/druginfo/meds/a682159.html',
      { purpose: 'content:schema:Drug' },
    );

    expect(fetchSpy).toHaveBeenCalledOnce();
    expect(result.host).toBe('medlineplus.gov');
    expect(result.status).toBe(200);
    expect(result.body).toBe(fakeBody);
    expect(result.sha256).toMatch(/^[a-f0-9]{64}$/);

    const log = getFetchAuditLog();
    expect(log).toHaveLength(1);
    expect(log[0]).toMatchObject({
      host: 'medlineplus.gov',
      allowlisted: true,
      context: 'content:schema:Drug',
      contentLength: fakeBody.length,
    });
  });
});
