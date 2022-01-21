const sObject = require('../../extensions/doPlugins_global');
const {createWindowMock} = require('../mocks/browserMocks');

describe('plusDensityObj', () => {
    let s;
    beforeEach(() => {
        // Create a fresh window mock for each test.
        const windowMock = createWindowMock();
        jest.spyOn(global, 'window', 'get')
            .mockImplementation(() => (windowMock));

        s = {
            ...sObject
        };
        window.utag.loader.SC = jest.fn();
        jest.spyOn(s._utils, 'getDocType');
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('saveToCookie()', function () {
        it('should store the source value in utag_main cookie', function () {
            const anySource = 'any-source';
            s._plusDensityObj.saveToCookie(anySource);
            expect(window.utag.loader.SC).toHaveBeenCalledWith('utag_main', {'source': 'any-source;exp-session'});
        });
    });

    describe('deleteFromCookie()', function () {
        it('should delete the source value in utag_main cookie', function () {
            s._plusDensityObj.deleteFromCookie();
            expect(window.utag.loader.SC).toHaveBeenCalledWith('utag_main', {'source': ';exp-session'});
        });
    });

    describe('setDensity(s)', function () {
        let saveToCookieMock;
        let deleteFromCookieMock;

        beforeEach(() => {
            saveToCookieMock = jest.spyOn(s._plusDensityObj, 'saveToCookie').mockImplementation();
            deleteFromCookieMock = jest.spyOn(s._plusDensityObj, 'deleteFromCookie').mockImplementation();
        });

        it('should evaluate the document type by calling s._utils.getDocType()', function () {
            s._plusDensityObj.setDensity(s);
            expect(s._utils.getDocType).toHaveBeenCalled();
        });

        it('should assign source value of data layer to eVar235 on article pages', function () {
            s._utils.getDocType.mockReturnValue('article');
            window.utag.data['qp.source'] = 'any-source';
            s._plusDensityObj.setDensity(s);
            expect(s.eVar235).toEqual(window.utag.data['qp.source']);
        });

        it('should store source in utag_main cookie on article pages', function () {
            s._utils.getDocType.mockReturnValue('article');
            window.utag.data['qp.source'] = 'any-source';
            s._plusDensityObj.setDensity(s);
            expect(saveToCookieMock).toHaveBeenCalledWith(window.utag.data['qp.source']);
        });

        it('should NOT assign a value to eVar235 on NON article pages', function () {
            s._utils.getDocType.mockReturnValue('any-type');
            s._plusDensityObj.setDensity(s);
            expect(s.eVar235).toBeUndefined();
        });

        it('should NOT store source in utag_main cookie on NON article pages', function () {
            s._utils.getDocType.mockReturnValue('any-type');
            window.utag.data['qp.source'] = 'any-source';
            s._plusDensityObj.setDensity(s);
            expect(saveToCookieMock).not.toHaveBeenCalled();
        });

        it('should delete source in utag_main cookie if source is undefined on article pages', function () {
            s._utils.getDocType.mockReturnValue('article');
            window.utag.data['qp.source'] = '';
            s._plusDensityObj.setDensity(s);
            expect(deleteFromCookieMock).toHaveBeenCalledWith();
            expect(s.eVar235).toBeUndefined();
        });


    });


    
});