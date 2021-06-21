const {cmpInteractionTracking,onMessageChoiceSelect,setAdobeTagId,onPrivacyManagerAction} = require('../extensions/cmp_interaction_tracking');
//const localStorage = require('./mocks/browserMocks');

const spMock = {
    addEventListener: jest.fn(),
    config: null
}

const tcfapiMock = jest.fn();
const linkSpy = jest.fn();
global.utag = {
    link:  linkSpy
}

window.b = {};


describe("Test CMP Interaction Tracking", () => {
    // General Setup

    beforeEach(()=> {
        window._sp_ = spMock;
        window.__tcfapi = tcfapiMock;
    })

    afterEach(()=> {
        jest.restoreAllMocks();
        delete window._sp_;
        delete window.__utag_cmp_event_tracking;
        delete window.__tcfapi;
    });

    describe('init()', ()=> {
    it('should call the major functions of this unit', () => {

        jest.spyOn(cmpInteractionTracking, 'onMessageReceiveData').mockImplementation();
        jest.spyOn(cmpInteractionTracking, 'onMessageChoiceSelect').mockImplementation();
        jest.spyOn(cmpInteractionTracking, 'onPrivacyManagerAction').mockImplementation();
        jest.spyOn(cmpInteractionTracking, 'onCmpuishown').mockImplementation();

        cmpInteractionTracking.run();

        expect(cmpInteractionTracking.onMessageReceiveData).toBeCalledTimes(1);
        expect(cmpInteractionTracking.onMessageChoiceSelect).toBeCalledTimes(1);
        expect(cmpInteractionTracking.onPrivacyManagerAction).toBeCalledTimes(1);
        expect(cmpInteractionTracking.onCmpuishown).toBeCalledTimes(1);
    });
    });

    describe('onMessageReceiveData()', ()=> {
    it( 'should write values to the Local Storage ', () => {
        const mockFn = jest.fn( localStorage.setItem );
        localStorage.setItem = mockFn;
        localStorage.setItem( 'cmp_ab_desc', 'cmp_ab_id','cmp_ab_bucket' );
        expect( mockFn ).toHaveBeenCalledTimes( 1 );
    });
    });


    describe('',() => {
        //browserMocks.js
        var localStorageMock = (function() {
            var store = {};

            return {
                getItem: function(key) {
                    return store[key] || null;
                },
                setItem: function(key, value) {
                    store[key] = value.toString();
                },
                clear: function() {
                    store = {};
                }
            };

        })();

        Object.defineProperty(global, 'localStorage', {
            value: localStorageMock
        });

        beforeEach(() => {
            localStorage.setItem('cmp_ab_id','test');
            localStorage.setItem('cmp_ab_desc','test');
            localStorage.setItem('cmp_ab_bucket','test');
            Object.defineProperty(global, 'b', {
                value: {}
            });
        })


        it('should call utag.link with correct values when onMessageChoiceSelect is called with a message',() => {
            onMessageChoiceSelect('test','11');
            expect(linkSpy).toHaveBeenCalledWith(
                {
                    'event_name': 'cmp_interactions',
                    'event_action': 'click',
                    'event_label': 'cm_accept_all',
                    'event_data': 'test' + ' ' + 'test' + ' ' + 'test'
                },expect.any(Function));
        })


        it('should throw an error if domain is not present in ADOBE_TAG_IDS',() => {
            expect(setAdobeTagId('example.com')).toThrow();
        });
    /*    it('should call utag.link with correct values when onPrivacyManagerAction is called with a message',() => {
            onPrivacyManagerAction('test');
            expect(linkSpy).toHaveBeenCalledWith(
                {
                    'event_name': 'cmp_interactions',
                    'event_action': 'click',
                    'event_label': b['cmp_events'],
                    'event_data': 'test' + ' ' + 'test' + ' ' + 'test'
                },expect.any(Function));
        })
    })
*/

});});

