const sObject = require('../../extensions/doPlugins_global');

describe('_setTrackingValueEvents (URL Parameter like cid)', () => {
    let s;
    let addEventMock;
    let getTrackingValueMock;
    let isArticlePageMock;

    beforeEach(() => {
        // Provide a fresh copy of the s-object for each test.
        s = {...sObject};
        addEventMock = jest.spyOn(s._eventsObj, 'addEvent').mockImplementation();
        getTrackingValueMock = jest.spyOn(s._articleViewTypeObj, 'getTrackingValue').mockImplementation();
        isArticlePageMock = jest.spyOn(s._utils, 'isArticlePage').mockImplementation().mockReturnValue(true);
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should run only on article pages', function () {
        isArticlePageMock.mockReturnValue(false);

        s._setTrackingValueEvents(s);
        expect(getTrackingValueMock).not.toBeCalled();
    });
    //Upday
    it('should set event204 if the trackingValue equals cid=upday', () => {
        getTrackingValueMock.mockReturnValue('cid=upday');

        s._setTrackingValueEvents(s);
        expect(addEventMock).toHaveBeenCalledWith('event204');
    });
    it('should not set event204 if the trackingValue does not equals upday', () => {
        getTrackingValueMock.mockReturnValue('any-trackingValue');

        s._setTrackingValueEvents(s);
        expect(addEventMock).not.toHaveBeenCalledWith('event204');
    });

    //Outbrain Article
    it('should set event102 if the trackingValue contains kooperation.article.outbrain.', () => {
        getTrackingValueMock.mockReturnValue('kooperation.article.outbrain.');

        s._setTrackingValueEvents(s);
        expect(addEventMock).toHaveBeenCalledWith('event102');

    });
    it('should not set event102 if the trackingValue does not contain kooperation.article.outbrain', () => {
        getTrackingValueMock.mockReturnValue('any-trackingValue');

        s._setTrackingValueEvents(s);
        expect(addEventMock).not.toHaveBeenCalledWith('event102');
    });

    //Outbrain Home
    it('should set event231 if the trackingValue contains kooperation.home.outbrain.', () => {
        getTrackingValueMock.mockReturnValue('kooperation.home.outbrain.');

        s._setTrackingValueEvents(s);
        expect(addEventMock).toHaveBeenCalledWith('event231');
    });
    it('should not set event231 if the trackingValue does not contain kooperation.home.outbrain.', () => {
        getTrackingValueMock.mockReturnValue('any-trackingValue');

        s._setTrackingValueEvents(s);
        expect(addEventMock).not.toHaveBeenCalledWith('event231');
    });
    
    //Telegram
    it('should set event225 if the trackingValue contains .telegram.', () => {
        getTrackingValueMock.mockReturnValue('.telegram.');

        s._setTrackingValueEvents(s);
        expect(addEventMock).toHaveBeenCalledWith('event225');
    });
    it('should not set event225 if the trackingValue does not contain .telegram.', () => {
        getTrackingValueMock.mockReturnValue('any-trackingValue');

        s._setTrackingValueEvents(s);
        expect(addEventMock).not.toHaveBeenCalledWith('event225');
    });

    //Instagram
    it('should set event53 if the trackingValue contains .instagram.', () => {
        getTrackingValueMock.mockReturnValue('.instagram.');

        s._setTrackingValueEvents(s);
        expect(addEventMock).toHaveBeenCalledWith('event53');
    });
    it('should not set event53 if the trackingValue does not contain .instagram.', () => {
        getTrackingValueMock.mockReturnValue('any-trackingValue');

        s._setTrackingValueEvents(s);
        expect(addEventMock).not.toHaveBeenCalledWith('event53');
    });   
 
});