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

    describe('cleanUpReferrer', () => {
        it('should remove the wt_t parameter', function () {
            const anyBaseURL = 'https://www.any-domain.com/';
            const anyWTParam = '&wt_t=any-value';
            const result = s._articleViewTypeObj.cleanUpReferrer(anyBaseURL + anyWTParam);
            expect(result).toBe(anyBaseURL);
        });

        it('should return the untouched referrer if there is no wt_t parameter', function () {
            const anyURL = 'https://www.any-domain.com/any-path?any-query=any-value';
            const result = s._articleViewTypeObj.cleanUpReferrer(anyURL);
            expect(result).toBe(anyURL);
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

    describe('isFromInternal()', function () {
        const anyReferrer = 'https://any-domain.com/any-path';
        let getDomainFromURLStringMock;

        beforeEach(() => {
            getDomainFromURLStringMock = jest.spyOn(s._utils, 'getDomainFromURLString').mockReturnValue('');
        });

        it('should call s._utils.getDomainFromURLString(referrer)', function () {
            s._articleViewTypeObj.isFromInternal(anyReferrer);
            expect(getDomainFromURLStringMock).toHaveBeenLastCalledWith(anyReferrer);
        });

        it('should return TRUE if referring domain is from the same domain', function () {
            const anyDomain = 'any-domain.com';
            window.document.domain = anyDomain;
            getDomainFromURLStringMock.mockReturnValue(anyDomain);
            const result = s._articleViewTypeObj.isFromInternal(anyReferrer);
            expect(result).toBe(true);
        });

        it('should return FALSE if referring domain is NOT from the same domain', function () {
            window.document.domain = 'any-domain.com';
            getDomainFromURLStringMock.mockReturnValue('any-other-domain.com');
            const result = s._articleViewTypeObj.isFromInternal(anyReferrer);
            expect(result).toBe(false);
        });

        it('should return TRUE if referring domain is from sub domain', function () {
            const anyDomain = 'any-domain.com';
            window.document.domain = anyDomain;
            getDomainFromURLStringMock.mockReturnValue(`any-sub-domain.${anyDomain}`);
            const result = s._articleViewTypeObj.isFromInternal(anyReferrer);
            expect(result).toBe(true);
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

    describe('isFromSecureMypass()', () => {
        it('should return TRUE if referrer is secure.mypass.de (login/register)', () => {
            const socialDomains = ['secure.mypass.de'];

            socialDomains.forEach((item) => {
                const referrer = `https://${item}/any-path`;
                const result = s._articleViewTypeObj.isFromSecureMypass(referrer);
                expect(result).toBe(true);
            });
        });

        it('should return FALSE if referrer is NOT secure.mypass.de (login/register)', function () {
            const referrer = 'https://any-domain/any-path';
            const result = s._articleViewTypeObj.isFromSocial(referrer);
            expect(result).toBe(false);
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
        let cleanUpReferrerMock;
        beforeEach(() => {
            cleanUpReferrerMock = jest.spyOn(s._articleViewTypeObj, 'cleanUpReferrer').mockImplementation();
        });

        it('should return TRUE if referrer is from homepage (no location.pathname)', function () {
            const anyDomain = 'www.any-domain.de';
            const referrer = `https://${anyDomain}`;
            cleanUpReferrerMock.mockReturnValue(referrer);
            window.document.domain = anyDomain;
            const result = s._articleViewTypeObj.isFromHome(referrer);
            expect(result).toBe(true);
        });

        it('should return FALSE if referrer is from a sub page (with location.pathname)', function () {
            const anyDomain = 'www.any-domain.de';
            const referrer = `https://${anyDomain}/any-path`;
            cleanUpReferrerMock.mockReturnValue(referrer);
            window.document.domain = anyDomain;
            const result = s._articleViewTypeObj.isFromHome(referrer);
            expect(result).toBe(false);
        });
    });

    describe('isFromRecommendation', () => {
        const anyReferrer = 'https://any-referrer-domain.com/any-path';
        const recommendationDomain = 'traffic.outbrain.com';
        let getDomainFromURLStringMock;

        beforeEach(() => {
            getDomainFromURLStringMock = jest.spyOn(s._utils, 'getDomainFromURLString').mockReturnValue('');
        });

        it('should return TRUE if referrer is from recommendation service', function () {
            getDomainFromURLStringMock.mockReturnValue(recommendationDomain);
            const result = s._articleViewTypeObj.isFromRecommendation(anyReferrer);
            expect(getDomainFromURLStringMock).toHaveBeenLastCalledWith(anyReferrer);
            expect(result).toBe(true);
        });

        it('should return FALSE if referrer is NOT from recommendation service', function () {
            getDomainFromURLStringMock.mockReturnValue('any-other-domain.com');
            const result = s._articleViewTypeObj.isFromRecommendation(anyReferrer);
            expect(getDomainFromURLStringMock).toHaveBeenLastCalledWith(anyReferrer);
            expect(result).toBe(false);
        });
    });

    describe('isFromArticleWithReco()', () => {
        let getTrackingValueMock;
        beforeEach(() => {
            getTrackingValueMock = jest.spyOn(s._articleViewTypeObj, 'getTrackingValue');
        });

        it('should return TRUE if article URL contains recommendation parameter', function () {
            const outbrainTrackingValue = 'kooperation.article.outbrain.anything';
            getTrackingValueMock.mockReturnValue(outbrainTrackingValue);
            const result = s._articleViewTypeObj.isFromArticleWithReco();
            expect(result).toBe(true);
        });

        it('should return FALSE if article URL NOT contains recommendation parameter', function () {
            const anyTrackingValue = 'any-tracking-value';
            getTrackingValueMock.mockReturnValue(anyTrackingValue);
            const result = s._articleViewTypeObj.isFromArticleWithReco();
            expect(result).toBe(false);
        });
    });

    describe('isFromHomeDesktopWithReco()', () => {
        let getTrackingValueMock;
        beforeEach(() => {
            getTrackingValueMock = jest.spyOn(s._articleViewTypeObj, 'getTrackingValue');
        });

        it('should return TRUE if article URL contains recommendation parameter (home/desktop)', function () {
            const outbrainTrackingValue = 'kooperation.home.outbrain.desktop';
            getTrackingValueMock.mockReturnValue(outbrainTrackingValue);
            const result = s._articleViewTypeObj.isFromHomeDesktopWithReco();
            expect(result).toBe(true);
        });

        it('should return FALSE if article URL NOT contains recommendation parameter (home/desktop)', function () {
            const anyTrackingValue = 'any-tracking-value';
            getTrackingValueMock.mockReturnValue(anyTrackingValue);
            const result = s._articleViewTypeObj.isFromHomeDesktopWithReco();
            expect(result).toBe(false);
        });
    });

    describe('isFromHomeMobileWithReco()', () => {
        let getTrackingValueMock;
        beforeEach(() => {
            getTrackingValueMock = jest.spyOn(s._articleViewTypeObj, 'getTrackingValue');
        });

        it('should return TRUE if article URL contains recommendation parameter (home/desktop)', function () {
            const outbrainTrackingValue = 'kooperation.home.outbrain.mobile';
            getTrackingValueMock.mockReturnValue(outbrainTrackingValue);
            const result = s._articleViewTypeObj.isFromHomeMobileWithReco();
            expect(result).toBe(true);
        });

        it('should return FALSE if article URL NOT contains recommendation parameter (home/desktop)', function () {
            const anyTrackingValue = 'any-tracking-value';
            getTrackingValueMock.mockReturnValue(anyTrackingValue);
            const result = s._articleViewTypeObj.isFromHomeMobileWithReco();
            expect(result).toBe(false);
        });
    });

    describe('getInternalType()', () => {
        let isFromHomeMock;

        beforeEach(() => {
            isFromHomeMock = jest.spyOn(s._articleViewTypeObj, 'isFromHome').mockReturnValue(false);
        });

        it('should return event22 if referrer is a home page', function () {
            const anyReferrer = 'http://www.any-domain.de';
            isFromHomeMock.mockReturnValue(true);
            const result = s._articleViewTypeObj.getInternalType('http://www.any-domain.de');
            expect(isFromHomeMock).toHaveBeenCalledWith(anyReferrer);
            expect(result).toBe('event22');
        });

        it('should return event23 if referrer is NOT a home page', function () {
            const anyReferrer = 'http://www.any-domain.de';
            isFromHomeMock.mockReturnValue(false);
            const result = s._articleViewTypeObj.getInternalType(anyReferrer);
            expect(isFromHomeMock).toHaveBeenCalledWith(anyReferrer);
            expect(result).toBe('event23');
        });
    });

    describe('getRecommendationType()', () => {
        let isFromHomeDesktopWithRecoMock;
        let isFromHomeMobileWithRecoMock;
        let isFromArticleWithRecoMock;

        beforeEach(() => {
            isFromHomeDesktopWithRecoMock = jest.spyOn(s._articleViewTypeObj, 'isFromHomeDesktopWithReco').mockReturnValue(false);
            isFromHomeMobileWithRecoMock = jest.spyOn(s._articleViewTypeObj, 'isFromHomeMobileWithReco').mockReturnValue(false);
            isFromArticleWithRecoMock = jest.spyOn(s._articleViewTypeObj, 'isFromArticleWithReco').mockReturnValue(false);
        });

        it('should return event76 if referrer is from desktop homepage recommendation teaser', function () {
            isFromHomeDesktopWithRecoMock.mockReturnValue(true);
            const result = s._articleViewTypeObj.getRecommendationType();
            expect(isFromHomeDesktopWithRecoMock).toHaveBeenCalled();
            expect(result).toBe('event76');
        });

        it('should return event77 if referrer is from mobile homepage recommendation teaser', function () {
            isFromHomeMobileWithRecoMock.mockReturnValue(true);
            const result = s._articleViewTypeObj.getRecommendationType();
            expect(isFromHomeMobileWithRecoMock).toHaveBeenCalled();
            expect(result).toBe('event77');
        });

        it('should return event102 if referrer is from article recommendation teaser', function () {
            isFromArticleWithRecoMock.mockReturnValue(true);
            const result = s._articleViewTypeObj.getRecommendationType();
            expect(isFromArticleWithRecoMock).toHaveBeenCalled();
            expect(result).toBe('event102');
        });

        it('should return event27 (other external) in any other cases', function () {
            const result = s._articleViewTypeObj.getRecommendationType();
            expect(result).toBe('event27');
        });
    });

    describe('getExternalType()', () => {
        const anyReferrerDomain = 'www.any-domain.com';
        const anyReferrer = 'https://www.any-domain.com';
        let isFromSearchMock;
        let isFromSocialMock;
        let isFromBildMock;
        let isFromBildMobileMock;
        let isFromHomeMock;
        let isFromSecureMypassMock;

        beforeEach(() => {
            jest.spyOn(s._utils, 'getDomainFromURLString').mockReturnValue(anyReferrerDomain);
            isFromSearchMock = jest.spyOn(s._articleViewTypeObj, 'isFromSearch').mockReturnValue(false);
            isFromSocialMock = jest.spyOn(s._articleViewTypeObj, 'isFromSocial').mockReturnValue(false);
            isFromBildMock = jest.spyOn(s._articleViewTypeObj, 'isFromBild').mockReturnValue(false);
            isFromBildMobileMock = jest.spyOn(s._articleViewTypeObj, 'isFromBildMobile').mockReturnValue(false);
            isFromHomeMock = jest.spyOn(s._articleViewTypeObj, 'isFromHome').mockReturnValue(false);
            isFromSecureMypassMock = jest.spyOn(s._articleViewTypeObj, 'isFromSecureMypass').mockReturnValue(false);
        });

        it('should return event24 if referrer is from search engine', function () {
            isFromSearchMock.mockReturnValue(true);
            const result = s._articleViewTypeObj.getExternalType(anyReferrer);
            expect(isFromSearchMock).toHaveBeenCalledWith(anyReferrerDomain);
            expect(result).toBe('event24');
        });

        it('should return event25 if referrer is from social media', function () {
            isFromSocialMock.mockReturnValue(true);
            const result = s._articleViewTypeObj.getExternalType(anyReferrer);
            expect(isFromSocialMock).toHaveBeenCalledWith(anyReferrer);
            expect(result).toBe('event25');
        });

        it('should return event76 if referrer is Bild desktop homepage', function () {
            isFromBildMock.mockReturnValue(true);
            isFromHomeMock.mockReturnValue(true);
            const result = s._articleViewTypeObj.getExternalType(anyReferrer);
            expect(isFromBildMock).toHaveBeenCalledWith(anyReferrerDomain);
            expect(isFromHomeMock).toHaveBeenCalledWith(anyReferrer);
            expect(result).toBe('event76');
        });

        it('should return event77 if referrer is Bild mobile homepage', function () {
            isFromBildMobileMock.mockReturnValue(true);
            isFromHomeMock.mockReturnValue(true);
            const result = s._articleViewTypeObj.getExternalType(anyReferrer);
            expect(isFromBildMobileMock).toHaveBeenCalledWith(anyReferrerDomain);
            expect(isFromHomeMock).toHaveBeenCalledWith(anyReferrer);
            expect(result).toBe('event77');
        });

        it('should return event23 if referrer is from secure mypass (login/register)', function () {
            isFromSecureMypassMock.mockReturnValue(true);
            const result = s._articleViewTypeObj.getExternalType(anyReferrer);
            expect(isFromSecureMypassMock).toHaveBeenCalledWith(anyReferrer);
            expect(result).toBe('event23');
        });    

        it('should return event27 (other external) in any other cases', function () {
            const result = s._articleViewTypeObj.getExternalType(anyReferrer);
            expect(result).toBe('event27');
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
        let isFromInternalMock;
        let isFromRecommendationMock;
        let getInternalTypeMock;
        let getRecommendationTypeMock;
        let getExternalTypeMock;
        let getReferrerFromLocationHashMock;


        beforeEach(() => {
            isFromInternalMock = jest.spyOn(s._articleViewTypeObj, 'isFromInternal').mockReturnValue(false);
            isFromRecommendationMock = jest.spyOn(s._articleViewTypeObj, 'isFromRecommendation').mockReturnValue(false);
            getInternalTypeMock = jest.spyOn(s._articleViewTypeObj, 'getInternalType').mockReturnValue(false);
            getRecommendationTypeMock = jest.spyOn(s._articleViewTypeObj, 'getRecommendationType').mockReturnValue(false);
            getExternalTypeMock = jest.spyOn(s._articleViewTypeObj, 'getExternalType').mockReturnValue(false);
            getReferrerFromLocationHashMock = jest.spyOn(s._articleViewTypeObj, 'getReferrerFromLocationHash').mockReturnValue('');
        });

        it('should use the URL from the location hash as the referrer if available', () => {
            const anyReferrerFromHash = 'any-referrer-from-hash';
            getReferrerFromLocationHashMock.mockReturnValue(anyReferrerFromHash);
            s._articleViewTypeObj.getViewTypeByReferrer();
            expect(isFromInternalMock).toHaveBeenCalledWith(anyReferrerFromHash);
        });

        it('should use the document referrer if the location hash is NOT available', () => {
            window.document.referrer = 'any-document-referrer';
            s._articleViewTypeObj.getViewTypeByReferrer();
            expect(isFromInternalMock).toHaveBeenCalledWith(window.document.referrer);
        });

        it('should call getInternalType(referrer) and return its result if referrer is from internal (same domain)', () => {
            const anyInternalType = 'any-internal-type';
            isFromInternalMock.mockReturnValue(true);
            getInternalTypeMock.mockReturnValue(anyInternalType);
            let result = s._articleViewTypeObj.getViewTypeByReferrer();
            expect(result).toBe(anyInternalType);
        });

        it('should call getRecommendationType(referrer) and return its result if referrer is from recommendation service (Outbrain)', () => {
            const anyRecommendationType = 'any-reco-type';
            isFromRecommendationMock.mockReturnValue(true);
            getRecommendationTypeMock.mockReturnValue(anyRecommendationType);
            let result = s._articleViewTypeObj.getViewTypeByReferrer();
            expect(result).toBe(anyRecommendationType);
        });

        it('should call getExternalType(referrer) and return its result if referrer is from an external domain', () => {
            const anyExternalType = 'any-external-type';
            getExternalTypeMock.mockReturnValue(anyExternalType);
            let result = s._articleViewTypeObj.getViewTypeByReferrer();
            expect(result).toBe(anyExternalType);
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

    describe('setPageSourceForCheckout', () => {
        beforeEach(() => {
            window.utag.loader.SC = jest.fn();
        });

        afterEach(() => {
            jest.restoreAllMocks();
        });

        it('should store the article-view-type in the utag_main cookie', () => {
            s._articleViewType = 'any-view-type';
            s._articleViewTypeObj.setPageSourceAndAgeForCheckout(s);

            expect(window.utag.loader.SC).toHaveBeenCalledWith('utag_main', {'articleview': s._articleViewType + ';exp-session'});
            expect(window.utag.data['cp.utag_main_articleview']).toBe(s._articleViewType);
        });

        it('should store the publication age (utag.data.page_age) in the utag_main cookie', () => {
            window.utag.data.page_age = 'any-publication-age';
            s._articleViewTypeObj.setPageSourceAndAgeForCheckout(s);

            expect(window.utag.loader.SC).toHaveBeenCalledWith('utag_main', {'pa': window.utag.data.page_age + ';exp-session'});
            expect(window.utag.data['cp.utag_main_pa']).toBe(window.utag.data.page_age);
        });

        it('should store the publication age (utag.data.page_datePublication_age) in the utag_main cookie', () => {
            window.utag.data.page_datePublication_age = 'any-publication-age';
            s._articleViewTypeObj.setPageSourceAndAgeForCheckout(s);

            expect(window.utag.loader.SC).toHaveBeenCalledWith('utag_main', {'pa': window.utag.data.page_datePublication_age + ';exp-session'});
            expect(window.utag.data['cp.utag_main_pa']).toBe(window.utag.data.page_datePublication_age);
        });

        it('should store the publication age (utag.data.screen_agePublication) in the utag_main cookie', () => {
            window.utag.data.screen_agePublication = 'any-publication-age';
            s._articleViewTypeObj.setPageSourceAndAgeForCheckout(s);

            expect(window.utag.loader.SC).toHaveBeenCalledWith('utag_main', {'pa': window.utag.data.screen_agePublication + ';exp-session'});
            expect(window.utag.data['cp.utag_main_pa']).toBe(window.utag.data.screen_agePublication);
        });
    });

    describe('isPageViewFromHome', () => {
        it('should return TRUE if page-view-type is event22', function () {
            const result = s._articleViewTypeObj.isPageViewFromHome('event22');
            expect(result).toBe(true);
        });

        it('should return TRUE if page-view-type is event76', function () {
            const result = s._articleViewTypeObj.isPageViewFromHome('event22');
            expect(result).toBe(true);
        });

        it('should return TRUE if page-view-type is event77', function () {
            const result = s._articleViewTypeObj.isPageViewFromHome('event22');
            expect(result).toBe(true);
        });

        it('should return FALSE if page-view-type is NOT event22, event76 orevent77', function () {
            const result = s._articleViewTypeObj.isPageViewFromHome('event123');
            expect(result).toBe(false);
        });
    });

    describe('setViewTypes()', () => {
        let isArticlePageMock;
        let getViewTypeByReferrerMock;
        let getViewTypeByTrackingPropertyMock;
        let setPageSourceAndAgeForCheckoutMock;
        let addEventMock;
        let isPageViewFromHomeMock;
        let setHomeTeaserPropertiesMock;

        beforeEach(() => {
            isArticlePageMock = jest.spyOn(s._utils, 'isArticlePage');
            getViewTypeByReferrerMock = jest.spyOn(s._articleViewTypeObj, 'getViewTypeByReferrer').mockImplementation();
            getViewTypeByTrackingPropertyMock = jest.spyOn(s._articleViewTypeObj, 'getViewTypeByTrackingProperty').mockImplementation();
            setPageSourceAndAgeForCheckoutMock = jest.spyOn(s._articleViewTypeObj, 'setPageSourceAndAgeForCheckout').mockImplementation();
            addEventMock = jest.spyOn(s._eventsObj, 'addEvent').mockImplementation();
            isPageViewFromHomeMock = jest.spyOn(s._articleViewTypeObj, 'isPageViewFromHome').mockImplementation();
            setHomeTeaserPropertiesMock = jest.spyOn(s._homeTeaserTrackingObj, 'setHomeTeaserProperties').mockImplementation();
        });

        afterEach(() => {
            jest.restoreAllMocks();
        });

        it('should evaluate referrer URL when available to determine article-view-type', function () {
            isArticlePageMock.mockReturnValue(true);
            window.document.referrer = 'any-referrer-url';
            s._articleViewTypeObj.setViewTypes(s);
            expect(getViewTypeByReferrerMock).toHaveBeenCalled();
        });

        it('should evaluate tracking URL param when referrer is NOT available', function () {
            isArticlePageMock.mockReturnValue(true);
            window.document.referrer = '';
            s._articleViewTypeObj.setViewTypes(s);
            expect(getViewTypeByTrackingPropertyMock).toHaveBeenCalled();
        });

        it('should assign the page-view-type to s._articleViewType and s.eVar44 if page is of type article', function () {
            const anyViewType = 'any-view-type';
            isArticlePageMock.mockReturnValue(true);
            getViewTypeByTrackingPropertyMock.mockReturnValue(anyViewType);

            expect(s._articleViewType).toBeUndefined();
            expect(s.eVar44).toBeUndefined();

            s._articleViewTypeObj.setViewTypes(s);

            expect(s._articleViewType).toBe(anyViewType);
            expect(s.eVar44).toBe(anyViewType);
        });

        it('should NOT evaluate the article-view-type when ad blocker is on', function () {
            window.utag.data.adobe_doc_type = 'ad wall';

            s._articleViewTypeObj.setViewTypes(s);
            expect(s._articleViewType).toBeUndefined();
        });

        it('should NOT assign the page-view-type to s._articleViewType and s.eVar44 if page is NOT of type article', function () {
            const anyViewType = 'any-view-type';
            isArticlePageMock.mockReturnValue(false);
            getViewTypeByTrackingPropertyMock.mockReturnValue(anyViewType);

            expect(s._articleViewType).toBeUndefined();
            expect(s.eVar44).toBeUndefined();

            s._articleViewTypeObj.setViewTypes(s);

            expect(s._articleViewType).toBeUndefined();
            expect(s.eVar44).toBeUndefined();
        });

        it('should call setPageSourceAndAgeForCheckout() function if page is of type article', function () {
            isArticlePageMock.mockReturnValue(true);

            s._articleViewTypeObj.setViewTypes(s);
            expect(setPageSourceAndAgeForCheckoutMock).toHaveBeenCalled();
        });

        it('should NOT call setPageSourceAndAgeForCheckout() function if page is NOT of type article', function () {
            isArticlePageMock.mockReturnValue(false);

            s._articleViewTypeObj.setViewTypes(s);
            expect(setPageSourceAndAgeForCheckoutMock).not.toHaveBeenCalled();
        });

        it('should call s._eventsObj.addEvent() with pag-view-type as the argument if page is of type article', function () {
            const anyViewType = 'any-view-type';
            isArticlePageMock.mockReturnValue(true);
            getViewTypeByTrackingPropertyMock.mockReturnValue(anyViewType);

            s._articleViewTypeObj.setViewTypes(s);

            expect(addEventMock).toHaveBeenCalledWith(anyViewType);
        });

        it('should NOT call s._eventsObj.addEvent() with pag-view-type as the argument if page is NOT of type article', function () {
            const anyViewType = 'any-view-type';
            isArticlePageMock.mockReturnValue(false);
            getViewTypeByTrackingPropertyMock.mockReturnValue(anyViewType);

            s._articleViewTypeObj.setViewTypes(s);

            expect(addEventMock).not.toHaveBeenCalled();
        });

        it('should call s._eventsObj.addEvent() with event20 as the argument if page was viewed after the homepage (homepage teaser click)', function () {
            isPageViewFromHomeMock.mockReturnValue(true);
            s._articleViewTypeObj.setViewTypes(s);

            expect(addEventMock).toHaveBeenCalledWith('event20');
        });

        it('should NOT call s._eventsObj.addEvent() with event20 as the argument if page was NOT viewed after the homepage (homepage teaser click)', function () {
            isPageViewFromHomeMock.mockReturnValue(false);
            s._articleViewTypeObj.setViewTypes(s);

            expect(addEventMock).not.toHaveBeenCalled();
        });

        it('should set the homepage teaser tracking properties if page was viewed after the homepage (homepage teaser click)', function () {
            isPageViewFromHomeMock.mockReturnValue(true);
            s._articleViewTypeObj.setViewTypes(s);

            expect(setHomeTeaserPropertiesMock).toHaveBeenCalled();
        });

        it('should NOT set the homepage teaser tracking properties if page was NOT viewed after the homepage (homepage teaser click)', function () {
            isPageViewFromHomeMock.mockReturnValue(false);
            s._articleViewTypeObj.setViewTypes(s);

            expect(setHomeTeaserPropertiesMock).not.toHaveBeenCalled();
        });

    });

});