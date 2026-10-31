const fs = require('fs');
const path = require('path');
const https = require('https');

async function fetchUrl(url) {
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' }, timeout: 15000 }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        let redirectUrl = res.headers.location;
        if (!redirectUrl.startsWith('http')) {
          redirectUrl = 'https://www.sksinfi.com/' + redirectUrl.replace(/^\//, '');
        }
        return fetchUrl(redirectUrl).then(resolve);
      }
      if (res.statusCode !== 200) {
        console.warn(`Failed to fetch ${url} (status ${res.statusCode})`);
        return resolve('');
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', (err) => {
      console.warn(`Error fetching ${url}: ${err.message}`);
      resolve('');
    });
  });
}

async function main() {
  const publicCssDir = path.resolve('public/css');
  fs.mkdirSync(publicCssDir, { recursive: true });

  console.log('1. Extracting style tags from legacy_php/header.php...');
  const header = fs.readFileSync('legacy_php/header.php', 'utf8');
  const styleRegex = /<style([^>]*)>([\s\S]*?)<\/style>/gi;
  let headerStyles = [];
  let m;
  while ((m = styleRegex.exec(header)) !== null) {
    headerStyles.push(`/* Style block ${m[1] || ''} */\n` + m[2].trim());
  }
  console.log(`Extracted ${headerStyles.length} style blocks from header.php`);

  console.log('2. Fetching external CSS files from live site...');
  const externalCssUrls = [
    'https://www.sksinfi.com/wp-content/themes/Divi/style.css',
    'https://www.sksinfi.com/wp-content/uploads/maxmegamenu/style.css',
    'https://www.sksinfi.com/wp-content/themes/Divi-child/style.css',
    'https://www.sksinfi.com/wp-content/plugins/slider-wd/booster/assets/css/global.css',
    'https://www.sksinfi.com/wp-content/plugins/supreme-modules-for-divi/styles/style.min.css',
    'https://www.sksinfi.com/wp-content/et-cache/2/et-divi-dynamic-2-late.css',
    'https://www.sksinfi.com/wp-content/plugins/addons-for-visual-composer/assets/css/lvca-frontend.css',
    'https://www.sksinfi.com/wp-content/plugins/addons-for-visual-composer/includes/addons/accordion/css/style.css',
    'https://www.sksinfi.com/wp-content/plugins/tablepress/css/build/default.css',
    'https://www.sksinfi.com/wp-includes/css/dist/block-library/style.min.css',
    'https://www.sksinfi.com/wp-content/plugins/wordpress-popup/assets/hustle-ui/css/hustle-global.min.css',
    'https://www.sksinfi.com/wp-content/plugins/wordpress-popup/assets/hustle-ui/css/hustle-popup.min.css'
  ];

  const fetchedStyles = [];
  for (const url of externalCssUrls) {
    console.log(`Fetching: ${url}`);
    const css = await fetchUrl(url);
    if (css && css.length > 0) {
      console.log(`  -> Got ${css.length} chars`);
      fetchedStyles.push(`/* External from ${url} */\n` + css);
    }
  }

  console.log('3. Checking local legacy_php/css font files...');
  const fontCssFiles = ['css', 'css-1', 'css-2', 'css-3', 'css-4'];
  const localFontCss = [];
  for (const file of fontCssFiles) {
    const fPath = path.resolve('legacy_php', file);
    if (fs.existsSync(fPath)) {
      const content = fs.readFileSync(fPath, 'utf8');
      localFontCss.push(`/* Local font css: ${file} */\n` + content);
    }
  }

  console.log('4. Combining and normalizing CSS paths...');
  let combinedCss = [
    ...localFontCss,
    ...headerStyles,
    ...fetchedStyles
  ].join('\n\n');

  // Normalize relative font / image paths in the CSS so they resolve to live site or relative root
  combinedCss = combinedCss.replace(/url\(\s*['"]?(?!https?:\/\/|\/|data:)(wp-content\/[^'")]+)['"]?\s*\)/gi, 'url(https://www.sksinfi.com/$1)');
  combinedCss = combinedCss.replace(/url\(\s*['"]?(?!https?:\/\/|\/|data:)(wp-includes\/[^'")]+)['"]?\s*\)/gi, 'url(https://www.sksinfi.com/$1)');
  combinedCss = combinedCss.replace(/url\(\s*['"]?(?!https?:\/\/|\/|data:)(s\/poppins\/[^'")]+)['"]?\s*\)/gi, 'url(https://fonts.gstatic.com/$1)');
  combinedCss = combinedCss.replace(/url\(\s*['"]?(?!https?:\/\/|\/|data:)(img\/[^'")]+)['"]?\s*\)/gi, 'url(/$1)');
  combinedCss = combinedCss.replace(/url\(\s*['"]?(?!https?:\/\/|\/|data:)(images\/[^'")]+)['"]?\s*\)/gi, 'url(/$1)');

  const outLegacyCss = path.join(publicCssDir, 'legacy.css');
  fs.writeFileSync(outLegacyCss, combinedCss, 'utf8');
  console.log(`Successfully wrote ${combinedCss.length} characters to ${outLegacyCss}`);
}

main().catch(err => {
  console.error('Error in main:', err);
  process.exit(1);
});
