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

    it('should assign values to eVar 181, 184 and 185', () => {
        window.utag.data.myCW = 'test_cw';
        s.version = 'test_version';
        s.visitor = {
            version: 'test_visitor_version'
        };
        
        s.doPlugins(s);

        expect(s.expectSupplementalData).toBe(false);
        expect(s.eVar63).toBe(s.version);
        expect(s.eVar64).toBe(s.visitor.version);
        expect(s.eVar184.length).toBeGreaterThanOrEqual(1);
        expect(s.eVar181.length).toBeGreaterThanOrEqual(1);
        expect(s.eVar185).toBe(window.utag.data.myCW);
    });

    it('should call s._orderViaArticle()', () => {
        const orderViaArticleMock = jest.spyOn(s, '_orderViaArticle');

        s.doPlugins(s);

        expect(orderViaArticleMock).toHaveBeenCalledWith(s);
    });

});