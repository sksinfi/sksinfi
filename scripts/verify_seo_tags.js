const http = require('http');

function fetchUrl(path) {
  return new Promise((resolve, reject) => {
    http.get(`http://localhost:3006${path}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: data }));
    }).on('error', reject);
  });
}

async function testPage(path) {
  console.log(`\n================ Testing ${path} ================`);
  const res = await fetchUrl(path);
  console.log('Status:', res.status);
  
  const titleMatch = res.body.match(/<title>([^<]+)<\/title>/i);
  console.log('Title:', titleMatch ? titleMatch[1] : 'NOT FOUND');

  const descMatch = res.body.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i);
  console.log('Meta Description:', descMatch ? descMatch[1] : 'NOT FOUND');

  const keywordsMatch = res.body.match(/<meta\s+name=["']keywords["']\s+content=["']([^"']+)["']/i);
  console.log('Keywords:', keywordsMatch ? keywordsMatch[1] : 'NOT FOUND');

  const canMatch = res.body.match(/<link\s+[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/i);
  console.log('Canonical:', canMatch ? canMatch[1] : 'NOT FOUND');

  const ogTitle = res.body.match(/<meta\s+property=["']og:title["']\s+content=["']([^"']+)["']/i);
  const ogDesc = res.body.match(/<meta\s+property=["']og:description["']\s+content=["']([^"']+)["']/i);
  const ogImg = res.body.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i);
  console.log('OG Title:', ogTitle ? ogTitle[1] : 'NOT FOUND');
  console.log('OG Desc:', ogDesc ? ogDesc[1] : 'NOT FOUND');
  console.log('OG Image:', ogImg ? ogImg[1] : 'NOT FOUND');

  const twCard = res.body.match(/<meta\s+name=["']twitter:card["']\s+content=["']([^"']+)["']/i);
  console.log('Twitter Card:', twCard ? twCard[1] : 'NOT FOUND');

  const gtmMatch = res.body.includes('G-GGZPZB2RJF');
  console.log('Google Analytics/GTM (G-GGZPZB2RJF):', gtmMatch ? 'YES' : 'NO');

  const metaPixelMatch = res.body.includes('1586258296159685');
  console.log('Meta Pixel (1586258296159685):', metaPixelMatch ? 'YES' : 'NO');

  const googleVerify = res.body.match(/<meta\s+name=["']google-site-verification["']\s+content=["']([^"']+)["']/i);
  console.log('Google Verification:', googleVerify ? googleVerify[1] : 'NOT FOUND');

  const schemasCount = (res.body.match(/<script\s+type=["']application\/ld\+json["']/gi) || []).length;
  console.log('LD+JSON Schemas Count:', schemasCount);
}

async function run() {
  await testPage('/');
  await testPage('/about');
  await testPage('/residential.php');
  await testPage('/loan.php');
  await testPage('/why_insurance.php');

  console.log('\n================ Testing /robots.txt ================');
  const robots = await fetchUrl('/robots.txt');
  console.log('robots.txt status:', robots.status);
  console.log('robots.txt preview:\n' + robots.body.split('\n').slice(0, 10).join('\n'));
}

run().catch(console.error);
