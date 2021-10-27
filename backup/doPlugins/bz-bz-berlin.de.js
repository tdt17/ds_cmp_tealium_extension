var existingCookie = document.cookie.match(/__utag_cmp_vendor_list=([a-zA-z0-9_,-]*)/);
var existingCookieFallback = document.cookie.match(/cmp_cv_list=([a-zA-z0-9_,-]*)/);
if ((existingCookie && existingCookie[0].indexOf('adobe_analytics') >= 0) || (existingCookieFallback && existingCookieFallback[0].indexOf('adobe_analytics') >= 0)){

    /******************************************* BEGIN CODE TO DEPLOY *******************************************/
    /* Adobe Consulting Plugin: getPercentPageViewed v4.0w/handlePPVeventshelper function (Requires AppMeasurement and p_fo plugin) */
    s.getPercentPageViewed=function(pid,ch){var s=this,a=s.c_r("s_ppv");a=-1<a.indexOf(",")?a.split(","):[];a[0]=s.unescape(a[0]); pid=pid?pid:s.pageName?s.pageName:document.location.href;s.ppvChange="undefined"===typeof ch||!0==ch?!0:!1;if("undefined"=== typeof s.linkType||"o"!==s.linkType)s.ppvID&&s.ppvID===pid||(s.ppvID=pid,s.c_w("s_ppv",""),s.handlePPVevents()), s.p_fo("s_gppvLoad")&&window.addEventListener&&(window.addEventListener("load",s.handlePPVevents,!1),window.addEventListener("click",s.handlePPVevents,!1),window.addEventListener("scroll",s.handlePPVevents,!1)),s._ppvPreviousPage=a[0]?a[0]:"",s._ppvHighestPercentViewed=a[1]?a[1]:"",s._ppvInitialPercentViewed=a[2]?a[2]:"",s._ppvHighestPixelsSeen=a[3]?a[3]:"",s._ppvFoldsSeen=a[4]?a[4]:"",s._ppvFoldsAvailable=a[5]?a[5]:""};
    /* Adobe Consulting Plugin: handlePPVevents helper function (for getPercentPageViewed v4.0Plugin) */
    s.handlePPVevents=function(){if("undefined"!==typeof s_c_il){for(var c=0,g=s_c_il.length;c<g;c++)if(s_c_il[c]&& (s_c_il[c].getPercentPageViewed||s_c_il[c].getPreviousPageActivity)){var s=s_c_il[c];break}if(s&&s.ppvID){var f=Math.max (Math.max(document.body.scrollHeight,document.documentElement.scrollHeight),Math.max(document.body.offsetHeight, document.documentElement.offsetHeight),Math.max(document.body.clientHeight,document.documentElement.clientHeight)),h= window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight;c=(window.pageYOffset|| window.document.documentElement.scrollTop||window.document.body.scrollTop)+h;g=Math.min(Math.round(c/f*100),100);var k=Math.floor(c/h);h=Math.floor(f/h);var d="";if(!s.c_r("s_tp")||s.unescape(s.c_r("s_ppv").split(",")[0])!==s.ppvID||s.p_fo(s.ppvID) ||1==s.ppvChange&&s.c_r("s_tp")&&f!=s.c_r("s_tp")){(s.unescape(s.c_r("s_ppv").split(",")[0])!==s.ppvID||s.p_fo(s.ppvID+"1"))&&s.c_w("s_ips",c);if(s.c_r("s_tp")&&s.unescape(s.c_r("s_ppv").split(",")[0])===s.ppvID){s.c_r("s_tp");d=s.c_r("s_ppv");var e=-1< d.indexOf(",")?d.split(","):[];d=e[0]?e[0]:"";e=e[3]?e[3]:"";var l=s.c_r("s_ips");d=d+","+Math.round(e/f*100)+","+Math.round(l/ f*100)+","+e+","+k}s.c_w("s_tp",f)}else d=s.c_r("s_ppv");var b=d&&-1<d.indexOf(",")?d.split(",",6):[];f=0<b.length?b[0]: escape(s.ppvID);e=1<b.length?parseInt(b[1]):g;l=2<b.length?parseInt(b[2]):g;var m=3<b.length?parseInt(b[3]):c,n=4<b.length? parseInt(b[4]):k;b=5<b.length?parseInt(b[5]):h;0<g&&(d=f+","+(g>e?g:e)+","+l+","+(c>m?c:m)+","+(k>n?k:n)+","+(h>b?h:b)); s.c_w("s_ppv",d)}}};
    /* Adobe Consulting Plugin: p_fo (pageFirstOnly) v2.0 (Requires AppMeasurement) */
    s.p_fo=function(on){var s=this;s.__fo||(s.__fo={});if(s.__fo[on])return!1;s.__fo[on]={};return!0};
    /******************************************** END CODE TO DEPLOY ********************************************/
    console.log('do')

}
else{
    console.log('dont')
}

