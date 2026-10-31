const fs = require('fs');
const path = require('path');

const legacyDir = path.resolve('legacy_php');
const files = fs.readdirSync(legacyDir).filter(f => f.endsWith('.php'));

const ignored = new Set([
  'header.php', 'footer.php', 'meta.php', 'style.php', 'fns.php',
  'wp-blog-header.php', 'wp-cron.php', 'connection.php'
]);

const pagesData = {};

for (const file of files) {
  if (ignored.has(file)) continue;

  const raw = fs.readFileSync(path.join(legacyDir, file), 'utf-8');
  const slug = file.replace(/\.php$/, '');

  const titleMatch = raw.match(/\$page_title\s*=\s*["']([^"']+)["']/i);
  const metaDescMatch = raw.match(/\$meta_description\s*=\s*["']([^"']+)["']/i);

  // Extract content between include('header.php'); ?> and include('footer.php');
  let body = raw;

  // Remove header include
  const headerIdx = body.search(/include\s*\(\s*['"]header\.php['"]\s*\)\s*;?\s*\??>/i);
  if (headerIdx !== -1) {
    const afterHeader = body.slice(headerIdx);
    const closeTagIdx = afterHeader.indexOf('?>');
    if (closeTagIdx !== -1) {
      body = afterHeader.slice(closeTagIdx + 2);
    } else {
      body = afterHeader.replace(/include\s*\(\s*['"]header\.php['"]\s*\)\s*;?/i, '');
    }
  }

  // Remove footer include
  const footerIdx = body.search(/<\?php\s*include\s*\(\s*['"]footer\.php['"]\s*\)\s*;?\s*\??>/i);
  if (footerIdx !== -1) {
    body = body.slice(0, footerIdx);
  }

  // Clean up any remaining PHP tags (e.g. form submission handling or dynamic PHP tags)
  body = body.replace(/<\?php[\s\S]*?\?>/gi, '');

  // Fix unclosed or escaped background-image URLs in style attributes
  body = body.replace(/style="background-image:\s*url\(([^">]+)(">)/gi, (m, urlContent, endQuote) => {
    let clean = urlContent.replace(/^['"]/, '').replace(/\\([ ()])/g, '$1').trim();
    if (!clean.startsWith('/')) clean = '/' + clean;
    return `style="background-image: url('${clean}');${endQuote}`;
  });

  // Normalize image and background URLs to start with '/'
  body = body.replace(/src=["'](?:\.\/)?img\//gi, 'src="/img/');
  body = body.replace(/src=["'](?:\.\/)?images\//gi, 'src="/images/');
  body = body.replace(/src=["'](?:\.\/)?admin\/upload_doc\//gi, 'src="/admin/upload_doc/');
  body = body.replace(/src=["'](?:\.\/)?upload_doc\//gi, 'src="/admin/upload_doc/');

  // Fix general url() attributes
  body = body.replace(/url\(\s*['"]?(?:admin\/upload_doc\/|img\/|images\/)([^'")]+)['"]?\s*\)/gi, (m, p) => {
    let cleanPath = p.replace(/\\([ ()])/g, '$1').trim();
    if (m.includes('admin/upload_doc')) return `url('/admin/upload_doc/${cleanPath}')`;
    if (m.includes('img/')) return `url('/img/${cleanPath}')`;
    if (m.includes('images/')) return `url('/images/${cleanPath}')`;
    return m;
  });

  body = body.replace(/url\(\s*['"]?(?:\.\/)?img\//gi, 'url(/img/');
  body = body.replace(/url\(\s*['"]?(?:\.\/)?images\//gi, 'url(/images/');
  body = body.replace(/url\(\s*['"]?(?:\.\/)?admin\/upload_doc\//gi, 'url(/admin/upload_doc/');

  // Normalize negative top offsets on images (e.g. top: -140px)
  body = body.replace(/top:\s*-[0-9]+px;?/gi, 'top: 0px;');

  // Normalize relative .php links to start with '/'
  body = body.replace(/href=["']([a-zA-Z0-9_\-]+\.php(?:\?[^"']*)?(?:#[^"']*)?)["']/gi, 'href="/$1"');

  pagesData[slug] = {
    slug,
    file,
    title: titleMatch ? titleMatch[1] : 'SKS INFI',
    metaDescription: metaDescMatch ? metaDescMatch[1] : '',
    html: body.trim()
  };
}

console.log('Successfully processed pages with normalized paths:', Object.keys(pagesData).length);

const outPath = path.resolve('src/data/pagesContent.json');
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(pagesData, null, 2), 'utf-8');
console.log('Saved updated src/data/pagesContent.json');
