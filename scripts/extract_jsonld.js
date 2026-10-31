const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'data', 'pagesContent.json');
const pages = JSON.parse(fs.readFileSync(filePath, 'utf8'));

let count = 0;
for (const slug in pages) {
  const page = pages[slug];
  const scripts = [];
  page.html = page.html.replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gi, (match, content) => {
    scripts.push(content.trim());
    count++;
    return '';
  });
  if (scripts.length > 0) {
    page.jsonLd = scripts;
  }
}

fs.writeFileSync(filePath, JSON.stringify(pages, null, 2), 'utf8');
console.log(`Extracted and removed ${count} script tags from pagesContent.json`);
