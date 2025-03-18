import { parseOCRFile } from "./parser";

const accountNumbers = parseOCRFile('input.txt');
console.log(accountNumbers);