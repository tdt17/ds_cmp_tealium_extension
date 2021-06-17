const functions = require('../extensions/cmp_interaction_tracking');
const localStorage = require('./mocks/browserMocks');

let data = {}


    it( 'setItem mock fn', () => {
        const mockFn = jest.fn( localStorage.setItem );
        localStorage.setItem = mockFn;
        localStorage.setItem( 'cmp_ab_desc', 'cmp_ab_id','cmp_ab_bucket' );
        expect( mockFn ).toHaveBeenCalledTimes( 1 );
        //const processMessageDataFn = functions.processMessageData(data)
        //processMessageDataFn(data);
        //expect(functions.processMessageData(data)).toBe(typeof data)
    } );




