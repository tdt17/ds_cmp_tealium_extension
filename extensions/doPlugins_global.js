/* eslint-disable */
const s = window.s || {};

// START: Pre-defined Adobe Plugins
/* istanbul ignore next */
/* Adobe Consulting Plugin: getPercentPageViewed v5.0.1 */
s.getPercentPageViewed = function(pid,ch){var n=pid,r=ch;function p(){if(window.ppvID){var a=Math.max(Math.max(document.body.scrollHeight,document.documentElement.scrollHeight),Math.max(document.body.offsetHeight,document.documentElement.offsetHeight),Math.max(document.body.clientHeight,document.documentElement.clientHeight)),b=window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight,d=(window.pageYOffset||window.document.documentElement.scrollTop||window.document.body.scrollTop)+b,f=Math.min(Math.round(d/a*100),100),l=Math.floor(d/b);b=Math.floor(a/b);var c="";if(!window.cookieRead("s_tp")||decodeURIComponent(window.cookieRead("s_ppv").split(",")[0])!==window.ppvID||window.p_fo(window.ppvID)||1==window.ppvChange&&window.cookieRead("s_tp")&&a!=window.cookieRead("s_tp")){(decodeURIComponent(window.cookieRead("s_ppv").split(",")[0])!==window.ppvID||window.p_fo(window.ppvID+"1"))&&window.cookieWrite("s_ips",d);if(window.cookieRead("s_tp")&&decodeURIComponent(window.cookieRead("s_ppv").split(",")[0])===window.ppvID){window.cookieRead("s_tp");c=window.cookieRead("s_ppv");var h=-1<c.indexOf(",")?c.split(","):[];c=h[0]?h[0]:"";h=h[3]?h[3]:"";var q=window.cookieRead("s_ips");c=c+","+Math.round(h/a*100)+","+Math.round(q/a*100)+","+h+","+l}window.cookieWrite("s_tp",a)}else c=window.cookieRead("s_ppv");var k=c&&-1<c.indexOf(",")?c.split(",",6):[];a=0<k.length?k[0]:encodeURIComponent(window.ppvID);h=1<k.length?parseInt(k[1]):f;q=2<k.length?parseInt(k[2]):f;var t=3<k.length?parseInt(k[3]):d,u=4<k.length?parseInt(k[4]):l;k=5<k.length?parseInt(k[5]):b;0<f&&(c=a+","+(f>h?f:h)+","+q+","+(d>t?d:t)+","+(l>u?l:u)+","+(b>k?b:k));window.cookieWrite("s_ppv",c)}}if("-v"===n)return{plugin:"getPercentPageViewed",version:"5.0.1"};var m=function(){if("undefined"!==typeof window.s_c_il)for(var a=0,b;a<window.s_c_il.length;a++)if(b=window.s_c_il[a],b._c&&"s_c"===b._c)return b}();"undefined"!==typeof m&&(m.contextData.getPercentPageViewed="5.0.1");window.pageName="undefined"!==typeof m&&m.pageName||"";window.cookieWrite=window.cookieWrite||function(a,b,d){if("string"===typeof a){var f=window.location.hostname,l=window.location.hostname.split(".").length-1;if(f&&!/^[0-9.]+$/.test(f)){l=2<l?l:2;var c=f.lastIndexOf(".");if(0<=c){for(;0<=c&&1<l;)c=f.lastIndexOf(".",c-1),l--;c=0<c?f.substring(c):f}}g=c;b="undefined"!==typeof b?""+b:"";if(d||""===b)if(""===b&&(d=-60),"number"===typeof d){var h=new Date;h.setTime(h.getTime()+6E4*d)}else h=d;return a&&(document.cookie=encodeURIComponent(a)+"="+encodeURIComponent(b)+"; path=/;"+(d?" expires="+h.toUTCString()+";":"")+(g?" domain="+g+";":""),"undefined"!==typeof window.cookieRead)?window.cookieRead(a)===b:!1}};window.cookieRead=window.cookieRead||function(a){if("string"===typeof a)a=encodeURIComponent(a);else return"";var b=" "+document.cookie,d=b.indexOf(" "+a+"="),f=0>d?d:b.indexOf(";",d);return(a=0>d?"":decodeURIComponent(b.substring(d+2+a.length,0>f?b.length:f)))?a:""};window.p_fo=window.p_fo||function(a){window.__fo||(window.__fo={});if(window.__fo[a])return!1;window.__fo[a]={};return!0};var e=window.cookieRead("s_ppv");e=-1<e.indexOf(",")?e.split(","):[];n=n?n:window.pageName?window.pageName:document.location.href;e[0]=decodeURIComponent(e[0]);window.ppvChange="undefined"===typeof r||1==r?!0:!1;"undefined"!==typeof m&&m.linkType&&"o"===m.linkType||(window.ppvID&&window.ppvID===n||(window.ppvID=n,window.cookieWrite("s_ppv",""),p()),window.p_fo("s_gppvLoad")&&window.addEventListener&&(window.addEventListener("load",p,!1),window.addEventListener("click",p,!1),window.addEventListener("scroll",p,!1)),this._ppvPreviousPage=e[0]?e[0]:"",this._ppvHighestPercentViewed=e[1]?e[1]:"",this._ppvInitialPercentViewed=e[2]?e[2]:"",this._ppvHighestPixelsSeen=e[3]?e[3]:"",this._ppvFoldsSeen=e[4]?e[4]:"",this._ppvFoldsAvailable=e[5]?e[5]:"")};
/* istanbul ignore next */
/* Adobe Consulting Plugin: handlePPVevents helper function (for getPercentPageViewed v4.0 Plugin) */
s.handlePPVevents = function(){if("undefined"!==typeof s_c_il){for(var c=0,g=s_c_il.length;c<g;c++)if(s_c_il[c]&& (s_c_il[c].getPercentPageViewed||s_c_il[c].getPreviousPageActivity)){var s=s_c_il[c];break}if(s&&s.ppvID){var f=Math.max (Math.max(document.body.scrollHeight,document.documentElement.scrollHeight),Math.max(document.body.offsetHeight, document.documentElement.offsetHeight),Math.max(document.body.clientHeight,document.documentElement.clientHeight)),h= window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight;c=(window.pageYOffset|| window.document.documentElement.scrollTop||window.document.body.scrollTop)+h;g=Math.min(Math.round(c/f*100),100);var k=Math.floor(c/h);h=Math.floor(f/h);var d="";if(!s.c_r("s_tp")||s.unescape(s.c_r("s_ppv").split(",")[0])!==s.ppvID||s.p_fo(s.ppvID) ||1==s.ppvChange&&s.c_r("s_tp")&&f!=s.c_r("s_tp")){(s.unescape(s.c_r("s_ppv").split(",")[0])!==s.ppvID||s.p_fo(s.ppvID+"1"))&&s.c_w("s_ips",c);if(s.c_r("s_tp")&&s.unescape(s.c_r("s_ppv").split(",")[0])===s.ppvID){s.c_r("s_tp");d=s.c_r("s_ppv");var e=-1< d.indexOf(",")?d.split(","):[];d=e[0]?e[0]:"";e=e[3]?e[3]:"";var l=s.c_r("s_ips");d=d+","+Math.round(e/f*100)+","+Math.round(l/ f*100)+","+e+","+k}s.c_w("s_tp",f)}else d=s.c_r("s_ppv");var b=d&&-1<d.indexOf(",")?d.split(",",6):[];f=0<b.length?b[0]: escape(s.ppvID);e=1<b.length?parseInt(b[1]):g;l=2<b.length?parseInt(b[2]):g;var m=3<b.length?parseInt(b[3]):c,n=4<b.length? parseInt(b[4]):k;b=5<b.length?parseInt(b[5]):h;0<g&&(d=f+","+(g>e?g:e)+","+l+","+(c>m?c:m)+","+(k>n?k:n)+","+(h>b?h:b)); s.c_w("s_ppv",d)}}};
/* istanbul ignore next */
/* Adobe Consulting Plugin: p_fo (pageFirstOnly) v3.0 (Requires AppMeasurement) */
s.p_fo = function(c){if("-v"===c)return{plugin:"p_fo",version:"3.0"};a:{if("undefined"!==typeof window.s_c_il){var a=0;for(var b;a<window.s_c_il.length;a++)if(b=window.s_c_il[a],b._c&&"s_c"===b._c){a=b;break a}}a=void 0}"undefined"!==typeof a&&(a.contextData.p_fo="3.0");window.__fo||(window.__fo={});if(window.__fo[c])return!1;window.__fo[c]={};return!0};
/* istanbul ignore next */
/* Adobe Consulting Plugin: apl (appendToList) v4.0 */
s.apl = function (lv,va,d1,d2,cc){var b=lv,d=va,e=d1,c=d2,g=cc;if("-v"===b)return{plugin:"apl",version:"4.0"};var h=function(){if("undefined"!==typeof window.s_c_il)for(var k=0,b;k<window.s_c_il.length;k++)if(b=window.s_c_il[k],b._c&&"s_c"===b._c)return b}();"undefined"!==typeof h&&(h.contextData.apl="4.0");window.inList=window.inList||function(b,d,c,e){if("string"!==typeof d)return!1;if("string"===typeof b)b=b.split(c||",");else if("object"!==typeof b)return!1;c=0;for(a=b.length;c<a;c++)if(1==e&&d===b[c]||d.toLowerCase()===b[c].toLowerCase())return!0;return!1};if(!b||"string"===typeof b){if("string"!==typeof d||""===d)return b;e=e||",";c=c||e;1==c&&(c=e,g||(g=1));2==c&&1!=g&&(c=e);d=d.split(",");h=d.length;for(var f=0;f<h;f++)window.inList(b,d[f],e,g)||(b=b?b+c+d[f]:d[f])}return b};
/* istanbul ignore next */
/* Adobe Consulting Plugin: getValOnce v2.01 */
s.getValOnce = function (e, t, i, n) { if (e && (t = t || "s_gvo", i = i || 0, n = "m" === n ? 6e4 : 864e5, e !== this.c_r(t))) { var r = new Date; return r.setTime(r.getTime() + i * n), this.c_w(t, e, 0 === i ? 0 : r), e } return "" };
/* istanbul ignore next */
/* Utility Function: split v1.5 - split a string (JS 1.0 compatible) */
s.split = new Function("l","d",""
+"var i,x=0,a=new Array;while(l){i=l.indexOf(d);i=i>-1?i:l.length;a[x"
+"++]=l.substring(0,i);l=l.substring(i+d.length);}return a");
/* eslint-enable */
// END: Pre-defined Adobe Plugins


