/******************************************* BEGIN CODE TO DEPLOY *******************************************/
/* Adobe Consulting Plugin: p_fo (pageFirstOnly) v2.0 (Requires AppMeasurement) */
s.p_fo=function(on){var s=this;s.__fo||(s.__fo={});if(s.__fo[on])return!1;s.__fo[on]={};return!0};

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

/******************************************** END CODE TO DEPLOY ********************************************/

s.usePlugins=true
s.doPlugins = function(s) {
    //Campaign
    s.eVar0 = s.getValOnce(s.eVar0, 's_ev0', 7);
    //Time

    s.eVar184 = new Date().getHours().toString();
    s.eVar181 = new Date().getMinutes().toString();
    s.eVar185 = b.myCW;
    //no sdid for A4T
    s.expectSupplementalData = false; // Force to false;

    //Set Page Section 1 for Home
    if(s.pageName.indexOf("home : home") != -1){
        s.eVar5= "home";
        s.prop5="home";
        s.channel = "home";
    }

    /*  //Page Age in den checkout schieben
      if(b.adobe_docType !== '' && b.adobe_docType == 'article'){
        utag.loader.SC('utag_main', {'pa': b.screen_agePublication + ';exp-session'});
        b['cp.utag_main_pa'] = b.screen_agePublication;
      }*/
}