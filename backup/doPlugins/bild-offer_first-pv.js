

/******************************************************************** 
 * 
 * Main Plug-in code (should be in Plug-ins section) 
 * 
 *******************************************************************/ 

/* 
 * Plugin: getValOnce_v1.11 
 */ 
cmp.getValOnce=new Function("v","c","e","t","" 
+"var cmp=this,a=new Date,v=v?v:'',c=c?c:'s_gvo',e=e?e:0,i=t=='m'?6000" 
+"0:86400000,k=cmp.c_r(c);if(v){a.setTime(a.getTime()+e*i);cmp.c_w(c,v,e" 
+"==0?0:a);}return v==k?'':v");

/*
* add events
*/
cmp.apl=new Function("L","v","d","u",""
+"var cmp=this,m=0;if(!L)L='';if(u){var i,n,a=cmp.split(L,d);for(i=0;i<a."
+"length;i++){n=a[i];m=m||(u==1?(n==v):(n.toLowerCase()==v.toLowerCas"
+"e()));}}if(!m)L=L?L+d+v:v;return L");

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
//s._referringDomain=document.referrer; 

cmp._socialDomains="facebook.com|xing.com|instagram.com|youtube.com|t.co|www.linkedin.com|away.vk.com|www.pinterest.de|linkedin.android|ok.ru|mobile.ok.ru|www.yammer.com|twitter.com|www.netvibes.com|pinterest.com|wordpress.com|blogspot.com|lnkd.in|xing.android|vk.com|com.twitter.android|m.ok.ru";       

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
cmp.eVar63 = cmp.version;
cmp.eVar64 = (typeof cmp.visitor !== "undefined") ? cmp.visitor.version : "undefined";
cmp.currencyCode="EUR";

//Campaign
//cmp.campaign = cmp.getValOnce(cmp.campaign,'s_ev0',7);
cmp.campaign = cmp.getValOnce(cmp.campaign,'s_ev0', 0, "m");
cmp.eVar88 = b['adobe_campaign'];

//Referrer for s.tl() Events
//cmp._referringDomain = document.referrer;
cmp.referrer = document.referrer;
//internal Campaign
cmp.getICID = cmp.Util.getQueryParam('icid') || '';
cmp.eVar78 = cmp.getICID;
cmp.eVar79 = cmp.getICID;

//Time & Timeparting
cmp.eVar184 = new Date().getHours().toString();
cmp.eVar181 = new Date().getMinutes().toString();
cmp.eVar185 = b.myCW;

//Scrolltiefe
//s.getPercentPageViewed();
    //Scrolltiefe 
  //  s.getPercentPageViewed();
//    s.eVar33 = s._ppvPreviousPage;
//    s.prop61 = s._ppvPreviousPage;
//    s.prop62 = s._ppvInitialPercentViewed;
//    s.prop63 = s._ppvHighestPixelsSeen;
//    s.prop64 = Math.round(s._ppvInitialPercentViewed/10)*10;
//    s.prop65 = Math.round(s._ppvHighestPercentViewed/10)*10;
//    event45= "event45=" + Math.round(s._ppvInitialPercentViewed/10)*10;
//    event46 ="event46="+  Math.round(s._ppvHighestPercentViewed/10)*10;
//    s.events=s.apl(s.events,event45,",",1);
//    s.events=s.apl(s.events,event46,",",1);  

//Brauchen wir das noch? Abgelöst duch Channels?
//if(s._ppvPreviousPage.indexOf("home")!=-1 && document.referrer.indexOf("bild.de")!=-1) {
//newevent= ",event20";
//s.events =   s.events.concat(newevent);
//}
//Check for SSO Id Cookie
//if((typeof(utag.data.customer_id)) === "undefined" || typeof(s.eVar84) ==="undefined"){
    
//   s.eVar84 = cookie
//}
//Analytics4T
cmp.expectSupplementalData = false; // Force to false;

//Activity Map
cmp.trackInlineStats = false;
cmp.linkLeaveQueryString = true;

//AD Wall Page Name
if(cmp.pageName.indexOf("42925516") != -1 || cmp.pageName.indexOf("54578900") != -1){
cmp.pageName = "ad wall : " + cmp.eVar1;
}



//Kameleon
 if(cmp.linkName === "Kameleoon Tracking")
 {if (window.Kameleoon) {
    Kameleoon.API.Tracking.processOmniture(s);
    }
    window.kameleoonOmnitureCallSent = true;} 
    
//Platform AMP setzen und Conversion AMP mitgeben in articleview
if (b['dom.referrer'].indexOf(".ampproject.")>=0){
    b.page_platform = "amp";
    cmp.eVar2 = "amp";
    cmp.prop2 = "amp";
    //utag.loader.SC('utag_main', {'articleview': 'amp' + ';exp-session'});
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
 
//userAgent
cmp.eVar61 = navigator.userAgent;

//height & width für iPhones
if (navigator.userAgent.indexOf('iPhone') > -1) {
    cmp.eVar94 = screen.width + "x" + screen.height;
} 
 
 
 
 
  
}