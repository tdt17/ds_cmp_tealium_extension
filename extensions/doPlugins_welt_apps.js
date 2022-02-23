/* eslint-disable */
const s = window.s || window.cmp || {};

s._setPageAgeForCheckout = function () {
    if (typeof window.utag.data.adobe_docType !== 'undefined' && window.utag.data.adobe_docType === 'article') {
        window.utag.loader.SC('utag_main', { 'pa': window.utag.data.screen_agePublication + ';exp-session' });
        window.utag.data['cp.utag_main_pa'] = window.utag.data.screen_agePublication;
    }

};

s._setPageSection = function (s) {
    if (typeof s.pageName !== 'undefined'
        && s.pageName.indexOf('home : home') !== -1) {
        s.eVar5 = 'home';
        s.prop5 = 'home';
        s.channel = 'home';
    } else if (typeof s.pageName !== 'undefined' 
                && s.pageName.indexOf('section : Titelseite') !== -1) {
        s.eVar5 = 'section';
        s.prop5 = 'section';
        s.channel = 'section';
    }
};

s._weltAppsInit = function (s) {
    s.usePlugins = true;

    s.eVar61 = window.navigator.userAgent;

    //height & width for iPhones
    if (window.navigator.userAgent.indexOf('iPhone') > -1) {
        s.eVar94 = window.screen.width + 'x' + window.screen.height;
    }

    s._setPageAgeForCheckout();
    s._setPageSection(s);
};

s.doPlugins = function (s) {
    //no sdid for A4T
    s.expectSupplementalData = false; // Force to false;

    s.eVar184 = new Date().getHours().toString();
    s.eVar181 = new Date().getMinutes().toString();
    s.eVar185 = window.utag.data.myCW;

};

// Evaluate runtime environment
if (typeof exports === 'object') {
    // Export s-object with all functions for unit testing
    module.exports = s;
} else {
    s._weltAppsInit(s);
}