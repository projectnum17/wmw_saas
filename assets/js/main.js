'use strict';

import headerHandler from './mods/headerHandler.js';
import mobileMenu from './mods/mobileMenu.js';
import videoHandler from './mods/videoHandler.js';
import scannerHandler from './mods/scannerHandler.js';
import historyHandler from './mods/historyHandler.js';
import sliders from './mods/sliders.js';
import statisticHandler from './mods/statisticHandler.js';
import faqHandler from './mods/faqHandler.js';

document.addEventListener('DOMContentLoaded', () => {
    headerHandler();
    mobileMenu();
    videoHandler();
    scannerHandler();
    sliders();
    historyHandler();
    statisticHandler();
    faqHandler();
});
