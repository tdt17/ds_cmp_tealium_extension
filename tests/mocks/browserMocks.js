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

module.exports = {
    localStorageMock: localStorageMock()
};
