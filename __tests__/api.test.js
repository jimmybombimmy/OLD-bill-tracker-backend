import { app } from '../dist/app.js';
import request from 'supertest';

import { seed } from '../dist/db/seed-files/seed.js';
import {usersData, paymentTypesData, transactionsData} from '../dist/data/test-data/index.js';
const testData = {usersData, paymentTypesData, transactionsData}
import { db } from '../dist/db/connection.js';
const connection = db;

beforeEach(() => seed(testData));
afterAll(() => connection.end());

////////Test Template////////
// describe('[REQUEST] [ENDPOINT]' , () => {
//   describe('Successful connection test(s)', () => {
//     test('[STATUS CODE]: [DESCRIPTION]', () => {
//     })
//   })
//   describe('Unsuccessful connection test(s)', () => {
//   })
// })

describe('GET /api/users', () => {
    describe('Successful connection test(s)', () => {
        test('200: page returns an array of objects ', () => {
            return request(app)
                .get('/api/users')
                .expect(200)
                .then(({ body }) => {
                expect(body.isArray()).toBe(true);
            });
        });
    });
    describe('Unsuccessful connection test(s)', () => {
    });
});
