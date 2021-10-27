
s.usePlugins=true;
s.doPlugins = function(s) {
s.eVar184 = new Date().getHours().toString();
s.eVar181 = new Date().getMinutes().toString();
s.eVar185 = b.myCW;
s.expectSupplementalData = false; // Force to false;

   //page_cms_path ohne /BILD/ am Anfang
    if (typeof b.page_cms_path !== 'undefined' && b.page_cms_path.indexOf("/BILD/")>-1){
        b.page_cms_path = b.page_cms_path.substr(b.page_cms_path.indexOf("/BILD/")+6);
        s.eVar4 = b.page_cms_path;
        s.prop4 = b.page_cms_path;
    }
   
    //live is live (im-live-ticker)
    if(typeof b.mapped_document_type !== "undefined" && b.mapped_document_type == "article" && typeof b.page_cms_path !== "undefined" && b.page_cms_path.indexOf("im-live-ticker")>-1 ){
    b.mapped_document_type = "live";
    s.eVar3 = 'live'; 
    s.prop3 = 'live'; 
    s.pageName = "live : " + b['page_id'];
            
    }

    //live sportdaten
    if(typeof b.mapped_document_type !== "undefined" && b.mapped_document_type == "article" && typeof b.page_cms_path !== "undefined" && (b.page_cms_path.indexOf("/liveticker/")>-1 || b.page_cms_path.indexOf("im-liveticker")>-1)){
    b.mapped_document_type = "live-sport";
    s.eVar3 = 'live-sport'; 
    s.prop3 = 'live-sport'; 
    s.pageName = "live-sport : " + b['page_id'];
            
    }
    
    //height & width für iPhones
    if (navigator.userAgent.indexOf('iPhone') > -1) {
        s.eVar94 = screen.width + "x" + screen.height;
    }    

}