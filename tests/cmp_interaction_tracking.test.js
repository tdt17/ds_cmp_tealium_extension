const cmpInteractionTracking = require('../extensions/cmp_interaction_tracking');

const spMock = {
    addEventListener: jest.fn(),
    config: null
}

const tcfapiMock = jest.fn();

describe('Interaction Tracking (Tealium Extension)', ()=> {

    beforeEach(()=> {
        window._sp_ = spMock;
        window.__tcfapi = tcfapiMock;
    })

    afterEach(()=> {
        jest.restoreAllMocks();
        delete window._sp_;
        delete window.__utag_cmp_event_tracking;
        delete window.__tcfapi;
    });

    describe('init()', ()=> {
        it('should execute extension when global Source Point API (window._sp_) is available', ()=> {
            jest.spyOn(cmpInteractionTracking, 'run').mockImplementation();

            spMock.config = 'any-config';

            cmpInteractionTracking.init();

            expect(cmpInteractionTracking.run).toBeCalledTimes(1);
        });

        it('should execute extension only once', ()=> {
            jest.spyOn(cmpInteractionTracking, 'run').mockImplementation();

            spMock.config = 'any-config';

            cmpInteractionTracking.init();
            cmpInteractionTracking.init();

            expect(cmpInteractionTracking.run).toBeCalledTimes(1);
        });
    });

    describe('run()', ()=> {
        it('should call the major functions of this unit', () => {
            jest.spyOn(cmpInteractionTracking, 'configSourcepoint').mockImplementation();
            jest.spyOn(cmpInteractionTracking, 'setAdobeTagId').mockImplementation();
            jest.spyOn(cmpInteractionTracking, 'registerEventHandler').mockImplementation();
            jest.spyOn(cmpInteractionTracking, 'processMissedMessage').mockImplementation();

            cmpInteractionTracking.run();

            expect(cmpInteractionTracking.configSourcepoint).toBeCalledTimes(1);
            expect(cmpInteractionTracking.setAdobeTagId).toBeCalledTimes(1);
            expect(cmpInteractionTracking.registerEventHandler).toBeCalledTimes(1);
            expect(cmpInteractionTracking.processMissedMessage).toBeCalledTimes(1);
        });
    });

    describe('registerEventHandler()', ()=> {
        it('should register all needed event listener', () => {
            cmpInteractionTracking.registerEventHandler();

            expect(spMock.addEventListener).toBeCalledTimes(3);
            expect(tcfapiMock).toBeCalledTimes(1);
        });
    });



});

// https://medium.com/@DavideRama/mock-spy-exported-functions-within-a-single-module-in-jest-cdf2b61af642