const utils = {
    getDomainFromURLString: function (urlString) {
        try {
            const urlObject = new URL(urlString);
            return urlObject.hostname;
        } catch (err) {
            return '';
        }
    }
};

/**
 * Module sets the referring context of an article page view as an certain event to the events variable.
 */
const articleViewType = {
    getPageType: function () {
        return window.utag.data.page_type || window.utag.data.page_document_type || window.utag.data.page_mapped_doctype_for_pagename;
    },

    isArticlePage: function () {
        const ARTICLE_TYPES = [
            'article',
            'artikel',
            'live',
            'gallery',
            'video',
            'post',
            'media',
            'single'
        ];
        const pageType = this.getPageType();

        return ARTICLE_TYPES.indexOf(pageType) !== -1;
    },

    isFromSearch: function (referringDomain) {
        const searchEngines = ['google.', 'bing.com', 'ecosia.org', 'duckduckgo.com', 'amp-welt-de.cdn.ampproject.org', 'qwant.com', 'suche.t-online.de', '.yandex.', 'yahoo.com', 'googleapis.com', 'nortonsafe.search.ask.com', 'wikipedia.org', 'googleadservices.com', 'search.myway.com', 'lycos.de'];

        return searchEngines.some(item => {
            return referringDomain.indexOf(item) !== -1;
        });
    },

    isFromSocial: function (referrer) {
        const socialDomains = ['facebook.com', 'xing.com', 'instagram.com', 'youtube.com', 't.co', 'linkedin.com', 'away.vk.com', 'www.pinterest.de', 'linkedin.android', 'ok.ru', 'mobile.ok.ru', 'www.yammer.com', 'twitter.com', 'www.netvibes.com', 'pinterest.com', 'wordpress.com', 'blogspot.com', 'lnkd.in', 'xing.android', 'vk.com', 'com.twitter.android', 'm.ok.ru', 'welt.de/instagram', 'linkin.bio'];

        return socialDomains.some(item => {
            return referrer.indexOf(item) !== -1;
        });
    },

    isFromBild: function (referringDomain) {
        return referringDomain === 'www.bild.de';
    },

    isFromBildMobile: function (referringDomain) {
        return referringDomain === 'm.bild.de';
    },

    /**
     * Same domain check including subdomains.
     */
    isFromInternal: function (referringDomain, domain) {
        const referringDomainSegments = referringDomain.split('.');
        const documentDomainSegments = domain.split('.');

        // Exception for Sportbild: 'sportbild.bild.de' should not be treated as an internal (sub) domain of Bild
        if (referringDomain.indexOf('sportbild') !== -1) {
            return domain.indexOf('sportbild') !== -1;
        }

        // compare next to last segments (eg. www.bild.de, m.bild.de --> bild)
        return referringDomainSegments[referringDomainSegments.length - 2] === documentDomainSegments[documentDomainSegments.length - 2];
    },

    /**
     * Only certain subdomains are considered as homepages: eg. www.bild.de, m.bild.de, sportbild.bild.de
     * Other special subdomains should not be considered: eg. sport.bild.de, online.welt.de
     */
    isHomepageSubdomain: function (domain) {
        const subdomainsWithHomepages = ['www', 'm', 'sportbild'];
        const domainSegments = domain.split('.');
        if (domainSegments.length > 2) {
            // check third to last domain segment (sub domain)
            return subdomainsWithHomepages.indexOf(domainSegments[domainSegments.length - 3]) !== -1;
        } else {
            return false;
        }
    },

    isFromHome: function (referrer) {
        try {
            const urlObject = new URL(referrer);
            return urlObject.pathname === '/' && this.isHomepageSubdomain(urlObject.hostname);
        } catch (err) {
            return false;
        }
    },

    getTrackingValue: function () {
        let trackingValue;
        try {
            const queryParams = new URLSearchParams(window.location.search);
            trackingValue = queryParams.get('cid') || queryParams.get('wtrid') || queryParams.get('wtmc') || '';
        } catch (error) {
            trackingValue = '';
        }
        return trackingValue;
    },

    isFromTaboola: function () {
        const trackingValue = this.getTrackingValue();

        return trackingValue.indexOf('kooperation.reco.taboola.') !== -1;
    },

    isValidURL: function (urlString) {
        try {
            new URL(urlString);
        } catch (err) {
            return false;
        }
        return true;
    },

    getReferrerFromLocationHash: function () {
        let referrerFromHash;
        if (window.location.hash.indexOf('wt_ref') !== -1) {
            referrerFromHash = window.location.hash.replace('###wt_ref=', '');
        }
        return this.isValidURL(referrerFromHash) ? referrerFromHash : '';
    },

    getViewTypeByReferrer: function () {
        const referrer = this.getReferrerFromLocationHash() || window.document.referrer;
        const referringDomain = utils.getDomainFromURLString(referrer);
        const domain = window.document.domain;
        let articleViewType = 'event27'; //Other External
        if (this.isFromSearch(referringDomain)) {
            articleViewType = 'event24'; //Search
        } else if (this.isFromSocial(referrer)) {
            articleViewType = 'event25'; //Social
        } else if (this.isFromInternal(referringDomain, domain) && this.isFromTaboola()) {
            articleViewType = 'event102'; //Taboola
        } else if (this.isFromInternal(referringDomain, domain) && this.isFromHome(referrer)) {
            articleViewType = 'event22'; //Home
        } else if (this.isFromInternal(referringDomain)) {
            articleViewType = 'event23'; //Other Internal
        } else if (this.isFromBild(referringDomain)) {
            articleViewType = 'event76'; // Bild
        } else if (this.isFromBildMobile(referringDomain)) {
            articleViewType = 'event77'; // Bild mobile
        }
        return articleViewType;
    },

    getViewTypeByTrackingProperty: function () {
        const trackingValue = this.getTrackingValue();
        let articleViewType = 'event26'; //Dark Social

        if (trackingValue.startsWith('sea.')) {
            articleViewType = 'event24'; // Search
        } else if (trackingValue.startsWith('social')) {
            articleViewType = 'event25'; //Social
        } else if (trackingValue.startsWith('kooperation') || trackingValue.startsWith('affiliate')) {
            articleViewType = 'event23'; //Other Internal
        }
        return articleViewType;
    },

    setViewType: function () {
        if (this.isArticlePage()) {
            const articleViewType = window.document.referrer ? this.getViewTypeByReferrer() : this.getViewTypeByTrackingProperty();
            // Expose view type to the s-object because it is needed by other functionalities.
            s._articleViewType = articleViewType;
            s.events = s.events || '';
            s.events = s.apl(s.events, articleViewType);
        }
    }
};

