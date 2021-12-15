const sObject = require('../../extensions/doPlugins_global');
const { createWindowMock } = require('../mocks/browserMocks');

describe('setPageSourceInCheckout', () => {
    let s;
    beforeEach(() => {
        // Create a fresh window mock for each test.
        const windowMock = createWindowMock();
        jest.spyOn(global, 'window', 'get')
            .mockImplementation(() => (windowMock));

        // Provide a fresh copy of the s-object for each test.
        s = {...sObject};
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should not set any data if _articleViewType has no value', () => {
        window.utag.loader.SC = jest.fn();

        s._setPageSourceForCheckout(s);

        expect(s.eVar44).toBeUndefined();
        expect(window.utag.loader.SC).not.toHaveBeenCalled();
        expect(window.utag.data['cp.utag_main_articleview']).toBeUndefined();
        expect(window.utag.data['cp.utag_main_pa']).toBeUndefined();

    });

    it('should set relevant data if _articleViewType is defined', () => {
        s._articleViewType = 'event00';
        window.utag.data.page_datePublication_age = 'test';
        window.utag.loader.SC = jest.fn();

        s._setPageSourceForCheckout(s);

        expect(s.eVar44).toBe(s._articleViewType);
        expect(window.utag.loader.SC).toHaveBeenCalledWith('utag_main', { 'articleview': s._articleViewType + ';exp-session' });
        expect(window.utag.data['cp.utag_main_articleview']).toBe(s._articleViewType);
        expect(window.utag.loader.SC).toHaveBeenCalledWith('utag_main', { 'pa': window.utag.data.page_datePublication_age + ';exp-session' });
        expect(window.utag.data['cp.utag_main_pa']).toBe(window.utag.data.page_datePublication_age);

    });
});
