"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
// import { testdeets } from '../firebase.js';
const fbApp = require("./firebase.ts");
dotenv_1.default.config();
console.log(fbApp);
const app = (0, express_1.default)();
const port = process.env.PORT;
console.log(port);
app.get('/', (req, res) => {
    res.send('Express + TypeScript are running together');
});
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
