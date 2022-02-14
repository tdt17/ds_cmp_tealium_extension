const cmpInteractionTracking = require('../extensions/cmp_interaction_tracking');
const browserMocks = require('../tests/mocks/browserMocks');

const ABTestingProperties = {
    msgDescription: 'any-description',
    messageId: 'any-id',
    bucket: 'any-bucket'
};

// Utility function for conveniently setting AP-testing properties
function setABTestingProperties() {
    cmpInteractionTracking.setABTestingProperties(ABTestingProperties);
}

function createWindowMock() {
    return {
        localStorage: browserMocks.localStorageMock,
        addEventListener: jest.fn(),
        _sp_: {
            addEventListener: jest.fn(),
            config: 'any-config'
        },
        __tcfapi: jest.fn(),
        __utag_cmp_event_tracking: null,
        _sp_queue: null,
        utag: {
            link: jest.fn(),
            data: {},
            loader: {
                SC: jest.fn()
            }
        }
    };
}

describe('CMP Interaction Tracking', () => {

    beforeEach(() => {
        // Create a fresh window mock for each test.
        const windowMock = createWindowMock();
        jest.spyOn(global, 'window', 'get')
            .mockImplementation(() => (windowMock));
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('init()', () => {
        it('should execute extension when global Source Point API (window._sp_) is available', () => {
            jest.spyOn(cmpInteractionTracking, 'run').mockImplementation();

            cmpInteractionTracking.init();

            expect(cmpInteractionTracking.run).toBeCalledTimes(1);
        });

        it('should execute extension only once', () => {
            jest.spyOn(cmpInteractionTracking, 'run').mockImplementation();

            cmpInteractionTracking.init();
            cmpInteractionTracking.init();

            expect(cmpInteractionTracking.run).toBeCalledTimes(1);
        });
    });

    describe('run()', () => {
        it('should call the major functions of this unit', () => {
            window.utag.data.ut = {
                profile: 'welt'
            };

            jest.spyOn(cmpInteractionTracking, 'configSourcepoint').mockImplementation();
            jest.spyOn(cmpInteractionTracking, 'registerEventHandler').mockImplementation();
            jest.spyOn(cmpInteractionTracking, 'initABTestingProperties').mockImplementation();

            cmpInteractionTracking.run();

            expect(cmpInteractionTracking.configSourcepoint).toBeCalledTimes(1);
            expect(cmpInteractionTracking.registerEventHandler).toBeCalledTimes(1);
            expect(cmpInteractionTracking.initABTestingProperties).toBeCalledTimes(1);
        });
    });

    describe('configSourcepoint', () => {
        it('should set the Sourcepoint configuration object to our needs', function () {
            window._sp_.config = {};

            cmpInteractionTracking.configSourcepoint();

            expect(window._sp_.config.events).toEqual({});
        });
    });

    describe('registerEventHandler()', () => {
        it('should add all four event handler to the source point event queue', function () {
            cmpInteractionTracking.registerEventHandler();

            expect(window._sp_queue).toEqual([
                expect.any(Function),
                expect.any(Function),
                expect.any(Function),
                expect.any(Function)
            ]);
        });

        it('should register all needed event listener', () => {
            cmpInteractionTracking.registerEventHandler();
            window._sp_queue.forEach(handler => {
                handler();
            });

            expect(window._sp_.addEventListener).toBeCalledTimes(3);
            expect(window.__tcfapi).toBeCalledTimes(1);
            expect(window._sp_.addEventListener).toHaveBeenCalledWith('onMessageReceiveData', cmpInteractionTracking.onMessageReceiveData);
            expect(window._sp_.addEventListener).toHaveBeenCalledWith('onMessageChoiceSelect', cmpInteractionTracking.onMessageChoiceSelect);
            expect(window._sp_.addEventListener).toHaveBeenCalledWith('onPrivacyManagerAction', cmpInteractionTracking.onPrivacyManagerAction);
            expect(window.__tcfapi).toHaveBeenCalledWith('addEventListener', 2, cmpInteractionTracking.onCmpuishown);
            expect(window.addEventListener).toHaveBeenCalledWith('message', cmpInteractionTracking.onMessage, false);
        });
    });

    describe('initABTestingProperties', () => {
        it('should set AB-Testing properties when provided through global object', () => {
            jest.spyOn(cmpInteractionTracking, 'setABTestingProperties').mockImplementation();
            window.__cmp_interaction_data = {
                onMessageReceiveData: ABTestingProperties
            };
            cmpInteractionTracking.initABTestingProperties();
            expect(cmpInteractionTracking.setABTestingProperties).toHaveBeenCalledWith(ABTestingProperties);
        });

        it('should NOT set AB-Testing properties when they are NOT provided through global object', () => {
            jest.spyOn(cmpInteractionTracking, 'setABTestingProperties').mockImplementation();
            cmpInteractionTracking.initABTestingProperties();
            expect(cmpInteractionTracking.setABTestingProperties).not.toHaveBeenCalled();
        });
    });

    describe('getABTestingProperties', () => {
        it('should return a string with concatenated testing properties', function () {
            setABTestingProperties();
            const expectedResult = ABTestingProperties.messageId + ' ' + ABTestingProperties.msgDescription + ' ' + ABTestingProperties.bucket;
            const result = cmpInteractionTracking.getABTestingProperties();
            expect(result).toBe(expectedResult);
        });

        it('should return null when there are no testing properties', function () {
            cmpInteractionTracking.setABTestingProperties({});
            const result = cmpInteractionTracking.getABTestingProperties();
            expect(result).toBe(null);
        });
    });

    describe('onMessageReceiveData()', () => {
        it('should store received AP-Testing properties', () => {
            cmpInteractionTracking.onMessageReceiveData(ABTestingProperties);

            // getting stored properties by triggering link functions which uses them as argument
            cmpInteractionTracking.onMessageChoiceSelect('test', '11');
            const utagLinkCallArguments = window.utag.link.mock.calls[0][0];

            expect(utagLinkCallArguments.event_data).toEqual(`${ABTestingProperties.messageId} ${ABTestingProperties.msgDescription} ${ABTestingProperties.bucket}`);
        });
    });

    describe('sendLinkEvent()', () => {
        it('should call utag.link function with correct arguments', () => {
            const anyLabel = 'any-label';
            setABTestingProperties();
            cmpInteractionTracking.sendLinkEvent(anyLabel);
            expect(window.utag.link).toHaveBeenCalledWith(
                {
                    'event_name': 'cmp_interactions',
                    'event_action': 'click',
                    'event_label': anyLabel,
                    'event_data': `${ABTestingProperties.messageId} ${ABTestingProperties.msgDescription} ${ABTestingProperties.bucket}`
                });
        });
    });

    describe('onMessageChoiceSelect(id, eventType)', () => {
        beforeEach(() => {
            jest.spyOn(cmpInteractionTracking, 'sendLinkEvent').mockImplementation();
        });

        it('should set correct utag.data properties when eventType === 11', () => {
            cmpInteractionTracking.onMessageChoiceSelect('any-id', 11);
            expect(window.utag.data).toEqual({
                'cmp_events': 'cm_accept_all'
            });
        });

        it('should call sendLinkEvent with correct argument when eventType === 11', () => {
            cmpInteractionTracking.onMessageChoiceSelect('test', '11');
            expect(cmpInteractionTracking.sendLinkEvent).toHaveBeenLastCalledWith('cm_accept_all')
        });

        it('should set correct utag.data properties when eventType === 12', () => {
            cmpInteractionTracking.onMessageChoiceSelect('any-id', 12);
            expect(window.utag.data).toEqual({
                'cmp_events': 'cm_show_privacy_manager'
            });
        });

        it('should call sendLinkEvent with correct argument when eventType === 12', () => {
            cmpInteractionTracking.onMessageChoiceSelect('test', '12');
            expect(cmpInteractionTracking.sendLinkEvent).toHaveBeenLastCalledWith('cm_show_privacy_manager')
        });

        it('should set correct utag.data properties when eventType === 13', () => {
            cmpInteractionTracking.onMessageChoiceSelect('any-id', 13);
            expect(window.utag.data).toEqual({
                'cmp_events': 'cm_reject_all'
            });
        });

        it('should call sendLinkEvent with correct argument when eventType === 13', () => {
            cmpInteractionTracking.onMessageChoiceSelect('test', '13');
            expect(cmpInteractionTracking.sendLinkEvent).toHaveBeenLastCalledWith('cm_reject_all')
        });

        it('should NOT call sendLinkEvent when called with wrong event type', () => {
            cmpInteractionTracking.onMessageChoiceSelect('test', '999');
            expect(window.utag.link).not.toHaveBeenCalled();
        });
    });


    describe('onPrivacyManagerAction(eventType)', () => {
        it('should set correct utag.data properties when eventType === SAVE_AND_EXIT', () => {
            cmpInteractionTracking.onPrivacyManagerAction('SAVE_AND_EXIT');

            expect(window.utag.data).toEqual({
                'cmp_events': 'pm_save_and_exit'
            });
        });

        it('should call utag.link with correct values when eventType === SAVE_AND_EXIT', () => {
            setABTestingProperties();
            cmpInteractionTracking.onPrivacyManagerAction('SAVE_AND_EXIT');
            expect(window.utag.link).toHaveBeenCalledWith(
                {
                    'event_name': 'cmp_interactions',
                    'event_action': 'click',
                    'event_label': 'pm_save_and_exit',
                    'event_data': `${ABTestingProperties.messageId} ${ABTestingProperties.msgDescription} ${ABTestingProperties.bucket}`
                });
        });

        it('should set correct utag.data properties when eventType === ACCEPT_ALL', () => {
            cmpInteractionTracking.onPrivacyManagerAction('ACCEPT_ALL');

            expect(window.utag.data).toEqual({
                'cmp_events': 'pm_accept_all'
            });
        });

        it('should call utag.link with correct values when eventType === ACCEPT_ALL', () => {
            setABTestingProperties();
            cmpInteractionTracking.onPrivacyManagerAction('ACCEPT_ALL');
            expect(window.utag.link).toHaveBeenCalledWith(
                {
                    'event_name': 'cmp_interactions',
                    'event_action': 'click',
                    'event_label': 'pm_accept_all',
                    'event_data': `${ABTestingProperties.messageId} ${ABTestingProperties.msgDescription} ${ABTestingProperties.bucket}`
                });
        });

        it('should set utag.data properties when called with an all purposeConsent', () => {
            cmpInteractionTracking.onPrivacyManagerAction({purposeConsent: 'all'});
            expect(window.utag.data).toEqual({
                'cmp_events': 'pm_accept_all'
            });
        });

        it('should call utag.link with correct values when called with an all purposeConsent', () => {
            setABTestingProperties();
            cmpInteractionTracking.onPrivacyManagerAction({purposeConsent: 'all'});
            expect(window.utag.link).toHaveBeenCalledWith(
                {
                    'event_name': 'cmp_interactions',
                    'event_action': 'click',
                    'event_label': 'pm_accept_all',
                    'event_data': `${ABTestingProperties.messageId} ${ABTestingProperties.msgDescription} ${ABTestingProperties.bucket}`
                });
        });

        it('should set utag.data properties when called with a purposeConsent other from all', () => {
            cmpInteractionTracking.onPrivacyManagerAction({purposeConsent: 'any-purpose-consent'});
            expect(window.utag.data).toEqual({
                'cmp_events': 'pm_save_and_exit'
            });
        });

        it('should call utag.link with correct values when called with a purposeConsent other from all', () => {
            setABTestingProperties();
            cmpInteractionTracking.onPrivacyManagerAction({purposeConsent: 'any-purpose-consent'});
            expect(window.utag.link).toHaveBeenCalledWith(
                {
                    'event_name': 'cmp_interactions',
                    'event_action': 'click',
                    'event_label': 'pm_save_and_exit',
                    'event_data': `${ABTestingProperties.messageId} ${ABTestingProperties.msgDescription} ${ABTestingProperties.bucket}`
                });
        });

        it('should NOT call utag.link when called with wrong eventType', () => {
            cmpInteractionTracking.onPrivacyManagerAction('any-invalid-type');
            expect(window.utag.link).not.toHaveBeenCalled();
        });
    });

    describe('onCmpuishown()', () => {
        it('should set correct utag.data properties', () => {
            cmpInteractionTracking.onCmpuishown({eventStatus: 'cmpuishown'});
            expect(window.utag.data).toEqual({
                'cmp_events': 'cm_layer_shown'
            });
        });

        it('should call sendLinkEvent function', () => {
            jest.spyOn(cmpInteractionTracking, 'sendLinkEvent').mockImplementation();
            cmpInteractionTracking.onCmpuishown({eventStatus: 'cmpuishown'});
            expect(cmpInteractionTracking.sendLinkEvent).toHaveBeenCalledWith('cm_layer_shown');
        });

        it('should NOT set utag.data properties when called with invalid event status', () => {
            cmpInteractionTracking.onCmpuishown({eventStatus: 'any-invalid-status'});
            expect(window.utag.data).toEqual({});
        });

        it('should NOT call sendLinkEvent function when called with invalid event status', () => {
            jest.spyOn(cmpInteractionTracking, 'sendLinkEvent').mockImplementation();
            cmpInteractionTracking.onCmpuishown({eventStatus: 'any-invalid-status'});
            expect(cmpInteractionTracking.sendLinkEvent).not.toHaveBeenCalled();
        });
    });

    describe('onMessage', () => {
        it('should call utag.link function with correct parameters', function () {
            const label = 'any-label';
            setABTestingProperties();
            cmpInteractionTracking.onMessage({
                data: {
                    cmpLayerMessage: true,
                    payload: label
                },
            });
            expect(window.utag.link).toHaveBeenCalledWith({
                'event_name': 'cmp_interactions',
                'event_action': 'click',
                'event_label': label,
                'event_data': `${ABTestingProperties.messageId} ${ABTestingProperties.msgDescription} ${ABTestingProperties.bucket}`
            });
        });
    });

});
