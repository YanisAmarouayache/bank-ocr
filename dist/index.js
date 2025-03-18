"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parser_1 = require("./parser");
const accountNumbers = (0, parser_1.parseOCRFile)('input.txt');
console.log(accountNumbers);
