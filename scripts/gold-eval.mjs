#!/usr/bin/env node
/**
 * Score the sugya MCP server against the gold set (gold/gold.json):
 *
 *   node scripts/gold-eval.mjs [--server https://mcp.sugya.org/mcp] [--skill find-source] [--verify] [--hints] [--quiet]
 *
 * `search` cases send the query and score the ranked refs: success@1,
 * Recall@5, Recall@10, MRR and the empty-answer rate, per skill and overall.
 * `fetch` cases read a ref and require its phrase; `calendar` cases require
 * the daf. `--verify` also checks the gold itself — every expected ref must
 * be fetchable and, when a phrase is given, carry it — so a wrong answer is
 * never blamed on the engine. No dependencies: plain JSON-RPC over HTTP.
 * Results go to gold/results/<timestamp>.json; the summary is printed.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

const args = process.argv.slice(2);
const opt = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 && args[i + 1] && !args[i + 1].startsWith('--') ? args[i + 1] : fallback;
};
const flag = (name) => args.includes(`--${name}`);
const SERVER = opt('server', 'https://mcp.sugya.org/mcp');
const SKILL = opt('skill', null);
const VERIFY = flag('verify');
const QUIET = flag('quiet');
/** Send each case's `category` hint with the query, as a skill following its method would. */
const HINTS = flag('hints');

const root = new URL('../', import.meta.url).pathname;
const gold = JSON.parse(readFileSync(`${root}gold/gold.json`, 'utf8'));
const cases = gold.cases.filter((c) => !SKILL || c.skill === SKILL);

let nextId = 1;
async function callTool(name, toolArgs) {
  const started = Date.now();
  const response = await fetch(SERVER, {
    method: 'POST',
    headers: { 'content-type': 'application/json', accept: 'application/json, text/event-stream', 'user-agent': 'sugya-gold-eval/1.0' },
    body: JSON.stringify({ jsonrpc: '2.0', id: nextId++, method: 'tools/call', params: { name, arguments: toolArgs } }),
  });
  const text = await response.text();
  let message;
  if ((response.headers.get('content-type') ?? '').includes('text/event-stream')) {
    const data = text.split('\n').filter((l) => l.startsWith('data:')).map((l) => l.slice(5).trim());
    message = JSON.parse(data[data.length - 1]);
  } else {
    message = JSON.parse(text);
  }
  if (message.error) throw new Error(message.error.message);
  const result = message.result;
  return { ...result, ms: Date.now() - started, structured: result.structuredContent ?? null };
}

/**
 * The consonantal skeleton of a Hebrew string: vowels, cantillation, invisible
 * marks and punctuation out, and vav and yod out too — a vocalised text spells
 * «לגמר» where the saying is written «לגמור», and the check must not fail on that.
 */
const bare = (s) => s.normalize('NFC').replace(/[\u200B-\u200F\uFEFF\u0591-\u05C7]/g, '').replace(/[^\u05D0-\u05EA\s]/g, ' ').replace(/[\u05D5\u05D9]/g, '').replace(/\s+/g, ' ').trim();

const matches = (hit, expected) => hit === expected || hit.startsWith(`${expected}:`);
const rankOf = (hits, expected) => {
  for (let i = 0; i < hits.length; i += 1) if (expected.some((e) => matches(hits[i], e))) return i + 1;
  return null;
};

async function fetchText(id) {
  const result = await callTool('fetch', { id });
  if (result.isError) return null;
  return result.structured?.text ?? '';
}

