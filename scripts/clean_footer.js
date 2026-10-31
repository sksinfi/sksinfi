const fs = require('fs');
const path = require('path');

const footerPath = path.join(__dirname, '..', 'src', 'data', 'authenticFooter.ts');
let footer = fs.readFileSync(footerPath, 'utf8');

const marker = 'https://www.linkedin.com/in/sksinfi/';
const idx = footer.indexOf(marker);
if (idx === -1) {
  console.error("Could not find linkedin marker");
  process.exit(1);
}

// Find closing tag of <a>
const closeA = footer.indexOf('</a>', idx);
// Then closing </div> of text-center
const closeDiv1 = footer.indexOf('</div>', closeA);
// Then closing </div> of container
const closeDiv2 = footer.indexOf('</div>', closeDiv1 + 6);
// Then closing </div> of copyright bar
const closeDiv3 = footer.indexOf('</div>', closeDiv2 + 6);

const cleanSlice = footer.slice(0, closeDiv3 + 6);
const cleanContent = cleanSlice.replace(/\r\n/g, '\n') + '";\n';

fs.writeFileSync(footerPath, cleanContent, 'utf8');
console.log('Successfully cleaned authenticFooter.ts! New length:', cleanContent.length);
