const doPlugins = require('../extensions/doPlugins_global');

describe('doPlugins_global', () => {
    describe('Adobe Plugins', () => {
        it('Function getPercentPageViewed() should be attached to global s-object', () => {
            expect(doPlugins.s.getPercentPageViewed).toBeInstanceOf(Function);
        });
    });
});