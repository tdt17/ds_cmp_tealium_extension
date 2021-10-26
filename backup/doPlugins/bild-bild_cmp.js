/*
 * Plugin: getValOnce_v1.11
 */
cmp.getValOnce=new Function("v","c","e","t",""
    +"var cmp=this,a=new Date,v=v?v:'',c=c?c:'s_gvo',e=e?e:0,i=t=='m'?6000"
    +"0:86400000,k=cmp.c_r(c);if(v){a.setTime(a.getTime()+e*i);cmp.c_w(c,v,e"
    +"==0?0:a);}return v==k?'':v");


cmp.apl=new Function("L","v","d","u",""
    +"var cmp=this,m=0;if(!L)L='';if(u){var i,n,a=cmp.split(L,d);for(i=0;i<a."
    +"length;i++){n=a[i];m=m||(u==1?(n==v):(n.toLowerCase()==v.toLowerCas"
    +"e()));}}if(!m)L=L?L+d+v:v;return L");

/*
* Utility Function: split v1.5 - split a string (JS 1.0 compatible)
*/
cmp.split=new Function("l","d",""
    +"var i,x=0,a=new Array;while(l){i=l.indexOf(d);i=i>-1?i:l.length;a[x"
    +"++]=l.substring(0,i);l=l.substring(i+d.length);}return a");

cmp.usePlugins=true;
cmp.expectSupplementalData=false;
cmp.currencyCode="EUR";
cmp.myChannels = 0;
cmp._articleViewType='';
cmp._appDomain=b.ad_track_server;   // set to domain being ntracking, i.e. welt.de or bild.de
cmp._searchEngines=".google.|bing.com|ecosia.org|duckduckgo.com|amp-welt-de.cdn.ampproject.org|qwant.com|suche.t-online.de|.yandex.|.yahoo.com|googleapis.com|nortonsafe.search.ask.com|wikipedia.org|googleadservices.com|search.myway.com|lycos.de";
cmp._referringDomain=document.referrer;
cmp._socialDomains="facebook.com|xing.com|instagram.com|youtube.com|t.co|www.linkedin.com|away.vk.com|www.pinterest.de|linkedin.android|ok.ru|mobile.ok.ru|www.yammer.com|twitter.com|www.netvibes.com|pinterest.com|wordpress.com|blogspot.com|lnkd.in|xing.android|vk.com|com.twitter.android|m.ok.ru";
cmp._referringDomain=(cmp._referringDomain.indexOf("?")>0)?document.referrer.split("?")[0]:cmp._referringDomain;

//Anpassung für Mobile Weiche wt_ref
if(document.referrer.indexOf("www.bild.de") != -1 && location.hash.indexOf("wt_ref") != -1){
    cmp._referringDomain=location.hash;

    cmp._referringDomain=(cmp._referringDomain.indexOf("?")>0)?document.referrer.split("?")[0]:cmp._referringDomain;

}
else{
    cmp._referringDomain=document.referrer;
    cmp._referringDomain=(cmp._referringDomain.indexOf("?")>0)?document.referrer.split("?")[0]:cmp._referringDomain;

}

