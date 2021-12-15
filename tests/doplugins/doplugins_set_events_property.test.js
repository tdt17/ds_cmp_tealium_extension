const s = require('../../extensions/doPlugins_global');

describe('_setEventsProperty', () => {
    let aplMock;
    beforeEach(() => {
        aplMock = jest.spyOn(s, 'apl');

    });

    afterEach(() => {
        jest.restoreAllMocks();
        delete s._articleViewType;
    });

    it('should add article-view-type value to the events property if defined', () => {
        s._articleViewType = 'any-article-view-type';
        s._setEventsProperty(s);

        expect(aplMock).toHaveBeenCalled();
    });

    it('should NOT add article-view-type value to the events property if undefined', () => {
        s._setEventsProperty(s);

        expect(aplMock).not.toHaveBeenCalled();
    });

});