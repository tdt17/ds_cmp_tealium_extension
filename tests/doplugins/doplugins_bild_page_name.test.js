const doPluginsGlobal = require('../../extensions/doPlugins_global');
const {createWindowMock} = require('../mocks/browserMocks');

describe('bildPageName', () => {

    beforeEach(() => {
        // Create a fresh window mock for each test.
        const windowMock = createWindowMock();
        jest.spyOn(global, 'window', 'get')
            .mockImplementation(() => (windowMock));
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('isDocTypeArticle', () => {
        it('should be false if adobe_doc_type is not article', () => {
            window.utag.data.adobe_doc_type = 'home';

            const returnValue = doPluginsGlobal.bildPageName.isDocTypeArticle();
            expect(returnValue).toBe(false);
        });

        it('should be true if adobe_doc_type is article', () => {
            window.utag.data.adobe_doc_type = 'article';

            const returnValue = doPluginsGlobal.bildPageName.isDocTypeArticle();
            expect(returnValue).toBe(true);
        });

    });

    describe('isHome', () => {
        it('should be false if page_id is incorrect', () => {
            window.utag.data.page_id = 12345678;

            const returnValue = doPluginsGlobal.bildPageName.isHome();
            expect(returnValue).toBe(false);
        });

        it('should be true if page_id is 17410084', () => {
            window.utag.data.page_id = 17410084;

            const returnValue = doPluginsGlobal.bildPageName.isHome();
            expect(returnValue).toBe(true);
        });

        it('should be true if page_id is 16237890', () => {
            window.utag.data.page_id = 16237890;

            const returnValue = doPluginsGlobal.bildPageName.isHome();
            expect(returnValue).toBe(true);
        });

    });

    describe('isAdWall', () => {
        it('should be false if pageName is incorrect', () => {
            const s = {
                ...doPluginsGlobal.s,
                pageName: 'test-12345678',
            };

            const returnValue = doPluginsGlobal.bildPageName.isAdWall(s);
            expect(returnValue).toBe(false);
        });

        it('should be true if pageName contains 42925516', () => {
            const s = {
                ...doPluginsGlobal.s,
                pageName: 'test-42925516',
            };

            const returnValue = doPluginsGlobal.bildPageName.isAdWall(s);
            expect(returnValue).toBe(true);
        });

        it('should be true if pageName contains 54578900', () => {
            const s = {
                ...doPluginsGlobal.s,
                pageName: 'test-54578900',
            };

            const returnValue = doPluginsGlobal.bildPageName.isAdWall(s);
            expect(returnValue).toBe(true);
        });

    });

    describe('isLive', () => {
        it('should be false if adobe_doc_type is not article', () => {
            window.utag.data.page_cms_path = 'test/im-live-ticker';
            window.utag.data.adobe_doc_type = 'home';

            const returnValue = doPluginsGlobal.bildPageName.isLive();
            expect(returnValue).toBe(false);
        });

        it('should be false if page_cms_path is not correct', () => {
            window.utag.data.page_cms_path = 'test/imliveticker';
            window.utag.data.adobe_doc_type = 'article';

            const returnValue = doPluginsGlobal.bildPageName.isLive();
            expect(returnValue).toBe(false);
        });

        it('should be true if adobe_doc_type is article and page_cms_path contains im-live-ticker', () => {
            window.utag.data.page_cms_path = 'test/im-live-ticker';
            window.utag.data.adobe_doc_type = 'article';

            const returnValue = doPluginsGlobal.bildPageName.isLive();
            expect(returnValue).toBe(true);
        });
    });

    describe('isLiveSport', () => {
        it('should be false if adobe_doc_type is not article', () => {
            window.utag.data.page_cms_path = 'test/im-liveticker';
            window.utag.data.adobe_doc_type = 'home';

            const returnValue = doPluginsGlobal.bildPageName.isLiveSport();
            expect(returnValue).toBe(false);
        });

        it('should be false if page_cms_path is not correct', () => {
            window.utag.data.page_cms_path = 'test/imliveticker';
            window.utag.data.adobe_doc_type = 'article';

            const returnValue = doPluginsGlobal.bildPageName.isLiveSport();
            expect(returnValue).toBe(false);
        });


        it('should be true if adobe_doc_type is article and page_cms_path contains im-liveticker', () => {
            window.utag.data.page_cms_path = 'test/im-liveticker';
            window.utag.data.adobe_doc_type = 'article';

            const returnValue = doPluginsGlobal.bildPageName.isLiveSport();
            expect(returnValue).toBe(true);
        });

        it('should be true if adobe_doc_type is article and page_cms_path contains /liveticker/', () => {
            window.utag.data.page_cms_path = 'test/liveticker/';
            window.utag.data.adobe_doc_type = 'article';

            const returnValue = doPluginsGlobal.bildPageName.isLiveSport();
            expect(returnValue).toBe(true);
        });
    });

    describe('setPageName', () => {
        let isHome;
        let isAdWall;
        let isLive;
        let isLiveSport;

        beforeEach(() => {
            isHome = jest.spyOn(doPluginsGlobal.bildPageName, 'isHome').mockReturnValue(false);
            isAdWall = jest.spyOn(doPluginsGlobal.bildPageName, 'isAdWall').mockReturnValue(false);
            isLive = jest.spyOn(doPluginsGlobal.bildPageName, 'isLive').mockReturnValue(false);
            isLiveSport = jest.spyOn(doPluginsGlobal.bildPageName, 'isLiveSport').mockReturnValue(false);
        });

        afterEach(() => {
            jest.restoreAllMocks();
        });

        it('should not set any data if isAdWall, isHome, isLive, isLiveSport are all false', () => {
            const s = {
                ...doPluginsGlobal.s,
            };

            doPluginsGlobal.bildPageName.setPageName(s);

            expect(window.utag.data.adobe_doc_type).toBeUndefined();
            expect(window.utag.data.page_mapped_doctype_for_pagename).toBeUndefined();
            expect(s.pageName).toBeUndefined();
            expect(s.eVar3).toBeUndefined();
            expect(s.prop3).toBeUndefined();
        });

        it('should set relevant data if isAdWall is true', () => {
            const s = {
                ...doPluginsGlobal.s,
                eVar1: 'eVar1_test',
            };

            isAdWall.mockReturnValue(true);
            doPluginsGlobal.bildPageName.setPageName(s);

            expect(window.utag.data.adobe_doc_type).toBe('ad wall');
            expect(s.pageName).toBe('ad wall : ' + s.eVar1);
            expect(s.eVar3).toBe('ad wall');
            expect(s.prop3).toBe('ad wall');

        });

        it('should set relevant data if isHome is true', () => {
            const s = {
                ...doPluginsGlobal.s,
            };
            window.utag.data.page_id = '12345678';
            isHome.mockReturnValue(true);
            doPluginsGlobal.bildPageName.setPageName(s);

            expect(window.utag.data.page_mapped_doctype_for_pagename).toBe('home');
            expect(s.eVar3).toBe('home');
            expect(s.prop3).toBe('home');
            expect(s.pageName).toBe('home : ' + window.utag.data.page_id);
        });

        it('should set relevant data if isLive is true', () => {
            const s = {
                ...doPluginsGlobal.s,
            };
            window.utag.data.page_id = '12345678';
            isLive.mockReturnValue(true);
            doPluginsGlobal.bildPageName.setPageName(s);

            expect(window.utag.data.adobe_doc_type).toBe('live');
            expect(s.eVar3).toBe('live');
            expect(s.prop3).toBe('live');
            expect(s.pageName).toBe('live : ' + window.utag.data.page_id);
        });

        it('should set relevant data if isLiveSport is true', () => {
            const s = {
                ...doPluginsGlobal.s,
            };
            window.utag.data.page_id = '12345678';
            isLiveSport.mockReturnValue(true);
            doPluginsGlobal.bildPageName.setPageName(s);

            expect(window.utag.data.adobe_doc_type).toBe('live-sport');
            expect(s.eVar3).toBe('live-sport');
            expect(s.prop3).toBe('live-sport');
            expect(s.pageName).toBe('live-sport : ' + window.utag.data.page_id);
        });
    });
});
