var existingCookie = document.cookie.match(/cmp_cv_list=([a-zA-z0-9_,-]*)/);
var existingFallbackCookie = document.cookie.match(/__utag_cmp_vendor_list=([a-zA-z0-9_,-]*)/);
if ((existingCookie && existingCookie[0].indexOf('adobe_analytics') >= 0) || (existingFallbackCookie && existingFallbackCookie[0].indexOf('adobe_analytics') >= 0)){


/******************************************* BEGIN CODE TO DEPLOY *******************************************/ 
/* Adobe Consulting Plugin: getPercentPageViewed v4.0 w/handlePPVevents helper function (Requires p_fo plug-in) */
s.getPercentPageViewed=function(e,t){var n=this,p=n.c_r("s_ppv");(p=-1<p.indexOf(",")?p.split(","):[])[0]=n.unescape(p[0]),e=e||(n.pageName?n.pageName:document.location.href),n.ppvChange=void 0===t||1==t,void 0!==n.linkType&&"o"===n.linkType||(n.ppvID&&n.ppvID===e||(n.ppvID=e,n.c_w("s_ppv",""),n.handlePPVevents()),n.p_fo("s_gppvLoad")&&window.addEventListener&&(window.addEventListener("load",n.handlePPVevents,!1),window.addEventListener("click",n.handlePPVevents,!1),window.addEventListener("scroll",n.handlePPVevents,!1)),n._ppvPreviousPage=p[0]?p[0]:"",n._ppvHighestPercentViewed=p[1]?p[1]:"",n._ppvInitialPercentViewed=p[2]?p[2]:"",n._ppvHighestPixelsSeen=p[3]?p[3]:"",n._ppvFoldsSeen=p[4]?p[4]:"",n._ppvFoldsAvailable=p[5]?p[5]:"")};
s.handlePPVevents=function(){if("undefined"!=typeof s_c_il){for(var e=0,t=s_c_il.length;e<t;e++)if(s_c_il[e]&&(s_c_il[e].getPercentPageViewed||s_c_il[e].getPreviousPageActivity)){var n=s_c_il[e];break}if(n&&n.ppvID){var p=Math.max(Math.max(document.body.scrollHeight,document.documentElement.scrollHeight),Math.max(document.body.offsetHeight,document.documentElement.offsetHeight),Math.max(document.body.clientHeight,document.documentElement.clientHeight)),i=window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight;e=(window.pageYOffset||window.document.documentElement.scrollTop||window.document.body.scrollTop)+i,t=Math.min(Math.round(e/p*100),100);var s=Math.floor(e/i);i=Math.floor(p/i);var o="";if(!n.c_r("s_tp")||n.unescape(n.c_r("s_ppv").split(",")[0])!==n.ppvID||n.p_fo(n.ppvID)||1==n.ppvChange&&n.c_r("s_tp")&&p!=n.c_r("s_tp")){if((n.unescape(n.c_r("s_ppv").split(",")[0])!==n.ppvID||n.p_fo(n.ppvID+"1"))&&n.c_w("s_ips",e),n.c_r("s_tp")&&n.unescape(n.c_r("s_ppv").split(",")[0])===n.ppvID){n.c_r("s_tp");var c=-1<(o=n.c_r("s_ppv")).indexOf(",")?o.split(","):[];o=c[0]?c[0]:"",c=c[3]?c[3]:"";var _=n.c_r("s_ips");o=o+","+Math.round(c/p*100)+","+Math.round(_/p*100)+","+c+","+s}n.c_w("s_tp",p)}else o=n.c_r("s_ppv");var a=o&&-1<o.indexOf(",")?o.split(",",6):[];p=0<a.length?a[0]:escape(n.ppvID),c=1<a.length?parseInt(a[1]):t,_=2<a.length?parseInt(a[2]):t;var d=3<a.length?parseInt(a[3]):e,l=4<a.length?parseInt(a[4]):s;a=5<a.length?parseInt(a[5]):i,0<t&&(o=p+","+(t>c?t:c)+","+_+","+(e>d?e:d)+","+(s>l?s:l)+","+(i>a?i:a)),n.c_w("s_ppv",o)}}};
s.p_fo=function(e){var t=this;return t.__fo||(t.__fo={}),!t.__fo[e]&&(t.__fo[e]={},!0)};


/* Adobe Consulting Plugin: getPercentPageViewed v3.01 w/handlePPVevents helper function (Requires AppMeasurement and p_fo plugin) 
s.getPercentPageViewed=function(pid,ch){var s=this,a=s.c_r("s_ppv");a=-1<a.indexOf(",")?a.split(","):[];a[0]=s.unescape(a[0]); 
pid=pid?pid:s.pageName?s.pageName:document.location.href;s.ppvChange=ch?ch:!0;if("undefined"===typeof s.linkType||"o"!==
s.linkType)s.ppvID&&s.ppvID===pid||(s.ppvID=pid,s.c_w("s_ppv",""),s.handlePPVevents()),s.p_fo("s_gppvLoad")&&window
.addEventListener&&(window.addEventListener("load",s.handlePPVevents,!1),window.addEventListener("click",s.handlePPVevents, !1),window.addEventListener("scroll",s.handlePPVevents,!1),window.addEventListener("resize",s.handlePPVevents,!1)),s._ppvPreviousPage
=a[0]?a[0]:"",s._ppvHighestPercentViewed=a[1]?a[1]:"",s._ppvInitialPercentViewed=a[2]?a[2]:"",s._ppvHighestPixelsSeen=a[3]?a[3]:""}; 

/* Adobe Consulting Plugin: handlePPVevents helper function (for getPercentPageViewed v3.01 Plugin) 
s.handlePPVevents=function(){if("undefined"!==typeof s_c_il){for(var c=0,d=s_c_il.length;c<d;c++)if(s_c_il[c]&&s_c_il[c].getPercentPageViewed){var a=s_c_il[c];break}if(a&&a.ppvID){var f=Math.max(Math.max(document.body.scrollHeight,document.documentElement.scrollHeight),Math.max(document.body.offsetHeight,document.documentElement.offsetHeight),Math.max(document.
body.clientHeight,document.documentElement.clientHeight));c=(window.pageYOffset||window.document.documentElement.scrollTop||window.document.body.scrollTop)+(window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight);d=Math.min(Math.round
(c/f*100),100);var e="";!a.c_r("s_tp")||a.unescape(a.c_r("s_ppv").split(",")[0])!==a.ppvID||1==a.ppvChange&&
a.c_r("s_tp")&&f!= a.c_r("s_tp")?(a.c_w("s_tp",f),a.c_w("s_ppv","")):e=a.c_r("s_ppv");var b=e&&-1<e.indexOf(",")?e.split(",",4):[];f=0<b.length?b[0]:escape(a.ppvID);var g=1<b.length?parseInt(b[1]):d,h=2<b.length?parseInt(b[2]):d;b=3<b.length?parseInt(b[3]):c;0<d&&(e=f+","+(d>g?d:g)+","+h+","+(c>b?c:b));a.c_w("s_ppv",e)}}}; 
*/

/* Adobe Consulting Plugin: p_fo (pageFirstOnly) v2.0 (Requires AppMeasurement)  
s.p_fo=function(on){var s=this;s.__fo||(s.__fo={});if(s.__fo[on])return!1;s.__fo[on]={};return!0}; */
}
else
{
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


/******************************************** END CODE TO DEPLOY ********************************************/

s.usePlugins=true; 
s.execdoplugins = 0;

s._articleViewType='';
s._appDomain=document.domain;   // set to domain being ntracking, i.e. welt.de or bild.de
s._searchEngines=".google.|bing.com|ecosia.org|duckduckgo.com|amp-welt-de.cdn.ampproject.org|qwant.com|suche.t-online.de|.yandex.|.yahoo.com|googleapis.com|nortonsafe.search.ask.com|wikipedia.org|googleadservices.com|search.myway.com|lycos.de";
s._socialDomains="facebook.com|xing.com|instagram.com|youtube.com|t.co|www.linkedin.com|away.vk.com|www.pinterest.de|linkedin.android|ok.ru|mobile.ok.ru|www.yammer.com|twitter.com|www.netvibes.com|pinterest.com|wordpress.com|blogspot.com|lnkd.in|xing.android|vk.com|com.twitter.android|m.ok.ru|welt.de/instagram";       
s._referringDomain=document.referrer;
s._referringDomain=(s._referringDomain.indexOf("?")>0)?document.referrer.split("?")[0]:s._referringDomain;

s.doPlugins = function(s) {

    //Campaign
    s.campaign = s.getValOnce(s.campaign, 's_ev0', 0, "m");
    
    //no sdid for A4T
    s.expectSupplementalData = false; // Force to false;
    
    //defaults
    s.currencyCode="EUR";
    s.trackExternalLinks = true;    
    s.eVar63 = s.version;
    s.eVar64 = (typeof s.visitor !== "undefined") ? s.visitor.version : "undefined";    

    //Time, Maik Min + Nicole Std, Alina CW
    s.eVar184 = new Date().getHours().toString();
    s.eVar181 = new Date().getMinutes().toString();
    
    //Scrolltiefe
    /**
     * Scrolltiefe kommt aus dem Cookie vom letzten Aufruf, wenn wir kein Adobe Consent haben gibt es keine Cookies!
     */
    if (typeof s.pageName  != 'undefined' && s.pageName != '') {
        // Previous Page für article und video ==> document type : page_is_premium : page_id : page_channel
        if (typeof b.page_document_type != 'undefined' && (b.page_document_type == 'article' || b.page_document_type == 'video')) {
            s._prevPage = b.page_document_type + " : " + b.page_id  + " : " + b.page_channel1;
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
    //Channels
    if(s.execdoplugins == 0){
        s.events = s.events ? s.events : '';
            if (utag_data.page_document_type.match(/(article|artikel|live|gallery|video)/i) != null) {
                // if (b['page_type'].match(/(article|artikel)/i) != null) {
                s.getWTRID = s.Util.getQueryParam('wtrid') || '';
                s.getWTMC = s.Util.getQueryParam('wtmc') || '';
                s.getCID = s.Util.getQueryParam('cid') || '';
                    
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
                                    if (s.getWTRID.indexOf('sea.') === 0 || s.getWTMC.indexOf('sea.') === 0 || s.getCID.indexOf('sea.') === 0)   s._articleViewType = 'event24';
                                    if (s.getWTRID.indexOf('socialmedia') === 0 || s.getWTMC.indexOf('socialmedia') === 0 || s.getCID.indexOf('social') === 0) s._articleViewType = 'event25';
                                                                                                                           if (s.getWTRID.indexOf('kooperation') === 0 || s.getWTMC.indexOf('kooperation') === 0 || s.getCID.indexOf('affiliate') === 0 ) s._articleViewType = 'event23';
                                }
                            }
                            if (s._articleViewType !== '')s.events = s.apl(s.events, s._articleViewType, ',', 1);
                           
                            console.log("RESULT s.events=" + s.events);

    }
    s.execdoplugins++;
//Kameleon
/* if(s.linkName === "Kameleoon Tracking")
 {if (window.Kameleoon) {
    Kameleoon.API.Tracking.processOmniture(s);
    }
    window.kameleoonOmnitureCallSent = true;}
*/    
//Page Source Aufsplittung    
 if(s._articleViewType !== ''){
     
s.eVar44 = s._articleViewType;
//eVar44 in den checkout schieben
utag.loader.SC('utag_main', {'articleview': s._articleViewType + ';exp-session'});
b['cp.utag_main_articleview'] = s._articleViewType;
     
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

}
//userAgent
s.eVar61 = navigator.userAgent;
   console.log("RESULT s.events=" + s.events);  
}