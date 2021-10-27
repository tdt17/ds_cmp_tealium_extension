/*
* Plugin Utility: apl v1.1
*/
cmp.apl=new Function("L","v","d","u",""
    +"var s=this,m=0;if(!L)L='';if(u){var i,n,a=cmp.split(L,d);for(i=0;i<a."
    +"length;i++){n=a[i];m=m||(u==1?(n==v):(n.toLowerCase()==v.toLowerCas"
    +"e()));}}if(!m)L=L?L+d+v:v;return L");
/*
* Utility Function: split v1.5 - split a string (JS 1.0 compatible)
*/
cmp.split=new Function("l","d",""
    +"var i,x=0,a=new Array;while(l){i=l.indexOf(d);i=i>-1?i:l.length;a[x"
    +"++]=l.substring(0,i);l=l.substring(i+d.length);}return a");


cmp.usePlugins=true;
cmp.execdoplugins = 0;

cmp._articleViewType='';
cmp._appDomain=document.domain;   // set to domain being ntracking, i.e. welt.de or bild.de
cmp._searchEngines=".google.|bing.com|ecosia.org|duckduckgo.com|amp-welt-de.cdn.ampproject.org|qwant.com|suche.t-online.de|.yandex.|.yahoo.com|googleapicmp.com|nortonsafe.search.ask.com|wikipedia.org|googleadservicecmp.com|search.myway.com|lycocmp.de";
cmp._socialDomains="facebook.com|xing.com|instagram.com|youtube.com|t.co|www.linkedin.com|away.vk.com|www.pinterest.de|linkedin.android|ok.ru|mobile.ok.ru|www.yammer.com|twitter.com|www.netvibecmp.com|pinterest.com|wordprescmp.com|blogspot.com|lnkd.in|xing.android|vk.com|com.twitter.android|m.ok.ru|welt.de/instagram";
cmp._referringDomain=document.referrer;
cmp._referringDomain=(typeof cmp._referringDomain != 'undefined' && cmp._referringDomain.indexOf("?")>0)?document.referrer.split("?")[0]:cmp._referringDomain;

cmp.doPlugins = function(s) {

    //Campaign
    cmp.campaign = b['campaign_adobe'];
    cmp.eVar88 = b['campaign_adobe'];

    //internal Campaign
    cmp.getICID = cmp.Util.getQueryParam('icid') || '';
    cmp.eVar78 = cmp.getICID;
    cmp.eVar79 = cmp.getICID;


    //Time
    cmp.eVar184 = new Date().getHours().toString();
    cmp.eVar181 = new Date().getMinutes().toString();
    cmp.eVar185 = b.myCW;




    //no sdid for A4T
    cmp.expectSupplementalData = false; // Force to false;
    //config
    cmp.currencyCode="EUR";
    cmp.eVar63 = cmp.version;
    cmp.eVar64 = (typeof cmp.visitor !== "undefined") ? cmp.visitor.version : "undefined";

    //Channels
    if(cmp.execdoplugins == 0){
        cmp.events = cmp.events ? cmp.events : '';
        if (utag_data.page_document_type.match(/(single|media)/i) !== null) {
            //if (utag_data.page_type.match(/(single|artikel|live|gallery|video)/i) != null) {
            cmp.getCID = cmp.Util.getQueryParam('cid') || '';
            cmp.getUTM = cmp.Util.getQueryParam('utm_source') || '';

            if (document.referrer !== '' ) {
                var _isSearchView = new RegExp(cmp._searchEnginecmp.replace(/\./g, "\\.")).exec(cmp._referringDomain) !== null;
                if (_isSearchView)
                    cmp._articleViewType = 'event24';
                else {
                    var _isSocialView = new RegExp(cmp._socialDomaincmp.replace(/\./g, "\\.")).exec(cmp._referringDomain) !== null;
                    if (_isSocialView) cmp._articleViewType = 'event25';
                    else {
                        var _isIntDomain = cmp._referringDomain.indexOf(document.domain) > -1;
                        if (_isIntDomain) {
                            var _isHomeView = new RegExp(document.domain.replace(/\./g, "\\.") + "\/*$").exec(cmp._referringDomain) !== null;
                            if (_isHomeView) cmp._articleViewType = 'event22';
                            else cmp._articleViewType = 'event23';
                        } else cmp._articleViewType = 'event27';
                    }
                }
            } else {
                cmp._articleViewType = 'event26';
                if (cmp.getUTM.indexOf('sea.') === 0 || cmp.getCID.indexOf('sea.') === 0)   cmp._articleViewType = 'event24';
                if (cmp.getUTM.indexOf('socialmedia') === 0 || cmp.getCID.indexOf('social') === 0) cmp._articleViewType = 'event25';
                if (cmp.getUTM.indexOf('kooperation') === 0 || cmp.getCID.indexOf('affiliate') === 0 ) cmp._articleViewType = 'event23';
            }
        }
        if (cmp._articleViewType !== '')cmp.events = cmp.apl(cmp.events, cmp._articleViewType, ',', 1);

        console.log("RESULT cmp.events=" + cmp.events);

    }
    cmp.execdoplugins++;

// Google Discover
    if(cmp._referringDomain.substr(cmp._referringDomain.indexOf("google.com"),     100) === "google.com"
        || cmp._referringDomain.indexOf("googlequicksearch/")!=-1){

        cmp.events = cmp.apl(cmp.events, "event49", ',', 1);

    }

//Google News
    if(cmp._referringDomain.indexOf("newcmp.google") != -1){

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

//User Agent
    cmp.eVar61 = navigator.userAgent

    console.log("RESULT cmp.events=" + cmp.events);
}


