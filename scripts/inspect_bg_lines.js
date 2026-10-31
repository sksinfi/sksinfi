const fs = require('fs');

const raw = fs.readFileSync('legacy_php/index.php', 'utf8');
const lines = raw.split('\n');
lines.forEach((l, i) => {
  if (l.includes('background-image')) {
    console.log(`Line ${i+1}: ${l.trim()}`);
  }
});
