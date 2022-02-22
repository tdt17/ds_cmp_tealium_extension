const sObject = require('../../extensions/doPlugins_bild_apps');
const { createWindowMock } = require('../mocks/browserMocks');

describe('s._setPageCmsPathWithoutBild()', () => {
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

    it('should set page cms path without bild if it contains /BILD/ for bild app android', () => {
        window.utag.data['ut.profile'] = 'bild-app.android';
        window.utag.data.page_cms_path = 'test/page_cms/BILD/';

        s._setPageCmsPathWithoutBild(s);

        expect(window.utag.data.page_cms_path).toBe('test/page_cms');
        expect(s.eVar4).toBe('test/page_cms');
        expect(s.prop4).toBe('test/page_cms');
    });

    it('should set page cms path without bild if it contains /BILD/ for bild app iphone', () => {
        window.utag.data['ut.profile'] = 'bild-app.iphone';
        window.utag.data.page_cms_path = 'test/page_cms/BILD/';

        s._setPageCmsPathWithoutBild(s);

        expect(window.utag.data.page_cms_path).toBe('test/page_cms');
        expect(s.eVar4).toBe('test/page_cms');
        expect(s.prop4).toBe('test/page_cms');
    });

    it('should set page cms path without bild if it contains /BILD/ for bild app ipad', () => {
        window.utag.data['ut.profile'] = 'bild-app.ipad';
        window.utag.data.page_cms_path = 'test/page_cms/BILD/';

        s._setPageCmsPathWithoutBild(s);

        expect(window.utag.data.page_cms_path).toBe('test/page_cms');
        expect(s.eVar4).toBe('test/page_cms');
        expect(s.prop4).toBe('test/page_cms');
    });

    it('should not set page cms path without bild if app is not bild app android, iphone or ipad', () => {
        window.utag.data['ut.profile'] = 'bild-sport.app.android';
        window.utag.data.page_cms_path = 'test/page_cms/BILD/';

        s._setPageCmsPathWithoutBild(s);

        expect(window.utag.data.page_cms_path).toBe('test/page_cms/BILD/');
        expect(s.eVar4).toBeUndefined();
        expect(s.prop4).toBeUndefined();
    });

    it('should not set any data if page cms path does not contain /BILD/', () => {
        window.utag.data['ut.profile'] = 'bild-app.iphone';
        window.utag.data.page_cms_path = 'test/page_cms/';

        s._setPageCmsPathWithoutBild(s);

        expect(window.utag.data.page_cms_path).toBe('test/page_cms/');
        expect(s.eVar4).toBeUndefined();
        expect(s.prop4).toBeUndefined();
    });

});