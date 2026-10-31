const fs = require('fs');
const path = require('path');

const newWhySksHtml = `
<div class="et_pb_section et_pb_section_2 fincom-section et_pb_with_background et_section_regular" style="padding:0px;">
    <div class="container py-4">
        <div class="why-sks-header text-center mb-5">
            <span class="why-sks-badge"><i class="fa-solid fa-gem me-1"></i> WHY CHOOSE SKS INFI</span>
            <h2 class="why-sks-title mt-2">Pillars of Financial Excellence</h2>
            <div class="why-sks-divider"></div>
            <p class="why-sks-subtitle">Creating long-lasting relationships with our clients through dedicated financial expertise, integrity, and bespoke solutions for over two decades.</p>
        </div>

        <div class="why-sks-grid">
            <!-- Card 1 -->
            <div class="why-sks-card">
                <div class="why-sks-top">
                    <div class="why-sks-icon">
                        <i class="fa-solid fa-user-clock"></i>
                    </div>
                    <span class="why-sks-num">01</span>
                </div>
                <div class="why-sks-body">
                    <h3 class="why-sks-card-title">Timely & Professional Doorstep Service</h3>
                    <p class="why-sks-card-desc">Our dedicated advisory team ensures our clients make the right financial choices at the right time with personalized doorstep guidance in Jaipur.</p>
                </div>
                <div class="why-sks-footer">
                    <span class="why-sks-tag"><i class="fa-solid fa-circle-check me-1"></i> Dedicated Advisor</span>
                </div>
            </div>

            <!-- Card 2 -->
            <div class="why-sks-card">
                <div class="why-sks-top">
                    <div class="why-sks-icon">
                        <i class="fa-solid fa-shield-halved"></i>
                    </div>
                    <span class="why-sks-num">02</span>
                </div>
                <div class="why-sks-body">
                    <h3 class="why-sks-card-title">Safe, Secure & Ethical Standards</h3>
                    <p class="why-sks-card-desc">Managed by certified consultants and financial experts who strictly protect confidentiality, data privacy, and ethical standards at every stage.</p>
                </div>
                <div class="why-sks-footer">
                    <span class="why-sks-tag"><i class="fa-solid fa-lock me-1"></i> 100% Confidential</span>
                </div>
            </div>

            <!-- Card 3 -->
            <div class="why-sks-card">
                <div class="why-sks-top">
                    <div class="why-sks-icon">
                        <i class="fa-solid fa-sliders"></i>
                    </div>
                    <span class="why-sks-num">03</span>
                </div>
                <div class="why-sks-body">
                    <h3 class="why-sks-card-title">Curated & Personalized Offers</h3>
                    <p class="why-sks-card-desc">We curate the best competitive interest rates and terms from 90+ partner Banks, NBFCs, Mutual Funds, and Insurance providers tailored to you.</p>
                </div>
                <div class="why-sks-footer">
                    <span class="why-sks-tag"><i class="fa-solid fa-star me-1"></i> 90+ Partner Institutions</span>
                </div>
            </div>

            <!-- Card 4 -->
            <div class="why-sks-card">
                <div class="why-sks-top">
                    <div class="why-sks-icon">
                        <i class="fa-solid fa-award"></i>
                    </div>
                    <span class="why-sks-num">04</span>
                </div>
                <div class="why-sks-body">
                    <h3 class="why-sks-card-title">20+ Years of Proven Track Record</h3>
                    <p class="why-sks-card-desc">Our two decades of deep industry leadership deliver optimum strategies for loan approvals, wealth compounding, and retirement planning.</p>
                </div>
                <div class="why-sks-footer">
                    <span class="why-sks-tag"><i class="fa-solid fa-medal me-1"></i> 20+ Years Excellence</span>
                </div>
            </div>

            <!-- Card 5 -->
            <div class="why-sks-card">
                <div class="why-sks-top">
                    <div class="why-sks-icon">
                        <i class="fa-solid fa-building-columns"></i>
                    </div>
                    <span class="why-sks-num">05</span>
                </div>
                <div class="why-sks-body">
                    <h3 class="why-sks-card-title">All Financial Solutions Under One Roof</h3>
                    <p class="why-sks-card-desc">Complete 360° financial hub covering Home & Business Loans, Mutual Funds, Life & Health Insurance, Tax Compliance, and Real Estate.</p>
                </div>
                <div class="why-sks-footer">
                    <span class="why-sks-tag"><i class="fa-solid fa-circle-nodes me-1"></i> Complete 360° Hub</span>
                </div>
            </div>
        </div>
    </div>
</div>
`;

const filePath = path.resolve('src/data/pagesContent.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

['index', 'about'].forEach(slug => {
  if (!data[slug]) return;
  let html = data[slug].html;
  
  // Find fincom-section
  const regex = /<div class=["']et_pb_section et_pb_section_2 fincom-section[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/div>/i;
  
  if (regex.test(html)) {
    data[slug].html = html.replace(regex, newWhySksHtml.trim());
    console.log(`Replaced fincom-section in ${slug} using regex.`);
  } else {
    // Fallback: look for "WHY SKS INFI" block
    const startIdx = html.indexOf('fincom-section');
    if (startIdx !== -1) {
      const sectionStart = html.lastIndexOf('<div', startIdx);
      const missionIdx = html.indexOf('Our Mission', startIdx);
      if (missionIdx !== -1) {
        const sectionEnd = html.lastIndexOf('<div', missionIdx);
        const target = html.slice(sectionStart, sectionEnd);
        data[slug].html = html.replace(target, newWhySksHtml.trim() + '\n\n                        ');
        console.log(`Replaced fincom-section in ${slug} using index slice.`);
      }
    }
  }
});

fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
console.log('Successfully updated src/data/pagesContent.json');
