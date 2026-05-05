/**
 * `pnpm content:verify <bareTermName>` — flip a sidecar's verification state
 * to "verified" with timestamp and `verifiedBy: joseph@jsthomas.org`.
 * `pnpm content:flag <bareTermName> "reason"` — flip to "flagged" with reason.
 *
 * Used by the dev-only /_review route; also runnable directly from the CLI
 * during batch verification sessions.
 */

import { existsSync } from 'node:fs';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

async function main() {
  const action = process.argv[2];
  const bare = process.argv[3];
  const reason = process.argv[4];

  if (!action || !bare || (action === 'flag' && !reason)) {
    console.error('Usage:');
    console.error('  pnpm content:verify <bareTermName>');
    console.error('  pnpm content:flag <bareTermName> "reason"');
    process.exit(1);
  }
  if (action !== 'verify' && action !== 'flag') {
    console.error(`Unknown action "${action}"`);
    process.exit(1);
  }

  const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
  const sidecarPath = path.join(repoRoot, 'src/data/content', `${bare}.sources.json`);
  if (!existsSync(sidecarPath)) {
    console.error(`Not found: ${sidecarPath}`);
    process.exit(1);
  }

  const raw = await readFile(sidecarPath, 'utf8');
  const sidecar = JSON.parse(raw);

  if (action === 'verify') {
    sidecar.verification = 'verified';
    sidecar.verifiedBy = sidecar.verifiedBy ?? 'joseph@jsthomas.org';
    sidecar.verifiedAt = new Date().toISOString();
    delete sidecar.flaggedReason;
  } else {
    sidecar.verification = 'flagged';
    sidecar.flaggedReason = reason;
    delete sidecar.verifiedBy;
    delete sidecar.verifiedAt;
  }

  await writeFile(sidecarPath, JSON.stringify(sidecar, null, 2) + '\n', 'utf8');
  console.log(
    `${action === 'verify' ? 'Verified' : `Flagged (${reason})`}: schema:${bare}`,
  );
}

void main().catch((err: unknown) => {
  console.error(err);
  process.exit(1);
});
