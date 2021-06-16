(function() {
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
        'cmpuishown': 'cm_layer_shown',
    };
    if (!window._sp_ || !window._sp_.config) {
        return;
    }
    if (!window._sp_.config.events) {
        window._sp_.config.events = {};
    }
    const processMessageData = function(data) {
        localStorage.setItem('cmp_ab_desc', data.msgDescription);
        localStorage.setItem('cmp_ab_id', data.messageId);
        localStorage.setItem('cmp_ab_bucket', data.bucket);
    }
    if (!window.__utag_cmp_message_received_listener) {
        window.__utag_cmp_message_received_listener = true;
        if (window.__cmp_onMessageReceiveData) {
            processMessageData(window.__cmp_onMessageReceiveData);
        } else {
            const cbMRD = window._sp_.config.events.onMessageReceiveData;
            window._sp_.config.events.onMessageReceiveData = function(data) {
                processMessageData(data);
                cbMRD && cbMRD(data);
            }
            ;
        }
    }
    if (!window.__utag_cmp_message_choice_listener) {
        window.__utag_cmp_message_choice_listener = true;
        const cb = window._sp_.config.events.onMessageChoiceSelect;
        window._sp_.config.events.onMessageChoiceSelect = function(id, eventType) {
            if (CONSENT_MESSAGE_EVENTS[eventType]) {
                b['cmp_events'] = CONSENT_MESSAGE_EVENTS[eventType];
                utag.link({
                    'event_name': 'cmp_interactions',
                    'event_action': 'click',
                    'event_label': CONSENT_MESSAGE_EVENTS[eventType],
                    'event_data': localStorage.getItem('cmp_ab_id') + ' ' + localStorage.getItem('cmp_ab_desc') + ' ' + localStorage.getItem('cmp_ab_bucket')
                }, function() {})
            }
            cb && cb(id, eventType);
        }
        ;
    }
    if (!window.__utag_cmp_pm_action_listener) {
        window.__utag_cmp_pm_action_listener = true;
        const cbPM = window._sp_.config.events.onPrivacyManagerAction;
        window._sp_.config.events.onPrivacyManagerAction = function(type) {

            if (PRIVACY_MANAGER_EVENTS[type] || type.purposeConsent) {
                b['cmp_events'] = type.purposeConsent ? (type.purposeConsent === 'all' ? PRIVACY_MANAGER_EVENTS.ACCEPT_ALL : PRIVACY_MANAGER_EVENTS.SAVE_AND_EXIT) : PRIVACY_MANAGER_EVENTS[type];
                utag.link({
                    'event_name': 'cmp_interactions',
                    'event_action': 'click',
                    'event_label': b['cmp_events'],
                    'event_data': localStorage.getItem('cmp_ab_id') + ' ' + localStorage.getItem('cmp_ab_desc') + ' ' + localStorage.getItem('cmp_ab_bucket')
                }, function() {})
            }
            cbPM && cbPM(type);
        }
        ;
    }
    if (!window.__utag_cmp_interaction_called) {
        window.__utag_cmp_interaction_called = true;
        window.__tcfapi('addEventListener', 2, function(tcData, success) {
            if (tcData && tcData.eventStatus === 'cmpuishown') {
                setTimeout(function() {
                    b['cmp_events'] = TCFAPI_COMMON_EVENTS.cmpuishown;
                    utag.link({
                        'event_name': 'cmp_interactions',
                        'event_action': 'click',
                        'event_label': TCFAPI_COMMON_EVENTS.cmpuishown,
                        'event_data': localStorage.getItem('cmp_ab_id') + ' ' + localStorage.getItem('cmp_ab_desc') + ' ' + localStorage.getItem('cmp_ab_bucket')
                    }, function() {})
                }, 16);
                // var img = new Image();
                //    img.src="https://as.bild.de/b/ss/axelspringerwelt/1/JS-2.10.0/s98198579731401?AQB=1&ndh=1&pf=1&t=23%2F10%2F2020%2023%3A8%3A28%201%20-60&aamlh=6&ce=UTF-8&ns=axelspringer&g=https%3A%2F%2Ftags.tiqcdn.com%2Futag%2Faxelspringer%2Fwelt-edition.app.ios%2Fdev%2Fmobile.html%3F&cc=USD&server=tags.tiqcdn.com&c2=app&v2=app&c47=cmp_interactions&c48=show&c49=cm_layer_shown&v71=1606169308&v170=cmp_interactions&v171=show&v172=cm_layer_shown&pe=lnk_o&pev2=no%20link_name&s=414x896&c=32&j=1.6&v=N&k=Y&bw=896&bh=8&mcorgid=B21B678254F601E20A4C98A5%40AdobeOrg&AQE=1"

            }
        });
    }
})();
