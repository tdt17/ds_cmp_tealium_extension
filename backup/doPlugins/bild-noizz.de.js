// Type your JavaScript code here...
var existingCookie = document.cookie.match(/cmp_cv_list=([a-zA-z0-9_,-]*)/);
var existingFallbackCookie = document.cookie.match(/__utag_cmp_vendor_list=([a-zA-z0-9_,-]*)/);
if ((existingCookie && existingCookie[0].indexOf('adobe_analytics') >= 0) || (existingFallbackCookie && existingFallbackCookie[0].indexOf('adobe_analytics') >= 0)){

    /******************************************* BEGIN CODE TO DEPLOY *******************************************/
    /* Adobe Consulting Plugin: getPercentPageViewed v3.01 w/handlePPVevents helper function (Requires AppMeasurement and p_fo plugin) */
    s.getPercentPageViewed=function(pid,ch){var s=this,a=s.c_r("s_ppv");a=-1<a.indexOf(",")?a.split(","):[];a[0]=s.unescape(a[0]);
        pid=pid?pid:s.pageName?s.pageName:document.location.href;s.ppvChange=ch?ch:!0;if("undefined"===typeof s.linkType||"o"!==
            s.linkType)s.ppvID&&s.ppvID===pid||(s.ppvID=pid,s.c_w("s_ppv",""),s.handlePPVevents()),s.p_fo("s_gppvLoad")&&window
            .addEventListener&&(window.addEventListener("load",s.handlePPVevents,!1),window.addEventListener("click",s.handlePPVevents, !1),window.addEventListener("scroll",s.handlePPVevents,!1),window.addEventListener("resize",s.handlePPVevents,!1)),s._ppvPreviousPage
            =a[0]?a[0]:"",s._ppvHighestPercentViewed=a[1]?a[1]:"",s._ppvInitialPercentViewed=a[2]?a[2]:"",s._ppvHighestPixelsSeen=a[3]?a[3]:""};

    /* Adobe Consulting Plugin: handlePPVevents helper function (for getPercentPageViewed v3.01 Plugin) */
    s.handlePPVevents=function(){if("undefined"!==typeof s_c_il){for(var c=0,d=s_c_il.length;c<d;c++)if(s_c_il[c]&&s_c_il[c].getPercentPageViewed){var a=s_c_il[c];break}if(a&&a.ppvID){var f=Math.max(Math.max(document.body.scrollHeight,document.documentElement.scrollHeight),Math.max(document.body.offsetHeight,document.documentElement.offsetHeight),Math.max(document.
        body.clientHeight,document.documentElement.clientHeight));c=(window.pageYOffset||window.document.documentElement.scrollTop||window.document.body.scrollTop)+(window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight);d=Math.min(Math.round
    (c/f*100),100);var e="";!a.c_r("s_tp")||a.unescape(a.c_r("s_ppv").split(",")[0])!==a.ppvID||1==a.ppvChange&&
    a.c_r("s_tp")&&f!= a.c_r("s_tp")?(a.c_w("s_tp",f),a.c_w("s_ppv","")):e=a.c_r("s_ppv");var b=e&&-1<e.indexOf(",")?e.split(",",4):[];f=0<b.length?b[0]:escape(a.ppvID);var g=1<b.length?parseInt(b[1]):d,h=2<b.length?parseInt(b[2]):d;b=3<b.length?parseInt(b[3]):c;0<d&&(e=f+","+(d>g?d:g)+","+h+","+(c>b?c:b));a.c_w("s_ppv",e)}}};

    /* Adobe Consulting Plugin: p_fo (pageFirstOnly) v2.0 (Requires AppMeasurement) */
    s.p_fo=function(on){var s=this;s.__fo||(s.__fo={});if(s.__fo[on])return!1;s.__fo[on]={};return!0};
}
else
{}
/* Plugin: getValOnce_v1.11 */
s.getValOnce=new Function("v","c","e","t",""
    +"var s=this,a=new Date,v=v?v:'',c=c?c:'s_gvo',e=e?e:0,i=t=='m'?6000"
    +"0:86400000,k=s.c_r(c);if(v){a.setTime(a.getTime()+e*i);s.c_w(c,v,e"
    +"==0?0:a);}return v==k?'':v");

