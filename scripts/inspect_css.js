const fs = require('fs');

const header = fs.readFileSync('legacy_php/header.php', 'utf8');

console.log('=== CSS Links in header.php ===');
const linkRegex = /<link[^>]+(?:rel=["']stylesheet["']|href=["'][^"']+\.css[^"']*["'])[^>]*>/gi;
let m;
while ((m = linkRegex.exec(header)) !== null) {
  console.log(m[0]);
}

console.log('\n=== Style tags in header.php ===');
const styleRegex = /<style([^>]*)>([\s\S]*?)<\/style>/gi;
let idx = 0;
while ((m = styleRegex.exec(header)) !== null) {
  idx++;
  console.log(`Style #${idx} (attrs: "${m[1].trim()}"): ${m[2].length} chars`);
}
