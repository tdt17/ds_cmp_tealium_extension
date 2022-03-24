const myCW = require("../extensions/my_CW");

describe('CW time format: CW {week} {year} {first DOW} - {last DOW}', () => {

    let cw;
    let leadingZeroMock;

    beforeEach(() => {
        cw = {...myCW}; 
        jest.clearAllMocks();
    });

    describe('leadingZero', () => {

        it('should add a 0 before one-digit numbers', () => {
            const date1 = 3;
            const date2 = 13;

            const result1 = cw.leadingZero(date1);
            const result2 = cw.leadingZero(date2);

            expect(result1).toBe('03');
            expect(result2).toBe('13');
        });
    });

    describe('getWeek', () => {

        it('should return correct week of the year', () => {
            const mockDate1 = new Date(2022, 0, 1);

            leadingZeroMock = jest.spyOn(cw, 'leadingZero');

            expect(cw.getWeek(mockDate1)).toBe('01');
            expect(leadingZeroMock).toHaveBeenCalledWith(1);
            
        });

        it('should have matching return value with leadingZero function', () => {
            const mockDate1 = new Date(2022, 0, 1);
            const anyValue = 'any-value';

            leadingZeroMock = jest.spyOn(cw, 'leadingZero').mockImplementation();
            leadingZeroMock.mockReturnValue(anyValue);

            expect(cw.getWeek(mockDate1)).toBe(anyValue);
            
        });
    });


    describe('getYear', () => {

        it('should return year of the first DOW based on given date', () => {
            const mockDate1 = new Date(2022, 0, 1);

            expect(cw.getYear(mockDate1)).toBe('2021') 
        });

    });

    describe('getDayOfWeek', () => {

        it('should return first DOW based on given date', () => {
            const mockDate = new Date(2022, 0, 1);

            leadingZeroMock = jest.spyOn(cw, 'leadingZero');


            expect(cw.getDayOfWeek(mockDate,1)).toBe('12.27');
            expect(leadingZeroMock).toHaveBeenCalledWith(12);
            expect(leadingZeroMock).toHaveBeenCalledWith(27);

        });

        it('should return concatenated return values of leadingZero function', () => {
            const mockDate = new Date(2022, 0, 1)
            const anyValue = 'any-value';

            leadingZeroMock = jest.spyOn(cw, 'leadingZero').mockImplementation();
            leadingZeroMock.mockReturnValue(anyValue);

            expect(cw.getDayOfWeek(mockDate)).toBe(anyValue+'.'+anyValue);

        });



    });

    describe('getCW', () => {

        it('should return the CW date format', () => {
            const mockDate = new Date(2022,0,1);

            getWeekMock = jest.spyOn(cw, 'getWeek');
            getYearMock = jest.spyOn(cw, 'getYear');
            getDayOfWeekMock = jest.spyOn(cw, 'getDayOfWeek');
    
            expect(cw.getCW(mockDate)).toBe('CW 01 2021.12.27. - 01.02.');

            expect(getWeekMock).toHaveBeenCalledWith(mockDate);
            expect(getYearMock).toHaveBeenCalledWith(mockDate);
            expect(getDayOfWeekMock).toHaveBeenCalledWith(mockDate,1);
            expect(getDayOfWeekMock).toHaveBeenCalledWith(mockDate,7); 
        });

        it('should return the concatenated return values of mocked functions', () => {
            const mockDate = new Date(2022,0,1);
            const anyValue1 = 'any-value1';
            const anyValue2 = 'any-value2';
            const anyValue3 = 'any-value3';

            getWeekMock = jest.spyOn(cw, 'getWeek').mockImplementation();
            getYearMock = jest.spyOn(cw, 'getYear').mockImplementation();
            getDayOfWeekMock = jest.spyOn(cw, 'getDayOfWeek').mockImplementation();
            getWeekMock.mockReturnValue(anyValue1);
            getYearMock.mockReturnValue(anyValue2);
            getDayOfWeekMock.mockReturnValue(anyValue3);
    
            expect(cw.getCW(mockDate)).toBe('CW'+' '+anyValue1+' '+anyValue2+'.'
                                            +anyValue3+'.'+' - '+anyValue3+'.');
        });



    });



      


});