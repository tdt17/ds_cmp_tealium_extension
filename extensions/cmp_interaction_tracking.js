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

    let cmp_ab_id = '';
    let cmp_ab_desc = '';
    let cmp_ab_bucket = '';

    // Create a centralized reference to all members of this unit which needs be exposed for unit testing.
    const exportedFunctions = {
        init,
        run,
        configSourcepoint,
        registerEventHandler,
        onMessageReceiveData,
        onMessageChoiceSelect,
        onPrivacyManagerAction,
        onCmpuishown,
        initABTestingProperties,
        sendLinkEvent,
        onMessage,
        setABTestingProperties,
        getABTestingProperties
    };

    function getABTestingProperties() {
        if (cmp_ab_id || cmp_ab_desc || cmp_ab_bucket) {
            return cmp_ab_id + ' '
                + cmp_ab_desc + ' '
                + cmp_ab_bucket;
        } else {
            return null;
        }

    }

    function setABTestingProperties(data) {
        if (data) {
            cmp_ab_desc = data.msgDescription;
            cmp_ab_id = data.messageId;
            cmp_ab_bucket = data.bucket;
        }
    }

    // Alternative way of setting AB-Testing properties through global letiable.
    function initABTestingProperties() {
        if (window.__cmp_interaction_data && window.__cmp_interaction_data.onMessageReceiveData) {
            exportedFunctions.setABTestingProperties(window.__cmp_interaction_data.onMessageReceiveData);
        }
    }

    function onMessageReceiveData(data) {
        setABTestingProperties(data);
    }

    function sendLinkEvent(label) {
        window.utag.link({
            'event_name': 'cmp_interactions',
            'event_action': 'click',
            'event_label': label,
            'event_data': getABTestingProperties()
        });
    }

    function onMessageChoiceSelect(id, eventType) {
        if (CONSENT_MESSAGE_EVENTS[eventType]) {
            window.utag.data['cmp_events'] = CONSENT_MESSAGE_EVENTS[eventType];
            exportedFunctions.sendLinkEvent(CONSENT_MESSAGE_EVENTS[eventType]);
            window.utag.loader.SC('utag_main', {'cmp_after': 'true' + ';exp-session'});
        }
    }

    function onPrivacyManagerAction(eventType) {
        if (PRIVACY_MANAGER_EVENTS[eventType] || eventType.purposeConsent) {
            window.utag.data['cmp_events'] = eventType.purposeConsent ? (eventType.purposeConsent === 'all' ? PRIVACY_MANAGER_EVENTS.ACCEPT_ALL : PRIVACY_MANAGER_EVENTS.SAVE_AND_EXIT) : PRIVACY_MANAGER_EVENTS[eventType];
            exportedFunctions.sendLinkEvent(window.utag.data['cmp_events']);
        }
    }

    function onCmpuishown(tcData) {
        if (tcData && tcData.eventStatus === 'cmpuishown') {
            window.utag.data.cmp_events = TCFAPI_COMMON_EVENTS.CMP_UI_SHOWN;
            exportedFunctions.sendLinkEvent(TCFAPI_COMMON_EVENTS.CMP_UI_SHOWN);
        }
    }

    function onMessage(event) {
        if (event.data && event.data.cmpLayerMessage) {
            exportedFunctions.sendLinkEvent(event.data.payload);
        }
    }

    function registerEventHandler() {
        window._sp_queue = window._sp_queue || [];
        window._sp_queue.push(() => {
            window._sp_.addEventListener('onMessageReceiveData', onMessageReceiveData);
        });
        window._sp_queue.push(() => {
            window._sp_.addEventListener('onMessageChoiceSelect', onMessageChoiceSelect);
        });
        window._sp_queue.push(() => {
            window._sp_.addEventListener('onPrivacyManagerAction', onPrivacyManagerAction);
        });
        window._sp_queue.push(() => {
            window.__tcfapi('addEventListener', 2, onCmpuishown);
        });
        window.addEventListener('message', onMessage, false);
    }

    function configSourcepoint() {
        window._sp_.config.events = window._sp_.config.events || {};
    }

    function run() {
        exportedFunctions.configSourcepoint();
        exportedFunctions.initABTestingProperties();
        exportedFunctions.registerEventHandler();
    }

    function init() {
        if (window._sp_ && window._sp_.config && !window.__utag_cmp_event_tracking) {
            exportedFunctions.run();
            window.__utag_cmp_event_tracking = true; // Protection against multiple executions.
        }
    }

    // Evaluate runtime environment (Browser or Node.js)
    if (typeof exports === 'object') {
        // Expose reference to members for unit testing.
        module.exports = exportedFunctions;
    } else {
        // Call entry point in browser context.
        init();
    }

})();
