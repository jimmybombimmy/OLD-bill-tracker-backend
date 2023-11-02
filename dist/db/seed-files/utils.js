"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertTimestampToDate = void 0;
const convertTimestampToDate = (dateBigInt) => {
    const convertedDate = new Date(dateBigInt);
    return convertedDate;
};
exports.convertTimestampToDate = convertTimestampToDate;
