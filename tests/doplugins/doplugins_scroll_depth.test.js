const sObject = require('../../extensions/doPlugins_global');
const { createWindowMock } = require('../mocks/browserMocks');

describe('_scrollDepthObj', () => {
    let s;
    beforeEach(() => {
        // Create a fresh window mock for each test.
        const windowMock = createWindowMock();
        jest.spyOn(global, 'window', 'get')
            .mockImplementation(() => (windowMock));

        // Provide a fresh copy of the s-object for each test.
        s = { ...sObject };
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('isDocTypeArticleOrVideo', () => {

        it('should return false if doc_type is not defined', () => {
            const result = s._scrollDepthObj.isDocTypeArticleOrVideo();

            expect(result).toBe(false);
        });

        it('should return true if doc_type is article', () => {
            window.utag.data.adobe_doc_type = 'article';
            const result = s._scrollDepthObj.isDocTypeArticleOrVideo();

            expect(result).toBe(true);
        });

        it('should return true if doc_type is video', () => {
            window.utag.data.adobe_doc_type = 'video';
            const result = s._scrollDepthObj.isDocTypeArticleOrVideo();

            expect(result).toBe(true);
        });

    });

    describe('getDocType', () => {
        
        it('should return empty string if no document type is present', () => {
            const value = s._scrollDepthObj.getDocType();

            expect(value).toBe('');
        });

        it('should return adobe_doc_type if it is present', () => {
            window.utag.data.adobe_doc_type = 'test_doc_type';
            const value = s._scrollDepthObj.getDocType();

            expect(value).toBe(window.utag.data.adobe_doc_type);
        });

        it('should return ad_page_document_type if it is present', () => {
            window.utag.data.ad_page_document_type = 'test_ad_page_document_type';
            const value = s._scrollDepthObj.getDocType();

            expect(value).toBe(window.utag.data.ad_page_document_type);
        });

        it('should return page_type if it is present', () => {
            window.utag.data.page_type = 'test_page_type';
            const value = s._scrollDepthObj.getDocType();

            expect(value).toBe(window.utag.data.page_type);
        });

        it('should return adobe_docType if it is present', () => {
            window.utag.data.adobe_docType = 'test_adobe_docType';
            const value = s._scrollDepthObj.getDocType();

            expect(value).toBe(window.utag.data.adobe_docType);
        });

    });

    describe('getPageId', () => {
        
        it('should return empty string if no page id is present', () => {
            const value = s._scrollDepthObj.getPageId();

            expect(value).toBe('');
        });

        it('should return page_id if it is present', () => {
            window.utag.data.page_id = 'test_page_id';
            const value = s._scrollDepthObj.getPageId();

            expect(value).toBe(window.utag.data.page_id);
        });

        it('should return cid if it is present', () => {
            window.utag.data.cid = 'test_cid';
            const value = s._scrollDepthObj.getPageId();

            expect(value).toBe(window.utag.data.cid);
        });

        it('should return screen_escenicId if it is present', () => {
            window.utag.data.screen_escenicId = 'test_screen_escenicId';
            const value = s._scrollDepthObj.getPageId();

            expect(value).toBe(window.utag.data.screen_escenicId);
        });

    });

    describe('getPageChannel', () => {

        it('should return empty string if no page channel is present', () => {
            const value = s._scrollDepthObj.getPageChannel();

            expect(value).toBe('');
        });

        it('should return _pathname1 if it is present', () => {
            window.utag.data._pathname1 = 'test_pathname1';
            const value = s._scrollDepthObj.getPageChannel();

            expect(value).toBe(window.utag.data._pathname1);
        });

        it('should return page_channel1 if it is present', () => {
            window.utag.data.page_channel1 = 'test_page_channel1';
            const value = s._scrollDepthObj.getPageChannel();

            expect(value).toBe(window.utag.data.page_channel1);
        });

        it('should return nav1 if it is present', () => {
            window.utag.data.nav1 = 'test_nav1';
            const value = s._scrollDepthObj.getPageChannel();

            expect(value).toBe(window.utag.data.nav1);
        });

        it('should return screen_sectionPath_level1 if it is present', () => {
            window.utag.data.screen_sectionPath_level1 = 'test_screen_sectionPath_level1';
            const value = s._scrollDepthObj.getPageChannel();

            expect(value).toBe(window.utag.data.screen_sectionPath_level1);
        });

        it('should return page_sectionPath1 if it is present', () => {
            window.utag.data.page_sectionPath1 = 'test_page_sectionPath1';
            const value = s._scrollDepthObj.getPageChannel();

            expect(value).toBe(window.utag.data.page_sectionPath1);
        });

    });

    describe('getPagePremiumStatus', () => {

        it('should return empty string if no page premium status is present', () => {
            const value = s._scrollDepthObj.getPagePremiumStatus();

            expect(value).toBe('');
        });

        it('should return is_status_premium if it is present', () => {
            window.utag.data.is_status_premium = 'is_status_premium_yes';
            const value = s._scrollDepthObj.getPagePremiumStatus();

            expect(value).toBe(window.utag.data.is_status_premium + ' : ');
        });

        it('should return page_isPremium if it is present', () => {
            window.utag.data.page_isPremium = 'page_isPremium_yes';
            const value = s._scrollDepthObj.getPagePremiumStatus();

            expect(value).toBe(window.utag.data.page_isPremium + ' : ');
        });

        it('should return screen_isPremium if it is present', () => {
            window.utag.data.screen_isPremium = 'screen_isPremium_yes';
            const value = s._scrollDepthObj.getPagePremiumStatus();

            expect(value).toBe(window.utag.data.screen_isPremium + ' : ');
        });

    });

    describe('setPreviousPage', () => {

        it('should set the right _prevPage if docType is not article or video', () => {
            s.pageName = 'test_pageName';
            jest.spyOn(s._scrollDepthObj, 'isDocTypeArticleOrVideo').mockReturnValue(false);

            s._scrollDepthObj.setPreviousPage(s);

            expect(s._prevPage).toBe(s.pageName);
        });

        it('should set the right _prevPage if docType is article or video and page is premium', () => {
            jest.spyOn(s._scrollDepthObj, 'isDocTypeArticleOrVideo').mockReturnValue(true);
            jest.spyOn(s._scrollDepthObj, 'getDocType').mockReturnValue('test_docType');
            jest.spyOn(s._scrollDepthObj, 'getPageId').mockReturnValue('test_pageId');
            jest.spyOn(s._scrollDepthObj, 'getPageChannel').mockReturnValue('test_pageChannel');
            jest.spyOn(s._scrollDepthObj, 'getPagePremiumStatus').mockReturnValue('test_is_page_premium_yes : ');
        
            s._scrollDepthObj.setPreviousPage(s);

            expect(s._prevPage).toBe('test_docType : test_is_page_premium_yes : test_pageId : test_pageChannel');
        });

        it('should set the right _prevPage if docType is article or video and page is not premium', () => {
            jest.spyOn(s._scrollDepthObj, 'isDocTypeArticleOrVideo').mockReturnValue(true);
            jest.spyOn(s._scrollDepthObj, 'getDocType').mockReturnValue('test_docType');
            jest.spyOn(s._scrollDepthObj, 'getPageId').mockReturnValue('test_pageId');
            jest.spyOn(s._scrollDepthObj, 'getPageChannel').mockReturnValue('test_pageChannel');
            jest.spyOn(s._scrollDepthObj, 'getPagePremiumStatus').mockReturnValue('');
        
            s._scrollDepthObj.setPreviousPage(s);

            expect(s._prevPage).toBe('test_docType : test_pageId : test_pageChannel');
        });

    });

    describe('setScrollDepthProperties', () => {

        it('should call setPreviousPage and getPercentPageViewed if pageName is defined', () => {
            s.pageName = 'test_pageName';
            const setPrevPage = jest.spyOn(s._scrollDepthObj, 'setPreviousPage');
            jest.spyOn(s, 'getPercentPageViewed').mockImplementation(jest.fn());

            s._scrollDepthObj.setScrollDepthProperties(s);

            expect(setPrevPage).toHaveBeenCalledWith(s);
            expect(s.getPercentPageViewed).toHaveBeenCalledWith(s._prevPage);

        });
        
        it('should call setData if pageName and _ppvPreviousPage is defined', () => {
            s.pageName = 'test_pageName';
            s._ppvPreviousPage = 'test_ppvPreviousPage';

            jest.spyOn(s, 'getPercentPageViewed').mockImplementation(jest.fn());
            const setData = jest.spyOn(s._scrollDepthObj, 'setData');

            s._scrollDepthObj.setScrollDepthProperties(s);

            expect(setData).toHaveBeenCalledWith(s);
            
        });
        
    });

    describe('setData', () => {
        it('should set scroll depth data in s object when called', () => {
            s._ppvPreviousPage = 'test_ppvPreviousPage';
            s._ppvInitialPercentViewed = 'test_ppvInitialPercentViewed';
            s._ppvHighestPixelsSeen = 'test_ppvHighestPixelsSeen';
            s._ppvHighestPercentViewed = 'test_ppvHighestPercentViewed';

            s._scrollDepthObj.setData(s);

            expect(s.eVar33).toBe(s._ppvPreviousPage);
            expect(s.prop61).toBe(s._ppvPreviousPage);
            expect(s.prop62).toBe(s._ppvInitialPercentViewed);
            expect(s.prop63).toBe(s._ppvHighestPixelsSeen);
            expect(s.prop64).toBe(Math.round(s._ppvInitialPercentViewed / 10) * 10);
            expect(s.prop65).toBe(Math.round(s._ppvHighestPercentViewed / 10) * 10);
            expect(s.events).toMatch('event45=' + s.prop64);
            expect(s.events).toMatch('event46=' + s.prop65);
        });
    });
    
});