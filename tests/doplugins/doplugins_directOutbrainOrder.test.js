const sObject = require('../../extensions/doPlugins_global');
const {createWindowMock} = require('../mocks/browserMocks');

describe('directOutbrainOrderObj', () => {
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
        it('should store the adobe campaign value of article recommendations in utag_main cookie', function () {
            const anyOtb = 'any-otb';
            s._directOutbrainOrderObj.saveToCookie(anyOtb);
            expect(window.utag.loader.SC).toHaveBeenCalledWith('utag_main', {'otb': 'any-otb;exp-session'});
        });
    });

    describe('deleteFromCookie()', function () {
        it('should delete the adobe campaign value of article recommendations in utag_main cookie', function () {
            s._directOutbrainOrderObj.deleteFromCookie();
            expect(window.utag.loader.SC).toHaveBeenCalledWith('utag_main', {'otb': ';exp-session'});
        });
    });

    describe('setOutbrain(s)', function () {
        let saveToCookieMock;
        let deleteFromCookieMock;

        beforeEach(() => {
            saveToCookieMock = jest.spyOn(s._directOutbrainOrderObj, 'saveToCookie').mockImplementation();
            deleteFromCookieMock = jest.spyOn(s._directOutbrainOrderObj, 'deleteFromCookie').mockImplementation();
        });

        it('should evaluate the document type by calling s._utils.getDocType()', function () {
            s._directOutbrainOrderObj.setOutbrain(s);
            expect(s._utils.getDocType).toHaveBeenCalled();
            //expect(s._directOutbrainOrderObj.getPageVisibility).toHaveBeenCalled();
            //expect(s._directOutbrainOrderObj.getTealiumProfile).toHaveBeenCalled();
        });

        it('should assign adobe campaign value of data layer to eVar113 on plus article pages when paywall is shown', function () {
            s._utils.getDocType.mockReturnValue('article');
            s._directOutbrainOrderObj.getPageVisibility.mockReturnValue('true');
            window.utag.data['qp.cid'] = 'kooperation.article.outbrain.anything';
            s._directOutbrainOrderObj.setOutbrain(s);
            expect(s.eVar113).toEqual(window.utag.data['qp.cid']);
        });

        it('should store adobe campaign value in utag_main cookie on plus article pages when paywall is shown', function () {
            s._utils.getDocType.mockReturnValue('article');
            s._directOutbrainOrderObj.getPageVisibility.mockReturnValue('true');
            window.utag.data['qp.cid'] = 'kooperation.article.outbrain.anything';
            s._directOutbrainOrderObj.setOutbrain(s);
            expect(saveToCookieMock).toHaveBeenCalledWith(window.utag.data['qp.cid']);
        });

        it('should NOT store adobe campaign value in utag_main cookie on plus article pages when content of page is shown', function () {
            s._utils.getDocType.mockReturnValue('article');
            s._directOutbrainOrderObj.getPageVisibility.mockReturnValue('false');
            window.utag.data['qp.cid'] = 'any-otb';
            s._directOutbrainOrderObj.setOutbrain(s);
            expect(saveToCookieMock).toHaveBeenCalledWith(window.utag.data['qp.cid']);
        });

        it('should NOT assign a value to eVar113 on NON article pages', function () {
            s._utils.getDocType.mockReturnValue('any-type');
            s._directOutbrainOrderObj.getPageVisibility.mockReturnValue('false');
            s._directOutbrainOrderObj.setOutbrain(s);
            expect(s.eVar113).toBeUndefined();
        });

        it('should NOT store otb in utag_main cookie on NON article pages', function () {
            s._utils.getDocType.mockReturnValue('any-type');
            window.utag.data['qp.otb'] = 'any-otb';
            s._directOutbrainOrderObj.setOutbrain(s);
            expect(saveToCookieMock).not.toHaveBeenCalled();
        });

        it('should delete otb in utag_main cookie if tealium profile is not spring-premium', function () {
            s._directOutbrainOrderObj.getTealiumProfile.mockReturnValue('any-profile');
            s._directOutbrainOrderObj.setOutbrain(s);
            expect(deleteFromCookieMock).toHaveBeenCalledWith();
            expect(s.eVar113).toBeUndefined();
        });


    });


    
});