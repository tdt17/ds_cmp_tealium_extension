const s = require('../extensions/doPlugins_global');

describe('Adobe Plugins', () => {
    it('should check if the getPercentagePageViewed function is defined in s object', () => {
        expect(s.getPercentPageViewed).toBeDefined();
    });

    it('should check if the handlePPVevents function is defined in s object', () => {
        expect(s.handlePPVevents).toBeDefined();
    });

    it('should check if the p_fo function is defined in s object', () => {
        expect(s.p_fo).toBeDefined();
    });

    it('should check if the apl function is defined in s object', () => {
        expect(s.apl).toBeDefined();
    });

    it('should check if the getValOnce function is defined in s object', () => {
        expect(s.getValOnce).toBeDefined();
    });

    it('should check if the split function is defined in s object', () => {
        expect(s.split).toBeDefined();
    });
});
