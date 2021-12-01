const doPluginsGlobal = require('../../extensions/doPlugins_global');

describe('External referring domains', () => {

    it('should set event49 if the referring domain is www.google.com', () => {
        const s = {
            ...doPluginsGlobal.s,
            _referringDomain: 'www.google.com',
        };

        s.setExternalReferringDomainEvents(s);
        expect(s.events).toMatch('event49');

    });

    it('should set event49 if the referring domain is www.google.de', () => {
        const s = {
            ...doPluginsGlobal.s,
            _referringDomain: 'www.google.de',
        };

        s.setExternalReferringDomainEvents(s);
        expect(s.events).toMatch('event49');

    });

    it('should not set event49 if the referring domain is not www.google.com', () => {
        const s = {
            ...doPluginsGlobal.s,
            _referringDomain: 'www.google.com/',
        };

        s.setExternalReferringDomainEvents(s);

        const events = s.events || '';
        expect(events).not.toMatch('event49');

    });

    it('should not set event49 if the referring domain is not www.google.de', () => {
        const s = {
            ...doPluginsGlobal.s,
            _referringDomain: 'www.google.de/',
        };

        s.setExternalReferringDomainEvents(s);

        const events = s.events || '';
        expect(events).not.toMatch('event49');

    });

    it('should set event49 if the referring domain includes googlequicksearch/', () => {
        const s = {
            ...doPluginsGlobal.s,
            _referringDomain: 'googlequicksearch/test',
        };

        s.setExternalReferringDomainEvents(s);
        expect(s.events).toMatch('event49');

    });

    it('should set event48 if the referring domain includes news.google', () => {
        const s = {
            ...doPluginsGlobal.s,
            _referringDomain: 'news.google/',
        };

        s.setExternalReferringDomainEvents(s);
        expect(s.events).toMatch('event48');

    });

    it('should set event53 if the referring domain includes instagram.com', () => {
        const s = {
            ...doPluginsGlobal.s,
            _referringDomain: 'instagram.com/',
        };

        s.setExternalReferringDomainEvents(s);
        expect(s.events).toMatch('event53');

    });

    it('should set event50 if the referring domain includes youtube.com', () => {
        const s = {
            ...doPluginsGlobal.s,
            _referringDomain: 'youtube.com/',
        };

        s.setExternalReferringDomainEvents(s);
        expect(s.events).toMatch('event50');

    });

    it('should set event51 if the referring domain includes twitter.com', () => {
        const s = {
            ...doPluginsGlobal.s,
            _referringDomain: 'twitter.com/',
        };

        s.setExternalReferringDomainEvents(s);
        expect(s.events).toMatch('event51');

    });

    it('should set event51 if the referring domain includes android-app://com.twitter.android', () => {
        const s = {
            ...doPluginsGlobal.s,
            _referringDomain: 'android-app://com.twitter.android/',
        };

        s.setExternalReferringDomainEvents(s);
        expect(s.events).toMatch('event51');

    });
    it('should set event51 if the referring domain includes t.co', () => {
        const s = {
            ...doPluginsGlobal.s,
            _referringDomain: 't.co/',
        };

        s.setExternalReferringDomainEvents(s);
        expect(s.events).toMatch('event51');

    });

    it('should set event52 if the referring domain includes facebook.com', () => {
        const s = {
            ...doPluginsGlobal.s,
            _referringDomain: 'facebook.com/',
        };

        s.setExternalReferringDomainEvents(s);
        expect(s.events).toMatch('event52');

    });
});