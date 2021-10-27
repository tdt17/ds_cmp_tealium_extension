s.usePlugins=true;

s.doPlugins = function(s) {
    s.eVar184 = new Date().getHours().toString();
    s.eVar181 = new Date().getMinutes().toString();
    s.eVar185 = b.myCW;
    s.expectSupplementalData = false; // Force to false;

    //Page Age in den checkout schieben
    if(b.mapped_document_type !== '' && b.mapped_document_type == 'article' && typeof b.page_age && typeof b.page_age !== 'undefined')    {
        utag.loader.SC('utag_main', {
            'pa': b.page_age + ';exp-session'
            
        });
        b['cp.utag_main_pa'] = b.page_age;
        
    }
   
    //wenn order via article dann schicke page_age mit
    if (b.order_via !== '' && b.order_via == 'article')    {
       s.eVar17 = b['cp.utag_main_pa'];
    }
   
    //page_cms_path ohne /BILD/ am Anfang
    if (typeof b.page_cms_path !== 'undefined' && b.page_cms_path.indexOf("/BILD/")>-1){
        s.eVar4 = b.page_cms_path.replace("/BILD/","");
        s.prop4 = b.page_cms_path.replace("/BILD/","");
        b.page_cms_path = b.page_cms_path.replace("/BILD/","");
    }
    
    //liveticker
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
   
}