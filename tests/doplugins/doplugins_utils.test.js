const {createWindowMock} = require('../mocks/browserMocks');
const sObject = require('../../extensions/doPlugins_global');

describe('s_utils', () => {
    let s;
    beforeEach(() => {
        // Create a fresh window mock for each test.
        const windowMock = createWindowMock();
        jest.spyOn(global, 'window', 'get')
            .mockImplementation(() => (windowMock));

        // Provide a fresh copy of the s-object for each test.
        s = {...sObject};
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('getDomainFromURLString(URLString)', () => {
        it('should return domain from URL string', () => {
            const domain = 'www.bild.de';
            const urlString = `https://${domain}/any-path`;
            const result = s._utils.getDomainFromURLString(urlString);
            expect(result).toBe(domain);
        });

        it('should return an empty string if passed in string is not a valid URL', () => {
            const anyString = 'invalid-url-string';
            const result = s._utils.getDomainFromURLString(anyString);
            expect(result).toBe('');
        });
    });

    describe('getDocType', () => {
        it('should return empty string if no document type is present', () => {
            const value = s._utils.getDocType();

            expect(value).toBe('');
        });

        it('should return adobe_doc_type if it is present', () => {
            window.utag.data.adobe_doc_type = 'test_doc_type';
            const value = s._utils.getDocType();

            expect(value).toBe(window.utag.data.adobe_doc_type);
        });

        it('should return ad_page_document_type if it is present', () => {
            window.utag.data.ad_page_document_type = 'test_ad_page_document_type';
            const value = s._utils.getDocType();

            expect(value).toBe(window.utag.data.ad_page_document_type);
        });

        it('should return page_type if it is present', () => {
            window.utag.data.page_type = 'test_page_type';
            const value = s._utils.getDocType();

            expect(value).toBe(window.utag.data.page_type);
        });

        it('should return adobe_docType if it is present', () => {
            window.utag.data.adobe_docType = 'test_adobe_docType';
            const value = s._utils.getDocType();

            expect(value).toBe(window.utag.data.adobe_docType);
        });
    });
});
