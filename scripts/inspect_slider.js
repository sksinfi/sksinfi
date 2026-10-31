const pages = require('../src/data/pagesContent.json');
const indexHtml = pages['index'] ? pages['index'].html : '';

const sliderIdx = indexHtml.indexOf('home-slider');
console.log(indexHtml.slice(sliderIdx, sliderIdx + 2000));
