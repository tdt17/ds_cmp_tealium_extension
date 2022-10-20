/* eslint-disable */
const s = window.s || {};

// START: Pre-defined Adobe Plugins
/* istanbul ignore next */
/* Adobe Consulting Plugin: getPreviousValue v3.0 */
s.getPreviousValue = function(v,c){var k=v,d=c;if("-v"===k)return{plugin:"getPreviousValue",version:"3.0"};var a=function(){if("undefined"!==typeof window.s_c_il)for(var c=0,b;c<window.s_c_il.length;c++)if(b=window.s_c_il[c],b._c&&"s_c"===b._c)return b}();"undefined"!==typeof a&&(a.contextData.getPreviousValue="3.0");window.cookieWrite=window.cookieWrite||function(c,b,f){if("string"===typeof c){var h=window.location.hostname,a=window.location.hostname.split(".").length-1;if(h&&!/^[0-9.]+$/.test(h)){a=2<a?a:2;var e=h.lastIndexOf(".");if(0<=e){for(;0<=e&&1<a;)e=h.lastIndexOf(".",e-1),a--;e=0<e?h.substring(e):h}}g=e;b="undefined"!==typeof b?""+b:"";if(f||""===b)if(""===b&&(f=-60),"number"===typeof f){var d=new Date;d.setTime(d.getTime()+6E4*f)}else d=f;return c&&(document.cookie=encodeURIComponent(c)+"="+encodeURIComponent(b)+"; path=/;"+(f?" expires="+d.toUTCString()+";":"")+(g?" domain="+g+";":""),"undefined"!==typeof cookieRead)?cookieRead(c)===b:!1}};window.cookieRead=window.cookieRead||function(c){if("string"===typeof c)c=encodeURIComponent(c);else return"";var b=" "+document.cookie,a=b.indexOf(" "+c+"="),d=0>a?a:b.indexOf(";",a);return(c=0>a?"":decodeURIComponent(b.substring(a+2+c.length,0>d?b.length:d)))?c:""};var l;d=d||"s_gpv";a=new Date;a.setTime(a.getTime()+18E5);window.cookieRead(d)&&(l=window.cookieRead(d));k?window.cookieWrite(d,k,a):window.cookieWrite(d,l,a);return l};
/******************************************** END CODE TO DEPLOY ********************************************/
/* eslint-enable */
// END: Pre-defined Adobe Plugins

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
    if (typeof window.utag.data.page_cms_path !== 'undefined'
        && window.utag.data.page_cms_path.indexOf('/BILD/') !== -1) {

        s.eVar4 = window.utag.data.page_cms_path.replace('/BILD/', '');
        s.prop4 = window.utag.data.page_cms_path.replace('/BILD/', '');
        window.utag.data.page_cms_path = window.utag.data.page_cms_path.replace('/BILD/', '');
    }
};

s._bildAppsInit = function (s) {
    s.usePlugins = true;
    s.currencyCode = 'EUR';

    s.eVar61 = window.navigator.userAgent;

    //height & width for iPhones
    if (window.navigator.userAgent.indexOf('iPhone') > -1) {
        s.eVar94 = window.screen.width + 'x' + window.screen.height;
    }

};

s.doPlugins = function (s) {
    //no sdid for A4T
    s.expectSupplementalData = false; // Force to false;

    s.eVar63 = s.version;
    s.eVar64 = s.visitor && s.visitor.version ? s.visitor.version : undefined;

    s.eVar184 = new Date().getHours().toString();
    s.eVar181 = new Date().getMinutes().toString();
    s.eVar185 = window.utag.data.myCW || '';

    s.eVar33 = s.prop61 = s.getPreviousValue(s.pageName);

    s._bildAppsPageNameObj.setAppsPageName(s);
    s._orderViaArticle(s);
    s._setPageCmsPathWithoutBild(s);
    s._setPageAgeForCheckout();
};

// Evaluate runtime environment
if (typeof exports === 'object') {
    // Export s-object with all functions for unit testing
    module.exports = s;
} else {
    s._bildAppsInit(s);
}