import pg from 'pg';
const { Pool } = pg;
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ENV = process.env.NODE_ENV || 'development';
dotenv.config({
    path: `${__dirname}/../../.env.${ENV}`
});
if (!process.env.PGDATABASE && !process.env.DATABASE_URL) {
    throw new Error('PGDATABASE or DATABASE_URL not set');
}
const config = () => {
    return ENV === 'production'
        ? {
            connectionString: process.env.DATABASE_URL,
            max: 2
        }
        : {};
};
export const db = new Pool(config());