function setExternalReferringDomainEvents(s) {
    const domainsToEventMapping = [
        {
            domains: ['www.google.com', 'www.google.de'],
            event: 'event49',
            matchExact: 'true',
        },
        {
            domains: ['googlequicksearch/'],
            event: 'event49',
        },
        {
            domains: ['news.google'],
            event: 'event48',
        },
        {
            domains: ['instagram.com'],
            event: 'event53',
        },
        {
            domains: ['youtube.com'],
            event: 'event50',
        },
        {
            domains: ['t.co', 'twitter.com', 'android-app://com.twitter.android'],
            event: 'event51',
        },
        {
            domains: ['facebook.com'],
            event: 'event52',
        },
    ];

    domainsToEventMapping.forEach(domainEventMap => {
        const {domains, event, matchExact} = domainEventMap;
        const domainMatches = domains.some(domain => {
            if (matchExact) {
                return s._referringDomain && s._referringDomain === domain;
            } else {
                return s._referringDomain && s._referringDomain.includes(domain);
            }

        });
        s.events = domainMatches ? s.apl(s.events, event) : s.events;
    });
}

function setKameleoonTracking(s) {
    if (s.linkName === 'Kameleoon Tracking') {
        if (window.Kameleoon) {
            window.Kameleoon.API.Tracking.processOmniture(s);
        }
        window.kameleoonOmnitureCallSent = true;
    }
}

