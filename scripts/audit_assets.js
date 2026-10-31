const fs = require('fs');
const path = require('path');

const pages = require('../src/data/pagesContent.json');
const header = require('../src/data/authenticHeader.ts');
const footer = require('../src/data/authenticFooter.ts');
const blogs = require('../src/data/blogsData.ts');

const referenced = new Set();
const imgRegex = /src=["']([^"']+\.(?:png|jpg|jpeg|svg|webp|gif))["']/gi;

function scanText(text) {
  if (!text) return;
  let match;
  while ((match = imgRegex.exec(text)) !== null) {
    referenced.add(match[1]);
  }
}

// 1. Scan pagesContent
for (const [slug, data] of Object.entries(pages)) {
  scanText(data.html);
}

// 2. Scan Header & Footer files directly
const headerContent = fs.readFileSync(path.resolve('src/data/authenticHeader.ts'), 'utf8');
const footerContent = fs.readFileSync(path.resolve('src/data/authenticFooter.ts'), 'utf8');
scanText(headerContent);
scanText(footerContent);

// 3. Scan blogsData
const blogsContent = fs.readFileSync(path.resolve('src/data/blogsData.ts'), 'utf8');
scanText(blogsContent);

// 4. Scan CSS for url(...)
const cssContent = fs.readFileSync(path.resolve('public/css/legacy.css'), 'utf8');
const urlRegex = /url\(["']?([^"')]+\.(?:png|jpg|jpeg|svg|webp|gif))["']?\)/gi;
let urlMatch;
while ((urlMatch = urlRegex.exec(cssContent)) !== null) {
  referenced.add(urlMatch[1]);
}

const missing = [];
const publicDir = path.resolve('public');

for (const ref of referenced) {
  if (ref.startsWith('http://') || ref.startsWith('https://') || ref.startsWith('data:')) continue;
  const cleanPath = ref.startsWith('/') ? ref.slice(1) : ref;
  const filePath = path.join(publicDir, cleanPath);
  if (!fs.existsSync(filePath)) {
    missing.push({ ref, filePath });
  }
}

console.log('Total referenced assets:', referenced.size);
console.log('Missing assets count:', missing.length);
if (missing.length > 0) {
  console.log('Missing items:', JSON.stringify(missing, null, 2));
}
