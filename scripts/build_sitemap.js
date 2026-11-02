const fs = require('fs');
const path = require('path');

const pagesData = require('../src/data/pagesContent.json');

const today = new Date().toISOString().split('T')[0];

const urls = [];

// Homepage
urls.push({
  loc: 'https://www.sksinfi.com/',
  lastmod: today,
  changefreq: 'weekly',
  priority: '1.0'
});

// Priority map for specific high-value categories
const highPriority = new Set([
  'loan', 'real_estate', 'investment', 'insurance', 'sksinfi_nri',
  'home_loan', 'personal-loan', 'business-loan', 'residential',
  'commercial', 'industrial', 'mutual_funds', 'health', 'life',
  'taxation', 'itr', 'about', 'contact'
]);

const dedicatedCleanRoutes = [
  'about', 'contact', 'blogs', 'calculator', 'partner-with-us',
  'careers', 'enquirynow', 'sksinfin'
];

for (const route of dedicatedCleanRoutes) {
  urls.push({
    loc: `https://www.sksinfi.com/${route}`,
    lastmod: today,
    changefreq: highPriority.has(route) ? 'weekly' : 'monthly',
    priority: route === 'about' || route === 'contact' ? '0.8' : '0.7'
  });
}

// Add all pages from pagesContent.json
for (const [slug, data] of Object.entries(pagesData)) {
  if (slug === 'index') continue;

  const priority = highPriority.has(slug) ? '0.8' : '0.6';
  const changefreq = highPriority.has(slug) ? 'weekly' : 'monthly';

  // Add the .php version (legacy canonical)
  urls.push({
    loc: `https://www.sksinfi.com/${slug}.php`,
    lastmod: today,
    changefreq,
    priority
  });

  // Add clean URL if not already added
  if (!dedicatedCleanRoutes.includes(slug)) {
    urls.push({
      loc: `https://www.sksinfi.com/${slug}`,
      lastmod: today,
      changefreq,
      priority
    });
  }
}

// Generate XML
const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    u => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

const outPath = path.resolve('public/sitemap.xml');
fs.writeFileSync(outPath, xmlContent, 'utf-8');
console.log('Successfully generated public/sitemap.xml with', urls.length, 'URLs.');
