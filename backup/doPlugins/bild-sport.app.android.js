
s.usePlugins=true;
s.doPlugins = function(s) {


    s.eVar184 = new Date().getHours().toString();
    s.eVar181 = new Date().getMinutes().toString();
    s.eVar185 =b.myCW;
//no sdid for A4T
    s.expectSupplementalData = false; // Force to false;

    //liveticker
    if(typeof b.mapped_page_doc_type !== "undefined" && b.mapped_page_doc_type == "article" && typeof b.page_cms_path !== "undefined" && b.page_cms_path.indexOf("im-live-ticker")>-1 ){
        b.mapped_page_doc_type = "live";
        s.eVar3 = 'live';
        s.prop3 = 'live';
        s.pageName = "live : " + b['page_id'];

    }

    //live sportdaten
    if(typeof b.mapped_page_doc_type !== "undefined" && b.mapped_page_doc_type == "article" && typeof b.page_cms_path !== "undefined" && (b.page_cms_path.indexOf("/liveticker/")>-1 || b.page_cms_path.indexOf("im-liveticker")>-1)){
        b.mapped_page_doc_type = "live-sport";
        s.eVar3 = 'live-sport';
        s.prop3 = 'live-sport';
        s.pageName = "live-sport : " + b['page_id'];

    }

}