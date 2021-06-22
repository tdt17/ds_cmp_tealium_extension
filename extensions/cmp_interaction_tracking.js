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
        'www.autobild.de': 23,
        'www.bild.de': 12,
        'www.bz-berlin.de': 9,
        'www.fitbook.de': 40,
        'www.metal-hammer.de': 22,
        'www.musikexpress.de': 14,
        'www.myhomebook.de': 37,
        'www.rollingstone.de': 16,
        'www.stylebook.de': 30,
        'www.techbook.de': 82,
        'www.travelbook.de': 42
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

    function setAdobeTagId(domain) {
        adobeTagId = ADOBE_TAG_IDS[domain];
        if (!adobeTagId) {
            throw new Error('Cannot find Adobe Tag ID for domain: ' + domain);
        }
    }

    function registerEventHandler() {
        window._sp_.addEventListener('onMessageReceiveData', onMessageReceiveData);
        window._sp_.addEventListener('onMessageChoiceSelect', onMessageChoiceSelect);
        window._sp_.addEventListener('onPrivacyManagerAction', onPrivacyManagerAction);
        window.__tcfapi('addEventListener', 2, onCmpuishown);
    }

    function configSourcepoint() {
        window._sp_queue = []; //fixme: find out if _sp_queue is needed
        window._sp_.config.events = window._sp_.config.events || {};
    }

    function processMissedMessage() {
        if (window.__cmp_onMessageReceiveData) {
            exportedFunctions.onMessageReceiveData(window.__cmp_onMessageReceiveData);
        }
    }

    function run() {
        try {
            exportedFunctions.configSourcepoint();
            exportedFunctions.setAdobeTagId('www.autobild.de'); //fixme
            exportedFunctions.registerEventHandler();
            exportedFunctions.processMissedMessage();
        } catch (e) {
            console.error(e);
        }
    }

    function init() {
        if (window._sp_ && window._sp_.config && !window.__utag_cmp_event_tracking) {
            exportedFunctions.run();
            window.__utag_cmp_event_tracking = true; // Protection against multiple executions.
        }
    }

    // We need a centralized reference to all members of this unit which needs be exposed to tests.
    // https://medium.com/@DavideRama/mock-spy-exported-functions-within-a-single-module-in-jest-cdf2b61af642
    const exportedFunctions = {
        init,
        run,
        configSourcepoint,
        setAdobeTagId,
        registerEventHandler,
        processMissedMessage,
        onMessageReceiveData,
        onMessageChoiceSelect,
        onPrivacyManagerAction,
        onCmpuishown
    }

    // Expose reference to members for unit testing.
    if (typeof exports === "object") {
        module.exports = exportedFunctions;
    }

    init();

})();
