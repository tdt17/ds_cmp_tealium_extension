const functions = require('../extensions/cmp_interaction_tracking');
const localStorage = require('./mocks/browserMocks');

const spMock = {
    addEventlistener: jest.fn(),
    config: {}
}

describe('registerEventHandler()', ()=> {

    window._sp_ = spMock;

    it('should register event listener', ()=> {
        func
    });



});

