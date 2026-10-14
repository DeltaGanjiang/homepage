/* Dated display reference, not a live quote or a payment API.
 * Update the rate, date and source together after checking a fresh quote.
 */
(function (root) {
  'use strict';
  var reference = Object.freeze({
    creditsPerCny: 100,
    cnyPerUsd: 6.6923,
    date: '2026-10-14',
    source: 'CurrencyBeacon',
    sourceUrl: 'https://www.currencybeacon.com/rates/USD/CNY'
  });
  var dollars = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  function usd(credits) {
    if (typeof credits !== 'number' || !Number.isFinite(credits) || credits < 0) {
      throw new RangeError('Credits must be a finite nonnegative number');
    }
    // Convert the full credit amount before rounding for display.
    return credits / reference.creditsPerCny / reference.cnyPerUsd;
  }
  function formatUsd(credits) {
    var amount = usd(credits);
    return amount > 0 && amount < 0.01 ? '< US$0.01' : 'US$' + dollars.format(amount);
  }
  root.GanJiangMoney = Object.freeze({ reference: reference, usd: usd, formatUsd: formatUsd });
})(typeof window !== 'undefined' ? window : globalThis);
