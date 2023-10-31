"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const { Pool } = require("pg");
const ENV = process.env.NODE_ENV || 'test';
require('dotenv').config({
    path: `${__dirname}/../.env.${ENV}`
});
if (!process.env.PGDATABASE && !process.env.DATABASE_URL) {
    throw new Error('PGDATABASE or DATABASE_URL not set');
}
const config = () => {
    ENV === 'production'
        ? {
            connectionString: process.env.DATABASE_URL,
            max: 2
        }
        : {};
};
exports.db = new Pool(config);
