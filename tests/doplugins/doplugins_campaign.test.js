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

    describe('setCampaignVariables', () => {
        let getValOnceMock;
        beforeEach(() => {
            getValOnceMock = jest.spyOn(s, 'getValOnce').mockImplementation();
        });

        afterEach(() => {
            jest.restoreAllMocks();
        });

        it('should get adobe campaign and set correct data', () => {
            jest.spyOn(s._campaignObj, 'getAdobeCampaign').mockReturnValue('cid=cid.test');
            getValOnceMock.mockReturnValue('cid=cid.test');

            s._campaignObj.setCampaignVariables(s);

            expect(window.utag.data.adobe_campaign).toBe('cid=cid.test');
            expect(s.campaign).toBe('cid=cid.test');
            expect(s.eVar88).toBe(window.utag.data.adobe_campaign);
            expect(s.getValOnce).toHaveBeenCalledWith('cid=cid.test', 's_ev0', 0, 'm');
        });

        it('should NOT use plugin getValOnce in first page view context (before consent)', () => {
            jest.spyOn(s._campaignObj, 'getAdobeCampaign').mockReturnValue('cid=cid.test');
            jest.spyOn(s._utils, 'isFirstPageView').mockReturnValue(true);
            getValOnceMock.mockReturnValue('cid=cid.test');


            s._campaignObj.setCampaignVariables(s);

            expect(window.utag.data.adobe_campaign).toBe('cid=cid.test');
            expect(s.campaign).toBe('cid=cid.test');
            expect(s.eVar88).toBe(window.utag.data.adobe_campaign);
            expect(s.getValOnce).not.toHaveBeenCalled();
        });

    });
});