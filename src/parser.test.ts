import { parseDigit, parseAccountNumber, parseOCRContent } from '../src/parser';

describe('parseDigit', () => {
    test('Given valid digit patterns, when parsed, then return the correct digit', () => {
        // Given
        const line1 = " _     _  _     _  _  _  _  _ ";
        const line2 = "| |  | _| _||_||_ |_   ||_||_|";
        const line3 = "|_|  ||_  _|  | _||_|  ||_| _|";

        // When / Then
        expect(parseDigit(line1, line2, line3, 0)).toBe('0'); 
        expect(parseDigit(line1, line2, line3, 1)).toBe('1'); 
        expect(parseDigit(line1, line2, line3, 2)).toBe('2');
    });

    test('Given invalid digit patterns, when parsed, then return "?"', () => {
        // Given
        const line1 = "invalid";
        const line2 = "invalid";
        const line3 = "invalid";

        // When / Then
        expect(parseDigit(line1, line2, line3, 0)).toBe('?');
    });
});

describe('parseAccountNumber', () => {
    test('Given valid OCR lines, when parsed, then return the correct account number', () => {
        // Given
        const line1 = " _  _  _  _  _  _  _  _  _ ";
        const line2 = "| || || || || || || || || |";
        const line3 = "|_||_||_||_||_||_||_||_||_|";

        // When
        const accountNumber = parseAccountNumber(line1, line2, line3);

        // Then
        expect(accountNumber).toBe('000000000');
    });

    test('Given OCR lines with illegible digits, when parsed, then return account number with "?"', () => {
        // Given
        const line1 = " _  _  _  _  _  _  _  _  _ ";
        const line2 = "| || || || || || || || || ";
        const line3 = "|_||_||_||_||_||_||_||_|| ";

        // When
        const accountNumber = parseAccountNumber(line1, line2, line3);

        // Then
        expect(accountNumber).toBe('00000000?');
    });
});

describe('parseOCRContent', () => {
    test('Given valid OCR content, when parsed, then return the correct account numbers', () => {
        // Given
        const lines = [
            " _  _  _  _  _  _  _  _  _ ",
            "| || || || || || || || || |",
            "|_||_||_||_||_||_||_||_||_|",
            "", 
            "    _  _     _  _  _  _  _ ",
            "  | _| _||_||_ |_   ||_||_|",
            "  ||_  _|  | _||_|  ||_| _|"
        ];

        // When
        const accountNumbers = parseOCRContent(lines);

        // Then
        expect(accountNumbers).toEqual(['000000000', '123456789']);
    });
});