const fs = require('fs');

let headerHtml = fs.readFileSync('src/data/authenticHeader.html', 'utf8');
let footerHtml = fs.readFileSync('src/data/authenticFooter.html', 'utf8');

// 1. Add BLOGS in top header
if (!headerHtml.includes('href="/blogs"')) {
  // Add after partner-with-us.php
  const partnerMatch = headerHtml.match(/<li[^>]*><a[^>]*href="\/partner-with-us\.php"[^>]*>[\s\S]*?<\/a><\/li>/i);
  if (partnerMatch) {
    const blogsTopItem = `\n                        <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-3062 boxline"><a href="/blogs">BLOGS</a></li>`;
    headerHtml = headerHtml.replace(partnerMatch[0], partnerMatch[0] + blogsTopItem);
    console.log('Added BLOGS to top header');
  }

  // Add before contact.php in mega menu
  const contactMatch = headerHtml.match(/<li[^>]*class='[^']*mega-menu-item-3164'[^>]*><a[^>]*href="\/contact\.php"[^>]*>[\s\S]*?<\/a><\/li>/i);
  if (contactMatch) {
    const blogsMegaItem = `                                <li class='mega-menu-item mega-menu-item-type-post_type mega-menu-item-object-page mega-align-bottom-left mega-menu-flyout mega-menu-item-3164' id='mega-menu-item-blogs'><a class="mega-menu-link" href="/blogs" tabindex="0" id="blogs_link">BLOGS</a></li>\n`;
    headerHtml = headerHtml.replace(contactMatch[0], blogsMegaItem + contactMatch[0]);
    console.log('Added BLOGS to mega-menu');
  }

  fs.writeFileSync('src/data/authenticHeader.html', headerHtml, 'utf8');
}

// 2. Add BLOGS in footer
if (!footerHtml.includes('href="/blogs"')) {
  const sitemapMatch = footerHtml.match(/<a[^>]*href="[^"]*sitemap\.php"[^>]*>[\s\S]*?<\/a>/i);
  if (sitemapMatch) {
    const blogsFooterItem = `\n<li>\n        <i class="fa fa-angle-right me-2 clricn"></i>\n        <a href="/blogs" class="text-light text-decoration-none txtnew" title="Financial Blogs & Insights">Financial Blogs & Insights</a>\n    </li>`;
    footerHtml = footerHtml.replace(sitemapMatch[0], sitemapMatch[0] + blogsFooterItem);
    console.log('Added BLOGS to footer');
  }

  fs.writeFileSync('src/data/authenticFooter.html', footerHtml, 'utf8');
}

// 3. Re-generate TS exports
const headerTs = `// Auto-generated authentic header HTML from legacy_php/header.php\nexport const authenticHeaderHtml = ${JSON.stringify(headerHtml)};\n`;
const footerTs = `// Auto-generated authentic footer HTML from legacy_php/footer.php\nexport const authenticFooterHtml = ${JSON.stringify(footerHtml)};\n`;

fs.writeFileSync('src/data/authenticHeader.ts', headerTs, 'utf8');
fs.writeFileSync('src/data/authenticFooter.ts', footerTs, 'utf8');

console.log('Successfully updated authenticHeader.ts and authenticFooter.ts with BLOGS navigation!');
