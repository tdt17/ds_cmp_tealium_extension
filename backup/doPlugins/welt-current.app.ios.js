/******************************************* BEGIN CODE TO DEPLOY *******************************************/
/* Adobe Consulting Plugin: p_fo (pageFirstOnly) v2.0 (Requires AppMeasurement) */
//s.p_fo=function(on){var s=this;s.__fo||(s.__fo={});if(s.__fo[on])return!1;s.__fo[on]={};return!0};
//_ppv
//s.getPercentPageViewed=function(e,o){var n=e,i=o;function t(){if(window.ppvID){var e=Math.max(Math.max(document.body.scrollHeight,document.documentElement.scrollHeight),Math.max(document.body.offsetHeight,document.documentElement.offsetHeight),Math.max(document.body.clientHeight,document.documentElement.clientHeight)),o=window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight,n=(window.pageYOffset||window.document.documentElement.scrollTop||window.document.body.scrollTop)+o,i=Math.min(Math.round(n/e*100),100),t=Math.floor(n/o);o=Math.floor(e/o);var d="";if(!window.cookieRead("s_tp")||decodeURIComponent(window.cookieRead("s_ppv").split(",")[0])!==window.ppvID||window.p_fo(window.ppvID)||1==window.ppvChange&&window.cookieRead("s_tp")&&e!=window.cookieRead("s_tp")){if((decodeURIComponent(window.cookieRead("s_ppv").split(",")[0])!==window.ppvID||window.p_fo(window.ppvID+"1"))&&window.cookieWrite("s_ips",n,30),window.cookieRead("s_tp")&&decodeURIComponent(window.cookieRead("s_ppv").split(",")[0])===window.ppvID){window.cookieRead("s_tp");var w=-1<(d=window.cookieRead("s_ppv")).indexOf(",")?d.split(","):[];d=w[0]?w[0]:"",w=w[3]?w[3]:"";var p=window.cookieRead("s_ips");d=d+","+Math.round(w/e*100)+","+Math.round(p/e*100)+","+w+","+t}window.cookieWrite("s_tp",e,30)}else d=window.cookieRead("s_ppv");var a=d&&-1<d.indexOf(",")?d.split(",",6):[];e=0<a.length?a[0]:encodeURIComponent(window.ppvID),w=1<a.length?parseInt(a[1]):i,p=2<a.length?parseInt(a[2]):i;var c=3<a.length?parseInt(a[3]):n,s=4<a.length?parseInt(a[4]):t;a=5<a.length?parseInt(a[5]):o,0<i&&(d=e+","+(i>w?i:w)+","+p+","+(n>c?n:c)+","+(t>s?t:s)+","+(o>a?o:a)),window.cookieWrite("s_ppv",d,30)}}if("-v"===n)return{plugin:"getPercentPageViewed",version:"5.0.1"};var d=function(){if(void 0!==window.s_c_il)for(var e,o=0;o<window.s_c_il.length;o++)if((e=window.s_c_il[o])._c&&"s_c"===e._c)return e}();void 0!==d&&(d.contextData.getPercentPageViewed="5.0.1"),window.pageName=void 0!==d&&d.pageName||"",window.cookieWrite=window.cookieWrite||function(e,o,n){if("string"==typeof e){var i=window.location.hostname,t=window.location.hostname.split(".").length-1;if(i&&!/^[0-9.]+$/.test(i)){t=2<t?t:2;var d=i.lastIndexOf(".");if(0<=d){for(;0<=d&&1<t;)d=i.lastIndexOf(".",d-1),t--;d=0<d?i.substring(d):i}}if(g=d,o=void 0!==o?""+o:"",n||""===o)if(""===o&&(n=-60),"number"==typeof n){var w=new Date;w.setTime(w.getTime()+6e4*n)}else w=n;return!(!e||(document.cookie=encodeURIComponent(e)+"="+encodeURIComponent(o)+"; path=/;"+(n?" expires="+w.toUTCString()+";":"")+(g?" domain="+g+";":""),void 0===window.cookieRead))&&window.cookieRead(e)===o}},window.cookieRead=window.cookieRead||function(e){if("string"!=typeof e)return"";e=encodeURIComponent(e);var o=" "+document.cookie,n=o.indexOf(" "+e+"="),i=0>n?n:o.indexOf(";",n);return(e=0>n?"":decodeURIComponent(o.substring(n+2+e.length,0>i?o.length:i)))?e:""},window.p_fo=window.p_fo||function(e){return window.__fo||(window.__fo={}),!window.__fo[e]&&(window.__fo[e]={},!0)};var w=window.cookieRead("s_ppv");w=-1<w.indexOf(",")?w.split(","):[],n=n||(window.pageName?window.pageName:document.location.href),w[0]=decodeURIComponent(w[0]),window.ppvChange=void 0===i||1==i,void 0!==d&&d.linkType&&"o"===d.linkType||(window.ppvID&&window.ppvID===n||(window.ppvID=n,window.cookieWrite("s_ppv","",30),t()),window.p_fo("s_gppvLoad")&&window.addEventListener&&(window.addEventListener("load",t,!1),window.addEventListener("click",t,!1),window.addEventListener("scroll",t,!1)),this._ppvPreviousPage=w[0]?w[0]:"",this._ppvHighestPercentViewed=w[1]?w[1]:"",this._ppvInitialPercentViewed=w[2]?w[2]:"",this._ppvHighestPixelsSeen=w[3]?w[3]:"",this._ppvFoldsSeen=w[4]?w[4]:"",this._ppvFoldsAvailable=w[5]?w[5]:"")};

