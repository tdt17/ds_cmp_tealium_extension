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

describe('External referring domains', () => {

    it('should set correct event if the referring domain is google (google.com)', () => {
        const s = {
            ...doPluginsGlobal.s,
            _referringDomain: 'google.com',
        }

        s.setExternalReferringDomainEvents(s);
        expect(s.events).toMatch('event49')

    });

    it('should set correct event if the referring domain is google (googlequicksearch)', () => {
        const s = {
            ...doPluginsGlobal.s,
            _referringDomain: 'googlequicksearch/',
        }

        s.setExternalReferringDomainEvents(s);
        expect(s.events).toMatch('event49')

    });

    it('should set correct event if the referring domain is google news', () => {
        const s = {
            ...doPluginsGlobal.s,
            _referringDomain: 'news.google',
        }

        s.setExternalReferringDomainEvents(s);
        expect(s.events).toMatch('event48')

    });

    it('should set correct event if the referring domain is instagram', () => {
        const s = {
            ...doPluginsGlobal.s,
            _referringDomain: 'instagram.com',
        }

        s.setExternalReferringDomainEvents(s);
        expect(s.events).toMatch('event53')

    });

    it('should set correct event if the referring domain is youtube', () => {
        const s = {
            ...doPluginsGlobal.s,
            _referringDomain: 'youtube.com',
        }

        s.setExternalReferringDomainEvents(s);
        expect(s.events).toMatch('event50')

    });

    it('should set correct event if the referring domain is twitter (twitter.com)', () => {
        const s = {
            ...doPluginsGlobal.s,
            _referringDomain: 'twitter.com',
        }

        s.setExternalReferringDomainEvents(s);
        expect(s.events).toMatch('event51')

    });

    it('should set correct event if the referring domain is twitter (android-app://com.twitter.android)', () => {
        const s = {
            ...doPluginsGlobal.s,
            _referringDomain: 'android-app://com.twitter.android',
        }

        s.setExternalReferringDomainEvents(s);
        expect(s.events).toMatch('event51')

    });
    it('should set correct event if the referring domain is twitter (t.co)', () => {
        const s = {
            ...doPluginsGlobal.s,
            _referringDomain: 't.co',
        }

        s.setExternalReferringDomainEvents(s);
        expect(s.events).toMatch('event51')

    });

    it('should set correct event if the referring domain is facebook', () => {
        const s = {
            ...doPluginsGlobal.s,
            _referringDomain: 'facebook.com',
        }

        s.setExternalReferringDomainEvents(s);
        expect(s.events).toMatch('event52')

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
        delete doPluginsGlobal.s.eVar94;
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
        doPluginsGlobal.s = {};
        doPluginsGlobal.init();
        expect(doPluginsGlobal.s.eVar94).toBeUndefined();
    });
});
