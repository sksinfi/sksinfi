const fs = require('fs');
const path = require('path');

const dir = path.resolve('legacy_php');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.php'));

console.log('Total php files in legacy_php:', files.length);

const results = [];

for (const file of files) {
  if (['header.php', 'footer.php', 'meta.php', 'style.php', 'fns.php', 'wp-blog-header.php', 'wp-cron.php'].includes(file)) continue;
  const content = fs.readFileSync(path.join(dir, file), 'utf-8');
  const titleMatch = content.match(/\$page_title\s*=\s*["']([^"']+)["']/i);
  const h1Match = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  const h2Match = content.match(/<h2[^>]*>([\s\S]*?)<\/h2>/i);
  results.push({
    file,
    title: titleMatch ? titleMatch[1] : '',
    h1: h1Match ? h1Match[1].replace(/\s+/g, ' ').trim() : '',
    h2: h2Match ? h2Match[1].replace(/\s+/g, ' ').trim() : '',
    size: content.length
  });
}

console.log(JSON.stringify(results, null, 2));