/* Plugin: getTimeParting 3.4 */
//Europe
s._tpDST = {
    2012:'3/25,10/28',
    2013:'3/31,10/27',
    2014:'3/30,10/26',
    2015:'3/29,10/25',
    2016:'3/27,10/30',
    2017:'3/26,10/29',
    2018:'3/25,10/28',
    2019:'3/31,10/27',
    2020:'3/29,10/25',
    2021:'3/28,10/31'}

s.getTimeParting=new Function("h","z",""
    +"var s=this,od;od=new Date('1/1/2000');if(od.getDay()!=6||od.getMont"
    +"h()!=0){return'Data Not Available';}else{var H,M,D,U,ds,de,tm,da=['"
    +"Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturda"
    +"y'],d=new Date();z=z?z:0;z=parseFloat(z);if(s._tpDST){var dso=s._tp"
    +"DST[d.getFullYear()].split(/,/);ds=new Date(dso[0]+'/'+d.getFullYea"
    +"r());de=new Date(dso[1]+'/'+d.getFullYear());if(h=='n'&&d>ds&&d<de)"
    +"{z=z+1;}else if(h=='s'&&(d>de||d<ds)){z=z+1;}}d=d.getTime()+(d.getT"
    +"imezoneOffset()*60000);d=new Date(d+(3600000*z));H=d.getHours();M=d"
    +".getMinutes();M=(M<10)?'0'+M:M;D=d.getDay();U=' AM';if(H>=12){U=' P"
    +"M';H=H-12;}if(H==0){H=12;}D=da[D];tm=H+':'+M+U;return(tm+'|'+D);}");

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
s.myChannels = 0;
s._articleViewType='';
s._appDomain=b.ad_track_server;   // set to domain being ntracking, i.e. welt.de or bild.de
s._searchEngines=".google.|bing.com|ecosia.org|duckduckgo.com|amp-welt-de.cdn.ampproject.org|qwant.com|suche.t-online.de|.yandex.|.yahoo.com|googleapis.com|nortonsafe.search.ask.com|wikipedia.org|googleadservices.com|search.myway.com|lycos.de";
s._socialDomains="facebook.com|xing.com|instagram.com|youtube.com|t.co|www.linkedin.com|away.vk.com|www.pinterest.de|linkedin.android|ok.ru|mobile.ok.ru|www.yammer.com|twitter.com|www.netvibes.com|pinterest.com|wordpress.com|blogspot.com|lnkd.in|xing.android|vk.com|com.twitter.android|m.ok.ru";
s._referringDomain=document.referrer;
s._referringDomain=(s._referringDomain.indexOf("?")>0)?document.referrer.split("?")[0]:s._referringDomain;


s.doPlugins = function(s) {

//Timeparting, Time
    s.eVar61 =  s.getTimeParting('n','+1');
    s.eVar184 = new Date().getHours().toString();
    s.eVar181 = new Date().getMinutes().toString();
    s.eVar185 = b.myCW;

//Campaign
    s.campaign = s.getValOnce(s.campaign,'s_ev0',7);

//Scrolltiefe
    s.getPercentPageViewed();
    s.prop61 = s._ppvPreviousPage;
    s.eVar33 = s._ppvPreviousPage;
    s.prop62 = s._ppvInitialPercentViewed;
    s.prop63 = s._ppvHighestPercentViewed;
    s.prop64 = Math.round(s._ppvInitialPercentViewed/10)*10;
    s.prop65 = Math.round(s._ppvHighestPercentViewed/10)*10;

    event45= "event45=" + Math.round(s._ppvInitialPercentViewed/10)*10;
    event46 ="event46="+  Math.round(s._ppvHighestPercentViewed/10)*10;
    s.events=s.apl(s.events,event45,",",1);
    s.events=s.apl(s.events,event46,",",1);

//Value Event Page Age
    if(utag.data.page_document_type !== "homepage") {

        s.events=s.apl(s.events,"event28=" + s.eVar17,",",1);
    }

//Channels
    //Channels
    if(s.myChannels === 0){
        s.events = s.events ? s.events : '';
        if (utag_data.page_document_type && utag_data.page_document_type.match(/(article|media)/i) !== null) {
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
    s.myChannels++;

    if(s._articleViewType !== ''){

        s.eVar44 = s._articleViewType;
    }


}