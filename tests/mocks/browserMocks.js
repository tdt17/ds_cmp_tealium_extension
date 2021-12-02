//browserMocks.js
function localStorageMock() {
    let store = {};

    return {
        getItem: jest.fn().mockImplementation(key => {
            return store[key] || null;
        }),
        setItem: jest.fn().mockImplementation((key, value) => {
            store[key] = value.toString();
        }),
        clear: jest.fn().mockImplementation(() => {
            store = {};
        })
    };
}

function createWindowMock() {
    return {
        document: {
            referrer: '',
            domain: ''
        },
        navigator: {
            userAgent: ''
        },
        screen: {
            width: '',
            height: ''
        },
        utag: {
            data: {}
        },
        location: {
            hash: ''
        }
    };
}

module.exports = {
    localStorageMock: localStorageMock(),
    createWindowMock: createWindowMock
};
