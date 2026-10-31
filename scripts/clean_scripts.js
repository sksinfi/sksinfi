const fs = require('fs');
const path = require('path');

const filePath = path.resolve('src/data/pagesContent.json');
const pages = JSON.parse(fs.readFileSync(filePath, 'utf8'));

let totalRemoved = 0;

for (const [slug, page] of Object.entries(pages)) {
  let html = page.html;

  // 1. Temporarily extract JSON-LD scripts
  const jsonLdBlocks = [];
  html = html.replace(/<script\s+type=["']application\/ld\+json["'][\s\S]*?<\/script>/gi, (match) => {
    const placeholder = `__JSON_LD_PLACEHOLDER_${jsonLdBlocks.length}__`;
    jsonLdBlocks.push(match);
    return placeholder;
  });

  // 2. Remove broken // <script> block and dangling //
  html = html.replace(/\/\/\s*<script[\s\S]*?<\/script>/gi, '');
  html = html.replace(/\/\/\s*(?=<section\s+class=["']faq-section)/gi, '');

  // 3. Remove all other script tags (executable JS)
  const scriptRegex = /<script\b[\s\S]*?<\/script>/gi;
  const matches = html.match(scriptRegex);
  if (matches) {
    totalRemoved += matches.length;
    console.log(`Removing ${matches.length} scripts from ${slug}`);
    html = html.replace(scriptRegex, '');
  }

  // 4. Remove any orphan </script> tags left
  html = html.replace(/<\/script>/gi, '');

  // 5. Restore JSON-LD blocks
  jsonLdBlocks.forEach((block, idx) => {
    html = html.replace(`__JSON_LD_PLACEHOLDER_${idx}__`, block);
  });

  page.html = html;
}

fs.writeFileSync(filePath, JSON.stringify(pages, null, 2), 'utf8');
console.log(`Successfully completed! Cleaned ${totalRemoved} executable script blocks.`);
