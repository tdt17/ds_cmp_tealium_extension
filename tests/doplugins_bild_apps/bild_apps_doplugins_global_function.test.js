const sObject = require('../../extensions/doPlugins_bild_apps');
const { createWindowMock } = require('../mocks/browserMocks');

describe('s._bildAppsDoPluginsGlobal()', () => {
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

        s._bildAppsDoPluginsGlobal(s);

        expect(s.eVar184.length).toBeGreaterThanOrEqual(1);
        expect(s.eVar181.length).toBeGreaterThanOrEqual(1);
        expect(s.eVar185).toBe(window.utag.data.myCW);
    });

    it('should call s._orderViaArticle()', () => {
        const orderViaArticleMock = jest.spyOn(s, '_orderViaArticle');

        s._bildAppsDoPluginsGlobal(s);

        expect(orderViaArticleMock).toHaveBeenCalledWith(s);
    });

});