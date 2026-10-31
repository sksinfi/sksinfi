const fs = require('fs');

let css = fs.readFileSync('public/css/legacy.css', 'utf8');

// Remove previous overrides block if present
const marker = '/* =========================================================\n   CRITICAL SKS INFI AUTHENTIC LAYOUT OVERRIDES';
const markerIdx = css.indexOf(marker);
if (markerIdx !== -1) {
  css = css.substring(0, markerIdx).trim();
}

const finalOverrides = `
/* =========================================================
   CRITICAL SKS INFI AUTHENTIC LAYOUT OVERRIDES
   ========================================================= */

/* 1. Header & Max Mega Menu Overrides */
#top-header {
  background-color: #094b57 !important;
}
#top-header a {
  color: #ffffff !important;
}
#mainheader {
  background-color: #ffffff !important;
  border-bottom: 1px solid #e0e0e0 !important;
}
#mainheader.sticky {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  z-index: 10000 !important;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1) !important;
}
#logo, .logo_container img {
  max-height: 52px !important;
  width: auto !important;
  display: block !important;
}
#mega-menu-primary-menu > li.mega-menu-item > a.mega-menu-link {
  color: #094b57 !important;
  font-weight: 600 !important;
  font-size: 13.5px !important;
}
#mega-menu-primary-menu > li.mega-menu-item:hover > a.mega-menu-link {
  color: #b69455 !important;
}
#mega-menu-primary-menu ul.mega-sub-menu {
  background: #ffffff !important;
  border-top: 3px solid #094b57 !important;
  box-shadow: 0 8px 24px rgba(0,0,0,0.15) !important;
  z-index: 99999 !important;
}
#mega-menu-primary-menu > li.mega-menu-item:hover > ul.mega-sub-menu {
  display: block !important;
  visibility: visible !important;
  opacity: 1 !important;
}

/* 2. Hero Slider */
.home-slider, .home-slider .et_pb_slider {
  height: 520px !important;
  min-height: 520px !important;
  position: relative !important;
  overflow: hidden !important;
}
@media (max-width: 768px) {
  .home-slider, .home-slider .et_pb_slider {
    height: 300px !important;
    min-height: 300px !important;
  }
}

/* 3. About SKS INFI 2-Column Layout */
.about-section {
  padding: 40px 0 20px 0 !important;
  background: #ffffff !important;
  margin-bottom: 20px !important;
}
.about-section .et_pb_row_0 {
  display: flex !important;
  flex-wrap: wrap !important;
  justify-content: space-between !important;
  align-items: center !important;
  max-width: 1200px !important;
  margin: 0 auto !important;
  padding: 0 15px !important;
}
.about-section .et_pb_row_0::after,
.about-section .et_pb_row_0::before {
  display: none !important;
}
.about-section .et_pb_row_0 > h1 {
  width: 100% !important;
  flex: 0 0 100% !important;
  text-align: center !important;
  color: #094b57 !important;
  font-size: 32px !important;
  font-weight: 700 !important;
  text-transform: uppercase !important;
  margin-bottom: 25px !important;
}
.about-section .et_pb_column_0 {
  float: none !important;
  flex: 0 0 58% !important;
  max-width: 58% !important;
  width: 58% !important;
  margin: 0 !important;
}
.about-section .et_pb_column_1 {
  float: none !important;
  flex: 0 0 38% !important;
  max-width: 38% !important;
  width: 38% !important;
  margin: 0 !important;
}
.about-section .abt {
  width: 100% !important;
  max-width: 100% !important;
  height: auto !important;
  max-height: 290px !important;
  object-fit: cover !important;
  border-radius: 20px !important;
  position: static !important;
  top: 0 !important;
  display: block !important;
  box-shadow: 0 4px 15px rgba(0,0,0,0.08) !important;
}
.about-section + .container {
  clear: both !important;
  margin-top: 25px !important;
}

/* 4. WHY SKS INFI - Exact 5-Column Arch Cards in ONE ROW */
.fincom-section {
  background-color: #f9f0df !important;
  padding: 45px 0 !important;
  margin: 30px 0 !important;
}
.fincom-section .et_pb_row_1 h2 {
  color: #094b57 !important;
  font-size: 30px !important;
  font-weight: 700 !important;
  text-align: center !important;
  margin-bottom: 30px !important;
}
.fincom-section .et_pb_row_2 {
  display: flex !important;
  flex-direction: row !important;
  justify-content: center !important;
  align-items: stretch !important;
  flex-wrap: nowrap !important;
  gap: 16px !important;
  width: 96% !important;
  max-width: 1350px !important;
  margin: 0 auto !important;
  padding: 0 10px !important;
}
.fincom-section .et_pb_row_2::after,
.fincom-section .et_pb_row_2::before {
  display: none !important;
}
.fincom-section .et_pb_row_2 > .et_pb_column,
.fincom-section .et_pb_row_2 > .et_pb_column_1_3 {
  float: none !important;
  flex: 1 1 0px !important;
  width: 19% !important;
  max-width: 19% !important;
  margin-right: 0 !important;
  margin-left: 0 !important;
  display: flex !important;
}
.fincom-section .et_pb_blurb {
  width: 100% !important;
  display: flex !important;
}
.fincom-section .et_pb_blurb_content {
  background-color: #fdfbf7 !important;
  border: 1.5px solid #d2b48c !important;
  border-radius: 40px 0px 40px 0px !important;
  padding: 24px 16px !important;
  width: 100% !important;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.03) !important;
  display: flex !important;
  flex-direction: column !important;
  justify-content: flex-start !important;
  transition: transform 0.3s ease, box-shadow 0.3s ease !important;
}
.fincom-section .et_pb_blurb_content:hover {
  transform: translateY(-4px) !important;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08) !important;
}
.fincom-section .et_pb_blurb_container h3 {
  color: #094b57 !important;
  font-size: 16px !important;
  font-weight: 700 !important;
  margin-bottom: 12px !important;
  line-height: 1.35 !important;
  text-align: left !important;
}
.fincom-section .et_pb_blurb_container p {
  color: #333333 !important;
  font-size: 13px !important;
  line-height: 1.6 !important;
  margin: 0 !important;
  text-align: left !important;
}

@media (max-width: 1100px) {
  .fincom-section .et_pb_row_2 {
    flex-wrap: wrap !important;
  }
  .fincom-section .et_pb_row_2 > .et_pb_column,
  .fincom-section .et_pb_row_2 > .et_pb_column_1_3 {
    flex: 0 0 calc(50% - 10px) !important;
    width: calc(50% - 10px) !important;
    max-width: calc(50% - 10px) !important;
    margin-bottom: 16px !important;
  }
}
@media (max-width: 640px) {
  .fincom-section .et_pb_row_2 > .et_pb_column,
  .fincom-section .et_pb_row_2 > .et_pb_column_1_3 {
    flex: 0 0 100% !important;
    width: 100% !important;
    max-width: 100% !important;
  }
}

/* 5. Mission & Values, Badges & Certificates */
.et_animated, .et-waypoint {
  opacity: 1 !important;
  visibility: visible !important;
}
`;

css += '\n\n' + finalOverrides;
fs.writeFileSync('public/css/legacy.css', css, 'utf8');
console.log('Cleanly applied final overrides to public/css/legacy.css');
