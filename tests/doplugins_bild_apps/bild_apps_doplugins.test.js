const sObject = require('../../extensions/doPlugins_bild_apps');
const { createWindowMock } = require('../mocks/browserMocks');

describe('s.doPlugins()', () => {
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

    it('should check if the getPercentagePageViewed function is defined in s object', () => {
        expect(s.getPreviousValue).toBeInstanceOf(Function);
    });

    it('should assign values to eVar 181, 184 and 185', () => {
        window.utag.data.myCW = 'test_cw';
        s.version = 'test_version';
        s.visitor = {
            version: 'test_visitor_version'
        };

        jest.spyOn(s, 'getPreviousValue').mockImplementation(jest.fn());
        
        s.doPlugins(s);

        expect(s.expectSupplementalData).toBe(false);
        expect(s.eVar63).toBe(s.version);
        expect(s.eVar64).toBe(s.visitor.version);
        expect(s.eVar184.length).toBeGreaterThanOrEqual(1);
        expect(s.eVar181.length).toBeGreaterThanOrEqual(1);
        expect(s.eVar185).toBe(window.utag.data.myCW);
    });

    it('should call s._bildAppsPageNameObj.setAppsPageName()', () => {
        const setAppsPageNameMock = jest.spyOn(s._bildAppsPageNameObj, 'setAppsPageName');

        jest.spyOn(s, 'getPreviousValue').mockImplementation(jest.fn());

        s.doPlugins(s);

        expect(setAppsPageNameMock).toHaveBeenCalledWith(s);
    });

    it('should call s._orderViaArticle()', () => {
        const orderViaArticleMock = jest.spyOn(s, '_orderViaArticle');

        jest.spyOn(s, 'getPreviousValue').mockImplementation(jest.fn());

        s.doPlugins(s);

        expect(orderViaArticleMock).toHaveBeenCalledWith(s);
    });

    it('should call s._setPageAgeForCheckout()', () => {
        const setPageAgeForCheckoutMock = jest.spyOn(s, '_setPageAgeForCheckout');

        jest.spyOn(s, 'getPreviousValue').mockImplementation(jest.fn());

        s.doPlugins(s);

        expect(setPageAgeForCheckoutMock).toHaveBeenCalled();
    });

    it('should call s._setPageCmsPathWithoutBild()', () => {
        const setPageCmsPathWithoutBildMock = jest.spyOn(s, '_setPageCmsPathWithoutBild');

        jest.spyOn(s, 'getPreviousValue').mockImplementation(jest.fn());

        s.doPlugins(s);

        expect(setPageCmsPathWithoutBildMock).toHaveBeenCalledWith(s);
    });

});