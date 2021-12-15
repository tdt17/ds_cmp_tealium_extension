const sObject = require('../../extensions/doPlugins_global');

describe('External referring domains', () => {
    let s;
    beforeEach(() => {
        // Provide a fresh copy of the s-object for each test.
        s = {...sObject};
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });
    it('should set event49 if the referring domain is www.google.com', () => {
        s._referringDomain = 'www.google.com';

        s._setExternalReferringDomainEvents(s);
        expect(s.events).toMatch('event49');

    });

    it('should set event49 if the referring domain is www.google.de', () => {
        s._referringDomain = 'www.google.com';

        s._setExternalReferringDomainEvents(s);
        expect(s.events).toMatch('event49');

    });

    it('should not set event49 if the referring domain is not www.google.com', () => {
        s._referringDomain = 'www.google.com/';

        s._setExternalReferringDomainEvents(s);

        const events = s.events || '';
        expect(events).not.toMatch('event49');

    });

    it('should not set event49 if the referring domain is not www.google.de', () => {
        s._referringDomain = 'www.google.de/';

        s._setExternalReferringDomainEvents(s);

        const events = s.events || '';
        expect(events).not.toMatch('event49');

    });

    it('should set event49 if the referring domain includes googlequicksearch/', () => {
        s._referringDomain = 'googlequicksearch/test';

        s._setExternalReferringDomainEvents(s);
        expect(s.events).toMatch('event49');

    });

    it('should set event48 if the referring domain includes news.google', () => {
        s._referringDomain = 'news.google/';

        s._setExternalReferringDomainEvents(s);
        expect(s.events).toMatch('event48');

    });

    it('should set event53 if the referring domain includes instagram.com', () => {
        s._referringDomain = 'instagram.com/';

        s._setExternalReferringDomainEvents(s);
        expect(s.events).toMatch('event53');

    });

    it('should set event50 if the referring domain includes youtube.com', () => {
        s._referringDomain = 'youtube.com/';

        s._setExternalReferringDomainEvents(s);
        expect(s.events).toMatch('event50');

    });

    it('should set event51 if the referring domain includes twitter.com', () => {
        s._referringDomain = 'twitter.com/';

        s._setExternalReferringDomainEvents(s);
        expect(s.events).toMatch('event51');

    });

    it('should set event51 if the referring domain includes android-app://com.twitter.android', () => {
        s._referringDomain = 'android-app://com.twitter.android/';

        s._setExternalReferringDomainEvents(s);
        expect(s.events).toMatch('event51');

    });
    it('should set event51 if the referring domain includes t.co', () => {
        s._referringDomain = 't.co/';

        s._setExternalReferringDomainEvents(s);
        expect(s.events).toMatch('event51');

    });

    it('should set event52 if the referring domain includes facebook.com', () => {
        s._referringDomain = 'facebook.com/';

        s._setExternalReferringDomainEvents(s);
        expect(s.events).toMatch('event52');

    });
});