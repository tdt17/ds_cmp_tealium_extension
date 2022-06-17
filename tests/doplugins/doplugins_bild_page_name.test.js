const sObject = require('../../extensions/doPlugins_global');
const {createWindowMock} = require('../mocks/browserMocks');

describe('_bildPageNameObj', () => {
    let s;
    beforeEach(() => {
        // Create a fresh window mock for each test.
        const windowMock = createWindowMock();
        jest.spyOn(global, 'window', 'get')
            .mockImplementation(() => (windowMock));

        // Provide a fresh copy of the s-object for each test.
        s = {...sObject};
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('isDocTypeArticle', () => {
        let getDocTypeMock;

        beforeEach(() => {
            getDocTypeMock = jest.spyOn(s._utils, 'getDocType').mockImplementation();
        });

        it('should be false if page_mapped_doctype_for_pagename is not article', () => {
            getDocTypeMock.mockReturnValue('any-non-article-type');

            const returnValue = s._bildPageNameObj.isDocTypeArticle();
            expect(returnValue).toBe(false);
        });

        it('should be true if page_mapped_doctype_for_pagename is article', () => {
            getDocTypeMock.mockReturnValue('article');

            const returnValue = s._bildPageNameObj.isDocTypeArticle();
            expect(returnValue).toBe(true);
        });
    });

    describe('isHome', () => {
        it('should be false if page_id is incorrect', () => {
            window.utag.data.page_id = 12345678;

            const returnValue = s._bildPageNameObj.isHome();
            expect(returnValue).toBe(false);
        });

        it('should be true if page_id is 22P2NufXQ03Ny17A6vwi (Bild home desktop)', () => {
            window.utag.data.page_id = '22P2NufXQ03Ny17A6vwi';

            const returnValue = s._bildPageNameObj.isHome();
            expect(returnValue).toBe(true);
        });

        it('should be true if page_id is wDmWJyqHFeqhJHmeuqfN (Bild home mobile)', () => {
            window.utag.data.page_id = 'wDmWJyqHFeqhJHmeuqfN';

            const returnValue = s._bildPageNameObj.isHome();
            expect(returnValue).toBe(true);
        });

    });

    describe('isAdWall', () => {
        it('should be false if pageName is incorrect', () => {
            s.pageName = 'test-12345678';
            window.utag.data['dom.pathname'] = 'any-value';
            const returnValue = s._bildPageNameObj.isAdWall(s);
            expect(returnValue).toBe(false);
        });

        it('should be true if pageName contains 42925516', () => {
            s.pageName = 'test-42925516';
            window.utag.data['dom.pathname'] = 'any-value';
            const returnValue = s._bildPageNameObj.isAdWall(s);
            expect(returnValue).toBe(true);
        });

        it('should be true if pageName contains 54578900', () => {
            s.pageName = 'test-54578900';
            const returnValue = s._bildPageNameObj.isAdWall(s);
            expect(returnValue).toBe(true);
        });

        it('should be true if utag.data.dom.pathname contains adblockwall.html', () => {
            window.utag.data['dom.pathname'] = 'adblockwall.html';
            const returnValue = s._bildPageNameObj.isAdWall(s);
            expect(returnValue).toBe(true);
        });

    });

    describe('isLive', () => {
        it('should be false if page_mapped_doctype_for_pagename is not article', () => {
            window.utag.data.is_page_live_article = '1';
            window.utag.data.page_mapped_doctype_for_pagename = 'home';

            const returnValue = s._bildPageNameObj.isLive();
            expect(returnValue).toBe(false);
        });

        it('should be false if is_page_live_article is not correct', () => {
            window.utag.data.is_page_live_article = '0';
            window.utag.data.page_mapped_doctype_for_pagename = 'article';

            const returnValue = s._bildPageNameObj.isLive();
            expect(returnValue).toBe(false);
        });

        it('should be true if page_mapped_doctype_for_pagename is article and is_page_live_article is 1', () => {
            window.utag.data.is_page_live_article = '1';
            window.utag.data.page_mapped_doctype_for_pagename = 'article';

            const returnValue = s._bildPageNameObj.isLive();
            expect(returnValue).toBe(true);
        });
    });

    describe('isLiveSport', () => {
        it('should be false if page_mapped_doctype_for_pagename is not article', () => {
            window.utag.data.page_cms_path = 'test/im-liveticker';
            window.utag.data.page_mapped_doctype_for_pagename = 'home';

            const returnValue = s._bildPageNameObj.isLiveSport();
            expect(returnValue).toBe(false);
        });

        it('should be false if page_cms_path is not correct', () => {
            window.utag.data.page_cms_path = 'test/imliveticker';
            window.utag.data.page_mapped_doctype_for_pagename = 'article';

            const returnValue = s._bildPageNameObj.isLiveSport();
            expect(returnValue).toBe(false);
        });


        it('should be true if page_mapped_doctype_for_pagename is article and page_cms_path contains im-liveticker', () => {
            window.utag.data.page_cms_path = 'test/im-liveticker';
            window.utag.data.page_mapped_doctype_for_pagename = 'article';

            const returnValue = s._bildPageNameObj.isLiveSport();
            expect(returnValue).toBe(true);
        });

        it('should be true if page_mapped_doctype_for_pagename is article and page_cms_path contains /liveticker/', () => {
            window.utag.data.page_cms_path = 'test/liveticker/';
            window.utag.data.page_mapped_doctype_for_pagename = 'article';

            const returnValue = s._bildPageNameObj.isLiveSport();
            expect(returnValue).toBe(true);
        });
    });

    describe('setPageName', () => {
        let isHome;
        let isAdWall;
        let isLive;
        let isLiveSport;

        beforeEach(() => {
            isHome = jest.spyOn(s._bildPageNameObj, 'isHome').mockReturnValue(false);
            isAdWall = jest.spyOn(s._bildPageNameObj, 'isAdWall').mockReturnValue(false);
            isLive = jest.spyOn(s._bildPageNameObj, 'isLive').mockReturnValue(false);
            isLiveSport = jest.spyOn(s._bildPageNameObj, 'isLiveSport').mockReturnValue(false);
        });

        afterEach(() => {
            jest.restoreAllMocks();
        });

        it('should not set any data if isAdWall, isHome, isLive, isLiveSport are all false', () => {
            s._bildPageNameObj.setPageName(s);

            expect(window.utag.data.page_mapped_doctype_for_pagename).toBeUndefined();
            expect(s.pageName).toBeUndefined();
            expect(s.eVar3).toBeUndefined();
            expect(s.prop3).toBeUndefined();
        });

        it('should set relevant data if isAdWall is true', () => {
            s.eVar1 = 'eVar1_test';

            isAdWall.mockReturnValue(true);
            s._bildPageNameObj.setPageName(s);

            expect(window.utag.data.page_mapped_doctype_for_pagename).toBe('ad wall');
            expect(s.pageName).toBe('ad wall : ' + s.eVar1);
            expect(s.eVar3).toBe('ad wall');
            expect(s.prop3).toBe('ad wall');

        });

        it('should set relevant data if isHome is true', () => {
            window.utag.data.page_id = '12345678';
            isHome.mockReturnValue(true);
            s._bildPageNameObj.setPageName(s);

            expect(window.utag.data.page_mapped_doctype_for_pagename).toBe('home');
            expect(s.eVar3).toBe('home');
            expect(s.prop3).toBe('home');
            expect(s.eVar4).toBe('/');
            expect(s.eVar5).toBe('home');
            expect(s.pageName).toBe('home : ' + window.utag.data.page_id);
        });

        it('should set relevant data if isLive is true', () => {
            window.utag.data.page_id = '12345678';
            isLive.mockReturnValue(true);
            s._bildPageNameObj.setPageName(s);

            expect(window.utag.data.page_mapped_doctype_for_pagename).toBe('live');
            expect(s.eVar3).toBe('live');
            expect(s.prop3).toBe('live');
            expect(s.pageName).toBe('live : ' + window.utag.data.page_id);
        });

        it('should set relevant data if isLiveSport is true', () => {
            window.utag.data.page_id = '12345678';
            isLive.mockReturnValue(false);
            isLiveSport.mockReturnValue(true);
            s._bildPageNameObj.setPageName(s);

            expect(window.utag.data.page_mapped_doctype_for_pagename).toBe('live-sport');
            expect(s.eVar3).toBe('live-sport');
            expect(s.prop3).toBe('live-sport');
            expect(s.pageName).toBe('live-sport : ' + window.utag.data.page_id);
        });
    });
});
