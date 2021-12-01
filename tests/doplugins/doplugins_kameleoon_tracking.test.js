const doPluginsGlobal = require('../../extensions/doPlugins_global');
const {createWindowMock} = require('../mocks/browserMocks');

describe('setKameleoonTracking', () => {
    let processOmnitureMock;
    beforeEach(() => {
        // Create a fresh window mock for each test.
        const windowMock = createWindowMock();
        processOmnitureMock = jest.fn();
        windowMock.Kameleoon = {
            API: {
                Tracking: {
                    processOmniture: processOmnitureMock,
                },
            },
        };
        jest.spyOn(global, 'window', 'get').mockImplementation(() => (windowMock));
    });
    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should call kameleoon process omniture if s.linkName is Kameleoon Tracking and window.Kameleoon exists', () => {
        const s = {
            ...doPluginsGlobal.s,
            linkName: 'Kameleoon Tracking',
        };

        doPluginsGlobal.setKameleoonTracking(s);

        expect(processOmnitureMock).toHaveBeenCalled();
        expect(window.kameleoonOmnitureCallSent).toBe(true);
    });

    it('should not set kameleoon tracking if s.linkName is not Kameleoon Tracking', () => {
        const s = {
            ...doPluginsGlobal.s,
        };

        doPluginsGlobal.setKameleoonTracking(s);

        expect(processOmnitureMock).not.toHaveBeenCalled();
        expect(window.kameleoonOmnitureCallSent).toBeUndefined();
    });
});
