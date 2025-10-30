#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const DOCS = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', 'docs.json'), 'utf8'));
const out = [];
const seen = new Set();

function addPage(p) {
  if (!p || typeof p !== 'string') return;
  // normalize index -> /
  let rel = p;
  if (rel === 'index') rel = '';
  if (!rel.startsWith('/')) rel = '/' + rel;
  // remove trailing slash
  rel = rel.replace(/\/+$/,'');
  const url = `http://localhost:3000${rel}`;
  if (!seen.has(url)) {
    seen.add(url);
    out.push(url);
  }
}

function walkPages(pages) {
  if (!pages) return;
  for (const p of pages) {
    if (typeof p === 'string') {
      addPage(p);
    } else if (typeof p === 'object') {
      if (p.pages) walkPages(p.pages);
    }
  }
}

// add root
seen.add('http://localhost:3000');
out.push('http://localhost:3000');

const languages = DOCS.navigation && DOCS.navigation.languages;
if (Array.isArray(languages)) {
  for (const lang of languages) {
    const dropdowns = lang.dropdowns || [];
    for (const dd of dropdowns) {
      if (dd.pages) walkPages(dd.pages);
    }
  }
}

// write to file
const dst = path.resolve(__dirname, '..', 'render-urls.txt');
fs.writeFileSync(dst, out.join('\n'), 'utf8');
console.log(`Wrote ${out.length} URLs to ${dst}`);
