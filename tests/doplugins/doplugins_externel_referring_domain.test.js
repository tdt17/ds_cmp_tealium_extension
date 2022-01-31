const sObject = require('../../extensions/doPlugins_global');

describe('External referring domains', () => {
    let s;
    let addEventMock;
    let getReferringDomainMock;
    let getReferrerMock;

    beforeEach(() => {
        // Provide a fresh copy of the s-object for each test.
        s = {...sObject};
        addEventMock = jest.spyOn(s._eventsObj, 'addEvent').mockImplementation();
        getReferringDomainMock = jest.spyOn(s._utils, 'getReferringDomain').mockImplementation();
        getReferrerMock = jest.spyOn(s._utils, 'getReferrer').mockImplementation();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });
    it('should set event49 if the referring domain is www.google.com', () => {
        getReferringDomainMock.mockReturnValue('www.google.com');

        s._setExternalReferringDomainEvents(s);
        expect(addEventMock).toHaveBeenCalledWith('event49');

    });

    it('should set event49 if the referring domain is www.google.de', () => {
        getReferringDomainMock.mockReturnValue('www.google.com');

        s._setExternalReferringDomainEvents(s);
        expect(addEventMock).toHaveBeenCalledWith('event49');
    });

    it('should not set event49 if the referring domain is not www.google.com', () => {
        getReferringDomainMock.mockReturnValue('www.google.com/');

        s._setExternalReferringDomainEvents(s);

        expect(addEventMock).not.toHaveBeenCalledWith('event49');
    });

    it('should not set event49 if the referring domain is not www.google.de', () => {
        getReferringDomainMock.mockReturnValue('www.google.de/');

        s._setExternalReferringDomainEvents(s);

        expect(addEventMock).not.toHaveBeenCalledWith('event49');
    });

    it('should set event49 if the referring domain includes googlequicksearch/', () => {
        getReferrerMock.mockReturnValue('googlequicksearch/test');

        s._setExternalReferringDomainEvents(s);
        expect(addEventMock).toHaveBeenCalledWith('event49');
    });

    it('should set event48 if the referring domain includes news.google', () => {
        getReferrerMock.mockReturnValue('news.google/');

        s._setExternalReferringDomainEvents(s);
        expect(addEventMock).toHaveBeenCalledWith('event48');
    });

    it('should set event53 if the referring domain includes instagram.com', () => {
        getReferrerMock.mockReturnValue('instagram.com/');

        s._setExternalReferringDomainEvents(s);
        expect(addEventMock).toHaveBeenCalledWith('event53');
    });

    it('should set event50 if the referring domain includes youtube.com', () => {
        getReferrerMock.mockReturnValue('youtube.com/');

        s._setExternalReferringDomainEvents(s);
        expect(addEventMock).toHaveBeenCalledWith('event50');
    });

    it('should set event51 if the referring domain includes twitter.com', () => {
        getReferrerMock.mockReturnValue('twitter.com/');

        s._setExternalReferringDomainEvents(s);
        expect(addEventMock).toHaveBeenCalledWith('event51');
    });

    it('should set event51 if the referring domain includes android-app://com.twitter.android', () => {
        getReferrerMock.mockReturnValue('android-app://com.twitter.android/');

        s._setExternalReferringDomainEvents(s);
        expect(addEventMock).toHaveBeenCalledWith('event51');
    });

    it('should set event51 if the referring domain includes t.co', () => {
        getReferrerMock.mockReturnValue('t.co/');

        s._setExternalReferringDomainEvents(s);
        expect(addEventMock).toHaveBeenCalledWith('event51');
    });

    it('should set event52 if the referring domain includes facebook.com', () => {
        getReferrerMock.mockReturnValue('facebook.com/');

        s._setExternalReferringDomainEvents(s);
        expect(addEventMock).toHaveBeenCalledWith('event52');
    });
});