const bildPageName = {
    isDocTypeArticle: function () {
        return !!window.utag.data.adobe_doc_type
            && window.utag.data.adobe_doc_type === 'article';
    },

    isHome: function () {
        return !!window.utag.data['page_id']
            && (window.utag.data['page_id'] == '17410084'
                || window.utag.data['page_id'] == '16237890');
    },

    isAdWall: function (s) {
        return !!s.pageName && (s.pageName.indexOf('42925516') !== -1
            || s.pageName.indexOf('54578900') !== -1);
    },

    isLive: function () {
        return !!this.isDocTypeArticle() && !!window.utag.data.page_cms_path
            && window.utag.data.page_cms_path.indexOf('im-live-ticker') !== -1;
    },

    isLiveSport: function () {
        return !!this.isDocTypeArticle() && !!window.utag.data.page_cms_path
            && (window.utag.data.page_cms_path.indexOf('im-liveticker') !== -1
                || window.utag.data.page_cms_path.indexOf('/liveticker/') !== -1);
    },

    setPageName: function (s) {
        if (this.isAdWall(s)) {
            window.utag.data.adobe_doc_type = 'ad wall';
            s.pageName = 'ad wall : ' + s.eVar1;
            s.eVar3 = 'ad wall';
            s.prop3 = 'ad wall';
        } else if (this.isHome()) {
            window.utag.data.page_mapped_doctype_for_pagename = 'home';
            s.eVar3 = 'home';
            s.prop3 = 'home';
            s.pageName = 'home : ' + window.utag.data['page_id'];
        } else if (this.isLive()) {
            window.utag.data.adobe_doc_type = 'live';
            s.eVar3 = 'live';
            s.prop3 = 'live';
            s.pageName = 'live : ' + window.utag.data['page_id'];
        } else if (this.isLiveSport()) {
            window.utag.data.adobe_doc_type = 'live-sport';
            s.eVar3 = 'live-sport';
            s.prop3 = 'live-sport';
            s.pageName = 'live-sport : ' + window.utag.data['page_id'];
        }
    },
};

