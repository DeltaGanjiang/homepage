const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');

const read = name => fs.readFileSync(path.join(__dirname, name), 'utf8');
function boot({ saved = 'zh', blockedStorage = false } = {}) {
  const window = new EventTarget();
  const element = attrs => ({
    attrs: { ...attrs }, textContent: '', listeners: {},
    getAttribute(name) { return this.attrs[name] ?? null; },
    setAttribute(name, value) { this.attrs[name] = value; },
    addEventListener(name, listener) { this.listeners[name] = listener; }
  });
  const toggle = element({ 'aria-label': 'Switch to English' });
  const image = element({ alt: '支持的平台' });
  const text = { nodeValue: '\n  研究论文同行评审须知  ', isConnected: true, parentElement: { closest: () => null } };
  const doc = {
    documentElement: { lang: 'zh-CN' },
    createTreeWalker() { let used = false; return { nextNode: () => used ? null : (used = true, text) }; },
    querySelector: () => toggle,
    querySelectorAll: () => [toggle, image]
  };
  const storage = new Map(saved ? [['gan-jiang-language', saved]] : []);
  const localStorage = {
    getItem(key) { if (blockedStorage) throw new Error('Storage blocked'); return storage.get(key); },
    setItem(key, value) { if (blockedStorage) throw new Error('Storage blocked'); storage.set(key, value); }
  };
  const context = vm.createContext({ window, document: doc, localStorage, NodeFilter: { SHOW_TEXT: 4 }, Event });
  vm.runInContext(read('locales.en.js'), context);
  vm.runInContext(read('i18n.js'), context);
  return { window, doc, toggle, image, text, storage, context };
}

test('switches text, accessible labels and the shared preference in both directions', () => {
  const { window, doc, toggle, image, text, storage } = boot();
  let renders = 0;
  window.addEventListener('ganjiang:languagechange', () => renders++);
  assert.equal(doc.documentElement.lang, 'zh-CN');
  toggle.listeners.click();
  assert.equal(doc.documentElement.lang, 'en');
  assert.equal(text.nodeValue, '\n  Guidance for peer reviewers and editors  ');
  assert.equal(image.attrs.alt, 'Supported platforms');
  assert.equal(toggle.textContent, '中文');
  assert.equal(storage.get('gan-jiang-language'), 'en');
  toggle.listeners.click();
  assert.equal(text.nodeValue, '\n  研究论文同行评审须知  ');
  assert.equal(image.attrs.alt, '支持的平台');
  assert.equal(toggle.textContent, 'EN');
  assert.equal(renders, 2);
});

test('works with blocked storage and ignores detached text from dynamic views', () => {
  const { window, doc, toggle, text } = boot({ blockedStorage: true });
  assert.equal(doc.documentElement.lang, 'en');
  text.isConnected = false;
  text.nodeValue = 'A dynamic view owns this node';
  toggle.listeners.click();
  assert.equal(text.nodeValue, 'A dynamic view owns this node');
  assert.equal(doc.documentElement.lang, 'zh-CN');
  window.GanJiangI18n.setLanguage('en');
  assert.equal(window.GanJiangI18n.t('{count} 次流程 · 不含模型调用费用', { count: '12' }), '12 workflow runs · Model fees excluded');
});

test('every Chinese text and accessible attribute in the page has English copy', () => {
  const { window } = boot();
  const html = read('index.html');
  const strings = [...html.matchAll(/>([^<>]*[\u4e00-\u9fff][^<>]*)</g)].map(match => match[1].trim());
  strings.push(...[...html.matchAll(/(?:aria-label|alt|title|content)="([^"]*[\u4e00-\u9fff][^"]*)"/g)].map(match => match[1]));
  const missing = [...new Set(strings)].filter(text => !window.GanJiangEnglish[text]);
  assert.deepEqual(missing, []);
});

test('dynamic cases, calculation steps and hints all have English translations', () => {
  const { window, context } = boot();
  for (const filename of ['apps.js', 'credits.js']) {
    const strings = [...read(filename).matchAll(/'([^'\n]*[\u4e00-\u9fff][^'\n]*)'/g)].map(match => match[1]);
    assert.deepEqual(strings.filter(text => !window.GanJiangEnglish[text]), [], filename);
  }
  vm.runInContext(read('credits.js'), context);
  window.GanJiangI18n.setLanguage('en');
  for (const task of ['single', 'element', 'multi', 'simulation', 'pdf', 'refinement']) {
    for (const refinement of ['none', 'gsas', 'wpem', 'fullprof']) {
      const result = window.GanJiangCredits.calculate({ task, refinement, quantity: 2, shifts: 2, baselines: 2, wpemExtra: true });
      result.steps.forEach(step => assert.doesNotMatch(window.GanJiangI18n.t(step.label), /[\u4e00-\u9fff]/));
    }
  }
});
