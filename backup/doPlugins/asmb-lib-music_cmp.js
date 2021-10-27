cmp.usePlugins=true; 

cmp.doPlugins=function(cmp) { 

//Config
cmp.currencyCode="EUR";

//Time & Timeparting
cmp.eVar184 = new Date().getHours().toString();
cmp.eVar181 = new Date().getMinutes().toString();
cmp.eVar185 = b.myCW;

//Analytics4T
cmp.expectSupplementalData = false; // Force to false;

//Trackingserver
cmp.trackingServer = document.domain.replace(/www/,'as');
cmp.trackingServerSecure =  document.domain.replace(/www/,'as');

//Activity Map
cmp.trackInlineStats = true;
cmp.linkLeaveQueryString = true;

//userAgent
cmp.eVar61 = navigator.userAgent;

}


