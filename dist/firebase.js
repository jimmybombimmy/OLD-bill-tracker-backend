"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fbApp = void 0;
const app_1 = require("firebase/app");
const firestore_1 = require("firebase/firestore");
console.log(firestore_1.getFirestore);
const serviceAccount = require('./fb_creds.json');
exports.fbApp = (0, app_1.initializeApp)(serviceAccount);
