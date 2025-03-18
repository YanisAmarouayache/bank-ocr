import fs from 'fs';
const OCR_DIGITS: { [key: string]: string } = {
    " _ | ||_|": "0",
    "     |  |": "1",
    " _  _||_ ": "2",
    " _  _| _|": "3",
    "   |_|  |": "4",
    " _ |_  _|": "5",
    " _ |_ |_|": "6",
    " _   |  |": "7",
    " _ |_||_|": "8",
    " _ |_| _|": "9"
};

const OCR_HEIGHT = 3;
const OCR_WIDTH = 3;  
const ACCOUNT_LENGTH = 9;

export function parseDigit(line1: string, line2: string, line3: string, position: number): string {
    const start = position * OCR_WIDTH;
    const digitPattern = line1.slice(start, start + OCR_WIDTH) +
                        line2.slice(start, start + OCR_WIDTH) +
                        line3.slice(start, start + OCR_WIDTH);
    return OCR_DIGITS[digitPattern] || "?";
}


export function parseAccountNumber(line1: string, line2: string, line3: string): string {
    let accountNumber = "";
    for (let i = 0; i < ACCOUNT_LENGTH; i++) {
        accountNumber += parseDigit(line1, line2, line3, i);
    }
    return accountNumber;
}
export function parseOCRContent(lines: string[]): string[] {
    const accountNumbers: string[] = [];
    for (let i = 0; i < lines.length; i += OCR_HEIGHT + 1) { // +1 pour la ligne vide
        const [line1 = "", line2 = "", line3 = ""] = lines.slice(i, i + OCR_HEIGHT);
        const accountNumber = parseAccountNumber(line1, line2, line3);
        accountNumbers.push(accountNumber);
    }
    return accountNumbers;
}

export function parseOCRFile(filename: string): string[] {
    const content = fs.readFileSync(filename, 'utf8');
    const lines = content.split('\n');
    const accountNumbers = parseOCRContent(lines);
    fs.writeFileSync('output.txt', accountNumbers.join('\n'));
    return accountNumbers;
}