const s = require('../../extensions/doPlugins_global');
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
        const sObject = {
            ...s,
            linkName: 'Kameleoon Tracking',
        };

        s._setKameleoonTracking(sObject);

        expect(processOmnitureMock).toHaveBeenCalled();
        expect(window.kameleoonOmnitureCallSent).toBe(true);
    });

    it('should not set kameleoon tracking if s.linkName is not Kameleoon Tracking', () => {
        const sObject = {
            ...s,
        };

        s._setKameleoonTracking(sObject);

        expect(processOmnitureMock).not.toHaveBeenCalled();
        expect(window.kameleoonOmnitureCallSent).toBeUndefined();
    });
});
