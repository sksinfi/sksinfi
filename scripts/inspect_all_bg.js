const fs = require('fs');
const path = require('path');

const files = fs.readdirSync('legacy_php').filter(f => f.endsWith('.php'));
files.forEach(f => {
  const content = fs.readFileSync(path.join('legacy_php', f), 'utf8');
  const lines = content.split('\n');
  lines.forEach((l, i) => {
    if (l.includes('background-image')) {
      console.log(`${f}:${i+1} -> ${l.trim()}`);
    }
  });
});
