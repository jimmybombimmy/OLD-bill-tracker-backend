const app = require('../dist/app.js');
const request = require('supertest');

const {seed} = require('../dist/db/seed-files/seed.js')
const testData = require('../dist/data/test-data')
const {db} = require('../dist/db/connection.js')
const connection = db

beforeEach(() => seed(testData))
afterAll(() => connection.end());


////////Test Template////////
// describe('[REQUEST] [ENDPOINT]' , () => {
//   describe('Successful connection tests(s)', () => {
//     test('[STATUS CODE]: [DESCRIPTION]', () => {

// })
//   })
//   describe('Unsuccessful connection tests(s)', () => {

//   })
// })

describe('GET /api/users' , () => {
  describe('Successful connection tests(s)', () => {
    test('200: page returns an array of objects ', () => {
      return request(app)
        .get('/api/topics')
        .expect(200)
        .then(({
          body
        }) => {
          expect(body.isArray()).toBe(true)
        })

    })
  })
  describe('Unsuccessful connection tests(s)', () => {

  })
})