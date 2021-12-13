const s = require('../../extensions/doPlugins_global');
const {createWindowMock} = require('../mocks/browserMocks');

describe('s.doPlugins()', () => {
    let sObject;
    let setEventsPropertyMock;

    beforeEach(() => {
        sObject = {
            ...s
        };
        // Create a fresh window mock for each test.
        const windowMock = createWindowMock();
        jest.spyOn(global, 'window', 'get')
            .mockImplementation(() => (windowMock));

        setEventsPropertyMock = jest.spyOn(sObject, '_setEventsProperty');

    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should assign values to some eVars', () => {
        sObject.version = 'test';
        window.utag.data.myCW = 'test_cw';

        s._doPluginsGlobal(sObject);

        expect(sObject.eVar63).toBe(sObject.version);
        expect(sObject.eVar184.length).toBeGreaterThanOrEqual(1);
        expect(sObject.eVar181.length).toBeGreaterThanOrEqual(1);
        expect(sObject.eVar185).toBe(window.utag.data.myCW);
    });

    it('should call s._setEventsProperty() function', () => {
        s._doPluginsGlobal(sObject);

        expect(setEventsPropertyMock).toHaveBeenCalled();
    });

});