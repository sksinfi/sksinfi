const fs = require('fs');
const path = require('path');

const legacyDir = path.resolve('legacy_php');
const files = fs.readdirSync(legacyDir).filter(f => f.endsWith('.php'));

const metaPhpRaw = fs.readFileSync(path.join(legacyDir, 'meta.php'), 'utf-8');
const metaMap = {};
const metaRegex = /'([a-zA-Z0-9_\-\.]+)'\s*=>\s*\[\s*'title'\s*=>\s*['"]([^'"]+)['"]\s*,\s*'description'\s*=>\s*['"]([^'"]+)['"]\s*\]/g;
let m;
while ((m = metaRegex.exec(metaPhpRaw)) !== null) {
  metaMap[m[1]] = { title: m[2], description: m[3] };
}

const ignored = new Set([
  'header.php', 'footer.php', 'meta.php', 'style.php', 'fns.php',
  'wp-blog-header.php', 'wp-cron.php', 'connection.php'
]);

const report = [];

for (const file of files) {
  if (ignored.has(file)) continue;

  const content = fs.readFileSync(path.join(legacyDir, file), 'utf-8');
  const pt = content.match(/\$page_title\s*=\s*["']([^"']+)["']/i);
  const md = content.match(/\$meta_description\s*=\s*["']([^"']+)["']/i);
  const mk = content.match(/\$meta_keywords\s*=\s*["']([^"']+)["']/i);
  const canUrl = content.match(/\$canonical_url\s*=\s*["']([^"']+)["']/i);
  const canLink = content.match(/<link\s+[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/i);
  const incMeta = /include\s*['"]?meta\.php['"]?/i.test(content);

  // Embedded og tags
  const ogTitle = content.match(/<meta\s+property=["']og:title["']\s+content=["']([^"']+)["']/i);
  const ogDesc = content.match(/<meta\s+property=["']og:description["']\s+content=["']([^"']+)["']/i);
  const ogImage = content.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i);

  // Embedded twitter tags
  const twTitle = content.match(/<meta\s+name=["']twitter:title["']\s+content=["']([^"']+)["']/i);
  const twDesc = content.match(/<meta\s+name=["']twitter:description["']\s+content=["']([^"']+)["']/i);
  const twImage = content.match(/<meta\s+name=["']twitter:image["']\s+content=["']([^"']+)["']/i);

  // Embedded schemas
  const schemas = [];
  const scriptRegex = /<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/gi;
  let sMatch;
  while ((sMatch = scriptRegex.exec(content)) !== null) {
    schemas.push(sMatch[1].trim());
  }

  // Determine final effective Title, Description, Keywords, Canonical, OG, Twitter
  let effectiveTitle = 'Financial Consultant in Jaipur | Trusted SKS INFI Experts';
  let effectiveDescription = 'SKS INFI provides expert financial planning, investment, loan and insurance services as a trusted Financial Consultant in Jaipur. Contact us today for guidance.';
  let effectiveKeywords = 'Financial Consultant in Jaipur, Financial Advisor in Jaipur';

  // If meta.php is included and has mapping, that was the override in PHP
  if (incMeta && metaMap[file]) {
    effectiveTitle = metaMap[file].title;
    effectiveDescription = metaMap[file].description;
  } else if (pt) {
    effectiveTitle = pt[1];
    if (md) effectiveDescription = md[1];
  } else if (metaMap[file]) {
    effectiveTitle = metaMap[file].title;
    effectiveDescription = metaMap[file].description;
  }

  if (mk) {
    effectiveKeywords = mk[1];
  }

  // Canonical
  let effectiveCanonical = canUrl ? canUrl[1] : (canLink ? canLink[1] : null);
  if (!effectiveCanonical) {
    effectiveCanonical = file === 'index.php' 
      ? 'https://www.sksinfi.com/' 
      : `https://www.sksinfi.com/${file}`;
  }

  report.push({
    file,
    slug: file.replace(/\.php$/, ''),
    effectiveTitle,
    effectiveDescription,
    effectiveKeywords,
    effectiveCanonical,
    ogTitle: ogTitle ? ogTitle[1] : effectiveTitle,
    ogDescription: ogDesc ? ogDesc[1] : effectiveDescription,
    ogImage: ogImage ? ogImage[1] : 'https://www.sksinfi.com/img/aboutus.png',
    twitterTitle: twTitle ? twTitle[1] : (ogTitle ? ogTitle[1] : effectiveTitle),
    twitterDescription: twDesc ? twDesc[1] : (ogDesc ? ogDesc[1] : effectiveDescription),
    twitterImage: twImage ? twImage[1] : (ogImage ? ogImage[1] : 'https://www.sksinfi.com/img/aboutus.png'),
    schemasCount: schemas.length,
    schemas
  });
}

console.log('Total valid pages evaluated:', report.length);
const withoutCustomTitle = report.filter(r => r.effectiveTitle === 'Financial Consultant in Jaipur | Trusted SKS INFI Experts' && r.file !== 'index.php');
console.log('Pages using global fallback title:', withoutCustomTitle.map(r => r.file));

// Print summary of a few pages
console.log('\n--- SAMPLE EXTRACTED PAGES ---');
console.log(JSON.stringify(report.slice(0, 5).map(r => ({
  file: r.file,
  title: r.effectiveTitle,
  canonical: r.effectiveCanonical,
  keywords: r.effectiveKeywords.slice(0, 50) + '...',
  schemas: r.schemasCount
})), null, 2));

// Save full report to scripts/seo_extracted_data.json
fs.writeFileSync(path.resolve('scripts/seo_extracted_data.json'), JSON.stringify(report, null, 2), 'utf-8');
console.log('Full SEO data saved to scripts/seo_extracted_data.json');
