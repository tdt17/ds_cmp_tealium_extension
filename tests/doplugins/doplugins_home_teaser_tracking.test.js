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

        it('should return the dtp URL query parameter if available', function () {
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

    describe('deleteTrackingValuesFromCookie()', ()=>{
        it('should delete the hti and tb values of the utag_main cookie', function () {
            window.utag.loader.SC = jest.fn();
            s._homeTeaserTrackingObj.deleteTrackingValuesFromCookie();
            expect(window.utag.loader.SC).toHaveBeenNthCalledWith(1, 'utag_main', {'hti': ';exp-session'});
            expect(window.utag.loader.SC).toHaveBeenNthCalledWith(2, 'utag_main', {'tb': ';exp-session'});
        });
    });

    describe('isArticleViewOfTypeHome()', ()=>{
        it('should return TRUE if article-view-type is event22 (home)', function () {
            const result = s._homeTeaserTrackingObj.isArticleViewOfTypeHome('event22');
            expect(result).toBe(true);
        });

        it('should return TRUE if article-view-type is event76 (Bild desktop home)', function () {
            const result = s._homeTeaserTrackingObj.isArticleViewOfTypeHome('event76');
            expect(result).toBe(true);
        });

        it('should return TRUE if article-view-type is event77 (Bild mobile home)', function () {
            const result = s._homeTeaserTrackingObj.isArticleViewOfTypeHome('event77');
            expect(result).toBe(true);
        });

        it('should return FALSE if article-view-type is not of type home', function () {
            const result = s._homeTeaserTrackingObj.isArticleViewOfTypeHome('event123');
            expect(result).toBe(false);
        });
    });

    describe('trackTeaserClick', () => {
        let isArticleViewOfTypeHomeMock;
        let setEvarsMock;
        let deleteTrackingValuesFromCookieMock;

        beforeEach(() => {
            isArticleViewOfTypeHomeMock = jest.spyOn(s._homeTeaserTrackingObj, 'isArticleViewOfTypeHome').mockImplementation();
            setEvarsMock = jest.spyOn(s._homeTeaserTrackingObj, 'setEvars').mockImplementation();
            deleteTrackingValuesFromCookieMock = jest.spyOn(s._homeTeaserTrackingObj, 'deleteTrackingValuesFromCookie').mockImplementation();
        });

        it('should call this.setEvars(s) and this.deleteTrackingValuesFromCookie() if article-view is of type home', function () {
            isArticleViewOfTypeHomeMock.mockReturnValue(true);
            s._homeTeaserTrackingObj.trackTeaserClick(s);
            expect(setEvarsMock).toHaveBeenCalledTimes(1);
            expect(deleteTrackingValuesFromCookieMock).toHaveBeenCalledTimes(1);
        });

        it('should NOT call this.setEvars(s) and this.deleteTrackingValuesFromCookie() if article-view is NOT of type home', function () {
            isArticleViewOfTypeHomeMock.mockReturnValue(false);
            s._homeTeaserTrackingObj.trackTeaserClick(s);
            expect(setEvarsMock).not.toHaveBeenCalled();
            expect(deleteTrackingValuesFromCookieMock).not.toHaveBeenCalled();
        });
    });
});