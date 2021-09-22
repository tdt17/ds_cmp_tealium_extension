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
            window._sp_queue = window._sp_queue || [];
            window._sp_queue.push(() => {
                window._sp_.addEventListener('onMessageReceiveData', function(data) {
                    processMessageData(data);
                });
            });
        }
    }
    if (!window.__utag_cmp_message_choice_listener) {
        window.__utag_cmp_message_choice_listener = true;

        window._sp_queue = window._sp_queue || [];
        window._sp_queue.push(() => {
            window._sp_.addEventListener('onMessageChoiceSelect', function(id, eventType) {
                if (CONSENT_MESSAGE_EVENTS[eventType]) {
                    b['cmp_events'] = CONSENT_MESSAGE_EVENTS[eventType];
                    b['cmp_interactions_true'] = 'true';
                    utag.link({
                        'event_name': 'cmp_interactions',
                        'event_action': 'click',
                        'event_label': CONSENT_MESSAGE_EVENTS[eventType],
                        'event_data': localStorage.getItem('cmp_ab_id') + ' ' + localStorage.getItem('cmp_ab_desc') + ' ' + localStorage.getItem('cmp_ab_bucket')
                    }, function() {});
                    b['cmp_interactions_true'] = 'false';
                }
            });
        });
    }
    if (!window.__utag_cmp_pm_action_listener) {
        window.__utag_cmp_pm_action_listener = true;

        window._sp_queue = window._sp_queue || [];
        window._sp_queue.push(() => {
            window._sp_.addEventListener('onPrivacyManagerAction', function(type) {
                if (PRIVACY_MANAGER_EVENTS[type] || type.purposeConsent) {
                    b['cmp_events'] = type.purposeConsent ? (type.purposeConsent === 'all' ? PRIVACY_MANAGER_EVENTS.ACCEPT_ALL : PRIVACY_MANAGER_EVENTS.SAVE_AND_EXIT) : PRIVACY_MANAGER_EVENTS[type];
                    b['cmp_interactions_true'] = 'true';
                    utag.link({
                        'event_name': 'cmp_interactions',
                        'event_action': 'click',
                        'event_label': b['cmp_events'],
                        'event_data': localStorage.getItem('cmp_ab_id') + ' ' + localStorage.getItem('cmp_ab_desc') + ' ' + localStorage.getItem('cmp_ab_bucket')
                    }, function() {});
                    b['cmp_interactions_true'] = 'false';
                }
            });
        });
    }
    if (!window.__utag_cmp_interaction_called) {
        window.__utag_cmp_interaction_called = true;
        window.__tcfapi('addEventListener', 2, function(tcData, success) {
            if (tcData && tcData.eventStatus === 'cmpuishown') {
                setTimeout(function() {
                    b['cmp_events'] = TCFAPI_COMMON_EVENTS.cmpuishown;
                    b['cmp_interactions_true'] = 'true';
                    b['first_pv'] = 'true';
                    console.log(b['first_pv']);
                    utag.view(utag.data,function(){
                        utag.link({
                            'event_name': 'cmp_interactions',
                            'event_action': 'click',
                            'event_label': TCFAPI_COMMON_EVENTS.cmpuishown,
                            'event_data': localStorage.getItem('cmp_ab_id') + ' ' + localStorage.getItem('cmp_ab_desc') + ' ' + localStorage.getItem('cmp_ab_bucket')
                        }, function() {})

                    },[10]);


                }, 300);
                b['cmp_interactions_true'] = 'false';
            }
        });
    }
})();
