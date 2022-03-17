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

    });

    it('should set eVar66, eVar92 and eVar97 if utag_main cookie contains home_teaser_info, page type is article or video and _ppvPreviousPage contains home', () => {

        window.utag.data['cp.utag_main_hti'] = 'test_home_teaser_info';
        window.utag.data['cp.utag_main_tb'] = 'test_teaser_block';
        window.utag.data.page_type = 'article';
        s._ppvPreviousPage = 'home';
        s.eVar1 = 'test';

        s._setTeaserTrackingEvars(s);

        expect(s.eVar66).toBe('test_home_teaser_info');
        expect(s.eVar92).toBe('test_home_teaser_info' + '|' + s.eVar1);
        expect(s.eVar97).toBe('test_teaser_block');

    });

    it('should not set eVar66 and eVar92 if  utag_main cookie does not contain home_teaser_info, page type is not article or video or _ppvPreviousPage does not contain home', () => {
        s._setTeaserTrackingEvars(s);

        expect(s.eVar66).toBeUndefined();
        expect(s.eVar92).toBeUndefined();
    });
});