/* Plugin: getValOnce_v1.11 */
/*
s.getValOnce=new Function("v","c","e","t",""
+"var s=this,a=new Date,v=v?v:'',c=c?c:'s_gvo',e=e?e:0,i=t=='m'?6000"
+"0:86400000,k=s.c_r(c);if(v){a.setTime(a.getTime()+e*i);s.c_w(c,v,e"
+"==0?0:a);}return v==k?'':v");
*/
/* Plugin: getTimeParting 3.4 */
//Europe
/*s._tpDST = {
2012:'3/25,10/28',
2013:'3/31,10/27',
2014:'3/30,10/26',
2015:'3/29,10/25',
2016:'3/27,10/30',
2017:'3/26,10/29',
2018:'3/25,10/28',
2019:'3/31,10/27',
2020:'3/29,10/25',
2021:'3/28,10/31'};
*/

/*s.getTimeParting=new Function("h","z",""
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
*/

/******************************************** END CODE TO DEPLOY ********************************************/

s.usePlugins=true
s.doPlugins = function(s) {
    //s.eVar0 = s.getValOnce(s.eVar0, 's_ev0', 7);
    //s.eVar61 =  s.getTimeParting('n','+1');

    //Scrolltiefe
    /**
     * Scrolltiefe kommt aus dem Cookie vom letzten Aufruf, wenn wir kein Adobe Consent haben gibt es keine Cookies!
     */
    if (typeof s.pageName  != 'undefined' && s.pageName != '') {
        // Previous Page für article und video ==> document type : page_is_premium : page_id : page_channel
        if (typeof b.adobe_docType != 'undefined' && (b.adobe_docType == 'article' || b.adobe_docType == 'video')) {
            s._prevPage = b.adobe_docType + " : " + b.screen_isPremium + " : " + b.screen_escenicId  + " : " + b.screen_sectionPath_level1;
        }else
        {s._prevPage = s.pageName}

        /*  if (typeof s._prevPage  != 'undefined' && s._prevPage != '') {
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
          }       */

    }

    s.eVar184 = new Date().getHours().toString();
    s.eVar181 = new Date().getMinutes().toString();
    s.eVar185 = b.myCW;
    s.eVar186 ='T1';

    //no sdid for A4T
    s.expectSupplementalData = false; // Force to false;

    //Set Page Section 1 for Home
    if(s.pageName.indexOf("home : home") != -1){

        s.eVar5= "home";
        s.prop5="home";
        s.channel = "home"};

//Page Age in den checkout schieben
    if(b.adobe_docType !== '' && b.adobe_docType == 'article'){
        utag.loader.SC('utag_main', {'pa': b.screen_agePublication + ';exp-session'});
        b['cp.utag_main_pa'] = b.screen_agePublication;
    };
    //userAgent
    s.eVar61 = navigator.userAgent;

}

//height & width für iPhones
if (navigator.userAgent.indexOf('iPhone') > -1) {
    s.eVar94 = screen.width + "x" + screen.height;
}