/* Plugin: getValOnce_v1.11 */
s.getValOnce=new Function("v","c","e","t",""
    +"var s=this,a=new Date,v=v?v:'',c=c?c:'s_gvo',e=e?e:0,i=t=='m'?6000"
    +"0:86400000,k=s.c_r(c);if(v){a.setTime(a.getTime()+e*i);s.c_w(c,v,e"
    +"==0?0:a);}return v==k?'':v");


/*
* Plugin Utility: apl v1.1
*/
s.apl=new Function("L","v","d","u",""
    +"var s=this,m=0;if(!L)L='';if(u){var i,n,a=s.split(L,d);for(i=0;i<a."
    +"length;i++){n=a[i];m=m||(u==1?(n==v):(n.toLowerCase()==v.toLowerCas"
    +"e()));}}if(!m)L=L?L+d+v:v;return L");
/*
* Utility Function: split v1.5 - split a string (JS 1.0 compatible)
*/
s.split=new Function("l","d",""
    +"var i,x=0,a=new Array;while(l){i=l.indexOf(d);i=i>-1?i:l.length;a[x"
    +"++]=l.substring(0,i);l=l.substring(i+d.length);}return a");


s.usePlugins=true;
s.execdoplugins = 0;

s._articleViewType='';
s._appDomain=document.domain;   // set to domain being ntracking, i.e. welt.de or bild.de
s._searchEngines=".google.|bing.com|ecosia.org|duckduckgo.com|amp-welt-de.cdn.ampproject.org|qwant.com|suche.t-online.de|.yandex.|.yahoo.com|googleapis.com|nortonsafe.search.ask.com|wikipedia.org|googleadservices.com|search.myway.com|lycos.de";
s._socialDomains="facebook.com|xing.com|instagram.com|youtube.com|t.co|www.linkedin.com|away.vk.com|www.pinterest.de|linkedin.android|ok.ru|mobile.ok.ru|www.yammer.com|twitter.com|www.netvibes.com|pinterest.com|wordpress.com|blogspot.com|lnkd.in|xing.android|vk.com|com.twitter.android|m.ok.ru|welt.de/instagram";
s._referringDomain=document.referrer;
s._referringDomain=(typeof s._referringDomain != 'undefined' && s._referringDomain.indexOf("?")>0)?document.referrer.split("?")[0]:s._referringDomain;

