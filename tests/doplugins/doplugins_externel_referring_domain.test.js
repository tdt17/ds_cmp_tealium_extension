const s = require('../../extensions/doPlugins_global');

describe('External referring domains', () => {

    it('should set event49 if the referring domain is www.google.com', () => {
        const sObject = {
            ...s,
            _referringDomain: 'www.google.com',
        };

        s._setExternalReferringDomainEvents(sObject);
        expect(sObject.events).toMatch('event49');

    });

    it('should set event49 if the referring domain is www.google.de', () => {
        const sObject = {
            ...s,
            _referringDomain: 'www.google.de',
        };

        s._setExternalReferringDomainEvents(sObject);
        expect(sObject.events).toMatch('event49');

    });

    it('should not set event49 if the referring domain is not www.google.com', () => {
        const sObject = {
            ...s,
            _referringDomain: 'www.google.com/',
        };

        s._setExternalReferringDomainEvents(sObject);

        const events = sObject.events || '';
        expect(events).not.toMatch('event49');

    });

    it('should not set event49 if the referring domain is not www.google.de', () => {
        const sObject = {
            ...s,
            _referringDomain: 'www.google.de/',
        };

        s._setExternalReferringDomainEvents(sObject);

        const events = sObject.events || '';
        expect(events).not.toMatch('event49');

    });

    it('should set event49 if the referring domain includes googlequicksearch/', () => {
        const sObject = {
            ...s,
            _referringDomain: 'googlequicksearch/test',
        };

        s._setExternalReferringDomainEvents(sObject);
        expect(sObject.events).toMatch('event49');

    });

    it('should set event48 if the referring domain includes news.google', () => {
        const sObject = {
            ...s,
            _referringDomain: 'news.google/',
        };

        s._setExternalReferringDomainEvents(sObject);
        expect(sObject.events).toMatch('event48');

    });

    it('should set event53 if the referring domain includes instagram.com', () => {
        const sObject = {
            ...s,
            _referringDomain: 'instagram.com/',
        };

        s._setExternalReferringDomainEvents(sObject);
        expect(sObject.events).toMatch('event53');

    });

    it('should set event50 if the referring domain includes youtube.com', () => {
        const sObject = {
            ...s,
            _referringDomain: 'youtube.com/',
        };

        s._setExternalReferringDomainEvents(sObject);
        expect(sObject.events).toMatch('event50');

    });

    it('should set event51 if the referring domain includes twitter.com', () => {
        const sObject = {
            ...s,
            _referringDomain: 'twitter.com/',
        };

        s._setExternalReferringDomainEvents(sObject);
        expect(sObject.events).toMatch('event51');

    });

    it('should set event51 if the referring domain includes android-app://com.twitter.android', () => {
        const sObject = {
            ...s,
            _referringDomain: 'android-app://com.twitter.android/',
        };

        s._setExternalReferringDomainEvents(sObject);
        expect(sObject.events).toMatch('event51');

    });
    it('should set event51 if the referring domain includes t.co', () => {
        const sObject = {
            ...s,
            _referringDomain: 't.co/',
        };

        s._setExternalReferringDomainEvents(sObject);
        expect(sObject.events).toMatch('event51');

    });

    it('should set event52 if the referring domain includes facebook.com', () => {
        const sObject = {
            ...s,
            _referringDomain: 'facebook.com/',
        };

        s._setExternalReferringDomainEvents(sObject);
        expect(sObject.events).toMatch('event52');

    });
});