const campaign = {
    getAdobeCampaign: function () {
        if (typeof window.utag.data['qp.cid'] !== 'undefined') {
            return ('cid=' + window.utag.data['qp.cid']);
        }
        if (typeof window.utag.data['qp.wtrid'] !== 'undefined') {
            return ('wtrid=' + window.utag.data['qp.wtrid']);
        }
        if (typeof window.utag.data['qp.wtmc'] !== 'undefined') {
            return ('wtmc=' + window.utag.data['qp.wtmc']);
        }
        if (typeof window.utag.data['qp.wt_mc'] !== 'undefined') {
            return ('wt_mc=' + window.utag.data['qp.wt_mc']);
        }
    },

    setCampaignVariables: function (s) {
        window.utag.data.adobe_campaign = this.getAdobeCampaign();
        //To be updated to a single assignment option after it is unified in tealium
        const adobe_campaign = s.campaign || window.utag.data['adobe_campaign'] || '';
        s.campaign = s.getValOnce(adobe_campaign, 's_ev0', 0, 'm');
        s.eVar88 = window.utag.data['adobe_campaign'] || window.utag.data['campaign_value'] || '';
    },
};

function setPageSourceForCheckout (s) {
    //Adding article view type and page age to cookies for checkout
    if (s._articleViewType) {
        s.eVar44 = s._articleViewType;
        window.utag.loader.SC('utag_main', { 'articleview': s._articleViewType + ';exp-session' });
        window.utag.data['cp.utag_main_articleview'] = s._articleViewType;
        window.utag.loader.SC('utag_main', { 'pa': window.utag.data.page_datePublication_age + ';exp-session' });
        window.utag.data['cp.utag_main_pa'] = window.utag.data.page_datePublication_age;
    }
}

