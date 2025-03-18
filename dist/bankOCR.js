"use strict";
// _     _  _     _  _  _  _  _ 
//| |  | _| _||_||_ |_   ||_||_|
//|_|  ||_  _|  | _||_|  ||_| _|
const DIGITAL_NUMBER_MAP = {
    " _ | ||_|": "0",
    "     |  |": "1",
    " _  _||_ ": "2",
    " _  _| _|": "3",
    "   |_|  |": "4",
    " _ |_  _|": "5",
    " _ |_ |_|": "6",
    " _   |  |": "7",
    " _ |_||_|": "8",
    " _ |_||_ |": "9"
};
const WIDTH = 3;
const HEIGHT = 3;
const ACCOUNT_NUMBER_LENGTH = 9;
function parseDigitalNumber(digitalNumber) {
    let result = "";
    for (let i = 0; i < ACCOUNT_NUMBER_LENGTH; i++) {
        let number = digitalNumber
            .slice(0, HEIGHT)
            .map(line => line.slice(i * WIDTH, (i + 1) * WIDTH))
            .join("");
        result += DIGITAL_NUMBER_MAP[number];
    }
    return result;
}
parseDigitalNumber([" _ | ||_|", " _  _||_ ", " _  _| _|"]);
