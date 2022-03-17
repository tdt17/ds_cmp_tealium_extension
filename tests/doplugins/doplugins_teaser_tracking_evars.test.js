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

    it('clicks at Teaser at BILD HOMEPAGE should set home_teaser_info and teaser_block in utag_main Cookie. Then eVars66/92/92 are set for the following Page View of all article types and event22', () => {

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

    it('home_teaser_info and teaser_block are only set with event22 at all article types ', () => {
        s._setTeaserTrackingEvars(s);

        expect(s.eVar66).toBeUndefined();
        expect(s.eVar92).toBeUndefined();
    });
});