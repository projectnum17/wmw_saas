'use strict';

import videoHandler from './mods/_videoHandler.js';
import scannerHandler from './mods/_scannerHandler.js';
import historyHandler from './mods/_historyHandler.js';
import sliders from './mods/_sliders.js';
import statisticHandler from './mods/_statisticHandler.js';
import faqHandler from './mods/_faqHandler.js';

document.addEventListener('DOMContentLoaded', () => {
    videoHandler();
    scannerHandler();
    sliders();
    historyHandler();
    statisticHandler();
    faqHandler();
});
