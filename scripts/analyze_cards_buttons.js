const fs = require('fs');
const pages = JSON.parse(fs.readFileSync('src/data/pagesContent.json', 'utf8'));

const btnClasses = new Set();
const cardClasses = new Set();

for (const slug in pages) {
  const html = pages[slug].html;
  const matches = html.match(/class=["']([^"']+)["']/gi) || [];
  matches.forEach(m => {
    const list = m.replace(/class=["']|["']/gi, '').split(/\s+/);
    list.forEach(c => {
      if (c.toLowerCase().includes('btn') || c.toLowerCase().includes('button')) btnClasses.add(c);
      if (c.toLowerCase().includes('card') || c.toLowerCase().includes('box') || c.toLowerCase().includes('blurb')) cardClasses.add(c);
    });
  });
}

console.log('Button classes:', Array.from(btnClasses).sort());
console.log('Card/Box classes:', Array.from(cardClasses).sort());
