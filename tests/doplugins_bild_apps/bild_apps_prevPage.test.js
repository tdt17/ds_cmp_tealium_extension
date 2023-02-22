const sObject = require('../../extensions/doPlugins_bild_apps');
const { createWindowMock } = require('../mocks/browserMocks');

describe('_prevPageObj', () => {
    let s;
    beforeEach(() => {
        // Create a fresh window mock for each test.
        const windowMock = createWindowMock();
        jest.spyOn(global, 'window', 'get')
            .mockImplementation(() => (windowMock));

        // Provide a fresh copy of the s-object for each test.
        s = { ...sObject };
        jest.spyOn(s._prevPageObj, 'setPrevPageData').mockImplementation(jest.fn());
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('setPrevPageData', () => {

        afterEach( ()=>{
            s._prevPageObj.isFirstRun = true;
        });

        it('should call previousPage if pageName is defined', () => {
            s.pageName = 'test_pageName';
            const setPrevPage = jest.spyOn(s._prevPageObj, 'setPrevPageData');

            s._prevPageObj.setPrevPageData(s);
            expect(setPrevPage).toHaveBeenCalledWith(s);
            
        });

        it('should run only once', () => {
            s.pageName = 'test_pageName';
            s._prevPage = 'test_prevPage';

            const setData = jest.spyOn(s._prevPageObj, 'setPrevPageData');
            s._prevPageObj.setPrevPageData(s);
            expect(setData).toHaveBeenCalledTimes(1);
        });
        
        it('should call setPrevPageData if pageName is defined', () => {
            s.pageName = 'test_ppvPreviousPage';
            s._prevPageObj.setPrevPageData(s);

            expect(s._prevPage).toBe(s._ppvPreviousPage);
            expect(s.eVar33).toBe(s._ppvPreviousPage);
            expect(s.prop61).toBe(s._ppvPreviousPage);

        });

        
    });

    
});