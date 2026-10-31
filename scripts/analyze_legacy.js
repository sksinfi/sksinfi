const fs = require('fs');

const footer = fs.readFileSync('legacy_php/footer.php', 'utf8');
console.log('Footer total length:', footer.length);
console.log('Footer snippet (first 1500 chars):');
console.log(footer.substring(0, 1500));
