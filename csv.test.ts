import parser from './csv';

describe('CSV Parser', () => {
    it('should parse a standard csv', () => {
        const testString = '123,abc,zyx\n456,def,wvu';

        const result = parser(testString);

        expect(result).toEqual([['123', 'abc', 'zyx'], ['456', 'def', 'wvu']]);
    });

    it('should parse quoted separators', () => {
        const testString = '123,ab","c,zyx\n456,def,wvu';

        const result = parser(testString);

        expect(result).toEqual([['123', 'ab","c', 'zyx'], ['456', 'def', 'wvu']])
    });

    it('should parse quoted newLines', () => {
        const testString = '123,ab"\n"c,zyx\n456,def,wvu';

        const result = parser(testString);

        expect(result).toEqual([['123', 'ab"\n"c', 'zyx'], ['456', 'def', 'wvu']])
    });

    it('should allow unique separators', () => {
        const testString = '123|ab"\n"c|zyx\n456|def|wvu';

        const result = parser(testString, '|');

        expect(result).toEqual([['123', 'ab"\n"c', 'zyx'], ['456', 'def', 'wvu']])
    })

    it('should allow $ quotes', () => {
        const testString = '123,ab$\n$c,zyx\n456,def,wvu';

        const result = parser(testString, ',', '$');

        expect(result).toEqual([['123', 'ab$\n$c', 'zyx'], ['456', 'def', 'wvu']])
    })
});