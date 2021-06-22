(function () {
    const CONSENT_MESSAGE_EVENTS = {
        11: 'cm_accept_all',
        12: 'cm_show_privacy_manager',
        13: 'cm_reject_all',
    };
    const PRIVACY_MANAGER_EVENTS = {
        'SAVE_AND_EXIT': 'pm_save_and_exit',
        'ACCEPT_ALL': 'pm_accept_all',
    };
    const TCFAPI_COMMON_EVENTS = {
        'onCmpuishown': 'cm_layer_shown',
    };

    const ADOBE_TAG_IDS = {
        'abo-autobild.de': 23,
        'ac-autobild': 10,
        'ac-computerbild': 9,
        'asmb-metal-hammer.de': 22,
        'asmb-musikexpress.de': 14,
        'asmb-rollingstone.de': 16,
        'bild-bild.de': 12,
        'bild-fitbook.de': 40,
        'bild-myhomebook.de': 37,
        'bild-sportbild.de': 16,
        'bild-stylebook.de': 30,
        'bild-techbook.de': 82,
        'bild-travelbook.de': 42,
        'bild-offer': 24,
        'bild': 386,
        'bz-bz-berlin.de': 9,
        'cbo-computerbild.de': 25,
        'shop.bild': 181,
        'welt': 233
    }

    var adobeTagId;

    function onMessageReceiveData(data) {
        localStorage.setItem('cmp_ab_desc', data.msgDescription);
        localStorage.setItem('cmp_ab_id', data.messageId);
        localStorage.setItem('cmp_ab_bucket', data.bucket);
    }

    // Function for Message Handling
    function onMessageChoiceSelect(id, eventType) {
        if (CONSENT_MESSAGE_EVENTS[eventType]) {
            b['cmp_events'] = CONSENT_MESSAGE_EVENTS[eventType];
            b['cmp_interactions_true'] = 'true';
            utag.link({
                'event_name': 'cmp_interactions',
                'event_action': 'click',
                'event_label': CONSENT_MESSAGE_EVENTS[eventType],
                'event_data': localStorage.getItem('cmp_ab_id') + ' ' + localStorage.getItem('cmp_ab_desc') + ' ' + localStorage.getItem('cmp_ab_bucket')
            }, function () {
            });
            b['cmp_interactions_true'] = 'false';
        }
    }

    // Function for Privacy Manager Handling
    function onPrivacyManagerAction(type) {
        if (PRIVACY_MANAGER_EVENTS[type] || type.purposeConsent) {
            b['cmp_events'] = type.purposeConsent ? (type.purposeConsent === 'all' ? PRIVACY_MANAGER_EVENTS.ACCEPT_ALL : PRIVACY_MANAGER_EVENTS.SAVE_AND_EXIT) : PRIVACY_MANAGER_EVENTS[type];
            b['cmp_interactions_true'] = 'true';
            utag.link({
                'event_name': 'cmp_interactions',
                'event_action': 'click',
                'event_label': b['cmp_events'],
                'event_data': localStorage.getItem('cmp_ab_id') + ' ' + localStorage.getItem('cmp_ab_desc') + ' ' + localStorage.getItem('cmp_ab_bucket')
            }, function () {
            });
            b['cmp_interactions_true'] = 'false';
        }
    }

    // Function for CMP Layer Handling
    function onCmpuishown(tcData) {
        if (tcData && tcData.eventStatus === 'onCmpuishown') {
            window.utag.data.cmp_events = 'cm_layer_shown',
                setTimeout(function () {
                    b['cmp_events'] = TCFAPI_COMMON_EVENTS.cmpuishown;
                    b['cmp_interactions_true'] = 'true';
                    b['first_pv'] = 'true';
                    utag.view(utag.data, function () {
                        utag.link({
                            'event_name': 'cmp_interactions',
                            'event_action': 'click',
                            'event_label': TCFAPI_COMMON_EVENTS.cmpuishown,
                            'event_data': localStorage.getItem('cmp_ab_id') + ' ' +
                                '' + localStorage.getItem('cmp_ab_desc') + ' ' +
                                '' + localStorage.getItem('cmp_ab_bucket')
                        }, function () {
                        })

                    }, [adobeTagId]);
                }, 300); //fixme: decide for a proper timeout value
            b['cmp_interactions_true'] = 'false';
        }
    }

    function setAdobeTagId() {
        const tealiumProfileName = window.utag_data.ut.profile;
        adobeTagId = ADOBE_TAG_IDS[tealiumProfileName];
        if (!adobeTagId) {
            throw new Error('Cannot find Adobe Tag ID for domain: ' + domain);
        }
        return adobeTagId;
    }

    function registerEventHandler() {
        window._sp_.addEventListener('onMessageReceiveData', onMessageReceiveData);
        window._sp_.addEventListener('onMessageChoiceSelect', onMessageChoiceSelect);
        window._sp_.addEventListener('onPrivacyManagerAction', onPrivacyManagerAction);
        window.__tcfapi('addEventListener', 2, onCmpuishown);
    }

    function configSourcepoint() {
        //fixme: find out if _sp_queue is needed
        window._sp_queue = [];
        if (!window._sp_.config.events) {
            window._sp_.config.events = {};
        }
    }

    function processMissedMessage() {
        if (window.__cmp_onMessageReceiveData) {
            onMessageReceiveData(window.__cmp_onMessageReceiveData);
        }
    }

    function init() {
        try {
            configSourcepoint();
            setAdobeTagId();
            registerEventHandler();
            processMissedMessage();
            window.__utag_cmp_event_tracking = true; // Protection against multiple executions.
        } catch (e) {
            console.error(e);
        }
    }

    if (window._sp_ && window._sp_.config && !window.__utag_cmp_event_tracking) {
        init();
    }

    module.exports = {
        onMessageReceiveData, onMessageChoiceSelect, onPrivacyManagerAction,onCmpuishown, setAdobeTagId,
        registerEventHandler,configSourcepoint,processMissedMessage,init
    }

})();