/**
 * Scrolltiefe kommt aus dem Cookie vom letzten Aufruf, wenn wir kein Adobe Consent haben gibt es keine Cookies!
 */
s._scrollDepthObj = {

    getDocType: function () {
        return window.utag.data.adobe_doc_type || window.utag.data.ad_page_document_type
            || window.utag.data.page_type || window.utag.data.adobe_docType || '';
    },

    getPageId: function () {
        return window.utag.data.page_id || window.utag.data.cid || window.utag.data.screen_escenicId || '';
    },

    getPageChannel: function () {
        return window.utag.data._pathname1 || window.utag.data.page_channel1 || window.utag.data.nav1
            || window.utag.data.screen_sectionPath_level1 || window.utag.data.page_sectionPath1 || '';
    },

    getPagePremiumStatus: function () {
        const status = window.utag.data.is_status_premium || window.utag.data.page_isPremium
            || window.utag.data.screen_isPremium;
        return status ? status + ' : ' : '';
    },

    isDocTypeArticleOrVideo: function () {
        const doc_type = this.getDocType();
        return !!doc_type && (doc_type === 'article' || doc_type === 'video');
    },

    setPreviousPage: function (s) {
        if (s.pageName) {
            // Previous Page für article und video ==> document type : page_is_premium : page_id : page_channel
            if (this.isDocTypeArticleOrVideo()) {
                const doc_type = this.getDocType();
                const page_id = this.getPageId();
                const page_channel = this.getPageChannel();
                const page_is_premium = this.getPagePremiumStatus();
                s._prevPage = doc_type + ' : ' + page_is_premium + page_id + ' : ' + page_channel;
            } else {
                s._prevPage = s.pageName;
            }
        }
    },

    setData: function (s) {
        s.eVar33 = s._ppvPreviousPage;
        s.prop61 = s._ppvPreviousPage;
        s.prop62 = s._ppvInitialPercentViewed;
        s.prop63 = s._ppvHighestPixelsSeen;
        s.prop64 = Math.round(s._ppvInitialPercentViewed / 10) * 10;
        s.prop65 = Math.round(s._ppvHighestPercentViewed / 10) * 10;
        const event45 = 'event45=' + Math.round(s._ppvInitialPercentViewed / 10) * 10;
        const event46 = 'event46=' + Math.round(s._ppvHighestPercentViewed / 10) * 10;
        s.events = s.apl(s.events, event45, ',', 1);
        s.events = s.apl(s.events, event46, ',', 1);
    },

    setScrollDepthProperties: function (s) {
        this.setPreviousPage(s);
        if (s._prevPage) {
            s.getPercentPageViewed(s._prevPage);
            if (s._ppvPreviousPage) {
                this.setData(s);
            }
        }
    },
};

