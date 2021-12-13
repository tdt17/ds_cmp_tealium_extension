const doPluginsGlobal = require('../../extensions/doPlugins_global');
const { createWindowMock } = require('../mocks/browserMocks');


describe('scrollDepthObj', () => {
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
            const s = {
                ...doPluginsGlobal.s,
            };
            const result = s.scrollDepthObj.isPagenameDefined(s);

            expect(result).toBe(false);
        });

        it('should return true if pageName is defined and not empty', () => {
            const s = {
                ...doPluginsGlobal.s,
                pageName: 'testPageName',
            };
            const result = s.scrollDepthObj.isPagenameDefined(s);

            expect(result).toBe(true);
        });

    });

    describe('isPrevPageDefined', () => {

        it('should return false if _prevPage is not defined or empty', () => {
            const s = {
                ...doPluginsGlobal.s,
            };
            const result = s.scrollDepthObj.isPrevPageDefined(s);

            expect(result).toBe(false);
        });

        it('should return true if _prevPage is defined and not empty', () => {
            const s = {
                ...doPluginsGlobal.s,
                _prevPage: 'testPrevPage',
            };
            const result = s.scrollDepthObj.isPrevPageDefined(s);

            expect(result).toBe(true);
        });

    });

    describe('isPpvPreviousPageDefined', () => {

        it('should return false if _ppvPreviousPage is not defined or empty', () => {
            const s = {
                ...doPluginsGlobal.s,
            };
            const result = s.scrollDepthObj._ppvPreviousPage(s);

            expect(result).toBe(false);
        });

        it('should return true if _ppvPreviousPage is defined and not empty', () => {
            const s = {
                ...doPluginsGlobal.s,
                _ppvPreviousPage: 'testPpvPreviousPage',
            };
            const result = s.scrollDepthObj._ppvPreviousPage(s);

            expect(result).toBe(true);
        });

    });

    describe('isDocTypeArticleOrVideo', () => {

        it('should return false if doc_type is not defined', () => {
            const s = {
                ...doPluginsGlobal.s,
            };
            const result = s.scrollDepthObj.isDocTypeArticleOrVideo(s);

            expect(result).toBe(false);
        });

        it('should return true if doc_type is article', () => {
            const s = {
                ...doPluginsGlobal.s,
                doc_type: 'article',
            };
            const result = s.scrollDepthObj.isDocTypeArticleOrVideo(s);

            expect(result).toBe(true);
        });

        it('should return true if doc_type is video', () => {
            const s = {
                ...doPluginsGlobal.s,
                doc_type: 'video',
            };
            const result = s.scrollDepthObj.isDocTypeArticleOrVideo(s);

            expect(result).toBe(true);
        });

    });
});