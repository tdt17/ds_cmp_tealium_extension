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
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('setPrevPageData', () => {

        beforeEach( ()=>{
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
            s._ppvPreviousPage = 'test_prevPage';

            const setData = jest.spyOn(s._prevPageObj, 'setPrevPageData');
            s._prevPageObj.setPrevPageData(s);
            expect(setData).toHaveBeenCalledTimes(1);
        });
        
        it('should call setPrevPageData if pageName is defined', () => {
            s.pageName = 'test_ppvPreviousPage';
            s._prevPageObj.setPrevPageData(s);

            expect(s.eVar33).toBe(s._ppvPreviousPage);
            expect(s.prop61).toBe(s._ppvPreviousPage);

        });

        it('should set event20 and event22 if isFromHomePageId and isAtArticlePage are true', () => {
            jest.spyOn(s._prevPageObj, 'getPreviousPageValue').mockImplementation(jest.fn());
            jest.spyOn(s._prevPageObj, 'isFromHomePageId').mockReturnValue(true);
            jest.spyOn(s._prevPageObj, 'isAtArticlePage').mockReturnValue(true);
            const addEventMock = jest.spyOn(s._eventsObj, 'addEvent');

            s._prevPageObj.setPrevPageData(s);

            expect(addEventMock).toHaveBeenCalledWith('event22,event20');
        });

        
    });

    
});