const rows = [];
const goldDefects = [];
for (const c of cases) {
  const kind = c.kind ?? 'search';
  const row = { id: c.id, skill: c.skill, kind, ok: false, ms: 0 };
  try {
    if (kind === 'search') {
      const result = await callTool('search', HINTS && c.category ? { query: c.query, category: c.category } : { query: c.query });
      row.ms = result.ms;
      const hits = result.isError ? [] : (result.structured?.results ?? []).map((r) => r.id);
      row.hits = hits.slice(0, 10);
      row.empty = hits.length === 0;
      row.rank = rankOf(hits, c.expected);
      row.ok = row.rank === 1;
      if (VERIFY) {
        for (const e of c.expected) {
          const text = await fetchText(e);
          if (text === null) goldDefects.push(`${c.id}: expected ref not fetchable: ${e}`);
          else if (c.phrase && !bare(text).includes(bare(c.phrase))) goldDefects.push(`${c.id}: phrase «${c.phrase}» not in ${e}`);
        }
      }
    } else if (kind === 'fetch') {
      const result = await callTool('fetch', { id: c.id_ref });
      row.ms = result.ms;
      const text = result.isError ? null : (result.structured?.text ?? '');
      row.ok = text !== null && text.length > 0 && (!c.phrase || bare(text).includes(bare(c.phrase)));
      if (text === null) row.error = result.content?.[0]?.text;
    } else if (kind === 'calendar') {
      const result = await callTool('calendar', { date: c.date });
      row.ms = result.ms;
      row.got = result.structured?.dafYomi?.id ?? null;
      row.ok = row.got === c.expectDaf;
    }
  } catch (error) {
    row.error = error.message;
  }
  rows.push(row);
  if (!QUIET) {
    const detail = kind === 'search' ? `rank ${row.rank ?? '—'}${row.empty ? ' (empty)' : ''} · ${row.hits?.slice(0, 3).join(' | ')}` : kind === 'calendar' ? row.got : (row.error ?? '');
    console.log(`${row.ok ? 'ok  ' : 'MISS'} ${c.id.padEnd(6)} ${String(row.ms).padStart(5)} ms  ${detail}`);
  }
}

function summarise(subset) {
  const search = subset.filter((r) => r.kind === 'search');
  const n = search.length;
  const at = (k) => (n ? search.filter((r) => r.rank && r.rank <= k).length / n : null);
  const mrr = n ? search.reduce((s, r) => s + (r.rank ? 1 / r.rank : 0), 0) / n : null;
  const empty = n ? search.filter((r) => r.empty).length / n : null;
  const other = subset.filter((r) => r.kind !== 'search');
  const sorted = subset.map((r) => r.ms).sort((a, b) => a - b);
  return {
    cases: subset.length,
    search: n,
    'success@1': at(1), 'recall@5': at(5), 'recall@10': at(10), mrr, 'empty-rate': empty,
    'deterministic-pass': other.length ? other.filter((r) => r.ok).length / other.length : null,
    'median-ms': sorted.length ? sorted[Math.floor(sorted.length / 2)] : null,
  };
}

const pct = (v) => (v === null || v === undefined ? '—' : `${Math.round(v * 100)}%`);
const skills = [...new Set(rows.map((r) => r.skill))];
const summary = { all: summarise(rows) };
for (const s of skills) summary[s] = summarise(rows.filter((r) => r.skill === s));

console.log('\n| skill | cases | success@1 | recall@5 | recall@10 | MRR | empty | deterministic | median ms |');
console.log('|---|---|---|---|---|---|---|---|---|');
for (const [name, s] of Object.entries(summary)) {
  console.log(`| ${name} | ${s.cases} | ${pct(s['success@1'])} | ${pct(s['recall@5'])} | ${pct(s['recall@10'])} | ${s.mrr === null ? '—' : s.mrr.toFixed(2)} | ${pct(s['empty-rate'])} | ${pct(s['deterministic-pass'])} | ${s['median-ms']} |`);
}
if (VERIFY) {
  console.log(`\ngold defects: ${goldDefects.length}`);
  for (const d of goldDefects) console.log(`  ${d}`);
}

mkdirSync(`${root}gold/results`, { recursive: true });
const stamp = new Date().toISOString().replace(/[:.]/g, '-');
writeFileSync(`${root}gold/results/${stamp}${HINTS ? '-hints' : ''}.json`, JSON.stringify({ server: SERVER, hints: HINTS, at: new Date().toISOString(), summary, rows, goldDefects }, null, 2));
process.exit(goldDefects.length ? 2 : 0);
