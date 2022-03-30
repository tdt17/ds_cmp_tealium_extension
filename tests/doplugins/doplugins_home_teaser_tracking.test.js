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

    describe('isAfterHomeByCookie', () => {
        it('should return TRUE if previous page is of type home', () => {
            s._ppvPreviousPage = 'home';

            const result = s._homeTeaserTrackingObj.isAfterHomeByCookie(s);
            expect(result).toBe(true);
        });

        it('should return TRUE if previous page is of type section', () => {
            s._ppvPreviousPage = 'section';

            const result = s._homeTeaserTrackingObj.isAfterHomeByCookie(s);
            expect(result).toBe(true);
        });

        it('should return FALSE if previous page is NOT of type home or section', () => {
            s._ppvPreviousPage = 'video';

            const result = s._homeTeaserTrackingObj.isAfterHomeByCookie(s);
            expect(result).toBe(false);
        });
    });

    describe('isAfterHomeByCID', () => {
        it('should return TRUE if CID tracking parameter is of type home', () => {
            window.utag.data['qp.cid'] = 'kooperation.home.outbrain.desktop.AR_2.stylebook';

            const result = s._homeTeaserTrackingObj.isAfterHomeByCID();
            expect(result).toBe(true);
        });

        it('should return TRUE if CID tracking parameter is of type home', () => {
            let result = s._homeTeaserTrackingObj.isAfterHomeByCID();
            expect(result).toBe(false);

            window.utag.data['qp.cid'] = 'kooperation.article.outbrain.anything';

            result = s._homeTeaserTrackingObj.isAfterHomeByCID();
            expect(result).toBe(false);
        });
    });

    describe('isArticleAfterHome', () => {
        let isArticlePageMock;
        let isAfterHomeByCookieMock;
        let isAfterHomeByCIDMock;
        beforeEach(() => {
            isArticlePageMock = jest.spyOn(s._utils, 'isArticlePage').mockImplementation();
            isAfterHomeByCookieMock = jest.spyOn(s._homeTeaserTrackingObj, 'isAfterHomeByCookie').mockImplementation();
            isAfterHomeByCIDMock = jest.spyOn(s._homeTeaserTrackingObj, 'isAfterHomeByCID').mockImplementation();
        });

        it('should return TRUE if current page is of type article and previous page is of type home', () => {
            isArticlePageMock.mockReturnValue(true);
            isAfterHomeByCookieMock.mockReturnValue(true);
            isAfterHomeByCIDMock.mockReturnValue(false);

            let result = s._homeTeaserTrackingObj.isArticleAfterHome(s);
            expect(result).toBe(true);

            isAfterHomeByCookieMock.mockReturnValue(false);
            isAfterHomeByCIDMock.mockReturnValue(true);

            result = s._homeTeaserTrackingObj.isArticleAfterHome(s);
            expect(result).toBe(true);
        });

        it('should return FALSE if current page is NOT of type article', () => {
            isArticlePageMock.mockReturnValue(false);
            isAfterHomeByCookieMock.mockReturnValue(true);
            isAfterHomeByCIDMock.mockReturnValue(true);

            let result = s._homeTeaserTrackingObj.isArticleAfterHome(s);
            expect(result).toBe(false);
        });

        it('should return FALSE if current page is of type article and previous page is NOT of type home', () => {
            isArticlePageMock.mockReturnValue(true);
            isAfterHomeByCookieMock.mockReturnValue(false);
            isAfterHomeByCIDMock.mockReturnValue(false);

            let result = s._homeTeaserTrackingObj.isArticleAfterHome(s);
            expect(result).toBe(false);
        });
    });

    describe('getTeaserBrandFromCID', () => {
        it('should return the brand segment of the CID string', function () {
            const brandSegment = 'any-brand';
            window.utag.data['qp.cid'] = 'kooperation.reco.outbrain.free.welt.desktop.AR_2.' + brandSegment;
            const result = s._homeTeaserTrackingObj.getTeaserBrandFromCID();
            expect(result).toBe(brandSegment);
        });

        it('should return an empty string if there is no CID value', function () {
            const result = s._homeTeaserTrackingObj.getTeaserBrandFromCID();
            expect(result).toBe('');
        });
    });

    describe('getTrackingValue', () => {
        it('should return the hti value from utag_main cookie if available', function () {
            window.utag.data['cp.utag_main_hti'] = 'any-hti-value';
            const result = s._homeTeaserTrackingObj.getTrackingValue();
            expect(result).toBe(window.utag.data['cp.utag_main_hti']);
        });

        it('should return the teaser brand segment from CID URL query parameter if available', function () {
            const anyTeaserBrand = 'any-brand';
            jest.spyOn(s._homeTeaserTrackingObj, 'getTrackingValue').mockImplementation().mockReturnValue(anyTeaserBrand);
            const result = s._homeTeaserTrackingObj.getTrackingValue();
            expect(result).toBe(anyTeaserBrand);
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

    describe('deleteTrackingValuesFromCookie()', ()=>{
        it('should delete the hti and tb values of the utag_main cookie', function () {
            window.utag.loader.SC = jest.fn();
            s._homeTeaserTrackingObj.deleteTrackingValuesFromCookie();
            expect(window.utag.loader.SC).toHaveBeenNthCalledWith(1, 'utag_main', {'hti': ';exp-session'});
            expect(window.utag.loader.SC).toHaveBeenNthCalledWith(2, 'utag_main', {'tb': ';exp-session'});
        });
    });

    describe('trackTeaserClick', () => {
        let isArticleAfterHomeMock;
        let setEvarsMock;
        let deleteTrackingValuesFromCookieMock;

        beforeEach(() => {
            isArticleAfterHomeMock = jest.spyOn(s._homeTeaserTrackingObj, 'isArticleAfterHome').mockImplementation();
            setEvarsMock = jest.spyOn(s._homeTeaserTrackingObj, 'setEvars').mockImplementation();
            deleteTrackingValuesFromCookieMock = jest.spyOn(s._homeTeaserTrackingObj, 'deleteTrackingValuesFromCookie').mockImplementation();
        });

        it('should call this.setEvars(s) and this.deleteTrackingValuesFromCookie() if article page was visited after home or section page', function () {
            isArticleAfterHomeMock.mockReturnValue(true);
            s._homeTeaserTrackingObj.trackTeaserClick(s);
            expect(setEvarsMock).toHaveBeenCalledTimes(1);
            expect(deleteTrackingValuesFromCookieMock).toHaveBeenCalledTimes(1);
        });

        it('should NOT call this.setEvars(s) or this.deleteTrackingValuesFromCookie() if article page was NOT visited after home or section page', function () {
            isArticleAfterHomeMock.mockReturnValue(false);
            s._homeTeaserTrackingObj.trackTeaserClick(s);
            expect(setEvarsMock).not.toHaveBeenCalled();
            expect(deleteTrackingValuesFromCookieMock).not.toHaveBeenCalled();
        });
    });
});