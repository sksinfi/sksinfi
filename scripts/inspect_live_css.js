const https = require('https');
const fs = require('fs');

https.get('https://www.sksinfi.com/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const linkRegex = /<link[^>]+href=["']([^"']+\.css[^"']*)["'][^>]*>/gi;
    let match;
    const links = [];
    while ((match = linkRegex.exec(data)) !== null) {
      links.push(match[1]);
    }
    console.log('Linked CSS on live site:', links);
  });
});
