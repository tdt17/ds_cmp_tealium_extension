const doPluginsGlobal = require('../../extensions/doPlugins_global');
const {createWindowMock} = require('../mocks/browserMocks');

describe('articleViewType()', () => {

    beforeEach(() => {
        // Create a fresh window mock for each test.
        const windowMock = createWindowMock();
        jest.spyOn(global, 'window', 'get')
            .mockImplementation(() => (windowMock));
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('getPageType', () => {
        const pageType = 'any-page-type';
        it('should get the page type from the data layer: page_type', function () {
            window.utag.data = {
                page_type: pageType
            };
            const result = doPluginsGlobal.articleViewType.getPageType();

            expect(result).toBe(pageType);
        });

        it('should get the page type from the data layer: page_document_type', function () {
            window.utag.data = {
                page_document_type: pageType
            };
            const result = doPluginsGlobal.articleViewType.getPageType();

            expect(result).toBe(pageType);
        });

        it('should get the page type from the data layer: page_mapped_doctype_for_pagename', function () {
            window.utag.data = {
                page_mapped_doctype_for_pagename: pageType
            };
            const result = doPluginsGlobal.articleViewType.getPageType();

            expect(result).toBe(pageType);
        });
    });

    describe('isArticlePage()', () => {
        const ARTICLE_TYPES = [
            'article',
            'artikel',
            'live',
            'gallery',
            'video',
            'post',
            'media'
        ];

        it('should be false when page is NOT of type article', () => {
            const result = doPluginsGlobal.articleViewType.isArticlePage();
            expect(result).toBe(false);
        });

        it('should be true when page is of type article', () => {
            const PROPERTY_NAMES = ['page_type', 'page_document_type', 'page_mapped_doctype_for_pagename'];

            PROPERTY_NAMES.forEach(propertyName => {
                ARTICLE_TYPES.forEach(articleType => {
                    window.utag.data[propertyName] = articleType;
                    const result = doPluginsGlobal.articleViewType.isArticlePage();
                    expect(result).toBe(true);
                });
                delete window.utag.data[propertyName];
            });

        });
    });

    describe('getDomainFromURLString(URLString)', () => {
        it('should return domain from URL string', () => {
            const domain = 'www.bild.de';
            const urlString = `https://${domain}/any-path`;
            const result = doPluginsGlobal.articleViewType.getDomainFromURLString(urlString);
            expect(result).toBe(domain);
        });

        it('should return an empty string if passed in string is not a valid URL', () => {
            const anyString = 'invalid-url-string';
            const result = doPluginsGlobal.articleViewType.getDomainFromURLString(anyString);
            expect(result).toBe('');
        });
    });

    describe('isFromSearch()', () => {
        it('should return TRUE if referrer is a search engine', function () {
            const searchEngines = ['google.', 'bing.com', 'ecosia.org', 'duckduckgo.com', 'amp-welt-de.cdn.ampproject.org', 'qwant.com', 'suche.t-online.de', '.yandex.', 'yahoo.com', 'googleapis.com', 'nortonsafe.search.ask.com', 'wikipedia.org', 'googleadservices.com', 'search.myway.com', 'lycos.de'];

            searchEngines.forEach((item) => {
                const referrer = `https://${item}/any-path`;
                const result = doPluginsGlobal.articleViewType.isFromSearch(referrer);
                expect(result).toBe(true);
            });
        });

        it('should return FALSE if referrer is NOT a search engine', function () {
            const referrer = 'https://any-domain/any-path';
            const result = doPluginsGlobal.articleViewType.isFromSearch(referrer);
            expect(result).toBe(false);
        });
    });

    describe('isFromSocial()', () => {
        it('should return TRUE if referrer is a search engine', function () {
            const socialDomains = ['facebook.com', 'xing.com', 'instagram.com', 'youtube.com', 't.co', 'www.linkedin.com', 'away.vk.com', 'www.pinterest.de', 'linkedin.android', 'ok.ru', 'mobile.ok.ru', 'www.yammer.com', 'twitter.com', 'www.netvibes.com', 'pinterest.com', 'wordpress.com', 'blogspot.com', 'lnkd.in', 'xing.android', 'vk.com', 'com.twitter.android', 'm.ok.ru', 'welt.de/instagram', 'linkin.bio'];

            socialDomains.forEach((item) => {
                const referrer = `https://${item}/any-path`;
                const result = doPluginsGlobal.articleViewType.isFromSocial(referrer);
                expect(result).toBe(true);
            });
        });

        it('should return FALSE if referrer is NOT a search engine', function () {
            const referrer = 'https://any-domain/any-path';
            const result = doPluginsGlobal.articleViewType.isFromSocial(referrer);
            expect(result).toBe(false);
        });
    });

    describe('isFromBild()', () => {
        it('should return TRUE if referrer is www.bild.de', () => {
            const referrer = 'https://www.bild.de';
            const result = doPluginsGlobal.articleViewType.isFromBild(referrer);
            expect(result).toBe(true);
        });

        it('should return FALSE if referrer is NOT www.bild.de', () => {
            const referrer = 'https://www.any-domain.de';
            const result = doPluginsGlobal.articleViewType.isFromBild(referrer);
            expect(result).toBe(false);
        });
    });

    describe('isFromBildMobile()', () => {
        it('should return TRUE if referrer is m.bild.de', () => {
            const referrer = 'https://m.bild.de';
            const result = doPluginsGlobal.articleViewType.isFromBildMobile(referrer);
            expect(result).toBe(true);
        });

        it('should return FALSE if referrer is NOT m.bild.de', () => {
            const referrer = 'https://www.any-domain.de';
            const result = doPluginsGlobal.articleViewType.isFromBildMobile(referrer);
            expect(result).toBe(false);
        });
    });

    describe('isFromInternal()', function () {
        it('should return TRUE if referrer is from the same domain', function () {
            const anyDomain = 'any-domain.com';
            const referrer = `https://${anyDomain}/any-path`;
            const result = doPluginsGlobal.articleViewType.isFromInternal(referrer, anyDomain);
            expect(result).toBe(true);
        });

        it('should return FALSE if referrer is NOT from the same domain', function () {
            const anyDomain = 'any-domain.com';
            const anyOtherDomain = 'any-other-domain.com';
            const referrer = `https://${anyDomain}/any-path`;
            const result = doPluginsGlobal.articleViewType.isFromInternal(referrer, anyOtherDomain);
            expect(result).toBe(false);
        });

        it('should return TRUE if referrer is from sub domain', function () {
            const anyDomain = 'any-domain.de';
            const referrer = `https://any-sub-domain.${anyDomain}`;
            const result = doPluginsGlobal.articleViewType.isFromInternal(referrer, anyDomain);
            expect(result).toBe(true);
        });
    });

    describe('isHomepageSubdomain()', () => {
        it('it should return TRUE for sub domains which can be considered as home pages', () => {
            const homepageSubDomains = [
                'www.anydomain.de',
                'm.anydomain.de',
                'sportbild.anydomain.de',
                'm.sportbild.anydomain.de'
            ];

            homepageSubDomains.forEach(domain => {
                const result = doPluginsGlobal.articleViewType.isHomepageSubdomain(domain);
                expect(result).toBe(true);
            });
        });

        it('it should return false for sub domains which should NOT be considered as home pages', () => {
            const homepageSubDomains = [
                'anydomain.de',
                'anysubdomain.anydomain.de',
                'sport.bild.de',
                'online.welt.de'
            ];

            homepageSubDomains.forEach(domain => {
                const result = doPluginsGlobal.articleViewType.isHomepageSubdomain(domain);
                expect(result).toBe(false);
            });
        });

    });

    describe('isFromHome', () => {
        it('should return TRUE if referrer is from homepage (no location.pathname)', function () {
            const anyDomain = 'www.any-domain.de';
            const referrer = `https://${anyDomain}`;
            window.document.domain = anyDomain;
            const result = doPluginsGlobal.articleViewType.isFromHome(referrer);
            expect(result).toBe(true);
        });

        it('should return FALSE if referrer is from a sub page (with location.pathname)', function () {
            const anyDomain = 'www.any-domain.de';
            const referrer = `https://${anyDomain}/any-path`;
            window.document.domain = anyDomain;
            const result = doPluginsGlobal.articleViewType.isFromHome(referrer);
            expect(result).toBe(false);
        });
    });

    describe('isFromTaboola()', () => {
        let getTrackingValueMock;
        beforeEach(() => {
            getTrackingValueMock = jest.spyOn(doPluginsGlobal.articleViewType, 'getTrackingValue');
        });

        afterEach(() => {
            jest.restoreAllMocks();
        });

        it('should return TRUE if referrer is from Taboola context', function () {
            const taboolaTrackingValue = 'kooperation.reco.taboola.any-text';
            getTrackingValueMock.mockReturnValue(taboolaTrackingValue);
            const result = doPluginsGlobal.articleViewType.isFromTaboola();
            expect(result).toBe(true);
        });

        it('should return FALSE if referrer is NOT from Taboola context', function () {
            const anyTrackingValue = 'any-tracking-value';
            getTrackingValueMock.mockReturnValue(anyTrackingValue);
            const result = doPluginsGlobal.articleViewType.isFromTaboola();
            expect(result).toBe(false);
        });
    });

    describe('getReferrerFromLocationHash', () => {
        const anyValidUrl = 'https://any-valid-url.de';

        it('should return the referrer from the location hash', () => {
            window.location.hash = `###wt_ref=${anyValidUrl}`;
            const result = doPluginsGlobal.articleViewType.getReferrerFromLocationHash();

            expect(result).toBe(anyValidUrl);
        });

        it('should ONLY return the referrer if location hash contains a valid URL', () => {
            const anyInvalidUrl = 'invalid-url';
            window.location.hash = `###wt_ref=${anyInvalidUrl}`;
            const result = doPluginsGlobal.articleViewType.getReferrerFromLocationHash();

            expect(result).toBe('');
        });
    });

    describe('getViewTypeByReferrer()', () => {
        let isFromSearchMock;
        let isFromSocialMock;
        let isFromInternalMock;
        let isFromHomeMock;
        let isFromTaboolaMock;
        let getReferrerFromLocationHashMock;

        beforeEach(() => {
            isFromSearchMock = jest.spyOn(doPluginsGlobal.articleViewType, 'isFromSearch').mockReturnValue(false);
            isFromSocialMock = jest.spyOn(doPluginsGlobal.articleViewType, 'isFromSocial').mockReturnValue(false);
            isFromInternalMock = jest.spyOn(doPluginsGlobal.articleViewType, 'isFromInternal').mockReturnValue(false);
            isFromHomeMock = jest.spyOn(doPluginsGlobal.articleViewType, 'isFromHome').mockReturnValue(false);
            isFromTaboolaMock = jest.spyOn(doPluginsGlobal.articleViewType, 'isFromTaboola').mockReturnValue(false);
            getReferrerFromLocationHashMock = jest.spyOn(doPluginsGlobal.articleViewType, 'getReferrerFromLocationHash').mockReturnValue('');
        });

        afterEach(() => {
            jest.restoreAllMocks();
        });

        it('should use the URL from the location hash as the referrer if available', () => {
            const anyReferrerFromHash = 'any-referrer-from-hash';
            getReferrerFromLocationHashMock.mockReturnValue(anyReferrerFromHash);
            doPluginsGlobal.articleViewType.getViewTypeByReferrer();
            expect(isFromSearchMock).toHaveBeenCalledWith(anyReferrerFromHash);
        });

        it('should use the document referrer if the location hash is NOT available', () => {
            window.document.referrer = 'any-document-referrer';
            doPluginsGlobal.articleViewType.getViewTypeByReferrer();
            expect(isFromSearchMock).toHaveBeenCalledWith(window.document.referrer);
        });

        it('should return the right event name if referrer is of type: Other External', () => {
            const result = doPluginsGlobal.articleViewType.getViewTypeByReferrer();
            expect(result).toBe('event27');
        });

        it('should return the right event name if referrer is of type: Search', () => {
            isFromSearchMock.mockReturnValue(true);
            const result = doPluginsGlobal.articleViewType.getViewTypeByReferrer();
            expect(result).toBe('event24');
        });

        it('should return the right event name if referrer is of type: Social', () => {
            isFromSocialMock.mockReturnValue(true);
            const result = doPluginsGlobal.articleViewType.getViewTypeByReferrer();
            expect(result).toBe('event25');
        });

        it('should return the right event name if referrer is of type: Taboola', () => {
            isFromInternalMock.mockReturnValue(true);
            isFromTaboolaMock.mockReturnValue(true);
            let result = doPluginsGlobal.articleViewType.getViewTypeByReferrer();
            expect(result).toBe('event102');

            isFromInternalMock.mockReturnValue(false);
            isFromTaboolaMock.mockReturnValue(true);
            result = doPluginsGlobal.articleViewType.getViewTypeByReferrer();
            expect(result).not.toBe('event102');

            isFromInternalMock.mockReturnValue(true);
            isFromTaboolaMock.mockReturnValue(false);
            result = doPluginsGlobal.articleViewType.getViewTypeByReferrer();
            expect(result).not.toBe('event102');
        });

        it('should return the right event name if referrer is of type: Home', () => {
            isFromInternalMock.mockReturnValue(true);
            isFromHomeMock.mockReturnValue(true);
            let result = doPluginsGlobal.articleViewType.getViewTypeByReferrer();
            expect(result).toBe('event22');

            isFromInternalMock.mockReturnValue(false);
            isFromHomeMock.mockReturnValue(true);
            result = doPluginsGlobal.articleViewType.getViewTypeByReferrer();
            expect(result).not.toBe('event22');

            isFromInternalMock.mockReturnValue(true);
            isFromHomeMock.mockReturnValue(false);
            result = doPluginsGlobal.articleViewType.getViewTypeByReferrer();
            expect(result).not.toBe('event22');
        });

        it('should return the right event name if referrer is of type: Other Internal', () => {
            isFromInternalMock.mockReturnValue(true);
            const result = doPluginsGlobal.articleViewType.getViewTypeByReferrer();
            expect(result).toBe('event23');
        });
    });

    describe('getTrackingValue', () => {
        it('should return the value of the URL query param: cid', () => {
            const cidValue = 'any-cid-value';
            window.location.search = `?cid=${cidValue}`;
            const result = doPluginsGlobal.articleViewType.getTrackingValue();

            expect(result).toBe(cidValue);
        });

        it('should return the value of the URL query param: wtrid', () => {
            const wtridValue = 'any-wtrid-value';
            window.location.search = `?cid=${wtridValue}`;
            const result = doPluginsGlobal.articleViewType.getTrackingValue();

            expect(result).toBe(wtridValue);
        });

        it('should return the value of the URL query param: wtmc', () => {
            const wtmcValue = 'any-wtmc-value';
            window.location.search = `?cid=${wtmcValue}`;
            const result = doPluginsGlobal.articleViewType.getTrackingValue();

            expect(result).toBe(wtmcValue);
        });

        it('should return an empty string if there are no tracking values available', () => {
            const result = doPluginsGlobal.articleViewType.getTrackingValue();

            expect(result).toBe('');
        });
    });

    describe('getViewTypeByTrackingProperty()', () => {
        let getTrackingValueMock;
        beforeEach(() => {
            doPluginsGlobal.s.Util = {
                getQueryParam: jest.fn()
            };
            getTrackingValueMock = jest.spyOn(doPluginsGlobal.articleViewType, 'getTrackingValue').mockReturnValue('');

        });

        afterEach(() => {
            jest.restoreAllMocks();
        });

        it('it should return the right event name if tracking value is of type: Dark Social', () => {
            const result = doPluginsGlobal.articleViewType.getViewTypeByTrackingProperty();
            expect(result).toBe('event26');
        });

        it('it should return the right event name if tracking value is of type: Search', () => {
            getTrackingValueMock.mockReturnValue('sea.');
            const result = doPluginsGlobal.articleViewType.getViewTypeByTrackingProperty();
            expect(result).toBe('event24');
        });

        it('it should return the right event name if tracking value is of type: Social', () => {
            getTrackingValueMock.mockReturnValue('social');
            const result = doPluginsGlobal.articleViewType.getViewTypeByTrackingProperty();
            expect(result).toBe('event25');
        });

        it('it should return the right event name if tracking value is of type: Other Internal', () => {
            getTrackingValueMock.mockReturnValue('kooperation');
            let result = doPluginsGlobal.articleViewType.getViewTypeByTrackingProperty();
            expect(result).toBe('event23');

            getTrackingValueMock.mockReturnValue('affiliate');
            result = doPluginsGlobal.articleViewType.getViewTypeByTrackingProperty();
            expect(result).toBe('event23');
        });
    });

    describe('setViewType()', () => {
        let isArticlePageMock;
        let getViewTypeByReferrerMock;
        let getViewTypeByTrackingPropertyMock;
        let aplMock;

        beforeEach(() => {
            isArticlePageMock = jest.spyOn(doPluginsGlobal.articleViewType, 'isArticlePage');
            getViewTypeByReferrerMock = jest.spyOn(doPluginsGlobal.articleViewType, 'getViewTypeByReferrer').mockImplementation();
            getViewTypeByTrackingPropertyMock = jest.spyOn(doPluginsGlobal.articleViewType, 'getViewTypeByTrackingProperty').mockImplementation();
            aplMock = jest.spyOn(doPluginsGlobal.s, 'apl');
        });

        afterEach(() => {
            jest.restoreAllMocks();
        });

        it('should set the article-view-type on article pages', function () {
            const anyViewType = 'any-view-type';
            isArticlePageMock.mockReturnValue(true);
            getViewTypeByTrackingPropertyMock.mockReturnValue(anyViewType);
            doPluginsGlobal.articleViewType.setViewType();
            expect(aplMock).toHaveBeenCalledWith('', anyViewType, ',', 1);
        });

        it('should expose the article-view-type to the s-object (s._articleViewType)', function () {
            const anyViewType = 'any-view-type';
            isArticlePageMock.mockReturnValue(true);
            getViewTypeByTrackingPropertyMock.mockReturnValue(anyViewType);
            doPluginsGlobal.articleViewType.setViewType();
            expect(doPluginsGlobal.s._articleViewType).toBe(anyViewType);
        });

        it('should NOT set the article-view-type on NON article pages', function () {
            isArticlePageMock.mockReturnValue(false);
            doPluginsGlobal.articleViewType.setViewType();
            expect(aplMock).not.toHaveBeenCalled();
        });

        it('should evaluate referrer URL when available to determine article-view-type', function () {
            isArticlePageMock.mockReturnValue(true);
            window.document.referrer = 'any-referrer-url';
            doPluginsGlobal.articleViewType.setViewType();
            expect(getViewTypeByReferrerMock).toHaveBeenCalled();
        });

        it('should evaluate tracking URL param when referrer is NOT available', function () {
            isArticlePageMock.mockReturnValue(true);
            window.document.referrer = '';
            doPluginsGlobal.articleViewType.setViewType();
            expect(getViewTypeByTrackingPropertyMock).toHaveBeenCalled();
        });
    });

});