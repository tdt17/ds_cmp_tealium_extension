const s = require('../../extensions/doPlugins_global');
const {createWindowMock} = require('../mocks/browserMocks');

describe('init()', () => {
    let setCampaignVariablesMock;
    let setViewTypeMock;
    let setICIDTrackingVariables;

    beforeEach(() => {
        // Create a fresh window mock for each test.
        const windowMock = createWindowMock();
        jest.spyOn(global, 'window', 'get')
            .mockImplementation(() => (windowMock));

        setCampaignVariablesMock = jest.spyOn(s._campaignObj, 'setCampaignVariables').mockImplementation();
        setViewTypeMock = jest.spyOn(s._articleViewTypeObj, 'setViewType').mockImplementation();
        setICIDTrackingVariables = jest.spyOn(s._ICIDTracking, 'setVariables').mockImplementation();

    });

    afterEach(() => {
        jest.restoreAllMocks();
        delete s.eVar94;
    });

    it('should set global configuration properties of the Adobe s-object', () => {
        s.visitor = {version: 'test'};
        window.document.referrer = 'any_referrer';
        window.navigator.userAgent = 'any-user-agent';
        s._init();

        expect(s.currencyCode).toBe('EUR');
        expect(s.execdoplugins).toBe(0);
        expect(s.expectSupplementalData).toBe(false);
        expect(s.myChannels).toBe(0);
        expect(s.usePlugins).toBe(true);
        expect(s.trackExternalLinks).toBe(true);
        expect(s.eVar61).toBe(window.navigator.userAgent);
        expect(s.eVar64).toBe(s.visitor.version);
        expect(s.expectSupplementalData).toBe(false);
        expect(s.referrer).toBe(window.document.referrer);
        expect(setCampaignVariablesMock).toHaveBeenCalledWith(s);
    });

    it('should set eVar94 to the iPhone screen size', () => {
        const anyScreenSize = 111;
        window.screen.width = window.screen.height = anyScreenSize;
        window.navigator.userAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 12_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148';

        s._init();

        expect(s.eVar94).toBe(`${anyScreenSize}x${anyScreenSize}`);
    });

    it('should NOT set eVar94 when not viewed on iPhones', () => {
        s._init();
        expect(s.eVar94).toBeUndefined();
    });

    it('should call campaign.setCampaignVariables(s)', () => {
        s._init();
        const sObject = s;
        expect(setCampaignVariablesMock).toHaveBeenCalledWith(sObject);
    });

    it('should call articleViewType.setViewType()', () => {
        s._init();
        expect(setViewTypeMock).toHaveBeenCalled();
    });

    it('should call articleViewType.setViewType()', () => {
        s._init();
        const sObject = s;
        expect(setICIDTrackingVariables).toHaveBeenCalledWith(sObject);
    });
});