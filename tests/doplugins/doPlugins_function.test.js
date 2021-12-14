const s = require('../../extensions/doPlugins_global');
const {createWindowMock} = require('../mocks/browserMocks');

describe('s.doPlugins()', () => {
    beforeEach(() => {
        // Create a fresh window mock for each test.
        const windowMock = createWindowMock();
        jest.spyOn(global, 'window', 'get')
            .mockImplementation(() => (windowMock));

    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should set the configurations inside the s.doPlugins function', () => {
        const sObject = {
            ...s,
            version: 'test',
        };
        window.utag.data.myCW = 'test_cw';

        s._doPluginsGlobal(sObject);

        expect(sObject.eVar63).toBe(sObject.version);
        expect(sObject.eVar184.length).toBeGreaterThanOrEqual(1);
        expect(sObject.eVar181.length).toBeGreaterThanOrEqual(1);
        expect(sObject.eVar185).toBe(window.utag.data.myCW);
    });

});