// Type your JavaScript code here...

/* Plugin Utility: apl v1.1
*/
cmp.apl=new Function("L","v","d","u",""
    +"var cmp=this,m=0;if(!L)L='';if(u){var i,n,a=cmp.split(L,d);for(i=0;i<a."
    +"length;i++){n=a[i];m=m||(u==1?(n==v):(n.toLowerCase()==v.toLowerCas"
    +"e()));}}if(!m)L=L?L+d+v:v;return L");

cmp.split=new Function("l","d",""
    +"var i,x=0,a=new Array;while(l){i=l.indexOf(d);i=i>-1?i:l.length;a[x"
    +"++]=l.substring(0,i);l=l.substring(i+d.length);}return a");


/******************************************** END CODE TO DEPLOY ********************************************/

cmp.usePlugins=true;
cmp.execdoplugins = 0;

cmp._articleViewType='';
cmp._appDomain=document.domain;   // set to domain being ntracking, i.e. welt.de or bild.de
cmp._searchEngines=".google.|bing.com|ecosia.org|duckduckgo.com|amp-welt-de.cdn.ampproject.org|qwant.com|suche.t-online.de|.yandex.|.yahoo.com|googleapis.com|nortonsafe.search.ask.com|wikipedia.org|googleadservices.com|search.myway.com|lycos.de";
cmp._socialDomains="facebook.com|xing.com|instagram.com|youtube.com|t.co|www.linkedin.com|away.vk.com|www.pinterest.de|linkedin.android|ok.ru|mobile.ok.ru|www.yammer.com|twitter.com|www.netvibes.com|pinterest.com|wordpress.com|blogspot.com|lnkd.in|xing.android|vk.com|com.twitter.android|m.ok.ru|welt.de/instagram";
cmp._referringDomain=document.referrer;
cmp._referringDomain=(cmp._referringDomain.indexOf("?")>0)?document.referrer.split("?")[0]:cmp._referringDomain;

cmp.doPlugins = function(cmp) {

    //Campaign
    //cmp.campaign = cmp.getValOnce(cmp.campaign, 's_ev0', 7);

    //Time
    //cmp.eVar61 =  cmp.getTimeParting('n','+1');
    cmp.eVar184 = new Date().getHours().toString();
    cmp.eVar181 = new Date().getMinutes().toString();
    //cmp.eVar185 = b.myCW;


    //no sdid for A4T
    cmp.expectSupplementalData = false; // Force to false;

    //Config
    cmp.currencyCode="EUR";



    if(cmp.eVar3 === "live")
    {
        cmp.eVar3 = "article";
        cmp.prop3 = "article"
        cmp.eVar41 = "live"
    }

    //Channels
    if(cmp.execdoplugins == 0){
        cmp.events = cmp.events ? cmp.events : '';
        if (utag_data.page_type.match(/(article|artikel|live|gallery|video)/i) != null) {
            // if (b['page_type'].match(/(article|artikel)/i) != null) {
            cmp.getWTRID = cmp.Util.getQueryParam('wtrid') || '';
            cmp.getWTMC = cmp.Util.getQueryParam('wtmc') || '';
            cmp.getCID = cmp.Util.getQueryParam('cid') || '';
            //s.getNOTIFY = s.Util.getQueryParam('notify') || '';

            if (document.referrer !== '' ) {
                var _isSearchView = new RegExp(cmp._searchEngines.replace(/\./g, "\\.")).exec(cmp._referringDomain) !== null;
                if (_isSearchView)
                    cmp._articleViewType = 'event24';
                else {
                    var _isSocialView = new RegExp(cmp._socialDomains.replace(/\./g, "\\.")).exec(cmp._referringDomain) !== null;
                    if (_isSocialView) cmp._articleViewType = 'event25';
                    else {
                        //var _isIntDomain = s._referringDomain.indexOf(document.domain) > -1;
                        var _isIntDomain = cmp._referringDomain.indexOf(document.domain.substr(document.domain.indexOf(".")+1)) > -1;
                        if (_isIntDomain) {
                            var _isHomeView = new RegExp(document.domain.replace(/\./g, "\\.") + "\/*$").exec(cmp._referringDomain) !== null;
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
    cmp.execdoplugins++;









//Kameleon
    if(cmp.linkName === "Kameleoon Tracking")
    {if (window.Kameleoon) {
        Kameleoon.API.Tracking.processOmniture(s);
    }
        window.kameleoonOmnitureCallSent = true;

    }

//Plusdichte Order
    if (b.page_type && b.page_type == "article" && b["qp.source"] ){
        cmp.eVar235 = b["qp.source"];
        utag.loader.SC('utag_main', {'source': b["qp.source"] + ';exp-session'});
        b['cp.utag_main_source'] = b["qp.source"];

    } else if (b.page_type && b.page_type == "article"  && (!b["qp.source"])){
        utag.loader.SC('utag_main', {'source': '' + ';exp-session'});
        b['cp.utag_main_source'] = b["qp.source"];

    }


//Page Source Aufsplittung und in Checkout schieben inklusive Page Age
    if(cmp._articleViewType !== ''){

        cmp.eVar44 = cmp._articleViewType;
//eVar44 in den checkout schieben
        utag.loader.SC('utag_main', {'articleview': cmp._articleViewType + ';exp-session'});
        b['cp.utag_main_articleview'] = cmp._articleViewType;
//eVar14 Page Age in den checkout schieben
        utag.loader.SC('utag_main', {'pa': b.page_datePublication_age + ';exp-session'});
        b['cp.utag_main_pa'] = b.page_datePublication_age;
    }

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

        cmp.events = cmp.apl(s.events, "event53", ',', 1);
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

//userAgent
    cmp.eVar61 = navigator.userAgent;

}
console.log("RESULT cmp.events=" + cmp.events);

