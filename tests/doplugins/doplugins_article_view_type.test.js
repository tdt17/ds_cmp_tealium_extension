const sObject = require('../../extensions/doPlugins_global');
const {createWindowMock} = require('../mocks/browserMocks');

describe('articleViewType()', () => {
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

    describe('getPageType', () => {
        const pageType = 'any-page-type';
        it('should get the page type from the data layer: page_type', function () {
            window.utag.data = {
                page_type: pageType
            };
            const result = s._articleViewTypeObj.getPageType();

            expect(result).toBe(pageType);
        });

        it('should get the page type from the data layer: page_document_type', function () {
            window.utag.data = {
                page_document_type: pageType
            };
            const result = s._articleViewTypeObj.getPageType();

            expect(result).toBe(pageType);
        });

        it('should get the page type from the data layer: page_mapped_doctype_for_pagename', function () {
            window.utag.data = {
                page_mapped_doctype_for_pagename: pageType
            };
            const result = s._articleViewTypeObj.getPageType();

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
            const result = s._articleViewTypeObj.isArticlePage();
            expect(result).toBe(false);
        });

        it('should be true when page is of type article', () => {
            const PROPERTY_NAMES = ['page_type', 'page_document_type', 'page_mapped_doctype_for_pagename'];

            PROPERTY_NAMES.forEach(propertyName => {
                ARTICLE_TYPES.forEach(articleType => {
                    window.utag.data[propertyName] = articleType;
                    const result = s._articleViewTypeObj.isArticlePage();
                    expect(result).toBe(true);
                });
                delete window.utag.data[propertyName];
            });

        });
    });

    describe('isFromSearch()', () => {
        it('should return TRUE if referrer is a search engine', function () {
            const searchDomains = ['google.', 'bing.com', 'ecosia.org', 'duckduckgo.com', 'amp-welt-de.cdn.ampproject.org', 'qwant.com', 'suche.t-online.de', '.yandex.', 'yahoo.com', 'googleapis.com', 'nortonsafe.search.ask.com', 'wikipedia.org', 'googleadservices.com', 'search.myway.com', 'lycos.de'];

            searchDomains.forEach((domain) => {
                const result = s._articleViewTypeObj.isFromSearch(domain);
                expect(result).toBe(true);
            });
        });

        it('should return FALSE if referrer is NOT a search engine', function () {
            const referringDomain = 'any-domain.com';
            const result = s._articleViewTypeObj.isFromSearch(referringDomain);
            expect(result).toBe(false);
        });
    });

    describe('isFromSocial()', () => {
        it('should return TRUE if referrer is a search engine', function () {
            const socialDomains = ['facebook.com', 'xing.com', 'instagram.com', 'youtube.com', 't.co', 'www.linkedin.com', 'away.vk.com', 'www.pinterest.de', 'linkedin.android', 'ok.ru', 'mobile.ok.ru', 'www.yammer.com', 'twitter.com', 'www.netvibes.com', 'pinterest.com', 'wordpress.com', 'blogspot.com', 'lnkd.in', 'xing.android', 'vk.com', 'com.twitter.android', 'm.ok.ru', 'welt.de/instagram', 'linkin.bio'];

            socialDomains.forEach((item) => {
                const referrer = `https://${item}/any-path`;
                const result = s._articleViewTypeObj.isFromSocial(referrer);
                expect(result).toBe(true);
            });
        });

        it('should return FALSE if referrer is NOT a search engine', function () {
            const referrer = 'https://any-domain/any-path';
            const result = s._articleViewTypeObj.isFromSocial(referrer);
            expect(result).toBe(false);
        });
    });

    describe('isFromBild()', () => {
        it('should return TRUE if referrer is www.bild.de', () => {
            const referringDomain = 'www.bild.de';
            const result = s._articleViewTypeObj.isFromBild(referringDomain);
            expect(result).toBe(true);
        });

        it('should return FALSE if referrer is NOT www.bild.de', () => {
            const referringDomain = 'www.any-domain.de';
            const result = s._articleViewTypeObj.isFromBild(referringDomain);
            expect(result).toBe(false);
        });
    });

    describe('isFromBildMobile()', () => {
        it('should return TRUE if referrer is m.bild.de', () => {
            const referringDomain = 'm.bild.de';
            const result = s._articleViewTypeObj.isFromBildMobile(referringDomain);
            expect(result).toBe(true);
        });

        it('should return FALSE if referrer is NOT m.bild.de', () => {
            const referringDomain = 'any-domain.de';
            const result = s._articleViewTypeObj.isFromBildMobile(referringDomain);
            expect(result).toBe(false);
        });
    });

    describe('isFromInternal()', function () {
        it('should return TRUE if referring domain is from the same domain', function () {
            const anyDomain = 'any-domain.com';
            const result = s._articleViewTypeObj.isFromInternal(anyDomain, anyDomain);
            expect(result).toBe(true);
        });

        it('should return FALSE if referring domain is NOT from the same domain', function () {
            const anyDomain = 'any-domain.com';
            const anyOtherDomain = 'any-other-domain.com';
            const result = s._articleViewTypeObj.isFromInternal(anyDomain, anyOtherDomain);
            expect(result).toBe(false);
        });

        it('should return TRUE if referring domain is from sub domain', function () {
            const anyDomain = 'any-domain.de';
            const referringDomain = `any-sub-domain.${anyDomain}`;
            const result = s._articleViewTypeObj.isFromInternal(referringDomain, anyDomain);
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
                const result = s._articleViewTypeObj.isHomepageSubdomain(domain);
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
                const result = s._articleViewTypeObj.isHomepageSubdomain(domain);
                expect(result).toBe(false);
            });
        });

    });

    describe('isFromHome', () => {
        it('should return TRUE if referrer is from homepage (no location.pathname)', function () {
            const anyDomain = 'www.any-domain.de';
            const referrer = `https://${anyDomain}`;
            window.document.domain = anyDomain;
            const result = s._articleViewTypeObj.isFromHome(referrer);
            expect(result).toBe(true);
        });

        it('should return FALSE if referrer is from a sub page (with location.pathname)', function () {
            const anyDomain = 'www.any-domain.de';
            const referrer = `https://${anyDomain}/any-path`;
            window.document.domain = anyDomain;
            const result = s._articleViewTypeObj.isFromHome(referrer);
            expect(result).toBe(false);
        });
    });

    describe('isFromTaboola()', () => {
        let getTrackingValueMock;
        beforeEach(() => {
            getTrackingValueMock = jest.spyOn(s._articleViewTypeObj, 'getTrackingValue');
        });

        afterEach(() => {
            jest.restoreAllMocks();
        });

        it('should return TRUE if referrer is from Taboola context', function () {
            const taboolaTrackingValue = 'kooperation.reco.taboola.any-text';
            getTrackingValueMock.mockReturnValue(taboolaTrackingValue);
            const result = s._articleViewTypeObj.isFromTaboola();
            expect(result).toBe(true);
        });

        it('should return FALSE if referrer is NOT from Taboola context', function () {
            const anyTrackingValue = 'any-tracking-value';
            getTrackingValueMock.mockReturnValue(anyTrackingValue);
            const result = s._articleViewTypeObj.isFromTaboola();
            expect(result).toBe(false);
        });
    });

    describe('getReferrerFromLocationHash', () => {
        const anyValidUrl = 'https://any-valid-url.de';

        it('should return the referrer from the location hash', () => {
            window.location.hash = `###wt_ref=${anyValidUrl}`;
            const result = s._articleViewTypeObj.getReferrerFromLocationHash();

            expect(result).toBe(anyValidUrl);
        });

        it('should ONLY return the referrer if location hash contains a valid URL', () => {
            const anyInvalidUrl = 'invalid-url';
            window.location.hash = `###wt_ref=${anyInvalidUrl}`;
            const result = s._articleViewTypeObj.getReferrerFromLocationHash();

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
        let getDomainFromURLStringMock;

        beforeEach(() => {
            isFromSearchMock = jest.spyOn(s._articleViewTypeObj, 'isFromSearch').mockReturnValue(false);
            isFromSocialMock = jest.spyOn(s._articleViewTypeObj, 'isFromSocial').mockReturnValue(false);
            isFromInternalMock = jest.spyOn(s._articleViewTypeObj, 'isFromInternal').mockReturnValue(false);
            isFromHomeMock = jest.spyOn(s._articleViewTypeObj, 'isFromHome').mockReturnValue(false);
            isFromTaboolaMock = jest.spyOn(s._articleViewTypeObj, 'isFromTaboola').mockReturnValue(false);
            getReferrerFromLocationHashMock = jest.spyOn(s._articleViewTypeObj, 'getReferrerFromLocationHash').mockReturnValue('');
            getDomainFromURLStringMock = jest.spyOn(s._utils, 'getDomainFromURLString').mockReturnValue('');
        });

        afterEach(() => {
            jest.restoreAllMocks();
        });

        it('should use the URL from the location hash as the referrer if available', () => {
            const anyReferrerFromHash = 'any-referrer-from-hash';
            getReferrerFromLocationHashMock.mockReturnValue(anyReferrerFromHash);
            s._articleViewTypeObj.getViewTypeByReferrer();
            expect(getDomainFromURLStringMock).toHaveBeenCalledWith(anyReferrerFromHash);
        });

        it('should use the document referrer if the location hash is NOT available', () => {
            window.document.referrer = 'any-document-referrer';
            s._articleViewTypeObj.getViewTypeByReferrer();
            expect(getDomainFromURLStringMock).toHaveBeenCalledWith(window.document.referrer);
        });

        it('should return the right event name if referrer is of type: Other External', () => {
            const result = s._articleViewTypeObj.getViewTypeByReferrer();
            expect(result).toBe('event27');
        });

        it('should return the right event name if referrer is of type: Search', () => {
            isFromSearchMock.mockReturnValue(true);
            const result = s._articleViewTypeObj.getViewTypeByReferrer();
            expect(result).toBe('event24');
        });

        it('should return the right event name if referrer is of type: Social', () => {
            isFromSocialMock.mockReturnValue(true);
            const result = s._articleViewTypeObj.getViewTypeByReferrer();
            expect(result).toBe('event25');
        });

        it('should return the right event name if referrer is of type: Taboola', () => {
            isFromInternalMock.mockReturnValue(true);
            isFromTaboolaMock.mockReturnValue(true);
            let result = s._articleViewTypeObj.getViewTypeByReferrer();
            expect(result).toBe('event102');

            isFromInternalMock.mockReturnValue(false);
            isFromTaboolaMock.mockReturnValue(true);
            result = s._articleViewTypeObj.getViewTypeByReferrer();
            expect(result).not.toBe('event102');

            isFromInternalMock.mockReturnValue(true);
            isFromTaboolaMock.mockReturnValue(false);
            result = s._articleViewTypeObj.getViewTypeByReferrer();
            expect(result).not.toBe('event102');
        });

        it('should return the right event name if referrer is of type: Home', () => {
            isFromInternalMock.mockReturnValue(true);
            isFromHomeMock.mockReturnValue(true);
            let result = s._articleViewTypeObj.getViewTypeByReferrer();
            expect(result).toBe('event22');

            isFromInternalMock.mockReturnValue(false);
            isFromHomeMock.mockReturnValue(true);
            result = s._articleViewTypeObj.getViewTypeByReferrer();
            expect(result).not.toBe('event22');

            isFromInternalMock.mockReturnValue(true);
            isFromHomeMock.mockReturnValue(false);
            result = s._articleViewTypeObj.getViewTypeByReferrer();
            expect(result).not.toBe('event22');
        });

        it('should return the right event name if referrer is of type: Other Internal', () => {
            isFromInternalMock.mockReturnValue(true);
            const result = s._articleViewTypeObj.getViewTypeByReferrer();
            expect(result).toBe('event23');
        });
    });

    describe('getTrackingValue', () => {
        it('should return the value of the URL query param: cid', () => {
            const cidValue = 'any-cid-value';
            window.location.search = `?cid=${cidValue}`;
            const result = s._articleViewTypeObj.getTrackingValue();

            expect(result).toBe(cidValue);
        });

        it('should return the value of the URL query param: wtrid', () => {
            const wtridValue = 'any-wtrid-value';
            window.location.search = `?cid=${wtridValue}`;
            const result = s._articleViewTypeObj.getTrackingValue();

            expect(result).toBe(wtridValue);
        });

        it('should return the value of the URL query param: wtmc', () => {
            const wtmcValue = 'any-wtmc-value';
            window.location.search = `?cid=${wtmcValue}`;
            const result = s._articleViewTypeObj.getTrackingValue();

            expect(result).toBe(wtmcValue);
        });

        it('should return an empty string if there are no tracking values available', () => {
            const result = s._articleViewTypeObj.getTrackingValue();

            expect(result).toBe('');
        });
    });

    describe('getViewTypeByTrackingProperty()', () => {
        let getTrackingValueMock;
        beforeEach(() => {
            getTrackingValueMock = jest.spyOn(s._articleViewTypeObj, 'getTrackingValue').mockReturnValue('');
        });

        afterEach(() => {
            jest.restoreAllMocks();
        });

        it('it should return the right event name if tracking value is of type: Dark Social', () => {
            const result = s._articleViewTypeObj.getViewTypeByTrackingProperty();
            expect(result).toBe('event26');
        });

        it('it should return the right event name if tracking value is of type: Search', () => {
            getTrackingValueMock.mockReturnValue('sea.');
            const result = s._articleViewTypeObj.getViewTypeByTrackingProperty();
            expect(result).toBe('event24');
        });

        it('it should return the right event name if tracking value is of type: Social', () => {
            getTrackingValueMock.mockReturnValue('social');
            const result = s._articleViewTypeObj.getViewTypeByTrackingProperty();
            expect(result).toBe('event25');
        });

        it('it should return the right event name if tracking value is of type: Other Internal', () => {
            getTrackingValueMock.mockReturnValue('kooperation');
            let result = s._articleViewTypeObj.getViewTypeByTrackingProperty();
            expect(result).toBe('event23');

            getTrackingValueMock.mockReturnValue('affiliate');
            result = s._articleViewTypeObj.getViewTypeByTrackingProperty();
            expect(result).toBe('event23');
        });
    });

    describe('setPageSourceForCheckout', ()=>{
        beforeEach(() => {
            window.utag.loader.SC = jest.fn();
        });

        afterEach(() => {
            jest.restoreAllMocks();
        });

        it('should store the article-view-type in the utag_main cookie', () => {
            s._articleViewType = 'any-view-type';
            s._articleViewTypeObj.setPageSourceAndAgeForCheckout(s);

            expect(window.utag.loader.SC).toHaveBeenCalledWith('utag_main', { 'articleview': s._articleViewType + ';exp-session' });
            expect(window.utag.data['cp.utag_main_articleview']).toBe(s._articleViewType);
        });

        it('should store the publication age (utag.data.page_age) in the utag_main cookie', () => {
            window.utag.data.page_age = 'any-publication-age';
            s._articleViewTypeObj.setPageSourceAndAgeForCheckout(s);

            expect(window.utag.loader.SC).toHaveBeenCalledWith('utag_main', { 'pa': window.utag.data.page_age + ';exp-session' });
            expect(window.utag.data['cp.utag_main_pa']).toBe(window.utag.data.page_age);
        });

        it('should store the publication age (utag.data.page_datePublication_age) in the utag_main cookie', () => {
            window.utag.data.page_datePublication_age = 'any-publication-age';
            s._articleViewTypeObj.setPageSourceAndAgeForCheckout(s);

            expect(window.utag.loader.SC).toHaveBeenCalledWith('utag_main', { 'pa': window.utag.data.page_datePublication_age + ';exp-session' });
            expect(window.utag.data['cp.utag_main_pa']).toBe(window.utag.data.page_datePublication_age);
        });

        it('should store the publication age (utag.data.screen_agePublication) in the utag_main cookie', () => {
            window.utag.data.screen_agePublication = 'any-publication-age';
            s._articleViewTypeObj.setPageSourceAndAgeForCheckout(s);

            expect(window.utag.loader.SC).toHaveBeenCalledWith('utag_main', { 'pa': window.utag.data.screen_agePublication + ';exp-session' });
            expect(window.utag.data['cp.utag_main_pa']).toBe(window.utag.data.screen_agePublication);
        });
    });

    describe('setViewType()', () => {
        let isArticlePageMock;
        let getViewTypeByReferrerMock;
        let getViewTypeByTrackingPropertyMock;
        let setPageSourceAndAgeForCheckoutMock;
        let addEventMock;

        beforeEach(() => {
            isArticlePageMock = jest.spyOn(s._articleViewTypeObj, 'isArticlePage');
            getViewTypeByReferrerMock = jest.spyOn(s._articleViewTypeObj, 'getViewTypeByReferrer').mockImplementation();
            getViewTypeByTrackingPropertyMock = jest.spyOn(s._articleViewTypeObj, 'getViewTypeByTrackingProperty').mockImplementation();
            setPageSourceAndAgeForCheckoutMock = jest.spyOn(s._articleViewTypeObj, 'setPageSourceAndAgeForCheckout').mockImplementation();
            addEventMock = jest.spyOn(s._eventsObj, 'addEvent').mockImplementation();
        });

        afterEach(() => {
            jest.restoreAllMocks();
        });

        it('should evaluate the article-view-type on article pages', function () {
            isArticlePageMock.mockReturnValue(true);

            s._articleViewTypeObj.setViewType(s);
            expect(getViewTypeByTrackingPropertyMock).toHaveBeenCalled();
        });

        it('should NOT evaluate the article-view-type on NON article pages', function () {
            isArticlePageMock.mockReturnValue(false);

            s._articleViewTypeObj.setViewType(s);
            expect(getViewTypeByTrackingPropertyMock).not.toHaveBeenCalled();
        });

        it('should evaluate referrer URL when available to determine article-view-type', function () {
            isArticlePageMock.mockReturnValue(true);
            window.document.referrer = 'any-referrer-url';
            s._articleViewTypeObj.setViewType(s);
            expect(getViewTypeByReferrerMock).toHaveBeenCalled();
        });

        it('should evaluate tracking URL param when referrer is NOT available', function () {
            isArticlePageMock.mockReturnValue(true);
            window.document.referrer = '';
            s._articleViewTypeObj.setViewType(s);
            expect(getViewTypeByTrackingPropertyMock).toHaveBeenCalled();
        });

        it('should assign the article-view-type to s._articleViewType and s.eVar44', function () {
            const anyViewType = 'any-view-type';
            isArticlePageMock.mockReturnValue(true);
            getViewTypeByTrackingPropertyMock.mockReturnValue(anyViewType);

            expect(s._articleViewType).toBeUndefined();
            expect(s.eVar44).toBeUndefined();

            s._articleViewTypeObj.setViewType(s);

            expect(s._articleViewType).toBe(anyViewType);
            expect(s.eVar44).toBe(anyViewType);
        });

        it('should call setPageSourceAndAgeForCheckout() function', function () {
            isArticlePageMock.mockReturnValue(true);

            s._articleViewTypeObj.setViewType(s);
            expect(setPageSourceAndAgeForCheckoutMock).toHaveBeenCalled();
        });

        it('should call s._eventsObj.addEvent() with article-view-type as the argument', function () {
            const anyViewType = 'any-view-type';
            isArticlePageMock.mockReturnValue(true);
            getViewTypeByTrackingPropertyMock.mockReturnValue(anyViewType);

            s._articleViewTypeObj.setViewType(s);

            expect(addEventMock).toHaveBeenCalledWith(anyViewType);
        });
    });

});