const fs = require('fs');
const data = JSON.parse(fs.readFileSync('src/data/pagesContent.json', 'utf8'));

['about', 'index', 'accountstax', 'loan', 'why_insurance'].forEach(slug => {
  const html = data[slug].html;
  const start = html.indexOf('fincom-section');
  if (start !== -1) {
    console.log('=== PAGE:', slug, '===');
    console.log(html.slice(start, start + 600));
  }
});
