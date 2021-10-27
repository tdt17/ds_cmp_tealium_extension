/******************************************* BEGIN CODE TO DEPLOY *******************************************/
/* Adobe Consulting Plugin: getPercentPageViewed v4.0 w/handlePPVevents helper function (Requires p_fo plug-in) */
s.getPercentPageViewed=function(pid,ch){var s=this,a=s.c_r("s_ppv");a=-1<a.indexOf(",")?a.split(","):[];a[0]=s.unescape(a[0]); pid=pid?pid:s.pageName?s.pageName:document.location.href;s.ppvChange="undefined"===typeof ch||!0==ch?!0:!1;if("undefined"=== typeof s.linkType||"o"!==s.linkType)s.ppvID&&s.ppvID===pid||(s.ppvID=pid,s.c_w("s_ppv",""),s.handlePPVevents()), s.p_fo("s_gppvLoad") &&window.addEventListener&&(window.addEventListener("load",s.handlePPVevents,!1),window.addEventListener("click",s.handlePPVevents, !1),window.addEventListener("scroll",s.handlePPVevents,!1)),s._ppvPreviousPage=a[0]?a[0]:"",s._ppvHighestPercentViewed=a[1]?a[1]:"",s._ppvInitialPercentViewed=a[2]?a[2]:"",s._ppvHighestPixelsSeen=a[3]?a[3]:"",s._ppvFoldsSeen=a[4]?a[4]:"",s._ppvFoldsAvailable=a[5]?a[5]:""};

/* Adobe Consulting Plugin: handlePPVevents helper function (for getPercentPageViewed v4.0 Plugin) */
s.handlePPVevents=function(){if("undefined"!==typeof s_c_il){for(var c=0,g=s_c_il.length;c<g;c++)if(s_c_il[c]&& (s_c_il[c].getPercentPageViewed||s_c_il[c].getPreviousPageActivity)){var s=s_c_il[c];break}if(s&&s.ppvID){var f=Math.max (Math.max(document.body.scrollHeight,document.documentElement.scrollHeight),Math.max(document.body.offsetHeight, document.documentElement.offsetHeight),Math.max(document.body.clientHeight,document.documentElement.clientHeight)),h= window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight;c=(window.pageYOffset|| window.document.documentElement.scrollTop||window.document.body.scrollTop)+h;g=Math.min(Math.round(c/f*100),100);var k=Math.floor(c/h);h=Math.floor(f/h);var d="";if(!s.c_r("s_tp")||s.unescape(s.c_r("s_ppv").split(",")[0])!==s.ppvID||s.p_fo(s.ppvID) ||1==s.ppvChange&&s.c_r("s_tp")&&f!=s.c_r("s_tp")){(s.unescape(s.c_r("s_ppv").split(",")[0])!==s.ppvID||s.p_fo(s.ppvID+"1"))&&s.c_w("s_ips",c);if(s.c_r("s_tp")&&s.unescape(s.c_r("s_ppv").split(",")[0])===s.ppvID){s.c_r("s_tp");d=s.c_r("s_ppv");var e=-1< d.indexOf(",")?d.split(","):[];d=e[0]?e[0]:"";e=e[3]?e[3]:"";var l=s.c_r("s_ips");d=d+","+Math.round(e/f*100)+","+Math.round(l/ f*100)+","+e+","+k}s.c_w("s_tp",f)}else d=s.c_r("s_ppv");var b=d&&-1<d.indexOf(",")?d.split(",",6):[];f=0<b.length?b[0]: escape(s.ppvID);e=1<b.length?parseInt(b[1]):g;l=2<b.length?parseInt(b[2]):g;var m=3<b.length?parseInt(b[3]):c,n=4<b.length? parseInt(b[4]):k;b=5<b.length?parseInt(b[5]):h;0<g&&(d=f+","+(g>e?g:e)+","+l+","+(c>m?c:m)+","+(k>n?k:n)+","+(h>b?h:b)); s.c_w("s_ppv",d)}}};

/* Adobe Consulting Plugin: p_fo (pageFirstOnly) v2.0 */
s.p_fo=function(on){var s=this;s.__fo||(s.__fo={});if(s.__fo[on])return!1;s.__fo[on]={};return!0};

/* Plugin: getValOnce_v1.11 */
s.getValOnce=new Function("v","c","e","t",""
    +"var s=this,a=new Date,v=v?v:'',c=c?c:'s_gvo',e=e?e:0,i=t=='m'?6000"
    +"0:86400000,k=s.c_r(c);if(v){a.setTime(a.getTime()+e*i);s.c_w(c,v,e"
    +"==0?0:a);}return v==k?'':v");

/******************************************** END CODE TO DEPLOY ********************************************/

s.usePlugins=true
s.doPlugins = function(s) {
    s.getPercentPageViewed();
    s.prop18 = s._ppvHighestPercentViewed;
    s.eVar30 = s._ppvHighestPercentViewed;
    s.eVar33 = s._ppvPreviousPage;
    s.eVar34 = s._ppvInitialPercentViewed;
    s.eVar35 = s._ppvHighestPixelsSeen;

//no sdid for A4T
    s.expectSupplementalData = false; // Force to false;

//Campaign
    s.campaign = s.getValOnce(s.campaign, 's_ev0', 0, "m");
    s.eVar88 = b['campaign_value'];

    //last PV Event für Order
    s.eVar44 = utag.data["cp.utag_main_articleview"];

//config
    s.currencyCode="EUR";
    s.eVar63 = s.version;
    s.eVar64 = (typeof s.visitor !== "undefined") ? s.visitor.version : "undefined";

//Kameleon
    if(s.linkName === "Kameleoon Tracking") {
        if (window.Kameleoon) {
            Kameleoon.API.Tracking.processOmniture(s);
        }
        window.kameleoonOmnitureCallSent = true;

    }

//userAgent
    s.eVar61 = navigator.userAgent;

//height & width für iPhones
    if (navigator.userAgent.indexOf('iPhone') > -1) {
        s.eVar94 = screen.width + "x" + screen.height;
    }

    /*
    //Page Age wenn Order via Artikel
    if (b.order_is_via_article === "true" && utag.data['cp.utag_main_pa'] !== undefined) {
        s.eVar17 = utag.data['cp.utag_main_pa'];
        }    */

}