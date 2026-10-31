const fs = require('fs');
const path = require('path');

const headerContent = fs.readFileSync('legacy_php/header.php', 'utf8');
const footerContent = fs.readFileSync('legacy_php/footer.php', 'utf8');

// 1. Extract Header HTML
const topHeaderIdx = headerContent.indexOf('id="top-header"');
const startIdx = headerContent.lastIndexOf('<div', topHeaderIdx);
const endHeaderIdx = headerContent.indexOf('</header>');
const headerEnd = endHeaderIdx !== -1 ? endHeaderIdx + '</header>'.length : -1;

let headerHtml = headerContent.substring(startIdx, headerEnd);

// Also extract WhatsApp button from header.php
const waIdx = headerContent.indexOf('class="btn whatsapp-btn"');
let waButton = '';
if (waIdx !== -1) {
  const waStart = headerContent.lastIndexOf('<a', waIdx);
  const waEnd = headerContent.indexOf('</a>', waIdx) + 4;
  waButton = headerContent.substring(waStart, waEnd);
}

// Normalize links in header:
headerHtml = headerHtml.replace(/src=["'](?:\.\/)?img\//gi, 'src="/img/');
headerHtml = headerHtml.replace(/src=["'](?:\.\/)?images\//gi, 'src="/images/');
headerHtml = headerHtml.replace(/href=["']([a-zA-Z0-9_\-]+\.php(?:\?[^"']*)?(?:#[^"']*)?)["']/gi, 'href="/$1"');
headerHtml = headerHtml.replace(/href=["']index\.php["']/gi, 'href="/"');

// Add WhatsApp button to header
headerHtml += '\n' + waButton;

// 2. Extract Footer HTML
let footerHtml = footerContent;
// Clean php tags
footerHtml = footerHtml.replace(/<\?php[\s\S]*?\?>/gi, '');
// Normalize links and images
footerHtml = footerHtml.replace(/src=["'](?:\.\/)?img\//gi, 'src="/img/');
footerHtml = footerHtml.replace(/src=["'](?:\.\/)?images\//gi, 'src="/images/');
footerHtml = footerHtml.replace(/href=["']([a-zA-Z0-9_\-]+\.php(?:\?[^"']*)?(?:#[^"']*)?)["']/gi, 'href="/$1"');
footerHtml = footerHtml.replace(/href=["']index\.php["']/gi, 'href="/"');

fs.writeFileSync('src/data/authenticHeader.html', headerHtml, 'utf8');
fs.writeFileSync('src/data/authenticFooter.html', footerHtml, 'utf8');

console.log('Saved src/data/authenticHeader.html (' + headerHtml.length + ' chars)');
console.log('Saved src/data/authenticFooter.html (' + footerHtml.length + ' chars)');
