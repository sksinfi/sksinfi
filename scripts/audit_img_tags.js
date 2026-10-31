const fs = require('fs');
const path = require('path');
const pages = require('../src/data/pagesContent.json');

const referenced = new Set();
const imgRegex = /src=["']([^"']+\.(?:png|jpg|jpeg|svg|webp|gif))["']/gi;

function scanText(text) {
  if (!text) return;
  let match;
  while ((match = imgRegex.exec(text)) !== null) {
    referenced.add(match[1]);
  }
}

for (const [slug, data] of Object.entries(pages)) {
  scanText(data.html);
}

const headerContent = fs.readFileSync(path.resolve('src/data/authenticHeader.ts'), 'utf8');
const footerContent = fs.readFileSync(path.resolve('src/data/authenticFooter.ts'), 'utf8');
scanText(headerContent);
scanText(footerContent);

const blogsContent = fs.readFileSync(path.resolve('src/data/blogsData.ts'), 'utf8');
scanText(blogsContent);

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

console.log('Total img src referenced assets:', referenced.size);
console.log('Missing img src assets:', missing.length);
if (missing.length > 0) {
  console.log('Missing items:', JSON.stringify(missing, null, 2));
}
