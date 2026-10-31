const pages = require('../src/data/pagesContent.json');
const html = pages['index'] ? pages['index'].html : '';

const lines = html.split('\n');
lines.forEach((l, i) => {
  if (l.includes('background-image')) {
    console.log(`Line ${i+1}: ${l.trim()}`);
  }
});
