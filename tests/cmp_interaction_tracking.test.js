const cmpInteractionTracking = require('../extensions/cmp_interaction_tracking');

const spMock = {
    addEventListener: jest.fn(),
    config: null
}

const tcfapiMock = jest.fn();

describe('Interaction Tracking (Tealium Extension)', () => {

    beforeEach(() => {
        window._sp_ = spMock;
        window.__tcfapi = tcfapiMock;
    })

    afterEach(() => {
        jest.restoreAllMocks();
        delete window._sp_;
        delete window.__utag_cmp_event_tracking;
        delete window.__tcfapi;
        delete window.__cmp_onMessageReceiveData;
        delete window.utag_data;
    });

    describe('init()', () => {
        it('should execute extension when global Source Point API (window._sp_) is available', () => {
            jest.spyOn(cmpInteractionTracking, 'run').mockImplementation();

            spMock.config = 'any-config';

            cmpInteractionTracking.init();

            expect(cmpInteractionTracking.run).toBeCalledTimes(1);
        });

        it('should execute extension only once', () => {
            jest.spyOn(cmpInteractionTracking, 'run').mockImplementation();

            spMock.config = 'any-config';

            cmpInteractionTracking.init();
            cmpInteractionTracking.init();

            expect(cmpInteractionTracking.run).toBeCalledTimes(1);
        });
    });

    describe('run()', () => {
        it('should call the major functions of this unit', () => {
            window.utag_data = {
                ut: {
                    profile: 'welt'
                }
            };

            jest.spyOn(cmpInteractionTracking, 'configSourcepoint').mockImplementation();
            jest.spyOn(cmpInteractionTracking, 'getAdobeTagId').mockImplementation();
            jest.spyOn(cmpInteractionTracking, 'registerEventHandler').mockImplementation();
            jest.spyOn(cmpInteractionTracking, 'processMissedMessage').mockImplementation();

            cmpInteractionTracking.run();

            expect(cmpInteractionTracking.configSourcepoint).toBeCalledTimes(1);
            expect(cmpInteractionTracking.getAdobeTagId).toBeCalledTimes(1);
            expect(cmpInteractionTracking.registerEventHandler).toBeCalledTimes(1);
            expect(cmpInteractionTracking.processMissedMessage).toBeCalledTimes(1);
        });
    });

    describe('getAdobeTagId()', () => {
        const TEALIUM_PROFILES = [
            {profileName: 'abo-autobild.de', tagId: 23},
            {profileName: 'ac-autobild', tagId: 10},
            {profileName: 'ac-computerbild', tagId: 9},
            {profileName: 'asmb-metal-hammer.de', tagId: 22},
            {profileName: 'asmb-musikexpress.de', tagId: 14},
            {profileName: 'asmb-rollingstone.de', tagId: 16},
            {profileName: 'bild-bild.de', tagId: 12},
            {profileName: 'bild-fitbook.de', tagId: 40},
            {profileName: 'bild-myhomebook.de', tagId: 37},
            {profileName: 'bild-sportbild.de', tagId: 16},
            {profileName: 'bild-stylebook.de', tagId: 30},
            {profileName: 'bild-techbook.de', tagId: 82},
            {profileName: 'bild-travelbook.de', tagId: 42},
            {profileName: 'bild-offer', tagId: 24},
            {profileName: 'bild', tagId: 386},
            {profileName: 'bz-bz-berlin.de', tagId: 9},
            {profileName: 'cbo-computerbild.de', tagId: 25},
            {profileName: 'shop.bild', tagId: 181},
            {profileName: 'welt', tagId: 233}
        ];

        it.each(TEALIUM_PROFILES)('should return the Adobe TagID ($tagId) for the current Tealium Profile ($profileName)', ({profileName, tagId}) => {

            const result = cmpInteractionTracking.getAdobeTagId(profileName);

            expect(result).toBe(tagId);
        });

        it('should throw an error when there is no Adobe TagID of the current Tealium profile', function () {
            expect(() => {
                cmpInteractionTracking.getAdobeTagId('non-existing-profile');
            }).toThrow();
        });
    })

    describe('processMissedMessage', () => {
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

    describe('configSourcepoint', () => {
        it('should set the Sourcepoint configuration object to our needs', function () {
            window._sp_.config = {};

            cmpInteractionTracking.configSourcepoint();

            expect(window._sp_queue).toEqual([]);
            expect(window._sp_.config.events).toEqual({});
        });
    });

    describe('registerEventHandler()', () => {
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
