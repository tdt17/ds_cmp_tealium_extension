/******************************************* BEGIN CODE TO DEPLOY *******************************************/
/* Adobe Consulting Plugin: getPercentPageViewed v4.0 w/handlePPVevents helper function (Requires p_fo plug-in) */
s.getPercentPageViewed=function(pid,ch){var s=this,a=s.c_r("s_ppv");a=-1<a.indexOf(",")?a.split(","):[];a[0]=s.unescape(a[0]); pid=pid?pid:s.pageName?s.pageName:document.location.href;s.ppvChange="undefined"===typeof ch||!0==ch?!0:!1;if("undefined"=== typeof s.linkType||"o"!==s.linkType)s.ppvID&&s.ppvID===pid||(s.ppvID=pid,s.c_w("s_ppv",""),s.handlePPVevents()), s.p_fo("s_gppvLoad") &&window.addEventListener&&(window.addEventListener("load",s.handlePPVevents,!1),window.addEventListener("click",s.handlePPVevents, !1),window.addEventListener("scroll",s.handlePPVevents,!1)),s._ppvPreviousPage=a[0]?a[0]:"",s._ppvHighestPercentViewed=a[1]?a[1]:"",s._ppvInitialPercentViewed=a[2]?a[2]:"",s._ppvHighestPixelsSeen=a[3]?a[3]:"",s._ppvFoldsSeen=a[4]?a[4]:"",s._ppvFoldsAvailable=a[5]?a[5]:""};

/* Adobe Consulting Plugin: handlePPVevents helper function (for getPercentPageViewed v4.0 Plugin) */
s.handlePPVevents=function(){if("undefined"!==typeof s_c_il){for(var c=0,g=s_c_il.length;c<g;c++)if(s_c_il[c]&& (s_c_il[c].getPercentPageViewed||s_c_il[c].getPreviousPageActivity)){var s=s_c_il[c];break}if(s&&s.ppvID){var f=Math.max (Math.max(document.body.scrollHeight,document.documentElement.scrollHeight),Math.max(document.body.offsetHeight, document.documentElement.offsetHeight),Math.max(document.body.clientHeight,document.documentElement.clientHeight)),h= window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight;c=(window.pageYOffset|| window.document.documentElement.scrollTop||window.document.body.scrollTop)+h;g=Math.min(Math.round(c/f*100),100);var k=Math.floor(c/h);h=Math.floor(f/h);var d="";if(!s.c_r("s_tp")||s.unescape(s.c_r("s_ppv").split(",")[0])!==s.ppvID||s.p_fo(s.ppvID) ||1==s.ppvChange&&s.c_r("s_tp")&&f!=s.c_r("s_tp")){(s.unescape(s.c_r("s_ppv").split(",")[0])!==s.ppvID||s.p_fo(s.ppvID+"1"))&&s.c_w("s_ips",c);if(s.c_r("s_tp")&&s.unescape(s.c_r("s_ppv").split(",")[0])===s.ppvID){s.c_r("s_tp");d=s.c_r("s_ppv");var e=-1< d.indexOf(",")?d.split(","):[];d=e[0]?e[0]:"";e=e[3]?e[3]:"";var l=s.c_r("s_ips");d=d+","+Math.round(e/f*100)+","+Math.round(l/ f*100)+","+e+","+k}s.c_w("s_tp",f)}else d=s.c_r("s_ppv");var b=d&&-1<d.indexOf(",")?d.split(",",6):[];f=0<b.length?b[0]: escape(s.ppvID);e=1<b.length?parseInt(b[1]):g;l=2<b.length?parseInt(b[2]):g;var m=3<b.length?parseInt(b[3]):c,n=4<b.length? parseInt(b[4]):k;b=5<b.length?parseInt(b[5]):h;0<g&&(d=f+","+(g>e?g:e)+","+l+","+(c>m?c:m)+","+(k>n?k:n)+","+(h>b?h:b)); s.c_w("s_ppv",d)}}};

