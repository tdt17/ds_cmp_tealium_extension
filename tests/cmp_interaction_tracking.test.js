const cmpInteractionTracking = require('../extensions/cmp_interaction_tracking');
const browserMocks = require('../tests/mocks/browserMocks');

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
    {profileName: 'welt', tagId: 233},
    {profileName: 'welt-shop.welt.de', tagId: 28}
];

const ABTestingProperties = {
    msgDescription: 'any-description',
    messageId: 'any-id',
    bucket: 'any-bucket'
};

// Utility function for conveniently setting AP-testing properties
function setABTestingProperties() {
    cmpInteractionTracking.onMessageReceiveData(ABTestingProperties);
}

function createWindowMock() {
    return {
        localStorage: browserMocks.localStorageMock,
        _sp_: {
            addEventListener: jest.fn(),
            config: 'any-config'
        },
        __tcfapi: jest.fn(),
        __utag_cmp_event_tracking: null,
        _sp_queue: null,
        utag: {
            link: jest.fn(),
            view: jest.fn(),
            data: {}
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
            jest.spyOn(cmpInteractionTracking, 'getAdobeTagId').mockImplementation();
            jest.spyOn(cmpInteractionTracking, 'registerEventHandler').mockImplementation();
            jest.spyOn(cmpInteractionTracking, 'initABTestingProperties').mockImplementation();

            cmpInteractionTracking.run();

            expect(cmpInteractionTracking.configSourcepoint).toBeCalledTimes(1);
            expect(cmpInteractionTracking.getAdobeTagId).toBeCalledTimes(1);
            expect(cmpInteractionTracking.registerEventHandler).toBeCalledTimes(1);
            expect(cmpInteractionTracking.initABTestingProperties).toBeCalledTimes(1);
        });
    });

    describe('getAdobeTagId()', () => {
        it.each(TEALIUM_PROFILES)('should return the Adobe TagID ($tagId) for the current Tealium Profile ($profileName)',
            (
                {
                    profileName,
                    tagId
                }
            ) => {

                const result = cmpInteractionTracking.getAdobeTagId(profileName);

                expect(result).toBe(tagId);
            });

        it('should throw an error when there is no Adobe TagID of the current Tealium profile', function () {
            expect(() => {
                cmpInteractionTracking.getAdobeTagId('non-existing-profile');
            }).toThrow();
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
        });
    });

    describe('initABTestingProperties', () => {
        it('should store AB-Testing properties when provided through global variable', () => {
            window.__cmp_interaction_data = {
                onMessageReceiveData: ABTestingProperties
            };

            cmpInteractionTracking.initABTestingProperties();

            // getting stored properties by triggering link functions which uses them as argument
            cmpInteractionTracking.onMessageChoiceSelect('test', '11');
            const utagLinkCallArguments = window.utag.link.mock.calls[0][0];

            expect(utagLinkCallArguments.event_data).toEqual(`${ABTestingProperties.messageId} ${ABTestingProperties.msgDescription} ${ABTestingProperties.bucket}`);
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
        it('should set correct utag.data properties when eventType === 11', () => {
            cmpInteractionTracking.onMessageChoiceSelect('any-id', 11);
            expect(window.utag.data).toEqual({
                'cmp_events': 'cm_accept_all',
                'cmp_interactions_true': 'false'
            });
        });

        it('should call utag.link with correct values when eventType === 11', () => {
            setABTestingProperties();
            cmpInteractionTracking.onMessageChoiceSelect('test', '11');
            expect(window.utag.link).toHaveBeenCalledWith(
                {
                    'event_name': 'cmp_interactions',
                    'event_action': 'click',
                    'event_label': 'cm_accept_all',
                    'event_data': `${ABTestingProperties.messageId} ${ABTestingProperties.msgDescription} ${ABTestingProperties.bucket}`
                });
        });

        it('should set correct utag.data properties when eventType === 12', () => {
            cmpInteractionTracking.onMessageChoiceSelect('any-id', 12);
            expect(window.utag.data).toEqual({
                'cmp_events': 'cm_show_privacy_manager',
                'cmp_interactions_true': 'false'
            });
        });

        it('should call utag.link with correct values when eventType === 12', () => {
            setABTestingProperties();
            cmpInteractionTracking.onMessageChoiceSelect('test', '12');
            expect(window.utag.link).toHaveBeenCalledWith(
                {
                    'event_name': 'cmp_interactions',
                    'event_action': 'click',
                    'event_label': 'cm_show_privacy_manager',
                    'event_data': `${ABTestingProperties.messageId} ${ABTestingProperties.msgDescription} ${ABTestingProperties.bucket}`
                });
        });

        it('should set correct utag.data properties when eventType === 13', () => {
            cmpInteractionTracking.onMessageChoiceSelect('any-id', 13);
            expect(window.utag.data).toEqual({
                'cmp_events': 'cm_reject_all',
                'cmp_interactions_true': 'false'
            });
        });

        it('should call utag.link with correct values when eventType === 13', () => {
            setABTestingProperties();
            cmpInteractionTracking.onMessageChoiceSelect('test', '13');
            expect(window.utag.link).toHaveBeenCalledWith(
                {
                    'event_name': 'cmp_interactions',
                    'event_action': 'click',
                    'event_label': 'cm_reject_all',
                    'event_data': `${ABTestingProperties.messageId} ${ABTestingProperties.msgDescription} ${ABTestingProperties.bucket}`
                });
        });

        it('should NOT call utag.link when called with wrong event type', () => {
            cmpInteractionTracking.onMessageChoiceSelect('test', '999');
            expect(window.utag.link).not.toHaveBeenCalled();
        });
    });


    describe('onPrivacyManagerAction(eventType)', () => {
        it('should set correct utag.data properties when eventType === SAVE_AND_EXIT', () => {
            cmpInteractionTracking.onPrivacyManagerAction('SAVE_AND_EXIT');

            expect(window.utag.data).toEqual({
                'cmp_events': 'pm_save_and_exit',
                'cmp_interactions_true': 'false'
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
                'cmp_events': 'pm_accept_all',
                'cmp_interactions_true': 'false'
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
                'cmp_events': 'pm_accept_all',
                'cmp_interactions_true': 'false'
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
                'cmp_events': 'pm_save_and_exit',
                'cmp_interactions_true': 'false'
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
        beforeEach(() => {
            jest.useFakeTimers();
        });
        afterEach(() => {
            jest.useRealTimers();
        });

        it('should set correct utag.data properties', () => {
            cmpInteractionTracking.onCmpuishown({eventStatus: 'cmpuishown'});
            jest.runAllTimers();
            expect(window.utag.data).toEqual({
                'cmp_events': 'cm_layer_shown',
                'cmp_interactions_true': 'false',
                'first_pv': 'true'
            });
        });

        it('should call utag.view with correct values', () => {
            cmpInteractionTracking.onCmpuishown({eventStatus: 'cmpuishown'});
            expect(window.utag.view).toHaveBeenNthCalledWith(1,
                {
                    'cmp_events': 'cm_layer_shown',
                    'cmp_interactions_true': 'true',
                    'first_pv': 'true'
                }, null, [undefined]);
        });

        it('should NOT call utag.view when called without event status', () => {
            cmpInteractionTracking.onCmpuishown();
            jest.runAllTimers();
            expect(window.utag.view).not.toHaveBeenCalled();
        });

        it('should NOT call utag.view when onCmpuishown is called with invalid event status', () => {
            cmpInteractionTracking.onCmpuishown({eventStatus: 'any-invalid-status'});
            jest.runAllTimers();
            expect(window.utag.view).not.toHaveBeenCalled();
        });

        it('should call utag.link with correct values', () => {
            setABTestingProperties();
            cmpInteractionTracking.onCmpuishown({eventStatus: 'cmpuishown'});
            jest.runAllTimers();
            const utagViewCallback = window.utag.view.mock.calls[0][1];
            utagViewCallback();
            expect(window.utag.link).toHaveBeenNthCalledWith(1,
                {
                    'event_name': 'cmp_interactions',
                    'event_action': 'click',
                    'event_label': 'cm_layer_shown',
                    'event_data': `${ABTestingProperties.messageId} ${ABTestingProperties.msgDescription} ${ABTestingProperties.bucket}`
                });
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
