const pages = require('../src/data/pagesContent.json');
const indexHtml = pages['index'] ? pages['index'].html : '';
console.log('Total length:', indexHtml.length);
const sections = (indexHtml.match(/<div[^>]+class=["'][^"']*et_pb_section[^"']*["']/gi) || []);
console.log('Divi sections count in indexHtml:', sections.length);
sections.forEach((s, idx) => console.log(`  Section ${idx + 1}: ${s}`));
