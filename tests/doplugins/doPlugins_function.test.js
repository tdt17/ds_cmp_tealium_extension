const sObject = require('../../extensions/doPlugins_global');
const {createWindowMock} = require('../mocks/browserMocks');

describe('s.doPlugins()', () => {
    let s;
    let setEventsPropertyMock;
    let setScrollDepthPropertiesMock;
    let firstPageViewMock;
    let setTeaserTrackingEvarsMock;

    beforeEach(() => {
        // Create a fresh window mock for each test.
        const windowMock = createWindowMock();
        jest.spyOn(global, 'window', 'get')
            .mockImplementation(() => (windowMock));

        // Provide a fresh copy of the s-object for each test.
        s = {...sObject};
        setEventsPropertyMock = jest.spyOn(s._eventsObj, 'setEventsProperty');
        setScrollDepthPropertiesMock = jest.spyOn(s._scrollDepthObj, 'setScrollDepthProperties');
        firstPageViewMock = jest.spyOn(s._utils, 'isFirstPageView').mockImplementation().mockReturnValue(false);
        setTeaserTrackingEvarsMock = jest.spyOn(s, '_setTeaserTrackingEvars').mockImplementation();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should assign values to some eVars', () => {
        s.version = 'test';
        s.visitor = {version: 'test'};

        window.utag.data.myCW = 'test_cw';

        s._doPluginsGlobal(s);

        expect(s.eVar63).toBe(s.version);
        expect(s.eVar64).toBe(s.visitor.version);
        expect(s.eVar184.length).toBeGreaterThanOrEqual(1);
        expect(s.eVar181.length).toBeGreaterThanOrEqual(1);
        expect(s.eVar185).toBe(window.utag.data.myCW);
    });

    it('should call s._setEventsProperty() function', () => {
        s._doPluginsGlobal(s);

        expect(setEventsPropertyMock).toHaveBeenCalled();
    });

    it('should call s._scrollDepthObj.setScrollDepthProperties(s)', () => {
        s._doPluginsGlobal(s);

        expect(setScrollDepthPropertiesMock).toHaveBeenCalled();
    });

    it('should NOT call s._scrollDepthObj.setScrollDepthProperties(s) if it is first-page-view context (before consent)', () => {
        firstPageViewMock.mockReturnValue(true);
        s._doPluginsGlobal(s);

        expect(setScrollDepthPropertiesMock).not.toHaveBeenCalled();
    });

    it('should call s._setTeaserTrackingEvars(s)', () => {
        s._doPluginsGlobal(s);
        expect(setTeaserTrackingEvarsMock).toHaveBeenCalledWith(s);
    });

    it('should NOT call s._setTeaserTrackingEvars(s) if it is first-page-view context (before consent)', () => {
        firstPageViewMock.mockReturnValue(true);
        s._doPluginsGlobal(s);
        expect(setTeaserTrackingEvarsMock).not.toHaveBeenCalledWith(s);
    });

});