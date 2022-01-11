const sObject = require('../../extensions/doPlugins_global');
const { createWindowMock } = require('../mocks/browserMocks');

describe('_setAmpPlatform', () => {
    let s;
    beforeEach(() => {
        // Create a fresh window mock for each test.
        const windowMock = createWindowMock();
        jest.spyOn(global, 'window', 'get').mockImplementation(() => (windowMock));
        window.utag.loader.SC = jest.fn();

        // Provide a fresh copy of the s-object for each test.
        s = { ...sObject };

    });
    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should set right data if dom.referrer contains .ampproject.', () => {
        window.utag.data['dom.referrer'] = 'test.ampproject.';

        s._setAmpPlatform(s);

        expect(window.utag.data.page_platform).toBe('amp');
        expect(s.eVar2).toBe('amp');
        expect(s.prop2).toBe('amp');
        expect(window.utag.loader.SC).toHaveBeenCalledWith('utag_main', { 'page_platform': 'amp' + ';exp-session' });
        expect(window.utag.loader.SC).toHaveBeenCalledWith('utag_main', { 'articleview': 'event24' + ';exp-session' });
    });

    it('should set right data if dom.query_string contains atrid=amp.article.plus.button.paywall.testen', () => {
        window.utag.data['dom.query_string'] = 'test.atrid=amp.article.plus.button.paywall.testen';

        s._setAmpPlatform(s);

        expect(window.utag.data.page_platform).toBe('amp');
        expect(s.eVar2).toBe('amp');
        expect(s.prop2).toBe('amp');
        expect(window.utag.loader.SC).toHaveBeenCalledWith('utag_main', { 'page_platform': 'amp' + ';exp-session' });
        expect(window.utag.loader.SC).toHaveBeenCalledWith('utag_main', { 'articleview': 'event24' + ';exp-session' });
    });

    it('should not set amp data if dom.referrer and dom.query_string do not contain the required data', () => {
        
        s._setAmpPlatform(s);

        expect(window.utag.data.page_platform).toBeUndefined();
        expect(s.eVar2).toBeUndefined();
        expect(s.prop2).toBeUndefined();
        expect(window.utag.loader.SC).not.toHaveBeenCalled();
        expect(window.utag.loader.SC).not.toHaveBeenCalled();
    });
});
