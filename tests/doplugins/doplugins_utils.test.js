const doPluginsGlobal = require('../../extensions/doPlugins_global');

describe('getDomainFromURLString(URLString)', () => {
    it('should return domain from URL string', () => {
        const domain = 'www.bild.de';
        const urlString = `https://${domain}/any-path`;
        const result = doPluginsGlobal.utils.getDomainFromURLString(urlString);
        expect(result).toBe(domain);
    });

    it('should return an empty string if passed in string is not a valid URL', () => {
        const anyString = 'invalid-url-string';
        const result = doPluginsGlobal.utils.getDomainFromURLString(anyString);
        expect(result).toBe('');
    });
});