#!/usr/bin/env node
/** Read-only exact frozen-artifact gate; never refreshes expected hashes.
 * Owner-approved partial-performance release: exact independently reviewed output.
 * Historical accepted and analytics-repaired manifests remain unchanged.
 */
import { readFileSync, readdirSync, lstatSync } from 'node:fs';
import { resolve, relative, join } from 'node:path';
import { createHash } from 'node:crypto';

const root = resolve(process.argv[2] || 'dist');
const expected = JSON.parse(readFileSync(new URL('../docs/release/partial-performance-build-sha256.json', import.meta.url), 'utf8'));
const actual = {};
function walk(directory) {
  for (const name of readdirSync(directory).sort()) {
    const path = join(directory, name);
    const info = lstatSync(path);
    if (info.isSymbolicLink()) throw new Error('Symlink forbidden in build: ' + relative(root, path));
    if (info.isDirectory()) walk(path);
    else if (info.isFile()) actual[relative(root, path).replaceAll('\\', '/')] = createHash('sha256').update(readFileSync(path)).digest('hex');
    else throw new Error('Non-regular build entry');
  }
}
walk(root);
const missing = Object.keys(expected).filter(path => !(path in actual));
const extra = Object.keys(actual).filter(path => !(path in expected));
const changed = Object.keys(expected).filter(path => path in actual && expected[path] !== actual[path]);
const exactMatch = missing.length === 0 && extra.length === 0 && changed.length === 0;
console.log(JSON.stringify({ expectedCount: Object.keys(expected).length, actualCount: Object.keys(actual).length, missing, extra, changed, exactMatch }, null, 2));
if (!exactMatch) process.exitCode = 1;