s.doPlugins = function(s) {

    //Campaign
    s.campaign = s.getValOnce(s.campaign, 's_ev0',0,"m");
    s.eVar88 = b['campaign_adobe'];

    //internal Campaign
    s.getICID = s.Util.getQueryParam('icid') || '';
    s.eVar78 = s.getICID;
    s.eVar79 = s.getICID;


    //Time
    s.eVar184 = new Date().getHours().toString();
    s.eVar181 = new Date().getMinutes().toString();
    s.eVar185 = b.myCW;

    //Scrolltiefe
    if (typeof s.pageName  != 'undefined' && s.pageName != '') {
        // Previous Page für article und video ==> document type : page_is_premium : page_id : page_channel
        if (typeof b.page_document_type != 'undefined' && (b.page_document_type == 'single' || b.page_document_type == 'video')) {
            s._prevPage = b.page_document_type + " : " + b.page_id  + " : " + b._pathname1;
        }else
        {s._prevPage = s.pageName;}}

    if (typeof s._prevPage  != 'undefined' && s._prevPage != '') {
        s.getPercentPageViewed(s._prevPage);

        if (typeof s._ppvPreviousPage  != 'undefined' && s._ppvPreviousPage != ''){

            s.eVar33 = s._ppvPreviousPage;
            s.prop61 = s._ppvPreviousPage;
            s.prop62 = s._ppvInitialPercentViewed;
            s.prop63 = s._ppvHighestPixelsSeen;
            s.prop64 = Math.round(s._ppvInitialPercentViewed / 10) * 10;
            s.prop65 = Math.round(s._ppvHighestPercentViewed / 10) * 10;
            event45 = "event45=" + Math.round(s._ppvInitialPercentViewed / 10) * 10;
            event46 = "event46=" + Math.round(s._ppvHighestPercentViewed / 10) * 10;
            s.events = s.apl(s.events, event45, ",", 1);
            s.events = s.apl(s.events, event46, ",", 1);
        }
    }

    //Scrolltiefe
    /*    s.getPercentPageViewed();
        s.eVar33 = s._ppvPreviousPage;
        s.prop61 = s._ppvPreviousPage;
        s.prop62 = s._ppvInitialPercentViewed;
        s.prop63 = s._ppvHighestPixelsSeen;
        s.prop64 = Math.round(s._ppvInitialPercentViewed/10)*10;
        s.prop65 = Math.round(s._ppvHighestPercentViewed/10)*10;
        event45= "event45=" + Math.round(s._ppvInitialPercentViewed/10)*10;
        event46 ="event46="+  Math.round(s._ppvHighestPercentViewed/10)*10;
        s.events=s.apl(s.events,event45,",",1);
        s.events=s.apl(s.events,event46,",",1);
    */
    //no sdid for A4T
    s.expectSupplementalData = false; // Force to false;
    //config
    s.currencyCode="EUR";
    s.eVar63 = s.version;
    s.eVar64 = (typeof s.visitor !== "undefined") ? s.visitor.version : "undefined";

    //Channels
    if(s.execdoplugins == 0){
        s.events = s.events ? s.events : '';
        if (utag_data.page_document_type.match(/(single|media)/i) !== null) {
            //if (utag_data.page_type.match(/(single|artikel|live|gallery|video)/i) != null) {
            s.getCID = s.Util.getQueryParam('cid') || '';
            s.getUTM = s.Util.getQueryParam('utm_source') || '';

            if (document.referrer !== '' ) {
                var _isSearchView = new RegExp(s._searchEngines.replace(/\./g, "\\.")).exec(s._referringDomain) !== null;
                if (_isSearchView)
                    s._articleViewType = 'event24';
                else {
                    var _isSocialView = new RegExp(s._socialDomains.replace(/\./g, "\\.")).exec(s._referringDomain) !== null;
                    if (_isSocialView) s._articleViewType = 'event25';
                    else {
                        var _isIntDomain = s._referringDomain.indexOf(document.domain) > -1;
                        if (_isIntDomain) {
                            var _isHomeView = new RegExp(document.domain.replace(/\./g, "\\.") + "\/*$").exec(s._referringDomain) !== null;
                            if (_isHomeView) s._articleViewType = 'event22';
                            else s._articleViewType = 'event23';
                        } else s._articleViewType = 'event27';
                    }
                }
            } else {
                s._articleViewType = 'event26';
                if (s.getUTM.indexOf('sea.') === 0 || s.getCID.indexOf('sea.') === 0)   s._articleViewType = 'event24';
                if (s.getUTM.indexOf('socialmedia') === 0 || s.getCID.indexOf('social') === 0) s._articleViewType = 'event25';
                if (s.getUTM.indexOf('kooperation') === 0 || s.getCID.indexOf('affiliate') === 0 ) s._articleViewType = 'event23';
            }
        }
        if (s._articleViewType !== '')s.events = s.apl(s.events, s._articleViewType, ',', 1);

        console.log("RESULT s.events=" + s.events);

    }
    s.execdoplugins++;

// Google Discover
    if(s._referringDomain.substr(s._referringDomain.indexOf("google.com"),     100) === "google.com"
        || s._referringDomain.indexOf("googlequicksearch/")!=-1){

        s.events = s.apl(s.events, "event49", ',', 1);

    }

//Google News
    if(s._referringDomain.indexOf("news.google") != -1){

        s.events = s.apl(s.events, "event48", ',', 1);
    }

//Instagram
    if(s._referringDomain.indexOf("instagram.com") != -1){

        s.events = s.apl(s.events, "event53", ',', 1);
    }

//Youtube
    if(s._referringDomain.indexOf("youtube.com") != -1){

        s.events = s.apl(s.events, "event50", ',', 1);
    }
//Twitter

    if(s._referringDomain.indexOf("t.co") != -1 || s._referringDomain.indexOf("twitter.com") != -1 || s._referringDomain.indexOf("android-app://com.twitter.android") != -1 ){

        s.events = s.apl(s.events, "event51", ',', 1);
    }

//Facebook
    if(s._referringDomain.indexOf("facebook.com") != -1){

        s.events = s.apl(s.events, "event52", ',', 1);
    }

//User Agent
    s.eVar61 = navigator.userAgent

    console.log("RESULT s.events=" + s.events);
}