// internal Campaign
const ICIDTracking = {
    setVariables: function (s) {
        let icid = '';
        try {
            const queryParams = new URLSearchParams(window.location.search);
            icid = queryParams.get('icid') ? queryParams.get('icid') : '';
        } catch (error) {
            // nothing to do here
        }

        s.eVar78 = s.eVar79 = icid;
    }
};

function init() {
    s.currencyCode = 'EUR';
    s.execdoplugins = 0;
    s.expectSupplementalData = false;
    s.myChannels = 0;
    s.usePlugins = true;

    s.trackExternalLinks = true;
    s.eVar64 = s.visitor && s.visitor.version ? s.visitor.version : undefined;

    //no sdid for A4T
    s.expectSupplementalData = false; // Force to false;

    //Referrer for link events
    s.referrer = window.document.referrer || '';
    s._referringDomain = utils.getDomainFromURLString(window.document.referrer);

    //height & width for iPhones
    if (window.navigator.userAgent.indexOf('iPhone') > -1) {
        s.eVar94 = window.screen.width + 'x' + window.screen.height;
    }

    setKameleoonTracking(s);
    ICIDTracking.setVariables(s);
    articleViewType.setViewType();
    campaign.setCampaignVariables(s);
    setPageSourceForCheckout(s);
    setExternalReferringDomainEvents(s);
}

s.doPluginsGlobal = function (s) {
    //Config
    s.eVar63 = s.version;

    //Time & Timeparting
    s.eVar184 = new Date().getHours().toString();
    s.eVar181 = new Date().getMinutes().toString();
    s.eVar185 = window.utag.data.myCW || '';
    s._scrollDepthObj.setScrollDepthProperties(s);
};

// Evaluate runtime environment
if (typeof exports === 'object') {
    // Expose reference to members for unit testing.
    module.exports = {
        s,
        utils,
        init,
        campaign,
        bildPageName,
        articleViewType,
        setPageSourceForCheckout,
        setExternalReferringDomainEvents,
        setKameleoonTracking,
        ICIDTracking
    };
} else {
    init();
}
