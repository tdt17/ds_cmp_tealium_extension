const { setExternalReferringDomainEvents } = require('../extensions/doPlugins_global');
const s = require('../extensions/doPlugins_global');

describe('Adobe Plugins', () => {
    it('should check if the getPercentagePageViewed function is defined in s object', () => {
        expect(s.getPercentPageViewed).toBeInstanceOf(Function);
    });

    it('should check if the handlePPVevents function is defined in s object', () => {
        expect(s.handlePPVevents).toBeInstanceOf(Function);
    });

    it('should check if the p_fo function is defined in s object', () => {
        expect(s.p_fo).toBeInstanceOf(Function);
    });

    it('should check if the apl function is defined in s object', () => {
        expect(s.apl).toBeInstanceOf(Function);
    });

    it('should check if the getValOnce function is defined in s object', () => {
        expect(s.getValOnce).toBeInstanceOf(Function);
    });

    it('should check if the split function is defined in s object', () => {
        expect(s.split).toBeInstanceOf(Function);
    });
});

describe('External referring domains', () => {
    it('should check if the setExternalReferring domains function is defined in the s object', () => {
        expect(s.setExternalReferringDomainEvents).toBeInstanceOf(Function);
    });

    it('should set correct event if the referring domain is google (google.com)', () => {
        const _s = {
            ...s,
            _referringDomain: 'google.com',
        }

        _s.setExternalReferringDomainEvents(_s);
        expect(_s.events).toMatch('event49')

    });

    it('should set correct event if the referring domain is google (googlequicksearch)', () => {
        const _s = {
            ...s,
            _referringDomain: 'googlequicksearch/',
        }

        _s.setExternalReferringDomainEvents(_s);
        expect(_s.events).toMatch('event49')

    });

    it('should set correct event if the referring domain is google news', () => {
        const _s = {
            ...s,
            _referringDomain: 'news.google',
        }

        _s.setExternalReferringDomainEvents(_s);
        expect(_s.events).toMatch('event48')

    });

    it('should set correct event if the referring domain is instagram', () => {
        const _s = {
            ...s,
            _referringDomain: 'instagram.com',
        }

        _s.setExternalReferringDomainEvents(_s);
        expect(_s.events).toMatch('event53')

    });

    it('should set correct event if the referring domain is youtube', () => {
        const _s = {
            ...s,
            _referringDomain: 'youtube.com',
        }

        _s.setExternalReferringDomainEvents(_s);
        expect(_s.events).toMatch('event50')

    });

    it('should set correct event if the referring domain is twitter (twitter.com)', () => {
        const _s = {
            ...s,
            _referringDomain: 'twitter.com',
        }

        _s.setExternalReferringDomainEvents(_s);
        expect(_s.events).toMatch('event51')

    });

    it('should set correct event if the referring domain is twitter (android-app://com.twitter.android)', () => {
        const _s = {
            ...s,
            _referringDomain: 'android-app://com.twitter.android',
        }

        _s.setExternalReferringDomainEvents(_s);
        expect(_s.events).toMatch('event51')

    });
    it('should set correct event if the referring domain is twitter (t.co)', () => {
        const _s = {
            ...s,
            _referringDomain: 't.co',
        }

        _s.setExternalReferringDomainEvents(_s);
        expect(_s.events).toMatch('event51')

    });

    it('should set correct event if the referring domain is facebook', () => {
        const _s = {
            ...s,
            _referringDomain: 'facebook.com',
        }

        _s.setExternalReferringDomainEvents(_s);
        expect(_s.events).toMatch('event52')

    });
});
