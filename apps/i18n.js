(function () {
  'use strict';
  var english = window.GanJiangEnglish;
  var language = 'en';
  var texts = [];
  var attributes = [];
  var walker = document.createTreeWalker(document.documentElement, NodeFilter.SHOW_TEXT);
  var node;
  // Keep original text nodes: switching language must not replace form controls,
  // links, event listeners, SVGs, or the user's current estimator settings.
  while ((node = walker.nextNode())) {
    if (!node.parentElement.closest('script, style, noscript') && /[\u4e00-\u9fff]/.test(node.nodeValue)) {
      texts.push({ node: node, value: node.nodeValue });
    }
  }
  document.querySelectorAll('[aria-label], [alt], [title], meta[content]').forEach(function (element) {
    ['aria-label', 'alt', 'title', 'content'].forEach(function (name) {
      var value = element.getAttribute(name);
      if (value && /[\u4e00-\u9fff]/.test(value)) attributes.push({ element: element, name: name, value: value });
    });
  });
  function translate(value, params) {
    var translated = language === 'en' ? (english[value] || value) : value;
    return translated.replace(/\{(\w+)\}/g, function (match, key) {
      return params && Object.prototype.hasOwnProperty.call(params, key) ? params[key] : match;
    });
  }
  function setLanguage(value) {
    language = value === 'zh' ? 'zh' : 'en';
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
    texts.forEach(function (entry) {
      if (entry.node.isConnected) entry.node.nodeValue = entry.value.replace(/\S[\s\S]*\S|\S/, function (text) { return translate(text); });
    });
    attributes.forEach(function (entry) { entry.element.setAttribute(entry.name, translate(entry.value)); });
    var toggle = document.querySelector('.language-toggle');
    toggle.textContent = language === 'en' ? '中文' : 'EN';
    toggle.setAttribute('aria-label', language === 'en' ? '切换至中文' : 'Switch to English');
    try { localStorage.setItem('gan-jiang-language', language); } catch (_) { /* File/private mode may block storage. */ }
    window.dispatchEvent(new Event('ganjiang:languagechange'));
  }
  window.GanJiangI18n = Object.freeze({
    t: translate,
    setLanguage: setLanguage,
    get language() { return language; }
  });
  document.querySelector('.language-toggle').addEventListener('click', function () {
    setLanguage(language === 'en' ? 'zh' : 'en');
  });
  window.addEventListener('storage', function (event) {
    if (event.key === 'gan-jiang-language') setLanguage(event.newValue);
  });
  var saved;
  try { saved = localStorage.getItem('gan-jiang-language'); } catch (_) { /* Same default as the homepage. */ }
  setLanguage(saved === 'zh' ? 'zh' : 'en');
})();
