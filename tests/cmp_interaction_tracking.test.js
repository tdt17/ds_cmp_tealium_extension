const cmpInteractionTracking = require('../extensions/cmp_interaction_tracking');

const spMock = {
    addEventListener: jest.fn(),
    config: null
}

const tcfapiMock = jest.fn();
const linkSpy = jest.fn();
const viewSpy = jest.fn();
global.utag = {
    link: linkSpy,
    view: viewSpy,
    data: {
        cmp_events: ''
    }
}

window.utag = global.utag;

window.b = {};


describe("CMP Interaction Tracking", () => {
    // General Setup

    beforeEach(() => {
        window._sp_ = spMock;
        window.__tcfapi = tcfapiMock;
    })

    afterEach(() => {
        jest.restoreAllMocks();
        delete window._sp_;
        delete window._sp_queue;
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

            cmpInteractionTracking.run();

            expect(cmpInteractionTracking.configSourcepoint).toBeCalledTimes(1);
            expect(cmpInteractionTracking.getAdobeTagId).toBeCalledTimes(1);
            expect(cmpInteractionTracking.registerEventHandler).toBeCalledTimes(1);
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

        it.each(TEALIUM_PROFILES)('should return the Adobe TagID ($tagId) for the current Tealium Profile ($profileName)', ({
                                                                                                                                profileName,
                                                                                                                                tagId
                                                                                                                            }) => {

            const result = cmpInteractionTracking.getAdobeTagId(profileName);

            expect(result).toBe(tagId);
        });

        it('should throw an error when there is no Adobe TagID of the current Tealium profile', function () {
            expect(() => {
                cmpInteractionTracking.getAdobeTagId('non-existing-profile');
            }).toThrow();
        });
    })

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

            expect(spMock.addEventListener).toBeCalledTimes(3);
            expect(tcfapiMock).toBeCalledTimes(1);
            expect(spMock.addEventListener).toHaveBeenCalledWith('onMessageReceiveData', cmpInteractionTracking.onMessageReceiveData);
            expect(spMock.addEventListener).toHaveBeenCalledWith('onMessageChoiceSelect', cmpInteractionTracking.onMessageChoiceSelect);
            expect(spMock.addEventListener).toHaveBeenCalledWith('onPrivacyManagerAction', cmpInteractionTracking.onPrivacyManagerAction);
            expect(tcfapiMock).toHaveBeenCalledWith('addEventListener', 2, cmpInteractionTracking.onCmpuishown);
        });
    });


    describe('onMessageReceiveData()', () => {
        it('should write values to the Local Storage ', () => {
            const mockFn = jest.fn(localStorage.setItem);
            localStorage.setItem = mockFn;
            localStorage.setItem('cmp_ab_desc', 'cmp_ab_id', 'cmp_ab_bucket');
            expect(mockFn).toHaveBeenCalledTimes(1);
        });
    });

    describe('mock LocalStorage, define Getters and Setters', () => {
        //browserMocks.js
        let localStorageMock = (function () {
            let store = {};

            return {
                getItem: function (key) {
                    return store[key] || null;
                },
                setItem: function (key, value) {
                    store[key] = value.toString();
                },
                clear: function () {
                    store = {};
                }
            };

        })();

        Object.defineProperty(global, 'localStorage', {
            value: localStorageMock
        });

        beforeAll(() => {
            Object.defineProperty(global, 'b', {
                value: {}
            });
        })

        afterEach(() => {
            global.b = {};
            jest.clearAllMocks();

        })

        beforeEach(() => {
            localStorage.setItem('cmp_ab_id', 'test');
            localStorage.setItem('cmp_ab_desc', 'test');
            localStorage.setItem('cmp_ab_bucket', 'test');
        })


        it('should call utag.link with correct values when onMessageChoiceSelect is called with a message', () => {
            cmpInteractionTracking.onMessageChoiceSelect('test', '11');
            expect(linkSpy).toHaveBeenCalledWith(
                {
                    'event_name': 'cmp_interactions',
                    'event_action': 'click',
                    'event_label': 'cm_accept_all',
                    'event_data': 'test' + ' ' + 'test' + ' ' + 'test'
                }, expect.any(Function));
            expect(b).toEqual({
                'cmp_events': 'cm_accept_all',
                'cmp_interactions_true': 'false'
            })
        })


        it('should not call utag.link when onMessageChoiceSelect is called with an event type which doesn\'t exist in CONSENT_MESSAGE_EVENTS', () => {
            cmpInteractionTracking.onMessageChoiceSelect('test', '91');
            expect(linkSpy).not.toHaveBeenCalled();
        })


        it('should call utag.link with correct values when onPrivacyManagerAction is called with a type that exists in PRIVACY_MANAGER_EVENTS', () => {
            cmpInteractionTracking.onPrivacyManagerAction('SAVE_AND_EXIT');
            expect(linkSpy).toHaveBeenCalledWith(
                {
                    'event_name': 'cmp_interactions',
                    'event_action': 'click',
                    'event_label': 'pm_save_and_exit',
                    'event_data': 'test' + ' ' + 'test' + ' ' + 'test'
                }, expect.any(Function));
            expect(b).toEqual({
                'cmp_events': 'pm_save_and_exit',
                'cmp_interactions_true': 'false'
            })
        })

        it('should call utag.link with correct values when onPrivacyManagerAction is called with an all purposeConsent', () => {
            cmpInteractionTracking.onPrivacyManagerAction({purposeConsent: 'all'});
            expect(linkSpy).toHaveBeenCalledWith(
                {
                    'event_name': 'cmp_interactions',
                    'event_action': 'click',
                    'event_label': 'pm_accept_all',
                    'event_data': 'test' + ' ' + 'test' + ' ' + 'test'
                }, expect.any(Function));
            expect(b).toEqual({
                'cmp_events': 'pm_accept_all',
                'cmp_interactions_true': 'false'
            })
        })

        it('should call utag.link with correct values when onPrivacyManagerAction is called with a purposeConsent other from all', () => {
            cmpInteractionTracking.onPrivacyManagerAction({purposeConsent: 'test'});
            expect(linkSpy).toHaveBeenCalledWith(
                {
                    'event_name': 'cmp_interactions',
                    'event_action': 'click',
                    'event_label': 'pm_save_and_exit',
                    'event_data': 'test' + ' ' + 'test' + ' ' + 'test'
                }, expect.any(Function));
            expect(b).toEqual({
                'cmp_events': 'pm_save_and_exit',
                'cmp_interactions_true': 'false'
            })
        })

        it('should not call utag.link with correct values when onPrivacyManagerAction is called with an invalid type', () => {
            cmpInteractionTracking.onPrivacyManagerAction('test');
            expect(linkSpy).not.toHaveBeenCalled();
        })

        it('should call utag.view with correct values when onCmpuishown is called with a message with event status of onCmpuishown', () => {
            jest.useFakeTimers();
            cmpInteractionTracking.onCmpuishown({eventStatus: 'onCmpuishown'});
            jest.runAllTimers();
            expect(viewSpy).toHaveBeenCalledWith(
                {
                    'cmp_events': 'cm_layer_shown'
                }, expect.any(Function), expect.anything());
            jest.runOnlyPendingTimers();
            jest.useRealTimers();
        });

        it('should not call utag.view when onCmpuishown is called with a message without event status', () => {
            jest.useFakeTimers();
            cmpInteractionTracking.onCmpuishown('onCmpuishown');
            jest.runAllTimers();
            expect(viewSpy).not.toHaveBeenCalled();
            jest.runOnlyPendingTimers();
            jest.useRealTimers();
        });

        it('should not call utag.view when onCmpuishown is called with a message with event status other than onCmpuishown', () => {
            jest.useFakeTimers();
            cmpInteractionTracking.onCmpuishown({eventStatus: 'random'});
            jest.runAllTimers();
            expect(viewSpy).not.toHaveBeenCalled();
            jest.runOnlyPendingTimers();
            jest.useRealTimers();
        });

    })

});

