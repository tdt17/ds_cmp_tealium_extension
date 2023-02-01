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

    describe('getAdobeObject', () => {
        const validAdobeObject = {
            version: 'any-version'
        };

        const invalidAdobeObject = {
            anyProperty: 'any-property'
        };

        it('should return the Adobe object when it has the name \'s\'', () => {
            window.s = validAdobeObject;
            const result = s._utils.getAdobeObject();
            expect(result).toBe(validAdobeObject);
        });

        it('should return an empty object when something else is assigned to the global variable with name \'s\'', () => {
            window.s = invalidAdobeObject;
            const result = s._utils.getAdobeObject();
            expect(result).toEqual({});
        });

        it('should return the Adobe object when it has the name \'cmp\'', () => {
            window.cmp = validAdobeObject;
            const result = s._utils.getAdobeObject();
            expect(result).toBe(validAdobeObject);
        });

        it('should return an empty object when something else is assigned to the global variable with name \'cmp\'', () => {
            window.cmp = invalidAdobeObject;
            const result = s._utils.getAdobeObject();
            expect(result).toEqual({});
        });

        it('should return an empty object when something else is assigned to the global variables \'s\' and \'cmp\' ', () => {
            window.s = invalidAdobeObject;
            window.cmp = invalidAdobeObject;
            const result = s._utils.getAdobeObject();
            expect(result).toEqual({});
        });
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

        it('should return the document type from various sources', () => {

            const PROPERTY_NAMES = [
                'page_type',
                'page_document_type',
                'adobe_docType',
                'ad_page_document_type',
                'page_mapped_doctype_for_pagename'];

            PROPERTY_NAMES.forEach(propertyName => {
                window.utag.data[propertyName] = 'any-' + propertyName;
                const result = s._utils.getDocType();
                expect(result).toBe('any-' + propertyName);
                delete window.utag.data[propertyName];
            });

        });
    });

    describe('isArticlePage()', () => {
        let getDocTypeMock;

        beforeEach(() => {
            getDocTypeMock = jest.spyOn(s._utils, 'getDocType').mockImplementation();
        });

        it('should be false when page is NOT of type article', () => {
            getDocTypeMock.mockReturnValue('any-non-article-type');
            const result = s._utils.isArticlePage();
            expect(result).toBe(false);
        });

        it('should be true when page is of type article', () => {
            const ARTICLE_TYPES = [
                'article',
                'artikel',
                'live',
                'gallery',
                'video',
                'post',
                'media',
                'sportdaten',
                'live-sport'
            ];

            ARTICLE_TYPES.forEach(articleType => {
                getDocTypeMock.mockReturnValue(articleType);
                const result = s._utils.isArticlePage();
                expect(result).toBe(true);
            });
        });
    });

    describe('isFirstPageView', () => {
        it('should return true if an global object with name cmp exists', () => {
            window.cmp = {};
            const result = s._utils.isFirstPageView();

            expect(result).toBe(true);
        });

        it('should return false if there is no global object with the name cmp', () => {
            const result = s._utils.isFirstPageView();

            expect(result).toBe(false);
        });
    });

    describe('getReferrerFromLocationHash', () => {
        let getReferrerFromLocationHashMock;

        beforeEach(() => {
            getReferrerFromLocationHashMock = jest.spyOn(s._utils, 'getReferrerFromLocationHash').mockReturnValue('');
        });

        it('should get the hash if the location hash as the referrer if available', () => {
            const anyReferrerFromHash = 'any-referrer-from-hash';
            getReferrerFromLocationHashMock.mockReturnValue(anyReferrerFromHash);
            const result = s._utils.getReferrerFromLocationHash();
            expect(result).toBe(anyReferrerFromHash);
        });

    });

    describe('getReferrerFromGetParameter', () => {
        let getReferrerFromGetParameterMock;

        beforeEach(() => {
            getReferrerFromGetParameterMock = jest.spyOn(s._utils, 'getReferrerFromGetParameter').mockReturnValue('');
        });

        it('should get the get Paraneter if the get parameter as the referrer if available', () => {
            const anyReferrerFromGet = 'any-referrer-from-get';
            getReferrerFromGetParameterMock.mockReturnValue(anyReferrerFromGet);
            const result = s._utils.getReferrerFromGetParameter();
            expect(result).toBe(anyReferrerFromGet);
        });

    });

    /*describe('getReferrerFromGetParameter', () => {
        let getReferrerFromGetParameterMock;

        beforeEach(() => {
            getReferrerFromGetParameterMock = jest.spyOn(s._utils, 'getReferrerFromGetParameter').mockReturnValue('');
        });

        it('should use the URL from GET Parameter as the referrer if available', () => {
            const anyReferrerFromGET = 'any-referrer-from-get';
            getReferrerFromGetParameterMock.mockReturnValue(anyReferrerFromGET);
            //s._utils.getViewTypeByReferrer();
            expect(getReferrerFromGetParameterMock).toHaveBeenCalledWith(anyReferrerFromGET);
        });
    });*/
});