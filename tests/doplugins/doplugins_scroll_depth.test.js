const doPlugins_global = require('../../extensions/doPlugins_global');
const { createWindowMock } = require('../mocks/browserMocks');


describe('_scrollDepthObj', () => {
    beforeEach(() => {
        // Create a fresh window mock for each test.
        const windowMock = createWindowMock();
        jest.spyOn(global, 'window', 'get')
            .mockImplementation(() => (windowMock));

    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('isPagenameDefined', () => {
        
        it('should return false if pageName is not defined or empty', () => {
            const sObject = {
                ...doPlugins_global.s,
            };
            const result = sObject._scrollDepthObj.isPagenameDefined(sObject);

            expect(result).toBe(false);
        });

        it('should return true if pageName is defined and not empty', () => {
            const sObject = {
                ...doPlugins_global.s,
                pageName: 'testPageName',
            };
            const result = sObject._scrollDepthObj.isPagenameDefined(sObject);

            expect(result).toBe(true);
        });

    });

    describe('isPrevPageDefined', () => {

        it('should return false if _prevPage is not defined or empty', () => {
            const sObject = {
                ...doPlugins_global.s,
            };
            const result = sObject._scrollDepthObj.isPrevPageDefined(sObject);

            expect(result).toBe(false);
        });

        it('should return true if _prevPage is defined and not empty', () => {
            const sObject = {
                ...doPlugins_global.s,
                _prevPage: 'testPrevPage',
            };
            const result = sObject._scrollDepthObj.isPrevPageDefined(sObject);

            expect(result).toBe(true);
        });

    });

    describe('isPpvPreviousPageDefined', () => {

        it('should return false if _ppvPreviousPage is not defined or empty', () => {
            const sObject = {
                ...doPlugins_global.s,
            };
            const result = sObject._scrollDepthObj.isPpvPreviousPageDefined(sObject);

            expect(result).toBe(false);
        });

        it('should return true if _ppvPreviousPage is defined and not empty', () => {
            const sObject = {
                ...doPlugins_global.s,
                _ppvPreviousPage: 'testPpvPreviousPage',
            };
            const result = sObject._scrollDepthObj.isPpvPreviousPageDefined(sObject);

            expect(result).toBe(true);
        });

    });

    describe('isDocTypeArticleOrVideo', () => {

        it('should return false if doc_type is not defined', () => {
            const sObject = {
                ...doPlugins_global.s,
            };
            const result = sObject._scrollDepthObj.isDocTypeArticleOrVideo();

            expect(result).toBe(false);
        });

        it('should return true if doc_type is article', () => {
            const sObject = {
                ...doPlugins_global.s,
            };
            window.utag.data.adobe_doc_type = 'article';
            const result = sObject._scrollDepthObj.isDocTypeArticleOrVideo();

            expect(result).toBe(true);
        });

        it('should return true if doc_type is video', () => {
            const sObject = {
                ...doPlugins_global.s,
            };
            window.utag.data.adobe_doc_type = 'video';
            const result = sObject._scrollDepthObj.isDocTypeArticleOrVideo();

            expect(result).toBe(true);
        });

    });

    describe('getDocType', () => {
        
        it('should return empty string if no document type is present', () => {
            const sObject = {
                ...doPlugins_global.s,
            };
            const value = sObject._scrollDepthObj.getDocType();
            expect(value).toBe('');
        });

        it('should return adobe_doc_type if it is present', () => {
            const sObject = {
                ...doPlugins_global.s,
            };
            window.utag.data.adobe_doc_type = 'test_doc_type';
            const value = sObject._scrollDepthObj.getDocType();
            expect(value).toBe(window.utag.data.adobe_doc_type);
        });

        it('should return ad_page_document_type if it is present', () => {
            const sObject = {
                ...doPlugins_global.s,
            };
            window.utag.data.ad_page_document_type = 'test_ad_page_document_type';
            const value = sObject._scrollDepthObj.getDocType();
            expect(value).toBe(window.utag.data.ad_page_document_type);
        });

        it('should return page_type if it is present', () => {
            const sObject = {
                ...doPlugins_global.s,
            };
            window.utag.data.page_type = 'test_page_type';
            const value = sObject._scrollDepthObj.getDocType();
            expect(value).toBe(window.utag.data.page_type);
        });

        it('should return adobe_docType if it is present', () => {
            const sObject = {
                ...doPlugins_global.s,
            };
            window.utag.data.adobe_docType = 'test_adobe_docType';
            const value = sObject._scrollDepthObj.getDocType();
            expect(value).toBe(window.utag.data.adobe_docType);
        });


    });

    describe('getPageId', () => {
        
        it('should return empty string if no page id is present', () => {
            const sObject = {
                ...doPlugins_global.s,
            };
            const value = sObject._scrollDepthObj.getPageId();
            expect(value).toBe('');
        });

        it('should return page_id if it is present', () => {
            const sObject = {
                ...doPlugins_global.s,
            };
            window.utag.data.page_id = 'test_page_id';
            const value = sObject._scrollDepthObj.getPageId();
            expect(value).toBe(window.utag.data.page_id);
        });

        it('should return cid if it is present', () => {
            const sObject = {
                ...doPlugins_global.s,
            };
            window.utag.data.cid = 'test_cid';
            const value = sObject._scrollDepthObj.getPageId();
            expect(value).toBe(window.utag.data.cid);
        });

        it('should return screen_escenicId if it is present', () => {
            const sObject = {
                ...doPlugins_global.s,
            };
            window.utag.data.screen_escenicId = 'test_screen_escenicId';
            const value = sObject._scrollDepthObj.getPageId();
            expect(value).toBe(window.utag.data.screen_escenicId);
        });
    });

    describe('getPageChannel', () => {

        it('should return empty string if no page channel is present', () => {
            const sObject = {
                ...doPlugins_global.s,
            };
            const value = sObject._scrollDepthObj.getPageChannel();
            expect(value).toBe('');
        });

        it('should return _pathname1 if it is present', () => {
            const sObject = {
                ...doPlugins_global.s,
            };
            window.utag.data._pathname1 = 'test_pathname1';
            const value = sObject._scrollDepthObj.getPageChannel();
            expect(value).toBe(window.utag.data._pathname1);
        });

        it('should return page_channel1 if it is present', () => {
            const sObject = {
                ...doPlugins_global.s,
            };
            window.utag.data.page_channel1 = 'test_page_channel1';
            const value = sObject._scrollDepthObj.getPageChannel();
            expect(value).toBe(window.utag.data.page_channel1);
        });

        it('should return nav1 if it is present', () => {
            const sObject = {
                ...doPlugins_global.s,
            };
            window.utag.data.nav1 = 'test_nav1';
            const value = sObject._scrollDepthObj.getPageChannel();
            expect(value).toBe(window.utag.data.nav1);
        });

        it('should return screen_sectionPath_level1 if it is present', () => {
            const sObject = {
                ...doPlugins_global.s,
            };
            window.utag.data.screen_sectionPath_level1 = 'test_screen_sectionPath_level1';
            const value = sObject._scrollDepthObj.getPageChannel();
            expect(value).toBe(window.utag.data.screen_sectionPath_level1);
        });

        it('should return page_sectionPath1 if it is present', () => {
            const sObject = {
                ...doPlugins_global.s,
            };
            window.utag.data.page_sectionPath1 = 'test_page_sectionPath1';
            const value = sObject._scrollDepthObj.getPageChannel();
            expect(value).toBe(window.utag.data.page_sectionPath1);
        });
    });

    describe('getPagePremiumStatus', () => {

        it('should return empty string if no page premium status is present', () => {
            const sObject = {
                ...doPlugins_global.s,
            };
            const value = sObject._scrollDepthObj.getPagePremiumStatus();
            expect(value).toBe('');
        });

        it('should return is_status_premium if it is present', () => {
            const sObject = {
                ...doPlugins_global.s,
            };
            window.utag.data.is_status_premium = 'is_status_premium_yes';
            const value = sObject._scrollDepthObj.getPagePremiumStatus();
            expect(value).toBe(window.utag.data.is_status_premium + ' : ');
        });

        it('should return page_isPremium if it is present', () => {
            const sObject = {
                ...doPlugins_global.s,
            };
            window.utag.data.page_isPremium = 'page_isPremium_yes';
            const value = sObject._scrollDepthObj.getPagePremiumStatus();
            expect(value).toBe(window.utag.data.page_isPremium + ' : ');
        });

        it('should return screen_isPremium if it is present', () => {
            const sObject = {
                ...doPlugins_global.s,
            };
            window.utag.data.screen_isPremium = 'screen_isPremium_yes';
            const value = sObject._scrollDepthObj.getPagePremiumStatus();
            expect(value).toBe(window.utag.data.screen_isPremium + ' : ');
        });
    });

    describe('setPreviousPage', () => {

        it('should set the right _prevPage if pageName is defined but docType is not article or video', () => {
            const sObject = {
                ...doPlugins_global.s,
                pageName: 'test_pageName',
            };
            jest.spyOn(sObject._scrollDepthObj, 'isPagenameDefined').mockReturnValue(true);
            jest.spyOn(sObject._scrollDepthObj, 'isDocTypeArticleOrVideo').mockReturnValue(false);

            sObject._scrollDepthObj.setPreviousPage(sObject);
            expect(sObject._prevPage).toBe(sObject.pageName);
        });

        it('should set the right _prevPage if pageName is defined, docType is article or video and page is premium', () => {
            const sObject = {
                ...doPlugins_global.s,
            };
            jest.spyOn(sObject._scrollDepthObj, 'isPagenameDefined').mockReturnValue(true);
            jest.spyOn(sObject._scrollDepthObj, 'isDocTypeArticleOrVideo').mockReturnValue(true);
            jest.spyOn(sObject._scrollDepthObj, 'getDocType').mockReturnValue('test_docType');
            jest.spyOn(sObject._scrollDepthObj, 'getPageId').mockReturnValue('test_pageId');
            jest.spyOn(sObject._scrollDepthObj, 'getPageChannel').mockReturnValue('test_pageChannel');
            jest.spyOn(sObject._scrollDepthObj, 'getPagePremiumStatus').mockReturnValue('test_is_page_premium_yes : ');
        
            sObject._scrollDepthObj.setPreviousPage(sObject);
            expect(sObject._prevPage).toBe('test_docType : test_is_page_premium_yes : test_pageId : test_pageChannel');
        });

        it('should set the right _prevPage if pageName is defined, docType is article or video and page is not premium', () => {
            const sObject = {
                ...doPlugins_global.s,
            };
            jest.spyOn(sObject._scrollDepthObj, 'isPagenameDefined').mockReturnValue(true);
            jest.spyOn(sObject._scrollDepthObj, 'isDocTypeArticleOrVideo').mockReturnValue(true);
            jest.spyOn(sObject._scrollDepthObj, 'getDocType').mockReturnValue('test_docType');
            jest.spyOn(sObject._scrollDepthObj, 'getPageId').mockReturnValue('test_pageId');
            jest.spyOn(sObject._scrollDepthObj, 'getPageChannel').mockReturnValue('test_pageChannel');
            jest.spyOn(sObject._scrollDepthObj, 'getPagePremiumStatus').mockReturnValue('');
        
            sObject._scrollDepthObj.setPreviousPage(sObject);
            expect(sObject._prevPage).toBe('test_docType : test_pageId : test_pageChannel');
        });
    });

    describe('setScrollDepthData', () => {

        it('should call setPreviousPage', () => {
            const sObject = {
                ...doPlugins_global.s,
            };

            const setPrevPage = jest.spyOn(sObject._scrollDepthObj, 'setPreviousPage');

            sObject._scrollDepthObj.setScrollDepthData(sObject);

            expect(setPrevPage).toHaveBeenCalledWith(sObject);

        });
        
        it('should call getPercentPageViewed but set no data if only _prevPage is defined', () => {
            const sObject = {
                ...doPlugins_global.s,
                _prevPage: 'test_prevPage',
            };

            jest.spyOn(sObject, 'getPercentPageViewed').mockImplementation(jest.fn());
            jest.spyOn(sObject._scrollDepthObj, 'isPrevPageDefined').mockReturnValue(true);
            jest.spyOn(sObject._scrollDepthObj, 'isPpvPreviousPageDefined').mockReturnValue(false);

            sObject._scrollDepthObj.setScrollDepthData(sObject);

            expect(sObject.getPercentPageViewed).toHaveBeenCalledWith(sObject._prevPage);

        });

        it('should call getPercentPageViewed and set correct data if _prevPage and _ppvPreviousPage is defined', () => {
            const sObject = {
                ...doPlugins_global.s,
                _prevPage: 'test_prevPage',
                _ppvPreviousPage: 'test_ppvPreviousPage',
                _ppvInitialPercentViewed: 'test_ppvInitialPercentViewed',
                _ppvHighestPixelsSeen: 'test_ppvHighestPixelsSeen',
                _ppvHighestPercentViewed: 'test_ppvHighestPercentViewed',
            };

            jest.spyOn(sObject._scrollDepthObj, 'isPrevPageDefined').mockReturnValue(true);
            const getPercentPageViewed = jest.spyOn(sObject, 'getPercentPageViewed').mockImplementation(jest.fn());
            jest.spyOn(sObject._scrollDepthObj, 'isPpvPreviousPageDefined').mockReturnValue(true);

            sObject._scrollDepthObj.setScrollDepthData(sObject);

            expect(getPercentPageViewed).toHaveBeenCalled();
            expect(sObject.eVar33).toBe(sObject._ppvPreviousPage);
            expect(sObject.prop61).toBe(sObject._ppvPreviousPage);
            expect(sObject.prop62).toBe(sObject._ppvInitialPercentViewed);
            expect(sObject.prop63).toBe(sObject._ppvHighestPixelsSeen);
            expect(sObject.prop64).toBe(Math.round(sObject._ppvInitialPercentViewed / 10) * 10);
            expect(sObject.prop65).toBe(Math.round(sObject._ppvHighestPercentViewed / 10) * 10);
            expect(sObject.events).toMatch('event45=' + sObject.prop64);
            expect(sObject.events).toMatch('event46=' + sObject.prop65);

        });
        
    });
});