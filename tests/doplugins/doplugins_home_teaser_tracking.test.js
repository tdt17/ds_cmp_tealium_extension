const {createWindowMock} = require('../mocks/browserMocks');
const sObject = require('../../extensions/doPlugins_global');

describe('_homeTeaserTrackingObj', () => {
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

    describe('isArticleAfterHome', () => {
        let isArticlePageMock;
        beforeEach(() => {
            isArticlePageMock = jest.spyOn(s._utils, 'isArticlePage').mockImplementation();
        });

        it('should return TRUE if current page is of type article and previous page is of type home', () => {
            isArticlePageMock.mockReturnValue(true);
            s._ppvPreviousPage = 'home';

            const result = s._homeTeaserTrackingObj.isArticleAfterHome(s);
            expect(result).toBe(true);
        });

        it('should return TRUE if current page is of type article and previous page is of type section', () => {
            isArticlePageMock.mockReturnValue(true);
            s._ppvPreviousPage = 'section';

            const result = s._homeTeaserTrackingObj.isArticleAfterHome(s);
            expect(result).toBe(true);
        });

        it('should return FALSE if current page is NOT of type article and previous page is of type home or section', () => {
            isArticlePageMock.mockReturnValue(false);
            s._ppvPreviousPage = 'home';

            const result = s._homeTeaserTrackingObj.isArticleAfterHome(s);
            expect(result).toBe(false);
        });

        it('should return FALSE if current page is of type article and previous page is NOT of type home or section', () => {
            isArticlePageMock.mockReturnValue(false);
            s._ppvPreviousPage = 'video';

            const result = s._homeTeaserTrackingObj.isArticleAfterHome(s);
            expect(result).toBe(false);
        });
    });

    describe('getTrackingValue', () => {
        it('should return the hti value which is stored in utag_main cookie', function () {
            window.utag.data['cp.utag_main_hti'] = 'any-hti-value';
            const result = s._homeTeaserTrackingObj.getTrackingValue();
            expect(result).toBe(window.utag.data['cp.utag_main_hti']);
        });

        it('should return the dtp value which is available as a URL query parameter', function () {
            window.utag.data['qp.dtp'] = 'any-dtp-value';
            const result = s._homeTeaserTrackingObj.getTrackingValue();
            expect(result).toBe(window.utag.data['qp.dtp']);
        });
    });

    describe('setEvars', () => {
        it('should assign teaser tracking values to certain eVars', function () {
            const anyTrackingValue = 'any-tracking-value';
            s.eVar1 = 'any-eVar1';
            window.utag.data['cp.utag_main_tb'] = 'any-teaser-block';
            jest.spyOn(s._homeTeaserTrackingObj, 'getTrackingValue').mockImplementation().mockReturnValue(anyTrackingValue);
            s._homeTeaserTrackingObj.setEvars(s);
            expect(s.eVar66).toBe(anyTrackingValue);
            expect(s.eVar92).toBe(anyTrackingValue + '|' + s.eVar1);
            expect(s.eVar97).toBe(window.utag.data['cp.utag_main_tb']);
        });
    });

    describe('trackTeaserClick', () => {
        let isArticleAfterHomeMock;
        let setEvarsMock;

        beforeEach(() => {
            isArticleAfterHomeMock = jest.spyOn(s._homeTeaserTrackingObj, 'isArticleAfterHome').mockImplementation();
            setEvarsMock = jest.spyOn(s._homeTeaserTrackingObj, 'setEvars').mockImplementation();
        });

        it('should call this.setEvars(s) if article page was visited after home or section page', function () {
            isArticleAfterHomeMock.mockReturnValue(true);
            s._homeTeaserTrackingObj.trackTeaserClick(s);
            expect(setEvarsMock).toHaveBeenCalledTimes(1);
        });

        it('should NOT call this.setEvars(s) if article page was NOT visited after home or section page', function () {
            isArticleAfterHomeMock.mockReturnValue(false);
            s._homeTeaserTrackingObj.trackTeaserClick(s);
            expect(setEvarsMock).not.toHaveBeenCalled();
        });
    });
});