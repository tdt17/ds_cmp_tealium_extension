/* eslint-disable */
const s = window.s || window.cmp || {};

s._utils = {
    isDocTypeArticle: function () {
        const docType = window.utag.data.mapped_page_document_type
            || window.utag.data.mapped_page_doc_type
            || window.utag.data.mapped_document_type
            || '';
        return docType === 'article';
    },
};

s._setPageAgeForCheckout = function () {
    if (typeof window.utag.data.page_age !== 'undefined'
        && s._utils.isDocTypeArticle()) {

        window.utag.loader.SC('utag_main', { 'pa': window.utag.data.page_age + ';exp-session' });
        window.utag.data['cp.utag_main_pa'] = window.utag.data.page_age;

    }
};

s._bildAppsPageNameObj = {
    isLive: function () {
        return s._utils.isDocTypeArticle() && !!window.utag.data.page_cms_path
            && window.utag.data.page_cms_path.indexOf('im-live-ticker') !== -1;
    },

    isLiveSport: function () {
        return s._utils.isDocTypeArticle() && !!window.utag.data.page_cms_path
            && (window.utag.data.page_cms_path.indexOf('im-liveticker') !== -1
                || window.utag.data.page_cms_path.indexOf('/liveticker/') !== -1);
    },

    setDocTypeProperty: function (value) {
        if (window.utag.data.mapped_page_document_type)
            window.utag.data.mapped_page_document_type = value;

        else if (window.utag.data.mapped_page_doc_type)
            window.utag.data.mapped_page_doc_type = value;

        else if (window.utag.data.mapped_document_type)
            window.utag.data.mapped_document_type = value;
    },

    setAppsPageName: function (s) {
        if (this.isLive()) {
            this.setDocTypeProperty('live');
            s.eVar3 = 'live';
            s.prop3 = 'live';
            s.pageName = 'live : ' + window.utag.data['page_id'];
        } else if (this.isLiveSport()) {
            this.setDocTypeProperty('live-sport');
            s.eVar3 = 'live-sport';
            s.prop3 = 'live-sport';
            s.pageName = 'live-sport : ' + window.utag.data['page_id'];
        }
    },
};

s._orderViaArticle = function (s) {
    if (window.utag.data.order_via && window.utag.data.order_via === 'article') {
        s.eVar17 = window.utag.data['cp.utag_main_pa'];
    }
};

s._setPageCmsPathWithoutBild = function (s) {
    if (window.utag.data['ut.profile'] === 'bild-app.android'
        || window.utag.data['ut.profile'] === 'bild-app.iphone'
        || window.utag.data['ut.profile'] === 'bild-app.ipad') {

        if (typeof window.utag.data.page_cms_path !== 'undefined'
            && window.utag.data.page_cms_path.indexOf('/BILD/') > -1) {

            window.utag.data.page_cms_path = window.utag.data.page_cms_path.replace('/BILD/', '');
            s.eVar4 = window.utag.data.page_cms_path;
            s.prop4 = window.utag.data.page_cms_path;
        }
    }
};

s._bildAppsInit = function (s) {
    s.usePlugins = true;

    s.eVar61 = window.navigator.userAgent;

    //height & width for iPhones
    if (window.navigator.userAgent.indexOf('iPhone') > -1) {
        s.eVar94 = window.screen.width + 'x' + window.screen.height;
    }

    s._setPageAgeForCheckout();
    s._bildAppsPageNameObj.setAppsPageName(s);
    s._setPageCmsPathWithoutBild(s);
};

s.doPlugins = function (s) {
    //no sdid for A4T
    s.expectSupplementalData = false; // Force to false;

    s.eVar184 = new Date().getHours().toString();
    s.eVar181 = new Date().getMinutes().toString();
    s.eVar185 = window.utag.data.myCW || '';

    s._orderViaArticle(s);

};

// Evaluate runtime environment
if (typeof exports === 'object') {
    // Export s-object with all functions for unit testing
    module.exports = s;
} else {
    s._bildAppsInit(s);
}