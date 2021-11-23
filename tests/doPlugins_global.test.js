const doPluginsGlobal = require('../extensions/doPlugins_global');

function createWindowMock() {
    return {
        document: {
            referrer: ''
        },
        navigator: {
            userAgent: ''
        },
        screen: {
            width: '',
            height: ''
        },
        utag: {
            data: {},
        },
    };
}

describe('Adobe Plugins', () => {
    it('should check if the getPercentagePageViewed function is defined in s object', () => {
        expect(doPluginsGlobal.s.getPercentPageViewed).toBeInstanceOf(Function);
    });

    it('should check if the handlePPVevents function is defined in s object', () => {
        expect(doPluginsGlobal.s.handlePPVevents).toBeInstanceOf(Function);
    });

    it('should check if the p_fo function is defined in s object', () => {
        expect(doPluginsGlobal.s.p_fo).toBeInstanceOf(Function);
    });

    it('should check if the apl function is defined in s object', () => {
        expect(doPluginsGlobal.s.apl).toBeInstanceOf(Function);
    });

    it('should check if the getValOnce function is defined in s object', () => {
        expect(doPluginsGlobal.s.getValOnce).toBeInstanceOf(Function);
    });

    it('should check if the split function is defined in s object', () => {
        expect(doPluginsGlobal.s.split).toBeInstanceOf(Function);
    });
});

describe('Bild pagename functionalities', () => {

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

    describe('Empty s and window object - no data available', () => {
        it('should not set any data if pageName, page_id, adobe_doc_type, page_cms_path are not defined', () => {
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
    });

    describe('Ad Wall', () => {
        it('should set relevant data if pageName consists 42925516', () => {
            const s = {
                ...doPluginsGlobal.s,
                pageName: '42925516',
                eVar1: 'eVar1_test',
            };

            doPluginsGlobal.bildPageName.setPageName(s);

            expect(window.utag.data.adobe_doc_type).toBe('ad wall');
            expect(s.pageName).toBe('ad wall : eVar1_test');
            expect(s.eVar3).toBe('ad wall');
            expect(s.prop3).toBe('ad wall');

        });

        it('should set relevant data if pageName consists 54578900', () => {
            const s = {
                ...doPluginsGlobal.s,
                pageName: '54578900',
                eVar1: 'eVar1_test',
            };

            doPluginsGlobal.bildPageName.setPageName(s);

            expect(window.utag.data.adobe_doc_type).toBe('ad wall');
            expect(s.pageName).toBe('ad wall : eVar1_test');
            expect(s.eVar3).toBe('ad wall');
            expect(s.prop3).toBe('ad wall');

        });
    });

    describe('Home', () => {
        it('should set relevant data if page_id consists 17410084', () => {
            const s = {
                ...doPluginsGlobal.s,
            }
            window.utag.data.page_id = '17410084';

            doPluginsGlobal.bildPageName.setPageName(s);

            expect(window.utag.data.page_mapped_doctype_for_pagename).toBe('home');
            expect(s.eVar3).toBe('home');
            expect(s.prop3).toBe('home');
            expect(s.pageName).toBe('home : ' + window.utag.data.page_id);
        });

        it('should set relevant data if page_id consists 16237890', () => {
            const s = {
                ...doPluginsGlobal.s,
            }
            window.utag.data.page_id = '16237890';

            doPluginsGlobal.bildPageName.setPageName(s);

            expect(window.utag.data.page_mapped_doctype_for_pagename).toBe('home');
            expect(s.eVar3).toBe('home');
            expect(s.prop3).toBe('home');
            expect(s.pageName).toBe('home : ' + window.utag.data.page_id);
        });
    });

    describe('Live', () => {
        it('should set relevant data if adobe_doc_type is article and page_cms_path contains im-live-ticker', () => {
            const s = {
                ...doPluginsGlobal.s,
            }
            window.utag.data.adobe_doc_type = 'article';
            window.utag.data.page_cms_path = 'test/im-live-ticker';
            window.utag.data.page_id = '12345678';

            doPluginsGlobal.bildPageName.setPageName(s);

            expect(window.utag.data.adobe_doc_type).toBe('live');
            expect(s.eVar3).toBe('live');
            expect(s.prop3).toBe('live');
            expect(s.pageName).toBe('live : ' + window.utag.data.page_id);
        });
    });

    describe('Live sport', () => {
        it('should set relevant data if adobe_doc_type is article and page_cms_path contains im-liveticker', () => {
            const s = {
                ...doPluginsGlobal.s,
            }
            window.utag.data.adobe_doc_type = 'article';
            window.utag.data.page_cms_path = 'test-im-liveticker';
            window.utag.data.page_id = '12345678';

            doPluginsGlobal.bildPageName.setPageName(s);

            expect(window.utag.data.adobe_doc_type).toBe('live-sport');
            expect(s.eVar3).toBe('live-sport');
            expect(s.prop3).toBe('live-sport');
            expect(s.pageName).toBe('live-sport : ' + window.utag.data.page_id);
        });

        it('should set relevant data if adobe_doc_type is article and page_cms_path contains /liveticker/', () => {
            const s = {
                ...doPluginsGlobal.s,
            }
            window.utag.data.adobe_doc_type = 'article';
            window.utag.data.page_cms_path = '/liveticker/test';
            window.utag.data.page_id = '12345678';

            doPluginsGlobal.bildPageName.setPageName(s);

            expect(window.utag.data.adobe_doc_type).toBe('live-sport');
            expect(s.eVar3).toBe('live-sport');
            expect(s.prop3).toBe('live-sport');
            expect(s.pageName).toBe('live-sport : ' + window.utag.data.page_id);
        });
    });

});

describe('init()', () => {

    beforeEach(() => {
        // Create a fresh window mock for each test.
        const windowMock = createWindowMock();
        jest.spyOn(global, 'window', 'get')
            .mockImplementation(() => (windowMock));
    });

    afterEach(() => {
        jest.restoreAllMocks();
        delete doPluginsGlobal.s.eVar94;
    });

    it('should set global configuration properties of the Adobe s-object', () => {
        doPluginsGlobal.init();

        expect(doPluginsGlobal.s.currencyCode).toBe('EUR');
        expect(doPluginsGlobal.s.execdoplugins).toBe(0);
        expect(doPluginsGlobal.s.expectSupplementalData).toBe(false);
        expect(doPluginsGlobal.s.myChannels).toBe(0);
        expect(doPluginsGlobal.s.usePlugins).toBe(true);
    });

    it('should set eVar94 to the iPhone screen size', () => {
        const anyScreenSize = 111;
        window.screen.width = window.screen.height = anyScreenSize;
        window.navigator.userAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148';

        doPluginsGlobal.init();

        expect(doPluginsGlobal.s.eVar94).toBe(`${anyScreenSize}x${anyScreenSize}`);
    });

    it('should NOT set eVar94 when not viewed on iPhones', () => {
        doPluginsGlobal.s = {};
        doPluginsGlobal.init();
        expect(doPluginsGlobal.s.eVar94).toBeUndefined();
    });
});