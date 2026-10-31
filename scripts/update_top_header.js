const fs = require('fs');

let headerHtml = fs.readFileSync('src/data/authenticHeader.html', 'utf8');

// Replace top header with clean flex layout that prevents any overlapping
const topHeaderRegex = /<div id="top-header">[\s\S]*?<header id="mainheader"/i;

const newTopHeader = `<div id="top-header" style="background-color:#094b57 !important; border-bottom: 1px solid rgba(255,255,255,0.15); min-height: 42px;">
            <div class="container clearfix d-flex flex-wrap align-items-center justify-content-between py-1" style="background-color:#094b57 !important">
                <div class="nri-service-badge text-white d-flex align-items-center py-1" style="font-size: 13px; font-weight: 500;">
                    <span style="color: #ffffff;">24/7 Service Available to NRI</span>
                    <a href="tel:+919928593122" class="ps-2 text-white" style="font-weight: 700; text-decoration: none; color: #ffffff !important;">
                        <i class="fa fa-phone" style="color: #b69455; margin-right: 4px;"></i>+91 99285 93122
                    </a>
                </div>

                <div id="et-secondary-menu" class="d-flex align-items-center">
                    <ul id="et-secondary-nav" class="menu classnewh m-0 d-flex flex-wrap align-items-center">
                        <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-3062 boxline"><a href="/sksinfin.php">WHY SKSINFI</a></li>
                        <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-3062 boxline"><a href="/enquirynow.php">Get In Touch</a></li>
                        <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-3062 boxline"><a href="/partner-with-us.php">BECOME OUR PARTNER</a></li>
                        <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-3062 boxline"><a href="/blogs">BLOGS</a></li>

                        <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-3062 ms-2">
                            <a target="_blank" href="https://www.facebook.com/profile.php?id=61580467109664" class="icon">
                                <img style="max-width: 18px;" src="/images/facebook (1).png" alt="Facebook">
                            </a>
                        </li>
                        <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-3148 ms-2">
                            <a target="_blank" href="https://www.instagram.com/sksinfi" class="icon">
                                <img style="max-width: 18px;" src="/images/instagram (1).png" alt="Instagram">
                            </a>
                        </li>
                        <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-404 ms-2">
                            <a href="https://www.youtube.com/@sksinfi" target="_blank" class="icon">
                                <img style="max-width: 18px;" src="/images/youtube (1).png" alt="YouTube">
                            </a>
                        </li>
                        <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-404 ms-2">
                            <a href="https://www.linkedin.com/in/sksinfi/" target="_blank" class="icon">
                                <img style="max-width: 18px;" src="/img/linkedin.png" alt="LinkedIn">
                            </a>
                        </li>
                        <li class="menu-item menu-item-type-post_type menu-item-404 ms-2">
                            <a href="https://x.com/infi_sks" target="_blank" class="icon">
                                <img style="max-width: 18px; filter: invert(1);" src="/img/xicn.png" alt="X">
                            </a>
                        </li>
                    </ul>
                </div> <!-- #et-secondary-menu -->
            </div> <!-- .container -->
        </div> <!-- #top-header -->

        <style>
            .bdrrds {
                border-radius: 20px;
            }
            #mega-menu-wrap-primary-menu #mega-menu-primary-menu > li.mega-menu-item{
                border-left: none;
            }
            #top-header #et-secondary-nav li a {
                color: #ffffff !important;
                font-size: 12px;
                padding: 4px 8px;
            }
            #top-header #et-secondary-nav li.boxline {
                border-right: 1px solid rgba(255,255,255,0.2);
            }
        </style>

        <header id="mainheader"`;

if (topHeaderRegex.test(headerHtml)) {
  headerHtml = headerHtml.replace(topHeaderRegex, newTopHeader);
  fs.writeFileSync('src/data/authenticHeader.html', headerHtml, 'utf8');

  // Regenerate authenticHeader.ts
  const headerTs = `// Auto-generated authentic header HTML from legacy_php/header.php\nexport const authenticHeaderHtml = ${JSON.stringify(headerHtml)};\n`;
  fs.writeFileSync('src/data/authenticHeader.ts', headerTs, 'utf8');
  console.log('Successfully updated top-header with flex layout and zero overlap!');
} else {
  console.error('Could not find top-header pattern in authenticHeader.html');
}
