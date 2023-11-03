const app = require('../dist/app.js');
const request = require('supertest');

const seed = require('../dist/db/seed-files/seed.js')
const testData = require('../dist/data/test-data')
const connection = require('../dist/db/connection.js')

beforeEach(() => seed(testData))
afterAll(() => connection.end());

// describe('[REQUEST] [ENDPOINT]' , () => {
//   describe('Successful connection tests(s)', () => {
//     test('[STATUS CODE]: [DESCRIPTION] ')
//   })
//   describe('Unsuccessful connection tests(s)', () => {

//   })
// })