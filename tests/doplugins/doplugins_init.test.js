const doPluginsGlobal = require('../../extensions/doPlugins_global');
const {createWindowMock} = require('../mocks/browserMocks');

describe('init()', () => {
    let setCampaignVariablesMock;
    let setViewTypeMock;

    beforeEach(() => {
        // Create a fresh window mock for each test.
        const windowMock = createWindowMock();
        jest.spyOn(global, 'window', 'get')
            .mockImplementation(() => (windowMock));

        doPluginsGlobal.s.Util = {
            getQueryParam: jest.fn()
        };

        setCampaignVariablesMock = jest.spyOn(doPluginsGlobal.campaign, 'setCampaignVariables').mockImplementation();
        setViewTypeMock = jest.spyOn(doPluginsGlobal.articleViewType, 'setViewType').mockImplementation();
    });

    afterEach(() => {
        jest.restoreAllMocks();
        delete doPluginsGlobal.s.eVar94;
    });

    it('should set global configuration properties of the Adobe s-object', () => {
        doPluginsGlobal.s.visitor = {version: 'test'};
        window.document.referrer = 'any_referrer';
        const setCampaignVariables = jest.spyOn(doPluginsGlobal.campaign, 'setCampaignVariables');
        doPluginsGlobal.init();

        expect(doPluginsGlobal.s.currencyCode).toBe('EUR');
        expect(doPluginsGlobal.s.execdoplugins).toBe(0);
        expect(doPluginsGlobal.s.expectSupplementalData).toBe(false);
        expect(doPluginsGlobal.s.myChannels).toBe(0);
        expect(doPluginsGlobal.s.usePlugins).toBe(true);
        expect(doPluginsGlobal.s.trackExternalLinks).toBe(true);
        expect(doPluginsGlobal.s.eVar64).toBe(doPluginsGlobal.s.visitor.version);
        expect(doPluginsGlobal.s.expectSupplementalData).toBe(false);
        expect(doPluginsGlobal.s.getICID).toBeDefined();
        expect(doPluginsGlobal.s.eVar78).toBeDefined();
        expect(doPluginsGlobal.s.eVar79).toBeDefined();
        expect(doPluginsGlobal.s.referrer).toBe(window.document.referrer);
        expect(setCampaignVariables).toHaveBeenCalledWith(doPluginsGlobal.s);
    });

    it('should set eVar94 to the iPhone screen size', () => {
        const anyScreenSize = 111;
        window.screen.width = window.screen.height = anyScreenSize;
        window.navigator.userAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148';

        doPluginsGlobal.init();

        expect(doPluginsGlobal.s.eVar94).toBe(`${anyScreenSize}x${anyScreenSize}`);
    });

    it('should NOT set eVar94 when not viewed on iPhones', () => {
        doPluginsGlobal.init();
        expect(doPluginsGlobal.s.eVar94).toBeUndefined();
    });

    it('should call campaign.setCampaignVariables(s)', () => {
        doPluginsGlobal.init();
        const sObject = doPluginsGlobal.s;
        expect(setCampaignVariablesMock).toHaveBeenCalledWith(sObject);
    });

    it('should call articleViewType.setViewType()', () => {
        doPluginsGlobal.init();
        expect(setViewTypeMock).toHaveBeenCalled();
    });
});