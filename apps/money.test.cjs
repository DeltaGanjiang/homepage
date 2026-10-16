const test = require('node:test');
const assert = require('node:assert/strict');
require('./money.js');
require('./credits.js');
const { usd, formatUsd, reference } = globalThis.GanJiangMoney;
const { calculate } = globalThis.GanJiangCredits;

test('converts the confirmed RMB recharge rate to USD using the checked exchange rate', () => {
  assert.equal(reference.creditsPerCny, 990 / 9.9);
  assert.equal(reference.cnyPerUsd, 6.6923);
  assert.equal(reference.date, '2026-10-14');
  assert.equal(usd(990), 9.9 / 6.6923);
  assert.equal(formatUsd(990), 'US$1.48');
});

test('converts the full workflow before rounding instead of summing rounded dollar lines', () => {
  const result = calculate({ task: 'single', candidates: 3 });
  assert.equal(result.total, 860);
  assert.equal(formatUsd(result.total), 'US$1.29');
  assert.deepEqual(result.steps.map(step => formatUsd(step.credits)), ['US$0.60', 'US$0.60', 'US$0.09']);
  const repeated = calculate({ task: 'single', candidates: 3, quantity: 2 });
  assert.equal(formatUsd(repeated.total), 'US$2.57');
});

test('prices all tool references and refinement range endpoints consistently', () => {
  const expected = new Map([[20, 'US$0.03'], [100, 'US$0.15'], [400, 'US$0.60'], [600, 'US$0.90'], [700, 'US$1.05'], [800, 'US$1.20'], [1100, 'US$1.64'], [1200, 'US$1.79'], [1220, 'US$1.82'], [1820, 'US$2.72'], [2420, 'US$3.62'], [4900, 'US$7.32']]);
  expected.forEach((label, credits) => assert.equal(formatUsd(credits), label));
  assert.equal(formatUsd(calculate({ task: 'refinement', refinement: 'fullprof' }).total), 'US$7.32');
  assert.equal(formatUsd(calculate({ task: 'refinement', refinement: 'wpem', wpemRuns: 4 }).total), 'US$3.62');
});

test('handles free amounts and fractions without reporting a positive cost as zero', () => {
  assert.equal(formatUsd(0), 'US$0.00');
  assert.equal(formatUsd(1), '< US$0.01');
  for (const value of [-1, NaN, Infinity, undefined, '100']) assert.throws(() => usd(value), RangeError);
});
