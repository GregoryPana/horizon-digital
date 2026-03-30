import fs from 'fs';
const lh = JSON.parse(fs.readFileSync('lighthouse.json', 'utf8'));

console.log('--- Lighthouse Scores ---');
['performance', 'accessibility', 'best-practices', 'seo'].forEach(cat => {
  console.log(`${cat}: ${(lh.categories[cat].score * 100).toFixed(0)}`);
});

console.log('\n--- Core Web Vitals ---');
const metrics = lh.audits.metrics.details.items[0];
console.log(`LCP: ${metrics.largestContentfulPaint}ms`);
console.log(`FCP: ${metrics.firstContentfulPaint}ms`);
console.log(`CLS: ${metrics.cumulativeLayoutShift}`);
console.log(`Speed Index: ${metrics.speedIndex}ms`);
console.log(`TBT: ${metrics.totalBlockingTime}ms`);

console.log('\n--- SEO Issues ---');
const seoAudits = ['is-crawlable', 'document-title', 'meta-description', 'http-status-code', 'link-text', 'hreflang', 'canonical'];
seoAudits.forEach(id => {
  const audit = lh.audits[id];
  if(audit && audit.score !== 1) {
    let msg = audit.displayValue || audit.explanation || 'Failed';
    console.log(`[WARN] ${id}: ${audit.title} - ${msg}`);
  }
});

console.log('\n--- SEO Redirects & Links ---');
if (lh.audits['redirects'] && lh.audits['redirects'].score !== 1) {
  console.log(`[WARN] Redirects: ${lh.audits['redirects'].title}`);
}

console.log('\n--- Performance Opportunities ---');
Object.values(lh.audits).forEach(audit => {
  if (audit.score !== 1 && audit.score !== null && audit.details && audit.details.type === 'opportunity') {
    console.log(`[OPT] ${audit.title}: Savings ~${(audit.details.overallSavingsMs || 0).toFixed(0)}ms`);
  }
});
