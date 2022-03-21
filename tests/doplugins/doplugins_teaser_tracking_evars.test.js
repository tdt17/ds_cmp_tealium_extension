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

    it('should set a campaign value to certain eVars if a user has opened an article through a homepage teaser', () => {

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

    it('should not set campaign values on non article pages', () => {
        s._setTeaserTrackingEvars(s);

        expect(s.eVar66).toBeUndefined();
        expect(s.eVar92).toBeUndefined();
        expect(s.eVar97).toBeUndefined();        
    });
});