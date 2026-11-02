const fs = require('fs');
const path = require('path');

const legacyDir = path.resolve('legacy_php');
const files = fs.readdirSync(legacyDir).filter(f => f.endsWith('.php'));

// Parse meta.php for overrides
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

const DEFAULT_TITLE = 'Financial Consultant in Jaipur | Trusted SKS INFI Experts';
const DEFAULT_DESC = 'SKS INFI provides expert financial planning, investment, loan and insurance services as a trusted Financial Consultant in Jaipur. Contact us today for guidance.';
const DEFAULT_KEYWORDS = 'Financial Consultant in Jaipur, Financial Advisor in Jaipur';
const DEFAULT_IMAGE = 'https://www.sksinfi.com/img/aboutus.png';

// Fallback titles/descriptions for pages that had no custom $page_title in legacy
const customFallbacks = {
  'why_investment.php': {
    title: 'Why Investment | SKS INFI Financial Consultancy',
    description: 'Discover why investment planning is crucial for wealth compounding and financial independence. AMFI Registered Mutual Fund & Wealth Advisor in Jaipur.',
    keywords: 'Why Investment, Investment Advisor in Jaipur, Wealth Management Jaipur, Mutual Fund Consultant'
  },
  'investment.php': {
    title: 'Investment Services in Jaipur | Wealth Advisory & Mutual Funds | SKS INFI',
    description: 'Grow and preserve your wealth with SKS INFI. Expert investment planning, mutual funds, SIPs, bonds, and portfolio advisory in Jaipur.',
    keywords: 'Investment Services Jaipur, Wealth Advisory Jaipur, Mutual Funds Jaipur, SIP Investment Advisor'
  },
  'apply-now.php': {
    title: 'Apply Now | Loan & Financial Service Application | SKS INFI',
    description: 'Apply online for Home Loans, Business Loans, Personal Loans, Mortgage Loans and Financial Consultancy at SKS INFI Jaipur.',
    keywords: 'Apply Home Loan Jaipur, Apply Business Loan, Online Loan Application SKS INFI'
  },
  'calculate_sip.php': {
    title: 'SIP Calculator | Calculate Mutual Fund Investment Returns | SKS INFI',
    description: 'Use SKS INFI Systematic Investment Plan (SIP) calculator to calculate compounding returns on your mutual fund investments.',
    keywords: 'SIP Calculator, Mutual Fund Return Calculator, SKS INFI Investment Calculator'
  },
  'equity_demat.php': {
    title: 'Equity & Demat Account Services in Jaipur | SKS INFI',
    description: 'Open demat account and access expert equity investment and stock market guidance with SKS INFI Jaipur.',
    keywords: 'Demat Account Jaipur, Equity Investment Advisor Jaipur, Stock Market Guidance'
  },
  'fixed-deposit.php': {
    title: 'Corporate Fixed Deposit (FD) Consultant in India | SKS INFI',
    description: 'Secure high-yield corporate fixed deposits with trusted ratings and regular interest payouts through SKS INFI.',
    keywords: 'Corporate FD Advisor Jaipur, Fixed Deposit Consultant, High Yield FD India'
  },
  'ncd.php': {
    title: 'Non-Convertible Debentures (NCD) Investment in India | SKS INFI',
    description: 'Invest in secure Non-Convertible Debentures (NCDs) with attractive fixed returns and capital appreciation at SKS INFI.',
    keywords: 'NCD Investment India, Non-Convertible Debentures Advisor, Fixed Income Investment'
  },
  'unlisted_shares.php': {
    title: 'Unlisted Shares & Pre-IPO Investment Consultant | SKS INFI',
    description: 'Invest in top unlisted shares and pre-IPO opportunities with verified research and transparent transaction support at SKS INFI.',
    keywords: 'Unlisted Shares India, Pre-IPO Investment Consultant, Buy Unlisted Stocks'
  },
  'workingcapital.php': {
    title: 'Working Capital Loan & CC/OD Limits Consultant | SKS INFI',
    description: 'Optimize cash flow with Working Capital loans, Cash Credit (CC) and Overdraft (OD) facilities through SKS INFI financing.',
    keywords: 'Working Capital Loan Jaipur, CC Limit Consultant, Overdraft Facility Advisor'
  },
  'sitemap.html .php': {
    title: 'HTML Sitemap | SKS INFI',
    description: 'Complete website directory and navigation sitemap for SKS INFI financial consulting services.',
    keywords: 'SKS INFI Sitemap, Website Directory'
  }
};

const pagesData = {};