/* Adobe Consulting Plugin: p_fo (pageFirstOnly) v2.0 */
s.p_fo=function(on){var s=this;s.__fo||(s.__fo={});if(s.__fo[on])return!1;s.__fo[on]={};return!0};
/******************************************** END CODE TO DEPLOY ********************************************/


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

s.usePlugins=true
s.doPlugins = function(s) {
//Scrolltiefe
    s.getPercentPageViewed();
    s.prop61 = s._ppvPreviousPage;
    s.eVar33 = s._ppvPreviousPage;
    s.eVar62 = s._ppvInitialPercentViewed;
    s.eVar63 = s._ppvHighestPixelsSeen;
    s.prop64 = Math.round(s._ppvInitialPercentViewed/10)*10;
    s.prop65 = Math.round(s._ppvHighestPercentViewed/10)*10;
    event45= "event45=" + Math.round(s._ppvInitialPercentViewed/10)*10;
    event46 ="event46="+  Math.round(s._ppvHighestPercentViewed/10)*10;
    s.events=s.apl(s.events,event45,",",1);
    s.events=s.apl(s.events,event46,",",1);

    //Campaign
    if (typeof b['qp.cid'] !== 'undefined') {
        (b['adobe_campaign'] = "cid=" + b['qp.cid']);

    } else if (typeof b['qp.wtrid'] !== 'undefined'){
        (b['adobe_campaign'] = "wtrid=" + b['qp.wtrid']);

    } else if (typeof b['qp.wtmc'] !== 'undefined'){
        (b['adobe_campaign'] = "wtmc=" + b['qp.wtmc']);

    } else if (typeof b['qp.wt_mc'] !== 'undefined') {
        (b['adobe_campaign'] = "wt_mc" + b['qp.wt_mc']);

    }
//Campaign
    s.campaign = s.getValOnce(b['adobe_campaign'], 's_ev0', 0, "m");
    s.eVar88 = b['adobe_campaign'];
    console.log("Campaign test: " + s.campaign);

//Referrer for custom link events
    s.referrer = document.referrer;

    //internal Campaign
    s.getICID = s.Util.getQueryParam('icid') || '';
    s.eVar78 = s.getICID;
    s.eVar79 = s.getICID;

//no sdid for A4T
    s.expectSupplementalData = false; // Force to false;

//Time
    s.eVar184 = new Date().getHours().toString();
    s.eVar181 = new Date().getMinutes().toString();
    s.eVar185 = b.myCW;
//Config
    s.currencyCode="EUR";
    s.eVar63 = s.version;
    s.eVar64 = s.visitor.version;

//Kameleon
    if(s.linkName === "Kameleoon Tracking")
    {if (window.Kameleoon) {
        Kameleoon.API.Tracking.processOmniture(s);
    }
        window.kameleoonOmnitureCallSent = true;}

//Platform AMP setzen und Conversion AMP mitgeben in articleview
    if (b['dom.referrer'].indexOf(".ampproject.")>=0 || b["dom.query_string"].indexOf("atrid=amp.article.plus.button.paywall.testen")>=0){
        b.page_platform = "amp";
        s.eVar2 = "amp";
        s.prop2 = "amp";
        utag.loader.SC('utag_main', {'page_platform': 'amp' + ';exp-session'});
        utag.loader.SC('utag_main', {'articleview': 'event24' + ';exp-session'});
    }

//Tracking Inline Elemente (Home Button Abonnemenet)
    if(typeof sessionStorage.getItem("home_teaser_info") != 'undefined' && sessionStorage.getItem("home_teaser_info") !== null){

        s.eVar77 = sessionStorage.getItem("home_teaser_info");
    }

//UserAgent String
    s.eVar61 = navigator.userAgent;

//height & width für iPhones
    if (navigator.userAgent.indexOf('iPhone') > -1) {
        s.eVar94 = screen.width + "x" + screen.height;
    }

}