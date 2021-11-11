const doPluginsGlobal = require('../extensions/doPlugins_global');

function createWindowMock() {
    return {
        document: {
            referrer: ''
        },
        navigator: {
            userAgent: ''
        },
        screen: {
            width: '',
            height: ''
        }
    };
}

describe('Adobe Plugins', () => {
    it('should check if the getPercentagePageViewed function is defined in s object', () => {
        expect(doPluginsGlobal.s.getPercentPageViewed).toBeInstanceOf(Function);
    });

    it('should check if the handlePPVevents function is defined in s object', () => {
        expect(doPluginsGlobal.s.handlePPVevents).toBeInstanceOf(Function);
    });

    it('should check if the p_fo function is defined in s object', () => {
        expect(doPluginsGlobal.s.p_fo).toBeInstanceOf(Function);
    });

    it('should check if the apl function is defined in s object', () => {
        expect(doPluginsGlobal.s.apl).toBeInstanceOf(Function);
    });

    it('should check if the getValOnce function is defined in s object', () => {
        expect(doPluginsGlobal.s.getValOnce).toBeInstanceOf(Function);
    });

    it('should check if the split function is defined in s object', () => {
        expect(doPluginsGlobal.s.split).toBeInstanceOf(Function);
    });
});



describe('init()', () => {

    beforeEach(() => {
        // Create a fresh window mock for each test.
        const windowMock = createWindowMock();
        jest.spyOn(global, 'window', 'get')
            .mockImplementation(() => (windowMock));
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should set global configuration properties of the Adobe s-object', () => {
        doPluginsGlobal.init();

        expect(doPluginsGlobal.s.currencyCode).toBe('EUR');
        expect(doPluginsGlobal.s.execdoplugins).toBe(0);
        expect(doPluginsGlobal.s.expectSupplementalData).toBe(false);
        expect(doPluginsGlobal.s.myChannels).toBe(0);
        expect(doPluginsGlobal.s.usePlugins).toBe(true);
    });

    it('should set eVar94 to the iPhone screen size', () => {
        const anyScreenSize = 111;
        window.screen.width = window.screen.height = anyScreenSize;
        window.navigator.userAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148';

        doPluginsGlobal.init();

        expect(doPluginsGlobal.s.eVar94).toBe(`${anyScreenSize}x${anyScreenSize}`);
    });

    it('should NOT set eVar94 when not viewed on iPhones', () => {
        doPluginsGlobal.init();
        expect(doPluginsGlobal.s.eVar94).toBeUndefined();
    });
});