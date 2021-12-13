const s = require('../../extensions/doPlugins_global');
const { createWindowMock } = require('../mocks/browserMocks');

describe('setPageSourceInCheckout', () => {
    beforeEach(() => {
        // Create a fresh window mock for each test.
        const windowMock = createWindowMock();
        jest.spyOn(global, 'window', 'get')
            .mockImplementation(() => (windowMock));
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should not set any data if _articleViewType has no value', () => {
        const sObject = {
            ...s,
        };
        window.utag.loader.SC = jest.fn();

        s._setPageSourceForCheckout(sObject);

        expect(sObject.eVar44).toBeUndefined();
        expect(window.utag.loader.SC).not.toHaveBeenCalled();
        expect(window.utag.data['cp.utag_main_articleview']).toBeUndefined();
        expect(window.utag.data['cp.utag_main_pa']).toBeUndefined();

    });

    it('should set relevant data if _articleViewType is defined', () => {
        const sObject = {
            ...s,
            _articleViewType: 'event00',
        };
        window.utag.data.page_datePublication_age = 'test';
        window.utag.loader.SC = jest.fn();

        s._setPageSourceForCheckout(sObject);

        expect(sObject.eVar44).toBe(sObject._articleViewType);
        expect(window.utag.loader.SC).toHaveBeenCalledWith('utag_main', { 'articleview': sObject._articleViewType + ';exp-session' });
        expect(window.utag.data['cp.utag_main_articleview']).toBe(sObject._articleViewType);
        expect(window.utag.loader.SC).toHaveBeenCalledWith('utag_main', { 'pa': window.utag.data.page_datePublication_age + ';exp-session' });
        expect(window.utag.data['cp.utag_main_pa']).toBe(window.utag.data.page_datePublication_age);

    });
});
