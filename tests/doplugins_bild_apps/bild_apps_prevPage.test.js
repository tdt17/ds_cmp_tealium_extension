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
        jest.spyOn(s, 'getPreviousValue').mockImplementation(jest.fn());
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('setPrevPageData', () => {

        beforeEach( ()=>{
            s._prevPageObj.isFirstRun = true;
            
        });

        it('should run only once', () => {
            s._prevPage = 'test_prevPage';

            const setData = jest.spyOn(s._prevPageObj, 'setPrevPageData');
            s._prevPageObj.setPrevPageData(s);
            expect(setData).toHaveBeenCalledTimes(1);
        });

        it('should set eVar33, prop61, _prevPage', () => {
            const result = s.getPreviousValue('test_pageName');
            expect(s.eVar33).toBe(result);
            expect(s.prop61).toBe(result);
            expect(s._prevPage).toBe(result);
        });

        it('should return TRUE if prevPage is homepage', function () {
            s._prevPage = 'test__prevPage_20595788';
            const result = s._prevPageObj.isFromHomePageId(s);
            expect(result).toBe(true);
        });

        it('should return FALSE if prevPage is Not homepage', function () {
            s._prevPage = 'test_prevPage';
            const result = s._prevPageObj.isFromHomePageId(s);
            expect(result).toBe(false);
        });

        it('should return TRUE if pageName is article', function () {
            s.pageName = 'test_pageName_article';
            const result = s._prevPageObj.isAtArticlePage(s);
            expect(result).toBe(true);
        });

        it('should return FALSE if pageName is Not article', function () {
            s.pageName = 'test_pageName';
            const result = s._prevPageObj.isAtArticlePage(s);
            expect(result).toBe(false);
        });

        it('should return TRUE if pageName is not Homepage', function () {
            s.pageName = 'test_pageName';
            const result = s._prevPageObj.isNotAtHomePage(s);
            expect(result).toBe(true);
        });

        it('should return FALSE if pageName is Homepage', function () {
            s.pageName = 'test_pageName_20595788';
            const result = s._prevPageObj.isNotAtHomePage(s);
            expect(result).toBe(false);
        });

        it('should set event20 and event22 if isFromHomePageId and isAtArticlePage are true', () => {
            s.pageName = 'test_pageName';
            jest.spyOn(s._prevPageObj, 'getPreviousPageValue').mockImplementation(jest.fn());
            jest.spyOn(s._prevPageObj, 'isFromHomePageId').mockReturnValue(true);
            jest.spyOn(s._prevPageObj, 'isAtArticlePage').mockReturnValue(true);
            const addEventMock = jest.spyOn(s._eventsObj, 'addEvent');

            s._prevPageObj.setPrevPageData(s);

            expect(addEventMock).toHaveBeenCalledWith('event22,event20');
        });

        it('should set event20 isFromHomePageId and isNotAtHomePage are true and isAtArticlePage is false', () => {
            s.pageName = 'test_pageName';
            jest.spyOn(s._prevPageObj, 'getPreviousPageValue').mockImplementation(jest.fn());
            jest.spyOn(s._prevPageObj, 'isFromHomePageId').mockReturnValue(true);
            jest.spyOn(s._prevPageObj, 'isNotAtHomePage').mockReturnValue(true);
            jest.spyOn(s._prevPageObj, 'isAtArticlePage').mockReturnValue(false);
            const addEventMock = jest.spyOn(s._eventsObj, 'addEvent');

            s._prevPageObj.setPrevPageData(s);

            expect(addEventMock).toHaveBeenCalledWith('event20');
        });

        
    });

    
});