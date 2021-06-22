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
        delete window.__cmp_onMessageReceiveData;
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

    describe('processMissedMessage', ()=> {
        it('should process receive-data message which was send before listener was registered', function () {
            const anyMessage = 'any-message';
            window.__cmp_onMessageReceiveData = anyMessage;
            jest.spyOn(cmpInteractionTracking, 'onMessageReceiveData').mockImplementation();

            cmpInteractionTracking.processMissedMessage();

            expect(cmpInteractionTracking.onMessageReceiveData).toHaveBeenCalledWith(anyMessage);
        });

        it('should only process receive-data message when one was send', function () {
            jest.spyOn(cmpInteractionTracking, 'onMessageReceiveData').mockImplementation();

            cmpInteractionTracking.processMissedMessage();

            expect(cmpInteractionTracking.onMessageReceiveData).not.toHaveBeenCalled();
        });
    });

    describe('configSourcepoint', ()=> {
        it('should set the Sourcepoint configuration object to our needs', function () {
            window._sp_.config = {};

            cmpInteractionTracking.configSourcepoint();

            expect(window._sp_queue).toEqual([]);
            expect(window._sp_.config.events).toEqual({});
        });
    });

    describe('registerEventHandler()', ()=> {
        it('should register all needed event listener', () => {
            cmpInteractionTracking.registerEventHandler();

            expect(spMock.addEventListener).toBeCalledTimes(3);
            expect(tcfapiMock).toBeCalledTimes(1);
            expect(spMock.addEventListener).toHaveBeenCalledWith('onMessageReceiveData', cmpInteractionTracking.onMessageReceiveData);
            expect(spMock.addEventListener).toHaveBeenCalledWith('onMessageChoiceSelect', cmpInteractionTracking.onMessageChoiceSelect);
            expect(spMock.addEventListener).toHaveBeenCalledWith('onPrivacyManagerAction', cmpInteractionTracking.onPrivacyManagerAction);
            expect(tcfapiMock).toHaveBeenCalledWith('addEventListener', 2, cmpInteractionTracking.onCmpuishown);
        });

    });

});
