"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fbApp = require("./db/firebase.ts");
const app = (0, express_1.default)();
const port = 9090;
app.get('/', (req, res) => {
    res.send('Express + TypeScript are running together');
});
app.get('/api/users');
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
