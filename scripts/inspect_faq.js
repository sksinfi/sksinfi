const pages = require('../src/data/pagesContent.json');
const indexHtml = pages['index'] ? pages['index'].html : '';

console.log('Last 2000 chars of index.html:\n');
console.log(indexHtml.slice(-2000));