cmp.doPlugins=function(cmp) {


//Config
    cmp.currencyCode="EUR";
    cmp.eVar63 = cmp.version;
    cmp.eVar64 = (typeof cmp.visitor !== "undefined") ? cmp.visitor.version : "undefined";
    cmp.eVar67 = "BILD.de";

//Campaign
    cmp.campaign = cmp.getValOnce(cmp.campaign,'s_ev0', 0, "m");
    cmp.eVar88 = cmp.campaign;


//internal Campaign
    cmp.getICID = cmp.Util.getQueryParam('icid') || '';
    cmp.eVar78 = cmp.getICID;
    cmp.eVar79 = cmp.getICID;

//Time & Timeparting
    cmp.eVar184 = new Date().getHours().toString();
    cmp.eVar181 = new Date().getMinutes().toString();
    cmp.eVar185 = b.myCW;

//Analytics4T
    cmp.expectSupplementalData = false; // Force to false;

//Activity Map
    cmp.trackInlineStats = false;
    cmp.linkLeaveQueryString = true;

//AD Wall Page Name
    if(cmp.pageName.indexOf("42925516") != -1 || cmp.pageName.indexOf("54578900") != -1){
        b.adobe_doc_type = "ad wall";
        cmp.pageName = "ad wall : " + cmp.eVar1;
        cmp.eVar3 = "ad wall";
        cmp.prop3 = "ad wall";
    }

//live is live
    if(typeof b.adobe_doc_type !== "undefined" && b.adobe_doc_type == "article" && typeof b.page_cms_path !== "undefined" && b.page_cms_path.indexOf("im-live-ticker")>-1){
        b.adobe_doc_type = "live";
        cmp.eVar3 = 'live';
        cmp.prop3 = 'live';
        cmp.pageName = "live : " + b['page_id'];

    }

//liveticker sportdaten
    if(typeof b.adobe_doc_type !== "undefined" && b.adobe_doc_type == "article" && typeof b.page_cms_path !== "undefined" && (b.page_cms_path.indexOf("im-liveticker")>-1 || b.page_cms_path.indexOf("/liveticker/")>-1)){
        b.adobe_doc_type = "live-sport";
        cmp.eVar3 = 'live-sport';
        cmp.prop3 = 'live-sport';
        cmp.pageName = "live-sport : " + b['page_id'];

    }

//Channels
    if(cmp.myChannels === 0){
        cmp.events = cmp.events ? cmp.events : '';
        if (utag_data.page_mapped_doctype_for_pagename && utag_data.page_mapped_doctype_for_pagename.match(/(article|media)/i) !== null) {
            // if (b['page_type'].match(/(article|artikel)/i) != null) {
            cmp.getWTRID = cmp.Util.getQueryParam('wtrid') || '';
            cmp.getWTMC = cmp.Util.getQueryParam('wtmc') || '';
            cmp.getCID = cmp.Util.getQueryParam('cid') || '';

            if (document.referrer !== '' ) {
                var _isSearchView = new RegExp(cmp._searchEngines.replace(/\./g, "\\.")).exec(cmp._referringDomain) !== null;
                if (_isSearchView)
                    cmp._articleViewType = 'event24';
                else {
                    var _isSocialView = new RegExp(cmp._socialDomains.replace(/\./g, "\\.")).exec(cmp._referringDomain) !== null;
                    if (_isSocialView) cmp._articleViewType = 'event25';
                    else {
                        var _isIntDomain = cmp._referringDomain.indexOf(document.domain) > -1;
                        if (_isIntDomain) {
                            //var _isHomeView = new RegExp(document.domain.replace(/\./g, "\\.") + "\/*$").exec(s._referringDomain) !== null;
                            var _isHomeView = new RegExp(document.domain.replace(/\./g, "\\.") + "\/*$").exec(cmp._referringDomain.replace("https://","").split(",")[0]) !== null;
                            //if (_isHomeView) s._articleViewType = 'event22';
                            //else if (_isHomeView && s.getWTRID.indexOf("kooperation.reco.taboola.") === 0) s._articleViewType = 'event102';
                            if (_isHomeView && cmp.getWTRID.indexOf("kooperation.reco.taboola.") === 0) cmp._articleViewType = 'event102';
                            else if (_isHomeView) cmp._articleViewType = 'event22';
                            else cmp._articleViewType = 'event23';
                        } else cmp._articleViewType = 'event27';
                    }
                }
            } else {
                cmp._articleViewType = 'event26';
                if (cmp.getWTRID.indexOf('sea.') === 0 || cmp.getWTMC.indexOf('sea.') === 0 || cmp.getCID.indexOf('sea.') === 0)   cmp._articleViewType = 'event24';
                if (cmp.getWTRID.indexOf('socialmedia') === 0 || cmp.getWTMC.indexOf('socialmedia') === 0 || cmp.getCID.indexOf('social') === 0) cmp._articleViewType = 'event25';
                if (cmp.getWTRID.indexOf('kooperation') === 0 || cmp.getWTMC.indexOf('kooperation') === 0 || cmp.getCID.indexOf('affiliate') === 0 ) cmp._articleViewType = 'event23';
            }
        }
        if (cmp._articleViewType !== '')cmp.events = cmp.apl(cmp.events, cmp._articleViewType, ',', 1);

        console.log("RESULT cmp.events=" + cmp.events);

    }
    cmp.myChannels++;

// PV Events und Page Age für Order in utag_main cookie mitgeben
    if(typeof cmp._articleViewType && typeof cmp._articleViewType !== 'undefined'){
        cmp.eVar44 = cmp._articleViewType;

        utag.loader.SC('utag_main', {'articleview': cmp._articleViewType + ';exp-session'});
        b['cp.utag_main_articleview'] = cmp._articleViewType;

//Page Age in den checkout schieben
        if(typeof utag_data.page_age && typeof utag_data.page_age !== 'undefined'){
            utag.loader.SC('utag_main', {'pa': utag_data.page_age + ';exp-session'});
            b['cp.utag_main_pa'] = utag_data.page_age;

        }}
// Google Discover
    if(cmp._referringDomain.substr(cmp._referringDomain.indexOf("google.com"),     100) === "google.com"
        || cmp._referringDomain.indexOf("googlequicksearch/")!=-1){

        cmp.events = cmp.apl(cmp.events, "event49", ',', 1);

    }

//Google News
    if(cmp._referringDomain.indexOf("news.google") != -1){

        cmp.events = cmp.apl(cmp.events, "event48", ',', 1);
    }

//Instagram
    if(cmp._referringDomain.indexOf("instagram.com") != -1){

        cmp.events = cmp.apl(cmp.events, "event53", ',', 1);
    }

//Youtube
    if(cmp._referringDomain.indexOf("youtube.com") != -1){

        cmp.events = cmp.apl(cmp.events, "event50", ',', 1);
    }
//Twitter

    if(cmp._referringDomain.indexOf("t.co") != -1 || cmp._referringDomain.indexOf("twitter.com") != -1 || cmp._referringDomain.indexOf("android-app://com.twitter.android") != -1 ){

        cmp.events = cmp.apl(cmp.events, "event51", ',', 1);
    }

//Facebook
    if(cmp._referringDomain.indexOf("facebook.com") != -1){

        cmp.events = cmp.apl(cmp.events, "event52", ',', 1);
    }



//Kameleon
    if(cmp.linkName === "Kameleoon Tracking")
    {if (window.Kameleoon) {
        Kameleoon.API.Tracking.processOmniture(cmp);
    }
        window.kameleoonOmnitureCallSent = true;}

//BILDPlus Dichte
    if (b.page_mapped_doctype_for_pagename && b.page_mapped_doctype_for_pagename == "article" && b["qp.source"] ){
        cmp.eVar235 = b["qp.source"];
        utag.loader.SC('utag_main', {'source': b["qp.source"] + ';exp-session'});
        b['cp.utag_main_source'] = b["qp.source"];

        //console.log("set cookie");

    } else if (b.page_mapped_doctype_for_pagename && b.page_mapped_doctype_for_pagename == "article"  && (b["qp.source"]==null)){
        utag.loader.SC('utag_main', {'source': '' + ';exp-session'});
        b['cp.utag_main_source'] = b["qp.source"];

        //console.log("remove cookie");

    }
//Teaser Tracking evars
    if(cmp._articleViewType.indexOf("event22") !=-1 && (sessionStorage.getItem("home_teaser_info") !== null)){

        cmp.eVar66 = sessionStorage.getItem("home_teaser_info");
        cmp.eVar92 = sessionStorage.getItem("home_teaser_info") + '|' + cmp.eVar1;
    }

//height & width für iPhones
    if (navigator.userAgent.indexOf('iPhone') > -1)

    {cmp.bh = screen.height;
        cmp.bw =   screen.width;
    }
//UserAgent
    cmp.eVar61 = navigator.userAgent;
    console.log('v2');
};