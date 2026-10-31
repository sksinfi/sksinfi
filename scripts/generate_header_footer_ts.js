const fs = require('fs');
const path = require('path');

const headerHtml = fs.readFileSync('src/data/authenticHeader.html', 'utf8');
const footerHtml = fs.readFileSync('src/data/authenticFooter.html', 'utf8');

const headerTs = `// Auto-generated authentic header HTML from legacy_php/header.php
export const authenticHeaderHtml = ${JSON.stringify(headerHtml)};
`;

const footerTs = `// Auto-generated authentic footer HTML from legacy_php/footer.php
export const authenticFooterHtml = ${JSON.stringify(footerHtml)};
`;

fs.writeFileSync('src/data/authenticHeader.ts', headerTs, 'utf8');
fs.writeFileSync('src/data/authenticFooter.ts', footerTs, 'utf8');

console.log('Successfully created src/data/authenticHeader.ts and src/data/authenticFooter.ts');
