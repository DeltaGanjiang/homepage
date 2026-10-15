/* Reference credits from publisher/干将XRD功能积分与费用估算.md,
 * with user-confirmed rates: simulations cost 100 per task, validations cost 20 each.
 * These are displayed reference units, not a payment or billing API.
 */
(function (root) {
  'use strict';
  function count(value, fallback, min) {
    if (value === '' || value === null || value === undefined) return fallback;
    var number = Number(value);
    return Number.isFinite(number) ? Math.max(min || 0, Math.min(10000, Math.floor(number))) : fallback;
  }

  function calculate(input) {
    var task = input.task || 'single';
    var quantity = count(input.quantity, 1, 1);
    var matched = input.match !== false;
    var steps = [];
    function add(label, unit, times) {
      var repetitions = (times === undefined ? 1 : times) * quantity;
      if (repetitions > 0) steps.push({ label: label, count: repetitions, unit: unit, credits: unit * repetitions });
    }

    if (task === 'simulation') add('XRD 模拟（单个 / 多个 CIF）', 100);
    else if (task === 'pdf') add('PDF 卡分析', 800);
    else if (task === 'single' || task === 'element') {
      add('寻峰', 400);
      if (task === 'element') add('元素条件检索', 300);
      if (matched) {
        add('物相匹配', 400);
        add('候选校验', 20, count(input.candidates, 3));
        add('峰位偏移校验', 20, count(input.shifts, 0));
      }
    } else if (task === 'multi') {
      add('多相匹配', 400);
      add('多相分解', 200);
      add('组合校验', 20, count(input.combinations, 1));
      add('补查单相基线', 400, count(input.baselines, 0));
    } else if (task !== 'refinement') {
      throw new RangeError('Unknown analysis task');
    }

    var canRefine = task === 'refinement' || task === 'multi' || ((task === 'single' || task === 'element') && matched);
    var refinement = canRefine ? (input.refinement || 'none') : 'none';
    if (task === 'refinement' && refinement === 'none') refinement = 'gsas';
    if (refinement === 'gsas') {
      add('GSAS-II 计算', 1200);
      add('精修最终校验', 20);
    } else if (refinement === 'wpem') {
      add('WPEM 计算', 600, Number(input.wpemRuns) === 4 ? 4 : 3);
      if (input.wpemExtra === true) add('WPEM 补充试算', 600, 2);
      add('精修最终校验', 20);
    } else if (refinement === 'fullprof') {
      add('FullProf 计算（最多）', 1500, 3);
      add('精修最终校验', 20);
    } else if (refinement !== 'none') {
      throw new RangeError('Unknown refinement method');
    }

    return {
      total: steps.reduce(function (sum, step) { return sum + step.credits; }, 0),
      quantity: quantity,
      steps: steps,
      refinement: refinement,
      isUpperBound: refinement === 'fullprof'
    };
  }

  root.GanJiangCredits = Object.freeze({ calculate: calculate });
})(typeof window !== 'undefined' ? window : globalThis);
