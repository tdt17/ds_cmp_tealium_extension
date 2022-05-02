const sObject = require('../../extensions/doPlugins_global');
const {createWindowMock} = require('../mocks/browserMocks');

describe('campaign', () => {
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

    describe('getAdobeCampaign()', () => {

        it('should return cid as adobe_campaign if it is present', () => {
            window.utag.data = {
                'qp.cid': 'cid.test',
                'qp.wtrid': 'wtrid.test',
                'qp.wtmc': 'wtmc.test',
                'qp.wt_mc': 'wt_mc.test',
            };

            const adobe_campaign = s._campaignObj.getAdobeCampaign();
            expect(adobe_campaign).toBe('cid=' + window.utag.data['qp.cid']);

        });
        it('should return wtrid as adobe_campaign if it is present and cid is not defined', () => {
            window.utag.data = {
                'qp.wtrid': 'wtrid.test',
                'qp.wtmc': 'wtmc.test',
                'qp.wt_mc': 'wt_mc.test',
            };

            const adobe_campaign = s._campaignObj.getAdobeCampaign();
            expect(adobe_campaign).toBe('wtrid=' + window.utag.data['qp.wtrid']);

        });
        it('should return wtmc as adobe_campaign if it is present and cid and wtrid are not defined', () => {
            window.utag.data = {
                'qp.wtmc': 'wtmc.test',
                'qp.wt_mc': 'wt_mc.test',
            };

            const adobe_campaign = s._campaignObj.getAdobeCampaign();
            expect(adobe_campaign).toBe('wtmc=' + window.utag.data['qp.wtmc']);

        });
        it('should return wt_mc as adobe_campaign if it is present and cid, wtrid and wtmc are not defined', () => {
            window.utag.data = {
                'qp.wt_mc': 'wt_mc.test',
            };

            const adobe_campaign = s._campaignObj.getAdobeCampaign();
            expect(adobe_campaign).toBe('wt_mc=' + window.utag.data['qp.wt_mc']);

        });
    });

    describe('setCampaignVariableAndCookie', ()=> {
        beforeEach(() => {
            jest.spyOn(s, 'getValOnce').mockImplementation();
        });

        afterEach(() => {
            jest.restoreAllMocks();
        });

        it('should call s.getValOnce() with correct arguments', ()=> {
            s.eVar88 = 'any-value';
            s._campaignObj.setCampaignVariableAndCookie(s);
            expect(s.getValOnce).toHaveBeenCalledWith(s.eVar88, 's_ev0', 0, 'm');
        });
    });

    describe('setCampaignVariables', () => {
        it('should get adobe campaign and set correct data', () => {
            jest.spyOn(s._utils, 'isFirstPageView').mockImplementation().mockReturnValue(true);
            jest.spyOn(s._campaignObj, 'getAdobeCampaign').mockReturnValue('cid=cid.test');

            s._campaignObj.setCampaignVariables(s);

            expect(window.utag.data.adobe_campaign).toBe('cid=cid.test');
            expect(s.eVar88).toBe('cid=cid.test');
            expect(s.campaign).toBe('cid=cid.test');
        });

        it('should call setCampaignVariableAndCookie() in first page view context (before consent)', () => {
            jest.spyOn(s._utils, 'isFirstPageView').mockImplementation().mockReturnValue(false);
            jest.spyOn(s._campaignObj, 'setCampaignVariableAndCookie').mockImplementation();
            s._campaignObj.setCampaignVariables(s);
            expect(s._campaignObj.setCampaignVariableAndCookie).toHaveBeenCalledWith(s);
            expect(s.campaign).toBeUndefined();
        });

        it('should NOT call setCampaignVariableAndCookie() with user consent (CMP)', () => {
            jest.spyOn(s._utils, 'isFirstPageView').mockImplementation().mockReturnValue(true);
            jest.spyOn(s._campaignObj, 'setCampaignVariableAndCookie').mockImplementation();
            s._campaignObj.setCampaignVariables(s);
            expect(s._campaignObj.setCampaignVariableAndCookie).not.toHaveBeenCalled();
        });

    });
});