for (const file of files) {
  if (ignored.has(file)) continue;

  const raw = fs.readFileSync(path.join(legacyDir, file), 'utf-8');
  const slug = file.replace(/\.php$/, '');

  const titleMatch = raw.match(/\$page_title\s*=\s*["']([^"']+)["']/i);
  const metaDescMatch = raw.match(/\$meta_description\s*=\s*["']([^"']+)["']/i);
  const metaKeywordsMatch = raw.match(/\$meta_keywords\s*=\s*["']([^"']+)["']/i);
  const canonicalUrlMatch = raw.match(/\$canonical_url\s*=\s*["']([^"']+)["']/i);
  const canonicalLinkMatch = raw.match(/<link\s+[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/i);
  const includesMetaPhp = /include\s*['"]?meta\.php['"]?/i.test(raw);

  // Embedded OG tags
  const ogTitleMatch = raw.match(/<meta\s+property=["']og:title["']\s+content=["']([^"']+)["']/i);
  const ogDescMatch = raw.match(/<meta\s+property=["']og:description["']\s+content=["']([^"']+)["']/i);
  const ogImageMatch = raw.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i);

  // Embedded Twitter tags
  const twTitleMatch = raw.match(/<meta\s+name=["']twitter:title["']\s+content=["']([^"']+)["']/i);
  const twDescMatch = raw.match(/<meta\s+name=["']twitter:description["']\s+content=["']([^"']+)["']/i);
  const twImageMatch = raw.match(/<meta\s+name=["']twitter:image["']\s+content=["']([^"']+)["']/i);

  // Extract JSON-LD schemas
  const jsonLd = [];
  const scriptRegex = /<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/gi;
  let sMatch;
  while ((sMatch = scriptRegex.exec(raw)) !== null) {
    const trimmed = sMatch[1].trim();
    if (trimmed && trimmed !== '{\n  "@context": "https://schema.org",\n  "@type": "FAQPage",\n  "mainEntity": [\n    ...\n  ]\n}') {
      jsonLd.push(trimmed);
    }
  }

  // Determine effective Title & Description
  let effectiveTitle = DEFAULT_TITLE;
  let effectiveDescription = DEFAULT_DESC;
  let effectiveKeywords = DEFAULT_KEYWORDS;

  if (includesMetaPhp && metaMap[file]) {
    // Explicit override via meta.php
    effectiveTitle = metaMap[file].title;
    effectiveDescription = metaMap[file].description;
  } else if (titleMatch) {
    effectiveTitle = titleMatch[1];
    if (metaDescMatch) effectiveDescription = metaDescMatch[1];
  } else if (metaMap[file]) {
    effectiveTitle = metaMap[file].title;
    effectiveDescription = metaMap[file].description;
  } else if (customFallbacks[file]) {
    effectiveTitle = customFallbacks[file].title;
    effectiveDescription = customFallbacks[file].description;
  }

  if (metaKeywordsMatch) {
    effectiveKeywords = metaKeywordsMatch[1];
  } else if (customFallbacks[file]?.keywords) {
    effectiveKeywords = customFallbacks[file].keywords;
  }

  // Determine Canonical
  let canonical = canonicalUrlMatch ? canonicalUrlMatch[1] : (canonicalLinkMatch ? canonicalLinkMatch[1] : null);
  if (!canonical) {
    canonical = file === 'index.php' ? 'https://www.sksinfi.com/' : `https://www.sksinfi.com/${file}`;
  }

  // Open Graph & Twitter
  const cleanMetaVal = (val, fallback) => {
    if (!val || val.includes('<?php') || val.includes('<?=')) return fallback;
    return val.trim();
  };

  const ogTitle = cleanMetaVal(ogTitleMatch?.[1], effectiveTitle);
  const ogDescription = cleanMetaVal(ogDescMatch?.[1], effectiveDescription);
  const ogImage = cleanMetaVal(ogImageMatch?.[1], DEFAULT_IMAGE);

  const twitterTitle = cleanMetaVal(twTitleMatch?.[1], ogTitle);
  const twitterDescription = cleanMetaVal(twDescMatch?.[1], ogDescription);
  const twitterImage = cleanMetaVal(twImageMatch?.[1], ogImage);

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

  // Clean up any remaining PHP tags
  body = body.replace(/<\?php[\s\S]*?\?>/gi, '');
  body = body.replace(/<\?=\s*[\s\S]*?\?>/gi, '');

  // Strip duplicate meta tags, title tags, link canonicals, and ld+json scripts from body
  body = body.replace(/<title\b[^>]*>[\s\S]*?<\/title>/gi, '');
  body = body.replace(/<meta\b[^>]*>/gi, '');
  body = body.replace(/<link\s+[^>]*rel=["']canonical["'][^>]*>/gi, '');
  body = body.replace(/<script\s+type=["']application\/ld\+json["']>[\s\S]*?<\/script>/gi, '');

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

  // Normalize negative top offsets on images
  body = body.replace(/top:\s*-[0-9]+px;?/gi, 'top: 0px;');

  // Normalize relative .php links to start with '/'
  body = body.replace(/href=["']([a-zA-Z0-9_\-]+\.php(?:\?[^"']*)?(?:#[^"']*)?)["']/gi, 'href="/$1"');

  pagesData[slug] = {
    slug,
    file,
    title: effectiveTitle,
    metaDescription: effectiveDescription,
    keywords: effectiveKeywords,
    canonical,
    ogTitle,
    ogDescription,
    ogImage,
    twitterTitle,
    twitterDescription,
    twitterImage,
    jsonLd,
    html: body.trim()
  };
}

console.log('Successfully processed pages with full SEO data:', Object.keys(pagesData).length);

const outPath = path.resolve('src/data/pagesContent.json');
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(pagesData, null, 2), 'utf-8');
console.log('Saved enriched src/data/pagesContent.json');
