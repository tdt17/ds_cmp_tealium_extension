const { createWindowMock } = require('../mocks/browserMocks');
const sObject = require('../../extensions/doPlugins_global');

describe('_setTeaserTrackingEvars', () => {
    let s;
    beforeEach(() => {
        // Create a fresh window mock for each test.
        const windowMock = createWindowMock();
        jest.spyOn(global, 'window', 'get')
            .mockImplementation(() => (windowMock));

        // Provide a fresh copy of the s-object for each test.
        s = { ...sObject };
    });

    afterEach(() => {
        jest.restoreAllMocks();
        sessionStorage.removeItem('home_teaser_info');
    });

    it('should set eVar66 and eVar92 if session storage contains home_teaser_info, page type is article or video and _ppvPreviousPage contains home', () => {
        sessionStorage.setItem('home_teaser_info', 'test_home_teaser_info');
        window.utag.data.page_type = 'article';
        s._ppvPreviousPage = 'home';
        s.eVar1 = 'test';

        s._setTeaserTrackingEvars(s);

        expect(s.eVar66).toBe('test_home_teaser_info');
        expect(s.eVar92).toBe('test_home_teaser_info' + '|' + s.eVar1);
    });

    it('should not set eVar66 and eVar92 if session storage does not contain home_teaser_info, page type is not article or video or _ppvPreviousPage does not contain home', () => {
        s._setTeaserTrackingEvars(s);

        expect(s.eVar66).toBeUndefined();
        expect(s.eVar92).toBeUndefined();
    });

    
    it('should set eVar77 if home_teaser_info is present in sessionStorage', () => {
        sessionStorage.setItem('home_teaser_info', 'test_home_teaser_info');

        s._setTeaserTrackingEvars(s);

        expect(s.eVar77).toBe('test_home_teaser_info');
    });

    it('should not set eVar77 if home_teaser_info is not present in sessionStorage', () => {
        s._setTeaserTrackingEvars(s);

        expect(s.eVar77).toBeUndefined();
    });
    
});