/* Keep display headings free of sentence-ending punctuation in every language. */
(() => {
  const selector = 'h1,h2,h3,h4,h5,h6,.people-mission,.cover-heading';
  function tidy(heading) {
    const walker = document.createTreeWalker(heading, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      const text = node.nodeValue
        .replace(/[。！？]/gu, '')
        .replace(/\b([A-Za-z]+)\.(?=\s+[A-Za-z])/g, (match, word) => /^(Dr|Mr|Mrs|Ms|Prof|St|Fig|No)$/i.test(word) ? match : word)
        .replace(/[，。！？；：、,.!?;:…]+(?=\s*$)/u, '');
      if (text !== node.nodeValue) node.nodeValue = text;
    }
  }
  document.querySelectorAll(selector).forEach(tidy);
  // Language switches and dynamic views update existing headings asynchronously.
  new MutationObserver(records => {
    const headings = new Set();
    for (const record of records) {
      const element = record.target.nodeType === Node.TEXT_NODE ? record.target.parentElement : record.target;
      const heading = element?.closest?.(selector);
      if (heading) headings.add(heading);
      for (const node of record.addedNodes) {
        if (node.nodeType !== Node.ELEMENT_NODE) continue;
        if (node.matches(selector)) headings.add(node);
        node.querySelectorAll(selector).forEach(item => headings.add(item));
      }
    }
    headings.forEach(tidy);
  }).observe(document.body, {subtree:true, childList:true, characterData:true});
})();
