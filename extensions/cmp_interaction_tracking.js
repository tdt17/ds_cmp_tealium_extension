(function () {
    const CONSENT_MESSAGE_EVENTS = {
        11: 'cm_accept_all',
        12: 'cm_show_privacy_manager',
        13: 'cm_reject_all',
    };
    const PRIVACY_MANAGER_EVENTS = {
        SAVE_AND_EXIT: 'pm_save_and_exit',
        ACCEPT_ALL: 'pm_accept_all',
    };
    const TCFAPI_COMMON_EVENTS = {
        CMP_UI_SHOWN: 'cm_layer_shown',
    };

    // Tealium profile to Adobe TagId mapping.
    const TEALIUM_PROFILES = {
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

    function getABTestingProperties() {
        return window.localStorage.getItem('cmp_ab_id') + ' '
            + window.localStorage.getItem('cmp_ab_desc') + ' '
            + window.localStorage.getItem('cmp_ab_bucket');
    }

    function setABTestingProperties(data){
        window.localStorage.setItem('cmp_ab_desc', data.msgDescription);
        window.localStorage.setItem('cmp_ab_id', data.messageId);
        window.localStorage.setItem('cmp_ab_bucket', data.bucket);
    }

    function onMessageReceiveData(data) {
        setABTestingProperties(data);
    }

    function onMessageChoiceSelect(id, eventType) {
        if (CONSENT_MESSAGE_EVENTS[eventType]) {
            window.utag.data['cmp_events'] = CONSENT_MESSAGE_EVENTS[eventType];
            window.utag.data['cmp_interactions_true'] = 'true';
            window.utag.link({
                'event_name': 'cmp_interactions',
                'event_action': 'click',
                'event_label': CONSENT_MESSAGE_EVENTS[eventType],
                'event_data': getABTestingProperties()
            }, function () {
            });
            window.utag.data['cmp_interactions_true'] = 'false';
        }
    }

    function onPrivacyManagerAction(eventType) {
        if (PRIVACY_MANAGER_EVENTS[eventType] || eventType.purposeConsent) {
            window.utag.data['cmp_events'] = eventType.purposeConsent ? (eventType.purposeConsent === 'all' ? PRIVACY_MANAGER_EVENTS.ACCEPT_ALL : PRIVACY_MANAGER_EVENTS.SAVE_AND_EXIT) : PRIVACY_MANAGER_EVENTS[eventType];
            window.utag.data['cmp_interactions_true'] = 'true';
            window.utag.link({
                'event_name': 'cmp_interactions',
                'event_action': 'click',
                'event_label': window.utag.data['cmp_events'],
                'event_data': getABTestingProperties()
            }, function () {
            });
            window.utag.data['cmp_interactions_true'] = 'false';
        }
    }

    function onCmpuishown(tcData) {
        if (tcData && tcData.eventStatus === 'cmpuishown') {
            window.utag.data.cmp_events = 'cm_layer_shown';
                setTimeout(function () {
                    console.log('firstPV with tagID: ', adobeTagId);
                    window.utag.data['cmp_events'] = TCFAPI_COMMON_EVENTS.CMP_UI_SHOWN;
                    window.utag.data['cmp_interactions_true'] = 'true';
                    window.utag.data['first_pv'] = 'true';
                    window.utag.view(window.utag.data, function () {
                        window.utag.link({
                            'event_name': 'cmp_interactions',
                            'event_action': 'click',
                            'event_label': TCFAPI_COMMON_EVENTS.CMP_UI_SHOWN,
                            'event_data': getABTestingProperties()
                        }, function () {});
                    }, adobeTagId);
                }, 300); //fixme: decide for a proper timeout value
            window.utag.data['cmp_interactions_true'] = 'false';
        }
    }

    function getAdobeTagId(tealiumProfileName) {
        const adobeTagId = TEALIUM_PROFILES[tealiumProfileName];
        if (!adobeTagId) {
            throw new Error('Cannot find Adobe Tag ID for profile: ' + tealiumProfileName);
        }
        return adobeTagId;
    }

    function registerEventHandler() {
        window._sp_queue = window._sp_queue || [];
        window._sp_queue.push(()=>{ window._sp_.addEventListener('onMessageReceiveData', onMessageReceiveData); });
        window._sp_queue.push(()=>{ window._sp_.addEventListener('onMessageChoiceSelect', onMessageChoiceSelect); });
        window._sp_queue.push(()=>{ window._sp_.addEventListener('onPrivacyManagerAction', onPrivacyManagerAction); });
        window._sp_queue.push(()=>{ window.__tcfapi('addEventListener', 2, onCmpuishown); });
    }

    function configSourcepoint() {
        window._sp_.config.events = window._sp_.config.events || {};
    }

    function run() {
        try {
            adobeTagId = exportedFunctions.getAdobeTagId(window.utag.data.tealium_profile);
            exportedFunctions.configSourcepoint();
            exportedFunctions.registerEventHandler();
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

    // Create a centralized reference to all members of this unit which needs be exposed for unit testing.
    const exportedFunctions = {
        init,
        run,
        configSourcepoint,
        getAdobeTagId,
        registerEventHandler,
        onMessageReceiveData,
        onMessageChoiceSelect,
        onPrivacyManagerAction,
        onCmpuishown
    }

    // Evaluate runtime environment (Browser or Node.js)
    if (typeof exports === "object") {
        // Expose reference to members for unit testing.
        module.exports = exportedFunctions;
    } else {
        // Call entry point in browser context.
        init();
    }

})();
