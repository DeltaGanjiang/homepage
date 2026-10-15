const test = require('node:test');
const assert = require('node:assert/strict');
require('./credits.js');
const calculate = globalThis.GanJiangCredits.calculate;

test('single or multiple CIFs cost 100 per submitted simulation task; PDF reports cost 800', () => {
  assert.equal(calculate({ task: 'simulation', cifCount: 1 }).total, 100);
  assert.equal(calculate({ task: 'simulation', cifCount: 12 }).total, 100);
  assert.equal(calculate({ task: 'simulation', cifCount: 12, quantity: 3 }).total, 300);
  assert.equal(calculate({ task: 'pdf' }).total, 800);
  assert.equal(calculate({ task: 'pdf', quantity: 4 }).total, 3200);
});

test('single-phase matching charges once, then per candidate and shift validation', () => {
  assert.equal(calculate({ task: 'single', match: false }).total, 400);
  assert.equal(calculate({ task: 'single', candidates: 0 }).total, 800);
  assert.equal(calculate({ task: 'single', candidates: 3 }).total, 860);
  assert.equal(calculate({ task: 'single', candidates: 3, shifts: 2 }).total, 900);
  assert.equal(calculate({ task: 'element', match: false }).total, 700);
  assert.equal(calculate({ task: 'element', candidates: 0 }).total, 1100);
  assert.equal(calculate({ task: 'element', candidates: 3, shifts: 2 }).total, 1200);
});

test('unmatched peaks do not incur hidden candidate, shift, or downstream refinement fees', () => {
  assert.equal(calculate({ task: 'single', match: false, candidates: 10, shifts: 10, refinement: 'fullprof' }).total, 400);
});

test('multiphase validation counts combinations, with optional single-phase baseline submissions', () => {
  assert.equal(calculate({ task: 'multi', combinations: 0 }).total, 600);
  assert.equal(calculate({ task: 'multi', combinations: 3, baselines: 2 }).total, 1460);
});

test('refinement references include exactly one final validation per workflow', () => {
  assert.equal(calculate({ task: 'refinement', refinement: 'gsas' }).total, 1220);
  assert.equal(calculate({ task: 'refinement', refinement: 'wpem', wpemRuns: 3 }).total, 1820);
  assert.equal(calculate({ task: 'refinement', refinement: 'wpem', wpemRuns: 4 }).total, 2420);
  assert.equal(calculate({ task: 'refinement', refinement: 'wpem', wpemRuns: 3, wpemExtra: true }).total, 3020);
  assert.equal(calculate({ task: 'refinement', refinement: 'wpem', wpemRuns: 4, wpemExtra: true }).total, 3620);
  const fullprof = calculate({ task: 'refinement', refinement: 'fullprof' });
  assert.equal(fullprof.total, 4520);
  assert.equal(fullprof.isUpperBound, true);
});

test('identification and refinement accumulate, and repeating the workflow scales all submitted steps', () => {
  const result = calculate({ task: 'single', candidates: 3, refinement: 'gsas', quantity: 2 });
  assert.equal(result.total, 4160);
  assert.equal(result.steps.find(step => step.label === '候选校验').count, 6);
  assert.equal(result.steps.find(step => step.label === '精修最终校验').count, 2);
  assert.equal(result.steps.reduce((sum, step) => sum + step.credits, 0), result.total);
});

test('switching to a standalone report cannot retain a hidden refinement charge', () => {
  assert.equal(calculate({ task: 'simulation', refinement: 'fullprof' }).total, 100);
  assert.equal(calculate({ task: 'pdf', refinement: 'wpem', wpemExtra: true }).total, 800);
});

test('invalid counts cannot produce negative, fractional, or infinite credits', () => {
  assert.equal(calculate({ task: 'single', candidates: -5, shifts: -1, quantity: -2 }).total, 800);
  assert.equal(calculate({ task: 'single', candidates: 2.9, shifts: 0 }).total, 840);
  assert.equal(calculate({ task: 'simulation', quantity: '' }).total, 100);
  assert.equal(calculate({ task: 'simulation', quantity: Infinity }).total, 100);
  assert.throws(() => calculate({ task: 'unknown-task' }), RangeError);
});
